package br.com.gestack.domains.entities;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Data;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(schema = "GESQUAD", name = "REGISTRO_ESCALA")
public class RegistroEscala {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_ESCALA")
    private Long idEscala;

    @Column(name = "TIPO_ESCALA", nullable = false, length = 20)
    private Integer tipoEscala;

    @Column(name = "DATA_INICIO", nullable = false)
    private LocalDate dataInicio;

    @Column(name = "DATA_FIM")
    private LocalDate dataFim;

    @Column(name = "DESCRICAO_MOTIVO")
    private String descricaoMotivo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USUARIO_FK", nullable = false)
    private Usuario usuario;

    @Column(name = "ATIVO", nullable = false)
    private Boolean ativo = true;
}
