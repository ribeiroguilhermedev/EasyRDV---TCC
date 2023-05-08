package br.com.app.repository;


import br.com.app.modelo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	Optional<Usuario> findByEmail(String email);
	List<Usuario> findByNome(String nome);
	List<Usuario> findAllByEmpresa_id(Long empresa_id);
}