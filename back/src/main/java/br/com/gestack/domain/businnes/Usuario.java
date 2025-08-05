package br.com.gestack.domain.businnes;

import br.com.gestack.domain.enums.NivelAcessoEnum;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Table(name = "usuario")
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
    @JoinColumn(name = "id_Squad")
    private Squad squad;

    @Column(nullable = false)
    private Boolean ativo = true;
}
