package br.com.app.controller;

import br.com.app.controller.dto.request.Empresa.EmpresaRequestDto;
import br.com.app.controller.dto.response.Empresa.EmpresaResponseDto;
import br.com.app.modelo.Empresa;
import br.com.app.repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/empresa")
@CrossOrigin(origins =  "*")
public class EmpresaController {

    @Autowired
    private EmpresaRepository repository;

    @PostMapping("/cadastro")
    @Transactional
    public ResponseEntity<EmpresaResponseDto> cadastrar(@RequestBody final EmpresaRequestDto form, UriComponentsBuilder uriBuilder) {
        Empresa empresa = form.converter(repository);
        empresa.setMatrizId(form.getMatriz_id());
        repository.save(empresa);

        URI uri = uriBuilder.path("/cadastro/{id}").buildAndExpand(empresa.getId()).toUri();
        return ResponseEntity.created(uri).body(new EmpresaResponseDto(empresa));
    }

//    @PutMapping("/{id}")
//    public ResponseEntity<EmpresaResponseDto> atualiza(@PathVariable Long id, @RequestBody AtualizacaoUsuarioRequestDto form){
//        Optional<Usuario> optional = repository.findById(id);
//        if (optional.isPresent()){
//            Usuario usuario = form.atualizar(id, repository);
//            return ResponseEntity.ok(new UsuarioResponseDto(usuario));
//        }
//        return ResponseEntity.notFound().build();
//    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> remover(@PathVariable Long id){
        Optional<Empresa> optional = repository.findById(id);
        if (optional.isPresent()){
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}