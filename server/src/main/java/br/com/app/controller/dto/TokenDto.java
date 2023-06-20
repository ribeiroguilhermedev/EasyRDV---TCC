package br.com.app.controller.dto;

import br.com.app.controller.dto.response.Usuario.UsuarioInfoResponseDto;
import br.com.app.modelo.Usuario;

public class TokenDto {

	private final String token;
	private final String tipo;
	private final UsuarioInfoResponseDto usuario;

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
