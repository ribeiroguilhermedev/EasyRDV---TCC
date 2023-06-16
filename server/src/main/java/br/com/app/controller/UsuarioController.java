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
    private final UsuarioRepository userRepository;
    private final PerfilRepository profileRepository;
    private final EmailService emailService;

    @PostMapping("/cadastro/empresa")
    @Transactional
    public ResponseEntity<UsuarioResponseDto> registerCompanyUser(@RequestBody final UsuarioRequestDto form, UriComponentsBuilder uriBuilder) {
        Perfil role = getProfile(Role.ROLE_ADMIN_EMP);

        Usuario user = form.converter(userRepository);
        user.setEmpresaId(form.getEmpresa_id());
        user.addRole(role);

        userRepository.save(user);

        URI uri = uriBuilder.path("/empresa/{id}").buildAndExpand(user.getId()).toUri();
        return ResponseEntity.created(uri).body(new UsuarioResponseDto(user));
    }

    @PostMapping("/cadastro/funcionario")
    @Transactional
    public ResponseEntity<UsuarioResponseDto> registerEmployee(@RequestBody final UsuarioRequestDto form, UriComponentsBuilder uriBuilder) throws MessagingException {
        Usuario user = getUserByEmailOrCpfOrRg(form);
        Perfil profile = getProfile(Role.ROLE_FUNC);

        prepareEmployeeData(form, user, profile);

        sendEmailAsync(user);

        userRepository.save(user);

        URI uri = uriBuilder.path("/funcionario/{id}").buildAndExpand(user.getId()).toUri();
        return ResponseEntity.created(uri).body(new UsuarioResponseDto(user));
    }

    @PostMapping("/recuperar/senha")
    @Transactional
    public ResponseEntity<Void> forgotPassword(@RequestBody final UsuarioEmailRequestDto form, UriComponentsBuilder uriBuilder) {
        Usuario user = getUserByEmail(form.getEmail());
        sendPasswordRecoveryEmailAsync(user);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/atualiza/{id}")
    @Transactional
    public ResponseEntity<UsuarioResponseDto> updateUserData(@PathVariable Long id, @RequestBody AtualizacaoUsuarioRequestDto form) {
        Usuario user = getUserById(id);
        user = form.atualizar(user, userRepository);
        return ResponseEntity.ok(new UsuarioResponseDto(user));
    }

    @PutMapping("/atualiza/flag/{id}")
    @Transactional
    public ResponseEntity<UsuarioResponseDto> updateActiveFlag(@PathVariable Long id, @RequestBody AtualizaFlagUsuarioRequestDto form) {
        Usuario user = getUserById(id);
        user = form.update(user, userRepository);
        return ResponseEntity.ok(new UsuarioResponseDto(user));
    }

    @PutMapping("/atualiza/senha/{id}")
    @Transactional
    public ResponseEntity<UsuarioResponseDto> updatePassword(@PathVariable Long id, @RequestBody AtualizaUsuarioSenhaRequestDto form) {
        Usuario user = getUserById(id);
        user = form.update(user, userRepository);
        return ResponseEntity.ok(new UsuarioResponseDto(user));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> removeUser(@PathVariable Long id) {
        Usuario user = getUserById(id);
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping()
    public List<UsuarioResponseDto> getAllUsers() {
        List<Usuario> users = userRepository.findAll();
        return UsuarioResponseDto.converter(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getUsersByCompanyId(@PathVariable(value = "id") Long empresaId, @RequestParam(value = "limit", defaultValue = "12") int limit, @RequestParam(value = "offset", defaultValue = "0") int offset) {
        Page<Usuario> userPage = findUsersByCompanyId(empresaId, limit, offset);
        List<UsuarioResponseDto> userDtos = convertUsersToListDto(userPage.getContent());

        Map<String, Object> response = new HashMap<>();
        response.put("totalElements", userPage.getTotalElements());
        response.put("elements", userDtos);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/guid/{guid}")
    public ResponseEntity<UsuarioResponseDto> getUserByGuid(@PathVariable(value = "guid") String guid) {
        Usuario user = getUsuarioByGuidInternal(guid);
        UsuarioResponseDto responseDto = new UsuarioResponseDto(user);
        return ResponseEntity.ok(responseDto);
    }

    private Usuario getUserById(Long id) {
        Optional<Usuario> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty())
            throw new ResourceNotFoundException("User not found with id: " + id);
        return optionalUser.get();
    }

    private Usuario getUsuarioByGuidInternal(String guid) {
        return userRepository.findByGuid(guid)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with GUID: " + guid));
    }

    private Page<Usuario> findUsersByCompanyId(Long empresaId, int limit, int offset) {
        Pageable pageable = PageRequest.of(offset, limit);
        return userRepository.findAllByEmpresa_id(empresaId, pageable);
    }

    private Usuario getUserByEmailOrCpfOrRg(final UsuarioRequestDto form) {
        Optional<Usuario> optionalUser = userRepository.findByEmailOrCpfOrRg(form.getEmail(), form.getCpf(), form.getRg());
        if (optionalUser.isPresent()) {
            throw new ResourceNotFoundException("User already exists with this e-mail, RG or CPF");
        }
        return form.converter(userRepository);
    }

    private Usuario getUserByEmail(String email) {
        Optional<Usuario> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isEmpty())
            throw new ResourceNotFoundException("User not found with e-mail: " + email);
        return optionalUser.get();
    }

    private Perfil getProfile(Role role) {
        Optional<Perfil> optionalProfile = profileRepository.findById((long) role.getId());
        if (optionalProfile.isEmpty())
            throw new ResourceNotFoundException("Profile " + role.name() + " not found");
        return optionalProfile.get();
    }

    private void prepareEmployeeData(final UsuarioRequestDto form, Usuario usuario, Perfil profile) {
        usuario.setSenha(Usuario.generate());
        usuario.setGuid(String.valueOf(UUID.randomUUID()));
        usuario.setEtapa(Etapa.PENDENTE_ATIVACAO);
        usuario.setEmpresaId(form.getEmpresa_id());
        usuario.setSenha(new BCryptPasswordEncoder().encode(usuario.getSenha()));
        usuario.addRole(profile);
    }

    private void sendEmailAsync(Usuario user) {
        this.emailService.sendAsync(user.getEmail(), EmailMessage.createTitle(user),
                EmailMessage.messageToNewUser(user, user.getSenha()));
    }

    private void sendPasswordRecoveryEmailAsync(Usuario user) {
        this.emailService.sendAsync(
                user.getEmail(),
                EmailMessage.createTitle(user),
                EmailMessage.messageToForgotPassword(user, user.getSenha(), user.getGuid())
        );
    }

    private List<UsuarioResponseDto> convertUsersToListDto(List<Usuario> users) {
        return users.stream()
                .map(UsuarioResponseDto::new)
                .collect(Collectors.toList());
    }
}