package br.com.app.controller.dto.request.Viagem;

import br.com.app.modelo.Viagem;
import br.com.app.repository.ViagemRepository;

import java.util.Date;

public class ViagemAprovacaoRequestDto {
    private Long id;
    private boolean fullValue;
    private Double value;
    private String description;

    public Long getId() {
        return id;
    }

    public boolean isFullValue() {
        return fullValue;
    }

    public Double getValue() {
        return value;
    }

    public String getDescription() {
        return description;
    }
}
