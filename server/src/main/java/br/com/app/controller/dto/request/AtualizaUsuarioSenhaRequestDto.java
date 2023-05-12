package br.com.app.controller.dto.request;

import br.com.app.modelo.Usuario;
import br.com.app.repository.UsuarioRepository;

public class AtualizaUsuarioSenhaRequestDto {

    private String senha;

    public void setSenha(String senha) {this.senha = senha;}

    public Usuario atualizar(Long id, UsuarioRepository repository){

        Usuario usuario = repository.getOne(id);

        usuario.setSenha(this.senha);
        repository.save(usuario);
        return usuario;
    }
}