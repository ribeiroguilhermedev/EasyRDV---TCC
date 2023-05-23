package br.com.app.repository;


import br.com.app.modelo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	Optional<Usuario> findByEmail(String email);
	Optional<Usuario> findByGuid(String guid);
	List<Usuario> findByNome(String nome);
	Page<Usuario> findAllByEmpresa_id(Long empresa_id, Pageable pageable);
}