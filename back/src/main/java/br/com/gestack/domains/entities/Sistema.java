package br.com.gestack.domains.entities;

import br.com.gestack.common.Auditoria;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(schema = "GESQUAD", name = "SISTEMA")
public class Sistema extends Auditoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;

    @Column(name = "NOME")
    private String nome;

    @Column(name = "DESCRICAO")
    private String descricao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RESPONSAVEL_FK")
    private Usuario responsavel;

    @Column(name = "LINK_PROTOTIPO")
    private String linkPrototipo;

    @Column(name = "LINK_DOCUMENTACAO")
    private String linkDocumentacao;

    @Column(name = "LINK_GIT")
    private String linkGit;

    @Column(name = "LINK_PRODUCAO")
    private String linkProducao;

    @ManyToMany(mappedBy = "sistema", fetch = FetchType.LAZY)
    private List<Skill> skills = new ArrayList<>();
}
