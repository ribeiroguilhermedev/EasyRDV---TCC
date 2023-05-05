package br.com.app.controller.dto.request;

import br.com.app.modelo.Usuario;
import br.com.app.repository.UsuarioRepository;

public class AtualizacaoUsuarioRequestDto {

    private String foto;
    private String email;
    private String senha;

    public void setFoto(String foto) {this.foto = foto;}
    public void setEmail(String email) {this.email = email;}
    public void setSenha(String senha) {this.email = senha;}

    public Usuario atualizar(Long id, UsuarioRepository repository){

        Usuario usuario = repository.getOne(id);

        usuario.setFoto(this.foto);
        usuario.setEmail(this.email);
        usuario.setSenha(this.senha);
        repository.save(usuario);
        return usuario;
    }
}