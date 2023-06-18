package br.com.app.controller.dto.response;

import br.com.app.modelo.Comprovante;
import br.com.app.modelo.Enumeration.ViagemStatus;
import br.com.app.modelo.Usuario;
import br.com.app.modelo.Viagem;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class ViagemResponseDto {

    private final Long id;
    private final String descricao;
    private final Double valorTotal;
    private final Double valorTotalReembolsado;
    private final String cidade;
    private final String uf;
    private final ViagemStatus status;
    private final Date dataAprovado;
    private final Date dataReembolsado;
    private final Double valorTotalAprovado;
    @JsonFormat(pattern = "yyyy-MM-dd") private final Date dataInicio;
    @JsonFormat(pattern = "yyyy-MM-dd")private final Date dataFim;
    private final List<Comprovante> comprovantes;
    private final Usuario usuario;

    public ViagemResponseDto(Viagem viagem) {
        this.id = viagem.getId();
        this.descricao = viagem.getDescricao();
        this.dataInicio = viagem.getDataInicio();
        this.dataFim = viagem.getDataFim();
        this.valorTotal = viagem.getValorTotal();
        this.cidade = viagem.getCidade();
        this.uf = viagem.getUf();
        this.status = viagem.getStatus();
        this.usuario = viagem.getUsuario();
        this.comprovantes = viagem.getComprovantes();
        this.dataAprovado = viagem.getDataAprovado();
        this.dataReembolsado = viagem.getDataReembolsado();
        this.valorTotalAprovado = viagem.getValorTotalAprovado();
        this.valorTotalReembolsado = viagem.getValorTotalReembolsado();
    }

    public static List<ViagemResponseDto> converter(List<Viagem> viagens) {
        return viagens.stream().map(ViagemResponseDto::new).collect(Collectors.toList());
    }

    public static ViagemResponseDto converter(Viagem trip) {
        return new ViagemResponseDto(trip);
    }
}
