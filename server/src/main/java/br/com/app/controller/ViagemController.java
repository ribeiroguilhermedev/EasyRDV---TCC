package br.com.app.controller;

import br.com.app.Utils.Utils;
import br.com.app.controller.dto.request.ViagemAprovacaoRequestDto;
import br.com.app.controller.dto.request.ViagemReprovacaoRequestDto;
import br.com.app.controller.dto.request.ViagemRequestDto;
import br.com.app.controller.dto.response.ViagemResponseDto;
import br.com.app.exception.ResourceWithErrorsException;
import br.com.app.exception.ResourceNotFoundException;
import br.com.app.modelo.Enumeration.ViagemStatus;
import br.com.app.modelo.Viagem;
import br.com.app.repository.ViagemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import java.net.URI;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/viagem")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class ViagemController {

    private final ViagemRepository repository;

    @PostMapping("/cadastro")
    @Transactional
    public ResponseEntity<ViagemResponseDto> registerTrip(@RequestBody final ViagemRequestDto form, UriComponentsBuilder uriBuilder) {
        Viagem trip = form.converter();
        trip.setUsuarioId(form.getUsuario_id());

        ViagemStatus tripStatus = getTripStatusByStartDate(form.getDataInicio());
        trip.setStatus(tripStatus);

        repository.save(trip);

        URI uri = uriBuilder.path("/viagem/{id}").buildAndExpand(trip.getId()).toUri();
        return ResponseEntity.created(uri).body(new ViagemResponseDto(trip));
    }

    @PostMapping("/aprovar")
    @Transactional
    public ResponseEntity<ViagemResponseDto> approveTrip(@RequestBody final ViagemAprovacaoRequestDto form, UriComponentsBuilder uriBuilder) {
        Viagem trip = getTripById(form.getId());

        validateTripStatus(trip);
        validateApprovedValue(trip, form);

        trip.setDescricao(form.getDescription());

        if (form.isFullValue()) {
            setApprovedTrip(trip);
        }

        if (!form.isFullValue()) {
            boolean equalValues = Utils.compareDoubles(form.getValue(), trip.getValorTotal());
            if (equalValues) {
                setApprovedTrip(trip);
            } else {
                setPartialApprovedTrip(trip, form);
            }
        }

        repository.save(trip);

        ViagemResponseDto response = ViagemResponseDto.converter(trip);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/reprovar")
    @Transactional
    public ResponseEntity<ViagemResponseDto> reproveTrip(@RequestBody final ViagemReprovacaoRequestDto form, UriComponentsBuilder uriBuilder) {
        Viagem trip = getTripById(form.getId());

        validateTripStatus(trip);

        trip.setDescricao(form.getDescription());

        trip.setStatus(ViagemStatus.REPROVADA);

        repository.save(trip);

        ViagemResponseDto response = ViagemResponseDto.converter(trip);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<?> removeTrip(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping()
    public List<ViagemResponseDto> findAll() {
        List<Viagem> trips = repository.findAll();
        return ViagemResponseDto.converter(trips);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ViagemResponseDto> findById(@PathVariable Long id) {
        Viagem trip = getTripById(id);

        ViagemResponseDto response = ViagemResponseDto.converter(trip);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/usuario/{id}")
    public List<ViagemResponseDto> findAllByUserId(@PathVariable(value = "id") Long userId) {
        List<Viagem> trips = repository.findAllByUserId(userId);
        return ViagemResponseDto.converter(trips);
    }

    private Viagem getTripById(Long id) {
        Optional<Viagem> trip = repository.findById(id);
        if (trip.isEmpty())
            throw new ResourceNotFoundException("Trip not found with id: " + id);

        return trip.get();
    }

    private ViagemStatus getTripStatusByStartDate(Date startTripDate) {
        Date now = new Date();

        if (startTripDate.compareTo(now) < 0) {
            return ViagemStatus.AGUARDANDO_INICIO;
        }

        if (startTripDate.compareTo(now) > 0) {
            return ViagemStatus.EM_ANDAMENTO;
        }

        throw new ResourceNotFoundException("Trip status not found");
    }

    private void setApprovedTrip(Viagem trip) {
        trip.setStatus(ViagemStatus.APROVADA);
        trip.setValorTotalAprovado(trip.getValorTotal());
        trip.setDataAprovado(new Date());
    }

    private void setPartialApprovedTrip(Viagem trip, ViagemAprovacaoRequestDto form) {
        trip.setStatus(ViagemStatus.APROVADA_PARCIAL);
        trip.setValorTotalAprovado(form.getValue());
        trip.setDataAprovado(new Date());
    }

    private void validateTripStatus(Viagem trip) {
        if (trip.getStatus() != ViagemStatus.AGUARDANDO_APROVACAO) {
            throw new ResourceWithErrorsException("Invalid status: the trip status should be AGUARDANDO_APROVACAO");
        }
    }

    private void validateApprovedValue(Viagem trip, ViagemAprovacaoRequestDto form) {
        if (form.isFullValue())
            return;

        boolean requestValueIsGreaterThanTripValue = Utils.doubleIsGreaterThan(form.getValue(), trip.getValorTotal());

        if (requestValueIsGreaterThanTripValue)
            throw new ResourceWithErrorsException("O valor aprovado deve ser menor ou igual ao valor total da viagem");
    }


}