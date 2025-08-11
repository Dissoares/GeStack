package br.com.gestack.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import br.com.gestack.domain.businnes.Usuario;
import java.util.Optional;
import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);

    @Query("""
              SELECT u FROM Usuario u 
              WHERE (:#{#usuario.nome} IS NULL OR LOWER(u.nome) LIKE LOWER(CONCAT('%', :#{#usuario.nome}, '%')))
                AND (:#{#usuario.email} IS NULL OR LOWER(u.email) LIKE LOWER(CONCAT('%', :#{#usuario.email}, '%')))
                AND (:#{#usuario.nivelAcesso} IS NULL OR u.nivelAcesso = :#{#usuario.nivelAcesso})
                AND (:#{#usuario.dataCadastro} IS NULL OR u.dataCadastro >= :#{#usuario.dataCadastro})
                AND (:#{#usuario.status} IS NULL OR u.status = :#{#usuario.status})
            """)
    List<Usuario> buscarPor(@Param("usuario") Usuario usuario);
}
