package br.com.gestack.domain.businnes;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(schema = "GESQUAD", name = "SKILL")
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_SKILL")
    private Long idSkill;

    @Column(name = "DESCRICAO", nullable = false, unique = true)
    private String descricao;

    @Column(name = "CATEGORIA")
    private String categoria;

    @Column(name = "TAG")
    private String tag;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SISTEMA_FK", nullable = false)
    private Sistema sistema;

    @Column(name = "DATA_CADASTRO")
    private LocalDateTime dataCadastro;

    @Column(name = "ATIVO", nullable = false)
    private Boolean ativo = true;
}
