package br.com.app.controller.dto.request;

import br.com.app.modelo.Comprovante;
import br.com.app.repository.ComprovanteRepository;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import java.util.Date;

public class ComprovanteRequestDto {

    private Double valor;
    private String categoria;
    private String local;
    private String observacao;
    private Date data;
    private Double valorReembolsado;
    private String observacaoEmpresa;
    private Long viagem_id;

    public void setValor(Double valor) {this.valor = valor;}
    public void setCategoria(String categoria) {this.categoria = categoria;}
    public void setLocal(String local) {this.local = local;}
    public void setObservacao(String observacao) {this.observacao = observacao;}
    public void setData(Date data) {this.data = data;}
    public void setValorReembolsado(Double valorReembolsado) {this.valorReembolsado = valorReembolsado;}
    public void setObservacaoEmpresa(String observacaoEmpresa) {this.observacaoEmpresa = observacaoEmpresa;}
    public void setViagem_id(Long viagem_id) {this.viagem_id = viagem_id;}
    public Long getViagem_id() {return viagem_id;}

        public Comprovante converter(ComprovanteRepository repository){
        return new Comprovante(valor, categoria, local, observacao, data,
                valorReembolsado, observacaoEmpresa, viagem_id);
    }
}
