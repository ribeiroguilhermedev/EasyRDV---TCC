package br.com.app.repository;

import br.com.app.modelo.Viagem;
import feign.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ViagemRepository extends JpaRepository<Viagem, Long> {
    @Query("SELECT v FROM Viagem v WHERE v.usuario.id = :usuario_id ORDER BY v.status")
    List<Viagem> findAllByUsuario_IdOrderByStatus(@Param("usuario_id") Long usuario_id);
}