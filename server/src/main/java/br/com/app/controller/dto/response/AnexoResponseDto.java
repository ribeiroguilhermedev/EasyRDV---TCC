package br.com.app.controller.dto.response;

import br.com.app.modelo.Anexo;
import br.com.app.modelo.Comprovante;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

@Data
public class AnexoResponseDto {

    private Long id;
    private String urlImagem;
    private String urlScan;
    private Comprovante comprovante;

    public AnexoResponseDto(Anexo anexo){
        this.id = anexo.getId();
        this.urlImagem = anexo.getUrlImagem();
        this.urlScan = anexo.getUrlScan();
        this.comprovante = anexo.getComprovante();
    }

    public static List<AnexoResponseDto> converter(List<Anexo> anexos) {
        return anexos.stream().map(AnexoResponseDto::new).collect(Collectors.toList());
    }
}
