package br.com.app.controller.dto.request;

import br.com.app.modelo.Empresa;
import br.com.app.modelo.Etapa;
import br.com.app.modelo.Usuario;
import br.com.app.repository.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

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
//    public void setSenha(String senha) {this.senha = senha;}
//    public void setFlag_ativo(Boolean flag_ativo) {this.flag_ativo = flag_ativo;}
//    public void setData_criacao(LocalDateTime data_criacao) {this.data_criacao = data_criacao;}
    public void setObservacao(String observacao) {this.observacao = observacao;}
//    public void setGuid(String guid) {this.guid = guid;}
//    public void setEtapa(Etapa etapa) {this.etapa = etapa;}
    public void setEmpresa_id(Long empresa_id) {this.empresa_id = empresa_id;}
    public Long getEmpresa_id() {return empresa_id;}

    public Usuario converter(UsuarioRepository repository){
        return new Usuario(nome, sobrenome, cpf, rg, data_nascimento,
                foto, email, observacao, empresa_id);
    }
}