package br.com.gestack.domain.businnes;

import br.com.gestack.domain.enums.StatusSprintEnum;
import com.fasterxml.jackson.annotation.JsonFormat;
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
@Table(schema = "GESQUAD", name = "SPRINT")
public class Sprint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_SPRINT")
    private Long idSprint;

    @Column(name = "NOME", nullable = false, length = 150)
    private String nome;

    @Column(name = "DATA_INICIO", nullable = false)
    private LocalDate dataInicio;

    @Column(name = "DATA_FIM", nullable = false)
    private LocalDate dataFim;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS", nullable = false, length = 50)
    private StatusSprintEnum status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SQUAD_FK", nullable = false)
    private Squad squad;

    @OneToMany(mappedBy = "sprint", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<Atividade> tarefas = new ArrayList<>();

    @Column(name = "PONTOS_TOTAL_ESTIMADOS")
    private Integer pontosTotalEstimados;

    @Column(name = "PONTOS_TOTAL_REAIS")
    private Integer pontosTotalReais;

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