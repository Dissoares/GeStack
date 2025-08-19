package br.com.gestack.domains.entities;

import br.com.gestack.common.Auditoria;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(schema = "GESQUAD", name = "SKILL")
public class Skill extends Auditoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_SKILL")
    private Long idSkill;

    @Column(name = "NOME", nullable = false, unique = true)
    private String nome;

    @Column(name = "CATEGORIA")
    private Integer categoria;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SISTEMA_FK")
    private Sistema sistema;
}
