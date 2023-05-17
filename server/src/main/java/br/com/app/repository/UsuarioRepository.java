package br.com.app.repository;


import br.com.app.modelo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	Optional<Usuario> findByEmail(String email);
	List<Usuario> findByNome(String nome);
	Page<Usuario> findAllByEmpresa_idAndFlagAtivo(Long empresa_id, Boolean flag_ativo, Pageable pageable);
}