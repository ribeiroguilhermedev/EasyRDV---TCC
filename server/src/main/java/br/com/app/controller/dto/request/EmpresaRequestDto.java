package br.com.app.controller.dto.request;

import br.com.app.modelo.Empresa;
import br.com.app.repository.EmpresaRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;

public class EmpresaRequestDto {

    private String nome;
    private String cnpj;
    private String razao_social;
    private Boolean flag_ativo;
    private LocalDateTime data_criacao;
    private String logo;
    private String guid;

    public void setNome(String nome) {this.nome = nome;}
    public void setCnpj(String cnpj) {this.cnpj = cnpj;}
    public void setRazao_social(String razao_social) {this.razao_social = razao_social;}
    public void setLogo(String logo) {this.logo = logo;}
    public void setGuid(String guid) {this.guid = guid;}

    public Empresa converter(EmpresaRepository repository){
        return new Empresa(nome, cnpj, razao_social, flag_ativo, data_criacao, logo, guid);
    }
}