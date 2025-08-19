package br.com.gestack.domain.businnes;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(schema = "GESQUAD", name = "REGISTRO_ATIVIDADE")
public class RegistroAtividade extends Auditoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_REGISTRO")
    private Long idRegistro;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USUARIO_FK", nullable = false)
    private Usuario usuario;

    @Column(name = "ACAO", nullable = false, length = 255)
    private String acao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ATIVIDADE_FK", nullable = false)
    private Atividade atividade;
}
