package br.com.app.repository;

import br.com.app.modelo.Anexo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnexoRepository extends JpaRepository<Anexo, Long> {
    Page<Anexo> findAllByComprovante_Id(Long comprovante_id, Pageable pageable);
}