package br.com.app.controller.dto.request;

import br.com.app.modelo.Usuario;
import br.com.app.repository.UsuarioRepository;

public class AtualizaFlagUsuarioRequestDto {

    private Boolean flag_ativo;

    public void setFlag_ativo(Boolean flag_ativo) {this.flag_ativo = flag_ativo;}

    public Usuario atualizar(Long id, UsuarioRepository repository){

        Usuario usuario = repository.getOne(id);

        usuario.setFlagAtivo(this.flag_ativo);

        repository.save(usuario);
        return usuario;
    }
}
