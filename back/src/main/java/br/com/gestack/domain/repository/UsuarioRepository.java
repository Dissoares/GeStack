package br.com.gestack.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import br.com.gestack.domain.businnes.Usuario;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
}
