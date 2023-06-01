package br.com.app.modelo;

import javax.persistence.*;
import java.time.LocalDateTime;

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

	@ManyToOne
	@JoinColumn(name = "matriz_id")
	private Empresa matriz;

	@Transient
	private Long matriz_id;

	@PostLoad
	private void postLoad() {
		if (matriz == null){
			return;
		}
		this.matriz_id = matriz.getId();
	}

	public void setMatrizId(Long matriz_id) {
		if (matriz_id != null) {
			this.matriz = new Empresa();
			this.matriz.setId(matriz_id);
		} else {
			this.matriz = null;
		}
		this.matriz_id = matriz_id;
	}

	public Empresa() {
	}

	public Empresa(String nome, String cnpj, String razao_social, Boolean flag_ativo,
				   LocalDateTime data_criacao, String logo, String guid, Empresa matriz) {
		this.nome = nome;
		this.cnpj = cnpj;
		this.razao_social = razao_social;
		this.flag_ativo = flag_ativo;
		this.data_criacao = data_criacao;
		this.logo = logo;
		this.guid = guid;
		this.matriz = matriz;
	}

	public Empresa(String nome, String cnpj, String razao_social, Boolean flag_ativo,
				   LocalDateTime data_criacao, String logo, String guid, Long matriz_id) {
		this.nome = nome;
		this.cnpj = cnpj;
		this.razao_social = razao_social;
		this.flag_ativo = flag_ativo;
		this.data_criacao = data_criacao;
		this.logo = logo;
		this.guid = guid;
		this.matriz_id = matriz_id;
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
	public Empresa getMatriz() {return matriz;}
	public void setMatriz(Empresa matriz) {this.matriz = matriz;}
	public Long getMatriz_id() {return matriz_id;}
	public void setMatriz_id(Long matriz_id) {this.matriz_id = matriz_id;}
}