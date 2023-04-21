package br.com.app.controller.dto.request;

import br.com.app.modelo.Usuario;
import br.com.app.repository.UsuarioRepository;

public class AtualizacaoUsuarioRequestDto {

    private String nome;
    private String cpf;

    public void setNome(String nome) {this.nome = nome;}
    public void setCpf(String cpf) {this.cpf = cpf;}

    public Usuario atualizar(Long id, UsuarioRepository repository){

        Usuario usuario = repository.getOne(id);

        usuario.setNome(this.nome);
        usuario.setCpf(this.cpf);
        repository.save(usuario);
        return usuario;
    }
}