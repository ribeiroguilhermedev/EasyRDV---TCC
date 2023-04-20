package br.com.app.repository;

import br.com.app.modelo.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

    List<Empresa> findByNome(String nome);
    List<Empresa> findByCnpj(String cnpj);
}
