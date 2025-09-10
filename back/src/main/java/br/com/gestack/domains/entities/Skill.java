package br.com.gestack.domains.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @Column(name = "ID")
    private Long id;

    @Column(name = "NOME", nullable = false, unique = true)
    private String nome;

    @Column(name = "CATEGORIA")
    private Integer categoria;

    @Column(name = "ATIVO")
    private Boolean ativo = true;
}
