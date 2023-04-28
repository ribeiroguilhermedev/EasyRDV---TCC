package br.com.app.controller.dto.response;

import br.com.app.modelo.Perfil;
import br.com.app.modelo.Usuario;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class UsuarioInfoResponseDto {

    private Long id;
    private String nome;
    private String email;
    private List<Perfil> perfis = new ArrayList<>();

    public UsuarioInfoResponseDto(Usuario usuario){
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.email = usuario.getEmail();
        this.perfis = (List<Perfil>) usuario.getAuthorities();
    }

}