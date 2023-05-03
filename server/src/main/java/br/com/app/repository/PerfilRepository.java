package br.com.app.repository;


import br.com.app.modelo.Perfil;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PerfilRepository extends JpaRepository<Perfil, Long> {
	Optional<Perfil> findById(Long id);
}
