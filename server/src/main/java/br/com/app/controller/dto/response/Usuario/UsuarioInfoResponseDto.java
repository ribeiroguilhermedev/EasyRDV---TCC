package br.com.app.controller.dto.response.Usuario;

import br.com.app.modelo.Perfil;
import br.com.app.modelo.Usuario;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class UsuarioInfoResponseDto {

    private Long id;
    private Long empresa_id;
    private String nome;
    private String sobrenome;
    private String email;
    private List<Perfil> perfis = new ArrayList<>();

    public UsuarioInfoResponseDto(Usuario usuario){
        this.id = usuario.getId();
        this.nome = usuario.getNome();
        this.sobrenome = usuario.getSobrenome();
        this.email = usuario.getEmail();
        this.empresa_id = usuario.getEmpresa_id();
        this.perfis = (List<Perfil>) usuario.getAuthorities();
    }

}