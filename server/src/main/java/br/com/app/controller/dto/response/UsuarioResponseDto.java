package br.com.app.controller.dto.response;

import br.com.app.modelo.Empresa;
import br.com.app.modelo.Etapa;
import br.com.app.modelo.Usuario;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class UsuarioResponseDto {

    private Long id;
    private String nome;
    private String sobrenome;
    private String cpf;
    private String rg;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date data_nascimento;
    private String foto;
    private String email;
    private String senha;
    private Boolean flag_ativo;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime data_criacao;
    private String observacao;
    private String guid;
    private Etapa etapa;
    private Empresa empresa;

    public UsuarioResponseDto(Usuario usuario){
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.sobrenome = usuario.getSobrenome();
        this.cpf = usuario.getCpf();
        this.rg = usuario.getRg();
        this.data_nascimento = usuario.getData_nascimento();
        this.foto = usuario.getFoto();
        this.email = usuario.getEmail();
        this.senha = usuario.getSenha();
        this.flag_ativo = usuario.getFlag_ativo();
        this.data_criacao = usuario.getData_criacao();
        this.observacao = usuario.getObservacao();
        this.guid = usuario.getGuid();
        this.etapa = usuario.getEtapa();
        this.empresa = usuario.getEmpresa();
    }
}