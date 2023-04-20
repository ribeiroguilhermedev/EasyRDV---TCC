package br.com.app.controller;

import br.com.app.controller.dto.request.EmpresaRequestDto;
import br.com.app.controller.dto.response.EmpresaResponseDto;
import br.com.app.exception.ResourceNotFoundException;
import br.com.app.modelo.Empresa;
import br.com.app.repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import java.net.URI;
import java.util.List;

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
        repository.save(empresa);

        URI uri = uriBuilder.path("/empresa/{id}").buildAndExpand(empresa.getId()).toUri();
        return ResponseEntity.created(uri).body(new EmpresaResponseDto(empresa));
    }

    @GetMapping("/{id}")
    public Empresa listaPeloId(@PathVariable (value = "id") long empresaId) {
        return this.repository.findById(empresaId)
                .orElseThrow(() -> new ResourceNotFoundException("Empresa não encontrada pelo id  :" + empresaId));
    }

    @GetMapping("/nome")
    public List<EmpresaResponseDto> listaPeloNome(@RequestParam("nome") String empresaNome){
        List<Empresa> empresas = repository.findByNome(empresaNome);
        return EmpresaResponseDto.converter(empresas);
    }

    @GetMapping("/cidade")
    public List<EmpresaResponseDto> listaPelaCidade(@RequestParam("cnpj") String cnpj){
        List<Empresa> empresas = repository.findByCnpj(cnpj);
        return EmpresaResponseDto.converter(empresas);
    }

    @GetMapping
    public List<EmpresaResponseDto> lista(){
        List<Empresa> empresa = repository.findAll();
        return EmpresaResponseDto.converter(empresa);
    }
}
