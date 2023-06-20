package br.com.app.controller.dto.request.Viagem;

import br.com.app.modelo.Viagem;
import br.com.app.repository.ViagemRepository;

import java.util.Date;

public class ViagemRequestDto {

    private String descricao;
    private Date dataInicio;
    private Date dataFim;
    private Double valorTotal;
    private Double valorTotalReembolsado;
    private String cidade;
    private String uf;
    private Long usuario_id;

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setDataInicio(Date dataInicio) {
        this.dataInicio = dataInicio;
    }

    public void setDataFim(Date dataFim) {
        this.dataFim = dataFim;
    }

    public void setValorTotal(Double valorTotal) {
        this.valorTotal = valorTotal;
    }

    public void setValorTotalReembolsado(Double valorTotalReembolsado) {
        this.valorTotalReembolsado = valorTotalReembolsado;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public void setUsuario_id(Long usuario_id) {
        this.usuario_id = usuario_id;
    }

    public Long getUsuario_id() {
        return usuario_id;
    }

    public Date getDataInicio() {
        return dataInicio;
    }

    public Viagem converter() {
        return new Viagem(descricao, dataInicio, dataFim, valorTotal, valorTotalReembolsado,
                cidade, uf, usuario_id);
    }
}
