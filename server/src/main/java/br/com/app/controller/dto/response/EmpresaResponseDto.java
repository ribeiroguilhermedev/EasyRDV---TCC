package br.com.app.controller.dto.response;

import br.com.app.modelo.Empresa;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EmpresaResponseDto {

    private Long id;
    private String nome;
    private String cnpj;
    private String razao_social;
    private Boolean flag_ativo;
    private LocalDateTime data_criacao;
    private String logo;
    private String guid;

    public EmpresaResponseDto(Empresa empresa){
        this.id = empresa.getId();
        this.nome = empresa.getNome();
        this.cnpj = empresa.getCnpj();
        this.razao_social = empresa.getRazao_social();
        this.flag_ativo = empresa.getFlag_ativo();
        this.data_criacao = empresa.getData_criacao();
        this.logo = empresa.getLogo();
        this.guid = empresa.getGuid();
    }
}