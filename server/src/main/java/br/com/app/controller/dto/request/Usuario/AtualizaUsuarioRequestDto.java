package br.com.app.controller.dto.request.Usuario;

import br.com.app.modelo.Usuario;
import br.com.app.repository.UsuarioRepository;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class AtualizaUsuarioRequestDto {

    private String nome;
    private String sobrenome;
    private String cpf;
    private String rg;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date data_nascimento;
    private String foto;
    private String email;
    private String observacao;

    public void setNome(String nome) {this.nome = nome;}
    public void setSobrenome(String sobrenome) {this.sobrenome = sobrenome;}
    public void setCpf(String cpf) {this.cpf = cpf;}
    public void setRg(String rg) {this.rg = rg;}
    public void setData_nascimento(Date data_nascimento) {this.data_nascimento = data_nascimento;}
    public void setFoto(String foto) {this.foto = foto;}
    public void setEmail(String email) {this.email = email;}
    public void setObservacao(String observacao) {this.observacao = observacao;}

    public Usuario atualizar(Usuario usuario, UsuarioRepository repository){
        usuario.setNome(this.nome);
        usuario.setSobrenome(this.sobrenome);
        usuario.setCpf(this.cpf);
        usuario.setRg(this.rg);
        usuario.setData_nascimento(this.data_nascimento);
        usuario.setFoto(this.foto);
        usuario.setEmail(this.email);
        usuario.setObservacao(this.observacao);

        repository.save(usuario);
        return usuario;
    }
}
