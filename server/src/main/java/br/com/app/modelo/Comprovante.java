package br.com.app.modelo;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
public class Comprovante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private Double valor = 0.0;
    private String categoria;
    private String local;
    private String observacao;
    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date data = new Date();
    @Column(name = "observacao_empresa")
    private String observacaoEmpresa;
    @Transient
    private Long viagem_id;
    @ManyToOne
    @JoinColumn(name = "viagem_id")
    private Viagem viagem;
    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "comprovante_id")
    @NotNull
    private List<Anexo> anexos = new ArrayList<>();

    public Comprovante(Double valor, String categoria, String local,
                       String observacao, Date data, String observacaoEmpresa, Long viagem_id) {
        this.valor = valor;
        this.categoria = categoria;
        this.local = local;
        this.observacao = observacao;
        this.data = data;
        this.observacaoEmpresa = observacaoEmpresa;
        this.viagem_id = viagem_id;
    }

    @PostLoad
    private void postLoad() {
        if (viagem_id == null) {
            return;
        }
        this.viagem_id = viagem.getId();
    }

    public void setViagemId(Long viagem_id) {
        if (viagem_id != null) {
            this.viagem = new Viagem();
            this.viagem.setId(viagem_id);
        } else {
            this.viagem = null;
        }
        this.viagem_id = viagem_id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public String getLocal() {
        return local;
    }

    public void setLocal(String local) {
        this.local = local;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getObservacaoEmpresa() {
        return observacaoEmpresa;
    }

    public void setObservacaoEmpresa(String observacaoEmpresa) {
        this.observacaoEmpresa = observacaoEmpresa;
    }

    @JsonBackReference
    public Viagem getViagem() {
        return viagem;
    }

    public void setViagem(Viagem viagem) {
        this.viagem = viagem;
    }

    @JsonManagedReference
    public List<Anexo> getAnexos() {
        return anexos;
    }

    public void setAnexos(List<Anexo> anexos) {
        this.anexos = anexos;
    }
}