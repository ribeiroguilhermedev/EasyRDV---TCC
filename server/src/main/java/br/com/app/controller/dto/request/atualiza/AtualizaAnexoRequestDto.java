package br.com.app.controller.dto.request.atualiza;

import br.com.app.modelo.Anexo;
import br.com.app.modelo.Usuario;
import br.com.app.repository.AnexoRepository;
import br.com.app.repository.UsuarioRepository;

public class AtualizaAnexoRequestDto {

    private String urlImagem;
    private String urlScan;

    public void setUrlImagem(String urlImagem) {this.urlImagem = urlImagem;}
    public void setUrlScan(String urlScan) {this.urlScan = urlScan;}

    public Anexo atualizar(Long id, AnexoRepository repository){

        Anexo anexo = repository.getOne(id);

        anexo.setUrlImagem(this.urlImagem);
        anexo.setUrlScan(this.urlScan);
        repository.save(anexo);
        return anexo;
    }
}
