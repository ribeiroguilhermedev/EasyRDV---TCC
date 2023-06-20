package br.com.app.controller;

import br.com.app.controller.dto.request.Anexo.AnexoRequestDto;
import br.com.app.controller.dto.request.Anexo.AtualizaAnexoRequestDto;
import br.com.app.controller.dto.response.Anexo.AnexoResponseDto;
import br.com.app.modelo.Anexo;
import br.com.app.repository.AnexoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import java.net.URI;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/anexo")
@CrossOrigin(origins =  "*")
public class AnexoController {

    @Autowired
    private AnexoRepository repository;

    @PostMapping("/cadastro")
    @Transactional
    public ResponseEntity<AnexoResponseDto> cadastrar(@RequestBody final AnexoRequestDto form, UriComponentsBuilder uriBuilder) {
        Anexo anexo = form.converter(repository);
        anexo.setComprovanteId(form.getComprovante_id());
        repository.save(anexo);

        URI uri = uriBuilder.path("/cadastro/{id}").buildAndExpand(anexo.getId()).toUri();
        return ResponseEntity.created(uri).body(new AnexoResponseDto(anexo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnexoResponseDto> atualiza(@PathVariable Long id, @RequestBody AtualizaAnexoRequestDto form){
        Optional<Anexo> optional = repository.findById(id);
        if (optional.isPresent()){
            Anexo anexo = form.atualizar(id, repository);
            return ResponseEntity.ok(new AnexoResponseDto(anexo));
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping()
    public List<AnexoResponseDto> listaTodos() {
        List<Anexo> anexos = repository.findAll();
        return AnexoResponseDto.converter(anexos);
    }

    @GetMapping("/{id}")
    public List<AnexoResponseDto> listaPeloId(@PathVariable Long id) {
        List<Anexo> anexos = repository.findAllById(Collections.singleton(id));
        return AnexoResponseDto.converter(anexos);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> remover(@PathVariable Long id){
        Optional<Anexo> optional = repository.findById(id);
        if (optional.isPresent()){
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/comprovante/{id}")
    public List<AnexoResponseDto> listaPeloComprovanteId(@PathVariable(value = "id") Long comprovante_id,
                                                      @RequestParam(value = "limit", defaultValue = "12") int limit,
                                                      @RequestParam(value = "offset", defaultValue = "0") int offset) {

        Pageable pageable = PageRequest.of(offset, limit);
        Page<Anexo> anexos = repository.findAllByComprovante_Id(comprovante_id, pageable);
        List<Anexo> lstAnexo = anexos.getContent();
        return AnexoResponseDto.converter(lstAnexo);
    }
}