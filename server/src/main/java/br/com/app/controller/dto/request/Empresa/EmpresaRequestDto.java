package br.com.app.controller.dto.request.Empresa;

import br.com.app.modelo.Empresa;
import br.com.app.repository.EmpresaRepository;

import java.time.LocalDateTime;

public class EmpresaRequestDto {

    private String nome;
    private String cnpj;
    private String razao_social;
    private Boolean flag_ativo;
    private LocalDateTime data_criacao;
    private String logo;
    private String guid;
    private Long matriz_id;

    public void setNome(String nome) {this.nome = nome;}
    public void setCnpj(String cnpj) {this.cnpj = cnpj;}
    public void setRazao_social(String razao_social) {this.razao_social = razao_social;}
    public void setFlag_ativo(Boolean flag_ativo) {this.flag_ativo = flag_ativo;}
    public void setData_criacao(LocalDateTime data_criacao) {this.data_criacao = data_criacao;}
    public void setLogo(String logo) {this.logo = logo;}
    public void setGuid(String guid) {this.guid = guid;}
    public Long getMatriz_id() {return matriz_id;}
    public void setMatriz_id(Long matriz_id) {this.matriz_id = matriz_id;}

    public Empresa converter(EmpresaRepository repository){
        return new Empresa(nome, cnpj, razao_social, flag_ativo,
                data_criacao, logo, guid, matriz_id);
    }
}