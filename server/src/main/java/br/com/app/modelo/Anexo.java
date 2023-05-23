package br.com.app.modelo;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Anexo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "url_imagem")
    @NotNull
    private String urlImagem;
    @Column(name = "url_scan")
    private String urlScan;

    @Transient
    private Long comprovante_id;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "comprovante_id")
    private Comprovante comprovante;

    public Anexo() {
    }

    public Anexo(String urlImagem, String urlScan, Comprovante comprovante) {
        this.urlImagem = urlImagem;
        this.urlScan = urlScan;
        this.comprovante = comprovante;
    }

    public Anexo(String urlImagem, String urlScan, Long comprovante_id) {
        this.urlImagem = urlImagem;
        this.urlScan = urlScan;
        this.comprovante_id = comprovante_id;
    }

    @PostLoad
    private void postLoad() {
        if (comprovante_id == null){
            return;
        }
        this.comprovante_id = comprovante.getId();
    }

    public void setComprovanteId(Long comprovante_id) {
        if (comprovante_id != null) {
            this.comprovante = new Comprovante();
            this.comprovante.setId(comprovante_id);
        } else {
            this.comprovante = null;
        }
        this.comprovante_id = comprovante_id;
    }

    public Long getId() {return id;}
    public void setId(Long id) {this.id = id;}
    public String getUrlImagem() {return urlImagem;}
    public void setUrlImagem(String urlImagem) {
        this.urlImagem = urlImagem;
    }
    public String getUrlScan() {
        return urlScan;
    }
    public void setUrlScan(String urlScan) {
        this.urlScan = urlScan;
    }
    @JsonBackReference
    public Comprovante getComprovante() {return comprovante;}
}