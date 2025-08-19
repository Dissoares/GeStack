package br.com.gestack.domains.entities;

import br.com.gestack.common.Auditoria;
import br.com.gestack.core.enums.StatusTarefaEnum;
import java.time.LocalDateTime;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(schema = "GESQUAD", name = "TAREFA")
public class Atividade extends Auditoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_TAREFA")
    private Long idTarefa;

    @Column(name = "TITULO", nullable = false, length = 200)
    private String titulo;

    @Column(name = "DESCRICAO", columnDefinition = "TEXT")
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS", nullable = false, length = 20)
    private StatusTarefaEnum status;

    @Column(name = "PRAZO")
    private LocalDate prazo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SQUAD_FK", nullable = false)
    private Squad squad;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RESPONSAVEL_FK", nullable = false)
    private Usuario responsavel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ANALISTA_FK")
    private Usuario analistaResponsavel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "LIDER_FK")
    private Usuario lider;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SPRINT_FK")
    private Sprint sprint;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SISTEMA_FK", nullable = false)
    private Sistema sistema;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SOLICITANTE_FK")
    private Usuario solicitante;

    @Column(name = "TIPO_DEMANDA", length = 50)
    private String demanda;

    @Column(name = "PRIORIDADE", length = 20)
    private String prioridade;

    @Column(name = "PONTOS_ESTIMADOS")
    private Integer pontosEstimados;

    @Column(name = "PONTOS_REAIS")
    private Integer pontosReais;

    @Column(name = "TEMPO_ESTIMADO")
    private Integer tempoEstimado;

    @Column(name = "DATA_CONCLUSAO")
    private LocalDateTime dataConclusao;

    @OneToMany(mappedBy = "atividade", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comentario> comentarios = new ArrayList<>();

    @OneToMany(mappedBy = "atividade", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Anexo> anexos = new ArrayList<>();

    @OneToMany(mappedBy = "atividade", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<RegistroAtividade> registrosAtividades = new ArrayList<>();
}
