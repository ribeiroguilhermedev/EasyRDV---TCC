package br.com.app.controller;

import br.com.app.controller.dto.request.ComprovanteRequestDto;
import br.com.app.controller.dto.response.ComprovanteResponseDto;
import br.com.app.modelo.Comprovante;
import br.com.app.modelo.Viagem;
import br.com.app.repository.ComprovanteRepository;
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
@RequestMapping("/comprovante")
@CrossOrigin(origins = "*")
public class ComprovanteController {

    @Autowired
    private ComprovanteRepository comprovanteRepository;
    @Autowired
    private ViagemRepository viagemRepository;

    @PostMapping("/cadastro")
    @Transactional
    public ResponseEntity<ComprovanteResponseDto> cadastrar(@RequestBody final ComprovanteRequestDto form, UriComponentsBuilder uriBuilder) {
        List<Comprovante> lst_comprovante = comprovanteRepository.findAllByViagem_Id(form.getViagem_id());

        Comprovante comprovante = form.converter(comprovanteRepository);
        comprovante.setViagemId(form.getViagem_id());
        comprovanteRepository.save(comprovante);

        lst_comprovante.add(comprovante);
        double total = 0;
        for (Comprovante comp : lst_comprovante) {
            total += comp.getValor();
        }

        Optional<Viagem> opt_viagem = viagemRepository.findById(form.getViagem_id());
        Viagem viagem = opt_viagem.get();

        viagem.setValorTotal(total);
        viagemRepository.save(viagem);
        URI uri = uriBuilder.path("/comprovante/{id}").buildAndExpand(comprovante.getId()).toUri();
        return ResponseEntity.created(uri).body(new ComprovanteResponseDto(comprovante));
    }

    @GetMapping("/{id}")
    public List<ComprovanteResponseDto> listaPeloId(@PathVariable Long id) {
        List<Comprovante> comprovantes = comprovanteRepository.findAllById(Collections.singleton(id));
        return ComprovanteResponseDto.converter(comprovantes);
    }

    @GetMapping("/viagem/{id}")
    public List<ComprovanteResponseDto> listaPeloViagemId(@PathVariable(value = "id") Long viagem_id,
                                                          @RequestParam(value = "limit", defaultValue = "12") int limit,
                                                          @RequestParam(value = "offset", defaultValue = "0") int offset) {

        Pageable pageable = PageRequest.of(offset, limit);
        Page<Comprovante> comprovantes = comprovanteRepository.findAllByViagem_Id(viagem_id, pageable);
        List<Comprovante> lstComprovante = comprovantes.getContent();
        return ComprovanteResponseDto.converter(lstComprovante);
    }
}
