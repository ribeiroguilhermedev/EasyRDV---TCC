package br.com.app.controller;

import br.com.app.controller.dto.request.ViagemRequestDto;
import br.com.app.controller.dto.response.ViagemResponseDto;
import br.com.app.modelo.Viagem;
import br.com.app.repository.ViagemRepository;
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
@RequestMapping("/viagem")
@CrossOrigin(origins = "*")
public class ViagemController {

    @Autowired
    private ViagemRepository repository;

    @PostMapping("/cadastro")
    @Transactional
    public ResponseEntity<ViagemResponseDto> cadastrarEmpresa(@RequestBody final ViagemRequestDto form, UriComponentsBuilder uriBuilder) {
        Viagem viagem = form.converter(repository);
        viagem.setUsuarioId(form.getUsuario_id());
        repository.save(viagem);

        URI uri = uriBuilder.path("/viagem/{id}").buildAndExpand(viagem.getId()).toUri();
        return ResponseEntity.created(uri).body(new ViagemResponseDto(viagem));
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> remover(@PathVariable Long id) {
        Optional<Viagem> optional = repository.findById(id);
        if (optional.isPresent()) {
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping()
    public List<ViagemResponseDto> listaTodos() {
        List<Viagem> viagens = repository.findAll();
        return ViagemResponseDto.converter(viagens);
    }

    @GetMapping("/{id}")
    public List<ViagemResponseDto> listaPeloId(@PathVariable Long id) {
        List<Viagem> viagens = repository.findAllById(Collections.singleton(id));
        return ViagemResponseDto.converter(viagens);
    }

    @GetMapping("/usuario/{id}")
    public List<ViagemResponseDto> listaPeloUsuarioId(@PathVariable(value = "id") Long usuario_id) {

        List<Viagem> lstViagem = repository.findAllByUsuario_IdOrderByStatus(usuario_id);
        return ViagemResponseDto.converter(lstViagem);
    }
}