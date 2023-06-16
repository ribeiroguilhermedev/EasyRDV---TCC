package br.com.app.repository;


import br.com.app.modelo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	Optional<Usuario> findByEmail(String email);
	Optional<Usuario> findByEmailOrCpfOrRg(String email, String cpf, String rg);
	Optional<Usuario> findByGuid(String guid);
	List<Usuario> findByNome(String nome);

	@Query(value = "SELECT u.* FROM usuario u JOIN usuario_perfis up ON u.id = up.usuario_id WHERE u.empresa_id = ?1 AND up.perfis_id = 2", nativeQuery = true)
	Page<Usuario> findAllByEmpresa_id(Long empresa_id, Pageable pageable);
}