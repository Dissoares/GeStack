package br.com.gestack.domain.businnes;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
@Setter
@Getter
@Entity
@Table(schema = "GESQUAD", name = "SISTEMA")
public class Sistema {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_SISTEMA")
    private Long idSistema;

    @Column(name = "NOME", nullable = false, length = 250, unique = true)
    private String nome;

    @Column(name = "DESCRICAO", length = 1000)
    private String descricao;

    @Column(name = "STACK", length = 250)
    private String stack;

    @Column(name = "AREA_RESPONSAVEL", length = 250)
    private String areaResponsavel;

    @Column(name = "LINK_PROTOTIPO", length = 250)
    private String linkPrototipo;

    @Column(name = "LINK_DOCUMENTACAO", length = 250)
    private String linkDocumentacao;

    @Column(name = "LINK_GIT", length = 250)
    private String linkGit;

    @Column(name = "LINK_PRODUCAO", length = 250)
    private String linkProducao;

    @Column(name = "DATA_CADASTRO")
    private LocalDateTime dataCadastro;

    @OneToMany(mappedBy = "sistema", cascade = CascadeType.ALL, orphanRemoval = false, fetch = FetchType.LAZY)
    private List<Atividade> atividades = new ArrayList<>();

    @Column(nullable = false)
    private Boolean ativo = true;

}
