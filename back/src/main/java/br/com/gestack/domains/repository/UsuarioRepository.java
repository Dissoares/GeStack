package br.com.gestack.domains.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import br.com.gestack.api.dto.ListagemUsuariosDTO;
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
                    u.perfil AS perfil,
                    u.data_criacao AS dataCriacao,
                    u.ativo,
                    s.id_squad AS idSquad,
                    s.squad_nome  AS nomeSquad,
                    l.id_usuario AS idLider,
                    l.nome AS nomeLider,
                    l.perfil AS perfilLider
                FROM GESQUAD.usuario u
                LEFT JOIN GESQUAD.squad s ON u.squad_fk = s.id_squad
                LEFT JOIN GESQUAD.usuario l ON s.lider_fk  = l.id_usuario
                WHERE 
                (:nome IS NULL OR LOWER(u.nome) LIKE LOWER(CONCAT('%', :nome, '%')))
                  AND (:email IS NULL OR LOWER(u.email) LIKE LOWER(CONCAT('%', :email, '%')))
                  AND (:perfil IS NULL OR u.perfil = :perfil)
                  AND (:ativo IS NULL OR u.ativo = :ativo
                ) 
            """, nativeQuery = true)
    List<ListagemUsuariosDTO> buscarPor(@Param("nome") String nome,
                                        @Param("email") String email,
                                        @Param("perfil") Integer perfil,
                                        @Param("ativo") Boolean ativo);
}