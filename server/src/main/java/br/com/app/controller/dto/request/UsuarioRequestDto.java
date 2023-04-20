package br.com.app.controller.dto.request;

import br.com.app.modelo.Empresa;
import br.com.app.modelo.Usuario;
import br.com.app.repository.UsuarioRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;

public class UsuarioRequestDto {

    private String nome;
    private String cpf;
    private String rg;
    private Date data_nascimento;
    private String foto;
    private String email;
    private String senha;
    private Boolean flag_ativo;
    private LocalDateTime data_criacao;
    private String observacao;
    private String guid;
    private Empresa empresa;

    public void setNome(String nome) {this.nome = nome;}
    public void setCpf(String cpf) {this.cpf = cpf;}
    public void setRg(String rg) {this.rg = rg;}
    public void setData_nascimento(Date data_nascimento) {this.data_nascimento = data_nascimento;}
    public void setFoto(String foto) {this.foto = foto;}
    public void setEmail(String email) {this.email = email;}
    public void setSenha(String senha) {this.senha = senha;}
    public void setFlag_ativo(Boolean flag_ativo) {this.flag_ativo = flag_ativo;}
    public void setData_criacao(LocalDateTime data_criacao) {this.data_criacao = data_criacao;}
    public void setObservacao(String observacao) {this.observacao = observacao;}
    public void setGuid(String guid) {this.guid = guid;}
    public void setEmpresa(Empresa empresa) {this.empresa = empresa;}

    public Usuario converter(UsuarioRepository repository){
        return new Usuario(nome, cpf, rg, data_nascimento,
                foto, email, new BCryptPasswordEncoder().encode(senha), flag_ativo,
                data_criacao, observacao, guid, empresa);
    }
}