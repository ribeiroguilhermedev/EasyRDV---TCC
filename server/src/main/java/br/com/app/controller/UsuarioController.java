package br.com.app.controller;

import br.com.app.controller.dto.request.AtualizacaoUsuarioRequestDto;
import br.com.app.controller.dto.response.UsuarioResponseDto;
import br.com.app.controller.dto.request.UsuarioRequestDto;
import br.com.app.modelo.Usuario;
import br.com.app.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/usuario")
@CrossOrigin(origins =  "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @PostMapping("/cadastro")
    @Transactional
    public ResponseEntity<UsuarioResponseDto> cadastrar(@RequestBody final UsuarioRequestDto form, UriComponentsBuilder uriBuilder) {
        Usuario usuario = form.converter(repository);
        usuario.setEmpresaId(form.getEmpresa_id());
        repository.save(usuario);

        URI uri = uriBuilder.path("/cadastro/{id}").buildAndExpand(usuario.getId()).toUri();
        return ResponseEntity.created(uri).body(new UsuarioResponseDto(usuario));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioResponseDto> atualiza(@PathVariable Long id, @RequestBody AtualizacaoUsuarioRequestDto form){
        Optional<Usuario> optional = repository.findById(id);
        if (optional.isPresent()){
            Usuario usuario = form.atualizar(id, repository);
            return ResponseEntity.ok(new UsuarioResponseDto(usuario));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> remover(@PathVariable Long id){
        Optional<Usuario> optional = repository.findById(id);
        if (optional.isPresent()){
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}