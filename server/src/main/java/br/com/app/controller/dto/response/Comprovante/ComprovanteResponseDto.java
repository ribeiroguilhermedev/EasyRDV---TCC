package br.com.app.controller.dto.response.Comprovante;

import br.com.app.modelo.Anexo;
import br.com.app.modelo.Comprovante;
import br.com.app.modelo.Viagem;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class ComprovanteResponseDto {

    private Long id;
    private Double valor;
    private String categoria;
    private String local;
    private String observacao;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date data;
    private Double valorReembolsado;
    private String observacaoEmpresa;
    private Viagem viagem;

    private List<Anexo> anexos = new ArrayList<>();

    public ComprovanteResponseDto(Comprovante comprovante){
        this.id = comprovante.getId();
        this.valor = comprovante.getValor();
        this.categoria = comprovante.getCategoria();
        this.local = comprovante.getLocal();
        this.observacao = comprovante.getObservacao();
        this.data = comprovante.getData();
        this.observacaoEmpresa = comprovante.getObservacaoEmpresa();
        this.viagem = comprovante.getViagem();
        this.anexos = comprovante.getAnexos();
    }

    public static List<ComprovanteResponseDto> converter(List<Comprovante> comprovantes) {
        return comprovantes.stream().map(ComprovanteResponseDto::new).collect(Collectors.toList());
    }
}
