package br.com.gestack.domain.businnes;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(schema = "GESQUAD", name = "COMENTARIO_TAREFA")
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_COMENTARIO")
    private Long idComentario;

    @Column(name = "COMENTARIO", length = 1000)
    private String comentario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ATIVIDADE_FK", nullable = false)
    private Atividade atividade;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USUARIO_FK", nullable = false)
    private Usuario autor;

    @Column(name = "DATA_COMENTARIO", nullable = false)
    private LocalDateTime dataComentario = LocalDateTime.now();

    @Column(name = "ATIVO", nullable = false)
    private Boolean ativo = true;

}
