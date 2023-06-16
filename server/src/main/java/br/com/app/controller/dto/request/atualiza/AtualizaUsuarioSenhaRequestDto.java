package br.com.app.controller.dto.request.atualiza;

import br.com.app.modelo.Usuario;
import br.com.app.repository.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.UUID;

public class AtualizaUsuarioSenhaRequestDto {

    private String senha;

    public void setSenha(String senha) {this.senha = senha;}

    public Usuario update(Usuario usuario, UsuarioRepository repository){
        usuario.setSenha(new BCryptPasswordEncoder().encode(this.senha));
        usuario.setGuid(String.valueOf(UUID.randomUUID()));
        repository.save(usuario);
        return usuario;
    }
}