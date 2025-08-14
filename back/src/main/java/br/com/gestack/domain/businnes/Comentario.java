package br.com.gestack.domain.businnes;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(schema = "PUBLIC", name = "COMENTARIO_TAREFA")
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_COMENTARIO")
    private Long idComentario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TAREFA_FK", nullable = false)
    private Tarefa tarefa;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USUARIO_FK", nullable = false)
    private Usuario autor;

    @Column(name = "COMENTARIO", nullable = false, columnDefinition = "TEXT")
    private String comentario;

    @Column(name = "DATA_COMENTARIO", nullable = false)
    private LocalDateTime dataComentario = LocalDateTime.now();
}
