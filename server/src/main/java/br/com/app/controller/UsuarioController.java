package br.com.app.controller;

import br.com.app.controller.dto.request.AtualizaUsuarioSenhaRequestDto;
import br.com.app.controller.dto.request.AtualizacaoUsuarioFlagAtivoDto;
import br.com.app.controller.dto.request.UsuarioEmailRequestDto;
import br.com.app.controller.dto.response.UsuarioResponseDto;
import br.com.app.controller.dto.request.UsuarioRequestDto;
import br.com.app.messages.EmailMessage;
import br.com.app.modelo.Enumeration.Role;
import br.com.app.modelo.Etapa;
import br.com.app.modelo.Perfil;
import br.com.app.modelo.Usuario;
import br.com.app.repository.PerfilRepository;
import br.com.app.repository.UsuarioRepository;
import br.com.app.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;


import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository u_repository;
    @Autowired
    private PerfilRepository p_repository;
    @Autowired
    private EmailService emailService;

    @PostMapping("/cadastro/empresa")
    @Transactional
    public ResponseEntity<UsuarioResponseDto> cadastrarEmpresa(@RequestBody final UsuarioRequestDto form, UriComponentsBuilder uriBuilder) {
        Usuario usuario = form.converter(u_repository);
        usuario.setEmpresaId(form.getEmpresa_id());

        Optional<Perfil> optPerfil = p_repository.findById((long) Role.ROLE_ADMIN_EMP.getId());
        Perfil perfil = optPerfil.orElse(null);

        usuario.addRole(perfil);

        u_repository.save(usuario);

        URI uri = uriBuilder.path("/empresa/{id}").buildAndExpand(usuario.getId()).toUri();
        return ResponseEntity.created(uri).body(new UsuarioResponseDto(usuario));
    }

    @PostMapping("/cadastro/funcionario")
    @Transactional
    public ResponseEntity<UsuarioResponseDto> cadastrarFuncionario(@RequestBody final UsuarioRequestDto form, UriComponentsBuilder uriBuilder) throws MessagingException {
        Optional<Usuario> optUsuario = u_repository.findByEmail(form.getEmail());
        Usuario rsUsuario = optUsuario.orElse(null);
        if (rsUsuario != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new UsuarioResponseDto(new Usuario()));
        }
        Usuario usuario = form.converter(u_repository);
        usuario.setSenha(Usuario.generate());
        usuario.setData_criacao(LocalDateTime.now());
        usuario.setFlag_ativo(true);
        usuario.setGuid(String.valueOf(UUID.randomUUID()));
        usuario.setEtapa(Etapa.PENDENTE_ATIVACAO);
        usuario.setEmpresaId(form.getEmpresa_id());

        this.emailService.enviarAsync(usuario.getEmail(), EmailMessage.createTitle(usuario),
                EmailMessage.messageToNewUser(usuario, usuario.getSenha()));

        usuario.setSenha(new BCryptPasswordEncoder().encode(usuario.getSenha()));

        Optional<Perfil> optPerfil = p_repository.findById((long) Role.ROLE_FUNC.getId());

        if(optPerfil.isEmpty())
            return ResponseEntity.internalServerError().body(new UsuarioResponseDto(new Usuario()));

        Perfil perfil = optPerfil.get();

        usuario.addRole(perfil);

        u_repository.save(usuario);

        URI uri = uriBuilder.path("/funcionario/{id}").buildAndExpand(usuario.getId()).toUri();
        return ResponseEntity.created(uri).body(new UsuarioResponseDto(usuario));
    }

    @PostMapping("/recuperar/senha")
    @Transactional
    public ResponseEntity<Void> esqueciMinhaSenha(@RequestBody final UsuarioEmailRequestDto form, UriComponentsBuilder uriBuilder){
        Optional<Usuario> uopt = u_repository.findByEmail(form.getEmail());
        Usuario usuario = uopt.get();
        if (uopt.isEmpty()){
            return ResponseEntity.badRequest().build();
        }
        this.emailService.enviarAsync(form.getEmail(), EmailMessage.createTitle(usuario),
                EmailMessage.messageToForgotPassword(usuario, usuario.getSenha(), usuario.getGuid()));
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponseDto> atualiza(@PathVariable Long id, @RequestBody AtualizacaoUsuarioFlagAtivoDto form) {
        Optional<Usuario> optional = u_repository.findById(id);
        if (optional.isPresent()) {
            boolean value = form.isAtivo();
            Usuario usuario = optional.get();
            usuario.setFlag_ativo(value);
            u_repository.save(usuario);
            return ResponseEntity.ok(new UsuarioResponseDto(usuario));
        }
        return ResponseEntity.badRequest().build();
    }

    @PutMapping("/atualiza/senha/{id}")
    public ResponseEntity<UsuarioResponseDto> atualizaSenha(@PathVariable Long id, @RequestBody AtualizaUsuarioSenhaRequestDto form) {
        Optional<Usuario> optional = u_repository.findById(id);
        if (optional.isPresent()) {
            Usuario usuario = form.atualizar(id, u_repository);
            usuario.setSenha(new BCryptPasswordEncoder().encode(usuario.getSenha()));
            u_repository.save(usuario);
            return ResponseEntity.ok(new UsuarioResponseDto(usuario));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> remover(@PathVariable Long id) {
        Optional<Usuario> optional = u_repository.findById(id);
        if (optional.isPresent()) {
            u_repository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping()
    public List<UsuarioResponseDto> listaTodos() {
        List<Usuario> usuarios = u_repository.findAll();
        return UsuarioResponseDto.converter(usuarios);
    }

    @GetMapping("/nome")
    public List<UsuarioResponseDto> listaPeloNome(@RequestParam("nome") String nome) {
        List<Usuario> usuarios = u_repository.findByNome(nome);
        return UsuarioResponseDto.converter(usuarios);
    }

    @GetMapping("/{id}")
    public List<UsuarioResponseDto> listaPeloEmpresaId(@PathVariable(value = "id") Long empresa_id) {
        List<Usuario> usuarios = u_repository.findAllByEmpresa_id(empresa_id);
        return UsuarioResponseDto.converter(usuarios);
    }
}