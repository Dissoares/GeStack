package br.com.gestack.domain.businnes;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import jakarta.persistence.*;
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

    @OneToMany(mappedBy = "sistema", cascade = CascadeType.ALL, orphanRemoval = false, fetch = FetchType.LAZY)
    private List<Atividade> atividades = new ArrayList<>();

    @ManyToMany(mappedBy = "sistema", fetch = FetchType.LAZY)
    private List<Skill> skills = new ArrayList<>();

    @Column(name = "DATA_CADASTRO", nullable = false)
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime dataCadastro;

    @Column(name = "DATA_MODIFICACAO")
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime dataModificacao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MODIFICADO_POR")
    private Usuario modificadoPor;

    @Column(name = "ATIVO", nullable = false)
    private Boolean ativo = true;

    @PrePersist
    public void prePersist() {
        this.dataCadastro = LocalDateTime.now();
        this.ativo = true;
    }

    @PreUpdate
    public void preUpdate() {
        this.dataModificacao = LocalDateTime.now();
    }
}
