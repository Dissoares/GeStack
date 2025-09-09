package br.com.gestack.domains.entities;

import br.com.gestack.common.Auditoria;
import br.com.gestack.core.enums.StatusSprintEnum;
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
public class Sprint extends Auditoria {
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


    @OneToMany(mappedBy = "sprint", cascade = CascadeType.ALL, orphanRemoval = false)
    private List<Atividade> tarefas = new ArrayList<>();

    @Column(name = "PONTOS_TOTAL_ESTIMADOS")
    private Integer pontosTotalEstimados;

    @Column(name = "PONTOS_TOTAL_REAIS")
    private Integer pontosTotalReais;
}