package br.com.app.repository;

import br.com.app.modelo.Viagem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ViagemRepository extends JpaRepository<Viagem, Long> {
    Page<Viagem> findAllByUsuario_Id(Long usuario_id, Pageable pageable);
}