package br.com.gestack.domains.entities;

import br.com.gestack.common.Auditoria;
import com.fasterxml.jackson.annotation.JsonBackReference;
import br.com.gestack.utils.NivelAcessoConverter;
import br.com.gestack.core.enums.NivelAcessoEnum;
import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Entity
@Table(schema = "GESQUAD", name = "USUARIO")
public class Usuario extends Auditoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_USUARIO")
    private Long idUsuario;

    @Column(name = "NOME", nullable = false, length = 250)
    private String nome;

    @Column(name = "EMAIL", unique = true, nullable = false, length = 250)
    private String email;

    @Column(name = "SENHA", nullable = false, length = 250)
    private String senha;

    @Convert(converter = NivelAcessoConverter.class)
    @Column(name = "NIVEL_ACESSO", nullable = false)
    private NivelAcessoEnum nivelAcesso;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SQUAD_FK")
    @JsonBackReference
    private Squad squad;

    @Column(name = "EH_LIDER", nullable = false)
    private Boolean ehLider;
}
