package br.com.gestack.domain.businnes;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(schema = "GESQUAD", name = "COMENTARIO_TAREFA")
public class Comentario extends Auditoria {
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
}
