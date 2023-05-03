package br.com.app.controller;

import br.com.app.controller.dto.request.AtualizacaoUsuarioRequestDto;
import br.com.app.controller.dto.response.UsuarioResponseDto;
import br.com.app.controller.dto.request.UsuarioRequestDto;
import br.com.app.modelo.Enumeration.Role;
import br.com.app.modelo.Perfil;
import br.com.app.modelo.Usuario;
import br.com.app.repository.PerfilRepository;
import br.com.app.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;


import javax.transaction.Transactional;
import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/usuario/cadastro")
@CrossOrigin(origins =  "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository u_repository;
    @Autowired
    private PerfilRepository p_repository;

    @PostMapping("/empresa")
    @Transactional
    public ResponseEntity<UsuarioResponseDto> cadastrarEmpresa(@RequestBody final UsuarioRequestDto form, UriComponentsBuilder uriBuilder) {
        Usuario usuario = form.converter(u_repository);
        usuario.setEmpresaId(form.getEmpresa_id());

        Optional<Perfil> optPerfil = p_repository.findById(Long.valueOf(Role.ROLE_ADMIN_EMP.getId()));
        Perfil perfil = optPerfil.orElse(null);

        usuario.addRole(perfil);

        u_repository.save(usuario);

        URI uri = uriBuilder.path("/empresa/{id}").buildAndExpand(usuario.getId()).toUri();
        return ResponseEntity.created(uri).body(new UsuarioResponseDto(usuario));
    }

    @PostMapping("/funcionario")
    @Transactional
    public ResponseEntity<UsuarioResponseDto> cadastrarFuncionario(@RequestBody final UsuarioRequestDto form, UriComponentsBuilder uriBuilder) {
        Usuario usuario = form.converter(u_repository);
        usuario.setEmpresaId(form.getEmpresa_id());

        Optional<Perfil> optPerfil = p_repository.findById(Long.valueOf(Role.ROLE_FUNC.getId()));
        Perfil perfil = optPerfil.orElse(null);

        usuario.addRole(perfil);

        u_repository.save(usuario);

        URI uri = uriBuilder.path("/funcionario/{id}").buildAndExpand(usuario.getId()).toUri();
        return ResponseEntity.created(uri).body(new UsuarioResponseDto(usuario));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponseDto> atualiza(@PathVariable Long id, @RequestBody AtualizacaoUsuarioRequestDto form){
        Optional<Usuario> optional = u_repository.findById(id);
        if (optional.isPresent()){
            Usuario usuario = form.atualizar(id, u_repository);
            return ResponseEntity.ok(new UsuarioResponseDto(usuario));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> remover(@PathVariable Long id){
        Optional<Usuario> optional = u_repository.findById(id);
        if (optional.isPresent()){
            u_repository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}