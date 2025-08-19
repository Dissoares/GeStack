package br.com.gestack.domains.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import br.com.gestack.api.dto.ListagemUsuariosDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import br.com.gestack.domains.entities.Usuario;
import java.util.Optional;
import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);

    @Query(value = """
        SELECT 
            u.id_usuario AS idUsuario,
            u.nome AS nomeUsuario,
            u.email,
            u.nivel_acesso AS nivelAcesso,
            u.data_criacao AS dataCadastro,
            u.ativo,
            s.id_squad AS idSquad,
            s.nome AS nomeSquad,
            l.id_usuario AS idLider,
            l.nome AS nomeLider,
            l.nivel_acesso AS perfilLider
        FROM usuario u
        LEFT JOIN squad s ON u.squad_id = s.id_squad
        LEFT JOIN usuario l ON s.lider_id = l.id_usuario
        WHERE (:nome IS NULL OR LOWER(u.nome) LIKE LOWER(CONCAT('%', :nome, '%')))
          AND (:email IS NULL OR LOWER(u.email) LIKE LOWER(CONCAT('%', :email, '%')))
          AND (:nivelAcesso IS NULL OR u.nivel_acesso = :nivelAcesso)
          AND (:dataCriacao IS NULL OR u.data_criacao >= :dataCriacao)
          AND (:ativo IS NULL OR u.ativo = :ativo)
        """, nativeQuery = true)
    List<ListagemUsuariosDTO> buscarPor(@Param("usuario") Usuario usuario);
}