package br.com.app.modelo;

import java.time.LocalDateTime;
import java.util.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Entity
public class Usuario implements UserDetails {

	private static final long serialVersionUID = 1L;

	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	private String sobrenome;
	private String cpf;
	private String rg;

	@JsonFormat(pattern="yyyy-MM-dd")
	private Date data_nascimento;

	private String foto;
	private String email;
	private String senha;
	private Boolean flag_ativo;
	private LocalDateTime data_criacao;
	private String observacao;

	private String guid;

	@Enumerated(EnumType.STRING)
	private Etapa etapa;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "empresa_id", nullable = false)
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Empresa empresa;

	@Transient
	private Long empresa_id;

	@ManyToMany(fetch = FetchType.EAGER)
	private List<Perfil> perfis = new ArrayList<>();

	public Usuario() {
	}

	public Usuario(String nome, String sobrenome, String cpf, String rg, Date data_nascimento,
				   String foto, String email, String observacao, Long empresa_id) {
		this.nome = nome;
		this.sobrenome = sobrenome;
		this.cpf = cpf;
		this.rg = rg;
		this.data_nascimento = data_nascimento;
		this.foto = foto;
		this.email = email;
		this.observacao = observacao;
		this.empresa_id = empresa_id;
	}

	public Usuario(String nome, String sobrenome, String cpf, String rg, Date data_nascimento,
				   String foto, String email,String observacao, Empresa empresa) {
		this.nome = nome;
		this.sobrenome = sobrenome;
		this.cpf = cpf;
		this.rg = rg;
		this.data_nascimento = data_nascimento;
		this.foto = foto;
		this.email = email;
		this.observacao = observacao;
		this.empresa = empresa;
	}

	@PostLoad
	private void postLoad() {
		if (empresa == null){
			return;
		}
		this.empresa_id = empresa.getId();
	}

	public void setEmpresaId(Long empresa_id) {
		if (empresa_id != null) {
			this.empresa = new Empresa();
			this.empresa.setId(empresa_id);
		} else {
			this.empresa = null;
		}
		this.empresa_id = empresa_id;
	}

	public Long getId() {return id;}
	public String getNome() {return nome;}
	public String getSobrenome() {return sobrenome;}
	public String getCpf() {return cpf;}
	public void setCpf(String cpf) {this.cpf = cpf;}
	public String getRg() {return rg;}
	public Date getData_nascimento() {return data_nascimento;}
	public String getFoto() {return foto;}
	public void setFoto(String foto) {this.foto = foto;}
	public String getEmail() {return email;}
	public void setEmail(String email) {this.email = email;}
	public String getSenha() {return senha;}
	public void setSenha(String senha) {this.senha = senha;}
	public Boolean getFlag_ativo() {return flag_ativo;}
	public LocalDateTime getData_criacao() {return data_criacao;}
	public void setFlag_ativo(Boolean flag_ativo) {this.flag_ativo = flag_ativo;}
	public void setData_criacao(LocalDateTime data_criacao) {this.data_criacao = data_criacao;}
	public void setGuid(String guid) {this.guid = guid;}
	public void setEtapa(Etapa etapa) {this.etapa = etapa;}
	public String getObservacao() {return observacao;}
	public String getGuid() {return guid;}
	public Etapa getEtapa() {return etapa;}
	public Empresa getEmpresa() {return empresa;}
	public void setNome(String nome) {this.nome = nome;}
	public void setSobrenome(String sobrenome) {this.sobrenome = sobrenome;}
	public void setRg(String rg) {this.rg = rg;}
	public void setData_nascimento(Date data_nascimento) {this.data_nascimento = data_nascimento;}
	public void setObservacao(String observacao) {this.observacao = observacao;}
	public void setEmpresa(Empresa empresa) {this.empresa = empresa;}
	public void setEmpresa_id(Long empresa_id) {this.empresa_id = empresa_id;}

	public void addRole(Perfil perfil) {this.perfis.add(perfil);}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.perfis;
	}

	@Override
	public String getPassword() {
		return this.senha;
	}

	@Override
	public String getUsername() {
		return this.email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	private static final String CHARACTERS =
			"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	private static final int PASSWORD_LENGTH = 6;

	public static String generate() {
		StringBuilder sb = new StringBuilder();
		Random random = new Random();
		for (int i = 0; i < PASSWORD_LENGTH; i++) {
			int index = random.nextInt(CHARACTERS.length());
			sb.append(CHARACTERS.charAt(index));
		}
		return sb.toString();
	}

}

