package br.com.app.controller.dto.request;

import br.com.app.modelo.Usuario;
import br.com.app.repository.UsuarioRepository;

import java.util.Date;

public class UsuarioRequestDto {

    private String nome;
    private String sobrenome;
    private String cpf;
    private String rg;
    private Date data_nascimento;
    private String foto;
    private String email;
    private String observacao;
    private Long empresa_id;

    public void setNome(String nome) {this.nome = nome;}

    public void setSobrenome(String sobrenome) {this.sobrenome = sobrenome;}
    public void setCpf(String cpf) {this.cpf = cpf;}
    public void setRg(String rg) {this.rg = rg;}
    public void setData_nascimento(Date data_nascimento) {this.data_nascimento = data_nascimento;}
    public void setFoto(String foto) {this.foto = foto;}
    public void setEmail(String email) {this.email = email;}
    public void setObservacao(String observacao) {this.observacao = observacao;}
    public void setEmpresa_id(Long empresa_id) {this.empresa_id = empresa_id;}
    public String getEmail() {return email;}
    public Long getEmpresa_id() {return empresa_id;}
    public String getCpf() {return cpf;}
    public String getRg() {return rg;}

    public Usuario converter(UsuarioRepository repository){
        return new Usuario(nome, sobrenome, cpf, rg, data_nascimento,
                foto, email, observacao, empresa_id);
    }
}