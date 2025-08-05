package br.com.gestack.domain.businnes;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Entity
@Table(name = "squad")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Squad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSquad;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private Boolean ativo;

    @ManyToOne
    @JoinColumn(name = "id_lider", nullable = false)
    private Usuario lider;

    @OneToMany(mappedBy = "squad", cascade = CascadeType.ALL)
    private List<Usuario> membros;
}