package br.com.app.controller.dto;

import br.com.app.controller.dto.response.UsuarioInfoResponseDto;
import br.com.app.controller.dto.response.UsuarioResponseDto;
import br.com.app.modelo.Usuario;

public class TokenDto {

	private String token;
	private String tipo;
	private UsuarioInfoResponseDto usuario;

	public TokenDto(String token, String tipo, Usuario usuario) {
		this.token = token;
		this.tipo = tipo;
		this.usuario = new UsuarioInfoResponseDto(usuario);
	}

	public String getToken() {
		return token;
	}

	public String getTipo() {
		return tipo;
	}

	public UsuarioInfoResponseDto getUsuario() {
		return usuario;
	}
}
