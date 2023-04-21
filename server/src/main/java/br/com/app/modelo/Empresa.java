package br.com.app.modelo;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
public class Empresa {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	private String cnpj;
	private String razao_social;
	private Boolean flag_ativo;
	private LocalDateTime data_criacao;
	private String logo;
	private String guid;

	public Empresa() {
	}

	public Empresa(String nome, String cnpj, String razao_social, Boolean flag_ativo,
				   LocalDateTime data_criacao, String logo, String guid) {
		this.nome = nome;
		this.cnpj = cnpj;
		this.razao_social = razao_social;
		this.flag_ativo = true;
		this.data_criacao = LocalDateTime.now();
		this.logo = logo;
		this.guid = guid;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCnpj() {
		return cnpj;
	}

	public void setCnpj(String cnpj) {
		this.cnpj = cnpj;
	}

	public String getRazao_social() {
		return razao_social;
	}

	public void setRazao_social(String razao_social) {
		this.razao_social = razao_social;
	}

	public Boolean getFlag_ativo() {
		return flag_ativo;
	}

	public void setFlag_ativo(Boolean flag_ativo) {
		this.flag_ativo = flag_ativo;
	}

	public LocalDateTime getData_criacao() {
		return data_criacao;
	}

	public void setData_criacao(LocalDateTime data_criacao) {
		this.data_criacao = data_criacao;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public String getGuid() {
		return guid;
	}

	public void setGuid(String guid) {
		this.guid = guid;
	}
}