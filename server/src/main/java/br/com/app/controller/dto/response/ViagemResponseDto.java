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

    private Long id;
    private String descricao;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date dataInicio;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date dataFim;
    private Double valorTotal;
    private Double valorTotalReembolsado;
    private String cidade;
    private String uf;
    private ViagemStatus status;
    private Usuario usuario;

    private List<Comprovante> comprovantes = new ArrayList<>();

    public ViagemResponseDto(Viagem viagem){
        this.id = viagem.getId();
        this.descricao = viagem.getDescricao();
        this.dataInicio = viagem.getDataInicio();
        this.dataFim = viagem.getDataFim();
        this.valorTotal = viagem.getValorTotal();
        this.valorTotalReembolsado = viagem.getValorTotalReembolsado();
        this.cidade = viagem.getCidade();
        this.uf = viagem.getUf();
        this.status = viagem.getStatus();
        this.usuario = viagem.getUsuario();
        this.comprovantes = viagem.getComprovantes();
    }

    public static List<ViagemResponseDto> converter(List<Viagem> viagens) {
        return viagens.stream().map(ViagemResponseDto::new).collect(Collectors.toList());
    }
}
