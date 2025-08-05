package br.com.gestack.domain.businnes;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Table(name = "squad")
public class Squad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSquad;

    @Column(nullable = false)
    private String nome;

    @ManyToOne
    @JoinColumn(name = "id_Usuario", nullable = false)
    private Usuario lider;

    @OneToMany(mappedBy = "squad", cascade = CascadeType.ALL)
    private List<Usuario> membros;

    @Column(nullable = false)
    private Boolean ativo = true;
}