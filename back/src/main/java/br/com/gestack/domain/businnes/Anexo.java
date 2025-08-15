package br.com.gestack.domain.businnes;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(schema = "GESQUAD", name = "ANEXO")
public class Anexo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_ANEXO")
    private Long idAnexo;

    @Column(name = "NOME_ARQUIVO", nullable = false, length = 250)
    private String nomeArquivo;

    @Column(name = "CAMINHO", nullable = false, length = 500)
    private String caminho;

    @Column(name = "TIPO", length = 50)
    private String tipo;

    @Column(name = "DATA_CRIACAO", nullable = false)
    private LocalDateTime dataCriacao = LocalDateTime.now();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ATIVIDADE_FK", nullable = false)
    private Atividade atividade;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USUARIO_FK", nullable = false)
    private Usuario autor;
}