package br.com.app.controller;

import br.com.app.controller.dto.request.*;
import br.com.app.controller.dto.request.atualiza.AtualizaFlagUsuarioRequestDto;
import br.com.app.controller.dto.request.atualiza.AtualizaUsuarioSenhaRequestDto;
import br.com.app.controller.dto.request.atualiza.AtualizacaoUsuarioRequestDto;
import br.com.app.controller.dto.response.UsuarioResponseDto;
import br.com.app.exception.ResourceNotFoundException;
import br.com.app.messages.EmailMessage;
import br.com.app.modelo.Enumeration.Role;
import br.com.app.modelo.Etapa;
import br.com.app.modelo.Perfil;
import br.com.app.modelo.Usuario;
import br.com.app.repository.PerfilRepository;
import br.com.app.repository.UsuarioRepository;
import br.com.app.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;

import java.util.*;
import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class UsuarioController {
    private final UsuarioRepository usuarioRepository;
    private final PerfilRepository perfilRepository;
    private final EmailService emailService;

    @PostMapping("/cadastro/empresa")
    @Transactional
    public ResponseEntity<UsuarioResponseDto> cadastraEmpresa(@RequestBody final UsuarioRequestDto form, UriComponentsBuilder uriBuilder) {
        Perfil role = getPerfil(Role.ROLE_ADMIN_EMP);

        Usuario usuario = form.converter(usuarioRepository);
        usuario.setEmpresaId(form.getEmpresa_id());
        usuario.addRole(role);

        usuarioRepository.save(usuario);

        URI uri = uriBuilder.path("/empresa/{id}").buildAndExpand(usuario.getId()).toUri();
        return ResponseEntity.created(uri).body(new UsuarioResponseDto(usuario));
    }

    @PostMapping("/cadastro/funcionario")
    @Transactional
    public ResponseEntity<UsuarioResponseDto> cadastraFuncionario(@RequestBody final UsuarioRequestDto form, UriComponentsBuilder uriBuilder) throws MessagingException {
        Usuario usuario = getUsuarioByEmailOrCpfOrRg(form);
        Perfil perfil = getPerfil(Role.ROLE_FUNC);

        preparaDadosFuncionario(form, usuario, perfil);

        enviaEmailAsync(usuario);

        usuarioRepository.save(usuario);

        URI uri = uriBuilder.path("/funcionario/{id}").buildAndExpand(usuario.getId()).toUri();
        return ResponseEntity.created(uri).body(new UsuarioResponseDto(usuario));
    }

    @PostMapping("/recuperar/senha")
    @Transactional
    public ResponseEntity<Void> esqueciMinhaSenha(@RequestBody final UsuarioEmailRequestDto form, UriComponentsBuilder uriBuilder) {
        Usuario usuario = getUsuarioByEmail(form.getEmail());

        enviaEmailRecuperacaoSenhaAsync(usuario);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/atualiza/{id}")
    @Transactional
    public ResponseEntity<UsuarioResponseDto> atualizaDadosUsuario(@PathVariable Long id, @RequestBody AtualizacaoUsuarioRequestDto form) {
        Usuario usuario = getUsuarioById(id);
        usuario = form.atualizar(usuario, usuarioRepository);
        return ResponseEntity.ok(new UsuarioResponseDto(usuario));
    }

    @PutMapping("/atualiza/flag/{id}")
    @Transactional
    public ResponseEntity<UsuarioResponseDto> atualizaFlagAtivoUsuario(@PathVariable Long id, @RequestBody AtualizaFlagUsuarioRequestDto form) {
        Usuario usuario = getUsuarioById(id);
        usuario = form.atualizar(usuario, usuarioRepository);
        return ResponseEntity.ok(new UsuarioResponseDto(usuario));
    }

    @PutMapping("/atualiza/senha/{id}")
    @Transactional
    public ResponseEntity<UsuarioResponseDto> atualizaSenha(@PathVariable Long id, @RequestBody AtualizaUsuarioSenhaRequestDto form) {
        Usuario usuario = getUsuarioById(id);
        usuario = form.atualizar(usuario, usuarioRepository);
        return ResponseEntity.ok(new UsuarioResponseDto(usuario));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> removeUsuario(@PathVariable Long id) {
        Usuario usuario = getUsuarioById(id);
        usuarioRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping()
    public List<UsuarioResponseDto> listaTodosUsuarios() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        return UsuarioResponseDto.converter(usuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> listaPeloEmpresaId(@PathVariable(value = "id") Long empresaId, @RequestParam(value = "limit", defaultValue = "12") int limit, @RequestParam(value = "offset", defaultValue = "0") int offset) {
        Page<Usuario> userPage = findUsuariosByEmpresaId(empresaId, limit, offset);
        List<UsuarioResponseDto> usuarioDtos = convertUsersToListDto(userPage.getContent());

        Map<String, Object> response = new HashMap<>();
        response.put("totalElements", userPage.getTotalElements());
        response.put("elements", usuarioDtos);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/guid/{guid}")
    public ResponseEntity<UsuarioResponseDto> getUsuarioByGuid(@PathVariable(value = "guid") String guid) {
        Usuario usuario = getUsuarioByGuidInternal(guid);
        UsuarioResponseDto responseDto = new UsuarioResponseDto(usuario);
        return ResponseEntity.ok(responseDto);
    }

    private Usuario getUsuarioById(Long id) {
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);
        if (optionalUsuario.isEmpty())
            throw new ResourceNotFoundException("Usuário não encontrado com o id: " + id);
        return optionalUsuario.get();
    }

    private Usuario getUsuarioByGuidInternal(String guid) {
        return usuarioRepository.findByGuid(guid)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com o GUID: " + guid));
    }

    private Page<Usuario> findUsuariosByEmpresaId(Long empresaId, int limit, int offset) {
        Pageable pageable = PageRequest.of(offset, limit);
        return usuarioRepository.findAllByEmpresa_id(empresaId, pageable);
    }

    private Usuario getUsuarioByEmailOrCpfOrRg(final UsuarioRequestDto form) {
        Optional<Usuario> optionalUsuario = usuarioRepository.findByEmailOrCpfOrRg(form.getEmail(), form.getCpf(), form.getRg());
        if (optionalUsuario.isPresent()) {
            throw new ResourceNotFoundException("Usuário já existente com esse email, CPF ou RG");
        }
        return form.converter(usuarioRepository);
    }

    private Usuario getUsuarioByEmail(String email) {
        Optional<Usuario> optionalUsuario = usuarioRepository.findByEmail(email);
        if (optionalUsuario.isEmpty())
            throw new ResourceNotFoundException("Usuário não encontrado com o e-mail: " + email);
        return optionalUsuario.get();
    }

    private Perfil getPerfil(Role role) {
        Optional<Perfil> optionalPerfil = perfilRepository.findById((long) role.getId());
        if (optionalPerfil.isEmpty())
            throw new ResourceNotFoundException("Perfil " + role.name() + " não encontrado");
        return optionalPerfil.get();
    }

    private void preparaDadosFuncionario(final UsuarioRequestDto form, Usuario usuario, Perfil perfil) {
        usuario.setSenha(Usuario.generate());
        usuario.setGuid(String.valueOf(UUID.randomUUID()));
        usuario.setEtapa(Etapa.PENDENTE_ATIVACAO);
        usuario.setEmpresaId(form.getEmpresa_id());
        usuario.setSenha(new BCryptPasswordEncoder().encode(usuario.getSenha()));
        usuario.addRole(perfil);
    }

    private void enviaEmailAsync(Usuario usuario) {
        this.emailService.enviarAsync(usuario.getEmail(), EmailMessage.createTitle(usuario),
                EmailMessage.messageToNewUser(usuario, usuario.getSenha()));
    }

    private void enviaEmailRecuperacaoSenhaAsync(Usuario usuario) {
        this.emailService.enviarAsync(
                usuario.getEmail(),
                EmailMessage.createTitle(usuario),
                EmailMessage.messageToForgotPassword(usuario, usuario.getSenha(), usuario.getGuid())
        );
    }

    private List<UsuarioResponseDto> convertUsersToListDto(List<Usuario> usuarios) {
        return usuarios.stream()
                .map(UsuarioResponseDto::new)
                .collect(Collectors.toList());
    }
}