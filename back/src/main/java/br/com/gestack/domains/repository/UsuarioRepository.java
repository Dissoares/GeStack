package br.com.gestack.domains.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import br.com.gestack.domains.entities.Usuario;
import br.com.gestack.api.dto.UsuarioDTO;
import java.util.Optional;
import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);

    List<UsuarioDTO> findByNomeContainingIgnoreCase(String nome);

    @Query("""
        SELECT u.id AS id,
               u.nome AS nome,
               u.email AS email,
               u.perfil AS perfil,
               u.dataCriacao AS dataCriacao,
               u.ativo AS ativo
        FROM Usuario u
        WHERE (:nome IS NULL OR u.nome LIKE %:nome%)
          AND (:email IS NULL OR u.email LIKE %:email%)
          AND (:perfil IS NULL OR u.perfil = :perfil)
    """)
    List<UsuarioDTO> buscarUsuarios(
            @Param("nome") String nome,
            @Param("email") String email,
            @Param("perfil") Integer perfil,
             @Param("ativo") Boolean ativo
    );
}