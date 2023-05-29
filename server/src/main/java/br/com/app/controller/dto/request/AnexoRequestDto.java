package br.com.app.controller.dto.request;

import br.com.app.modelo.Anexo;
import br.com.app.modelo.Usuario;
import br.com.app.repository.AnexoRepository;
import br.com.app.repository.UsuarioRepository;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;

public class AnexoRequestDto {


    private String urlImagem;
    private String urlScan;
    private Long comprovante_id;

    public void setUrlImagem(String urlImagem) {this.urlImagem = urlImagem;}
    public void setUrlScan(String urlScan) {this.urlScan = urlScan;}
    public Long getComprovante_id() {return comprovante_id;}
    public void setComprovante_id(Long comprovante_id) {this.comprovante_id = comprovante_id;}

    public Anexo converter(AnexoRepository repository){
        return new Anexo(urlImagem, urlScan, comprovante_id);
    }
}
