package br.com.app.controller.dto.request.Usuario;

import br.com.app.modelo.Usuario;
import br.com.app.repository.UsuarioRepository;

public class AtualizaFlagAtivoUsuarioRequestDto {

    private Boolean flag_ativo;

    public void setFlag_ativo(Boolean flag_ativo) {this.flag_ativo = flag_ativo;}

    public Usuario update(Usuario usuario, UsuarioRepository repository){
        usuario.setFlagAtivo(this.flag_ativo);
        repository.save(usuario);
        return usuario;
    }
}
