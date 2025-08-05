package br.com.gestack.domain.businnes;

import br.com.gestack.domain.enums.NivelAcessoEnum;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "usuario")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idUsuario;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String senha;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NivelAcessoEnum nivelAcesso;

    @ManyToOne
    @JoinColumn(name = "id_squad")
    private Squad squad;

    @Column(nullable = false)
    private Boolean ativo;
}
