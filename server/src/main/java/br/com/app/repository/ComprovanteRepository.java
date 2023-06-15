package br.com.app.repository;

import br.com.app.modelo.Comprovante;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComprovanteRepository extends JpaRepository<Comprovante, Long> {
    Page<Comprovante> findAllByViagem_Id(Long viagem_id, Pageable pageable);
    List<Comprovante> findAllByViagem_Id(Long viagem_id);

}
