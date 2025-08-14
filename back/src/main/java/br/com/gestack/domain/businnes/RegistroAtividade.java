package br.com.gestack.domain.businnes;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Setter
@Getter
@Entity
@Table(schema = "PUBLIC", name = "REGISTRO_ATIVIDADE")
public class RegistroAtividade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_REGISTRO")
    private Long idRegistro;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USUARIO_FK", nullable = false)
    private Usuario usuario;

    @Column(name = "ACAO", nullable = false, length = 255)
    private String acao;

    @Column(name = "DATA_ACAO", nullable = false)
    private LocalDateTime dataAcao = LocalDateTime.now();
}
