package br.com.gestack.domain.businnes;

import com.fasterxml.jackson.annotation.*;
import lombok.*;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Entity
@Table(schema = "PUBLIC", name = "SQUAD")
public class Squad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_SQUAD")
    private Long idSquad;

    @Column(name = "SQUAD_NOME", unique = true, nullable = false, length = 100)
    private String nome;

    @OneToMany(mappedBy = "squad", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Usuario> membros = new ArrayList<>();

    @JoinColumn(name = "LIDER_FK", nullable = true)
    @JsonBackReference
    private Usuario lider;

    @Column(name = "ATIVO", nullable = false)
    private Boolean status = true;
}