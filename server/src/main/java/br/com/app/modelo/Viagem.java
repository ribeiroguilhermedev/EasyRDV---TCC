package br.com.app.modelo;

import br.com.app.modelo.Enumeration.ViagemStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Viagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String descricao;

    @Column(name = "data_inicio")
    @NotNull
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date dataInicio;
    @Column(name = "data_fim")
    @NotNull
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date dataFim;
    @Column(name = "valor_total")
    private Double valorTotal;
    @Column(name = "valor_total_reembolsado")
    private Double valorTotalReembolsado;
    @NotNull
    private String cidade;
    @NotNull
    private String uf;
    @NotNull
    private ViagemStatus status;

    @Transient
    private Long usuario_id;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "usuario_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Usuario usuario;

    @OneToMany()
    @JoinColumn(name = "viagem_id")
    @NotNull
    private List<Comprovante> comprovantes = new ArrayList<>();

    public Viagem() {
    }

    public Viagem(String descricao, Date dataInicio, Date dataFim, Double valorTotal,
                  Double valorTotalReembolsado, String cidade, String uf, Usuario usuario) {
        this.descricao = descricao;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.valorTotal = valorTotal;
        this.valorTotalReembolsado = valorTotalReembolsado;
        this.cidade = cidade;
        this.uf = uf;
        this.usuario = usuario;
    }

    public Viagem(String descricao, Date dataInicio, Date dataFim, Double valorTotal,
                  Double valorTotalReembolsado, String cidade, String uf, Long usuario_id) {
        this.descricao = descricao;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.valorTotal = valorTotal;
        this.valorTotalReembolsado = valorTotalReembolsado;
        this.cidade = cidade;
        this.uf = uf;
        this.usuario_id = usuario_id;
    }

    @PostLoad
    private void postLoad() {
        if (usuario == null){
            return;
        }
        this.usuario_id = usuario.getId();
    }

    public void setUsuarioId(Long usuario_id) {
        if (usuario_id != null) {
            this.usuario = new Usuario();
            this.usuario.setId(usuario_id);
        } else {
            this.usuario = null;
        }
        this.usuario_id = usuario_id;
    }

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}
    public String getDescricao() {return descricao;}
    public void setDescricao(String descricao) {this.descricao = descricao;}
    public Date getDataInicio() {return dataInicio;}
    public void setDataInicio(Date dataInicio) {this.dataInicio = dataInicio;}
    public Date getDataFim() {return dataFim;}
    public void setDataFim(Date dataFim) {this.dataFim = dataFim;}
    public Double getValorTotal() {return valorTotal;}
    public void setValorTotal(Double valorTotal) {this.valorTotal = valorTotal;}
    public String getCidade() {return cidade;}
    public void setCidade(String cidade) {this.cidade = cidade;}
    public String getUf() {return uf;}
    public void setUf(String uf) {this.uf = uf;}
    public ViagemStatus getStatus() {return status;}
    public void setStatus(ViagemStatus status) {this.status = status;}
    public Double getValorTotalReembolsado() {return valorTotalReembolsado;}
    public void setValorTotalReembolsado(Double valorTotalReembolsado) {this.valorTotalReembolsado = valorTotalReembolsado;}
    public Long getUsuario_id() {return usuario_id;}
    public void setUsuario_id(Long usuario_id) {this.usuario_id = usuario_id;}
    public void setUsuario(Usuario usuario) {this.usuario = usuario;}
    public Usuario getUsuario() {return usuario;}
    @JsonManagedReference
    public List<Comprovante> getComprovantes() {return comprovantes;}
    public void setComprovantes(List<Comprovante> comprovantes) {this.comprovantes = comprovantes;}
}