package br.com.gestack.domain.businnes;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idSquad")
@Table(name = "squad")
public class Squad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSquad;

    @Column(nullable = false)
    private String nome;

    @ManyToOne
    @JoinColumn(name = "lider_fk")
    @JsonIgnore
    private Usuario lider;

    @OneToMany(mappedBy = "squad")
    private List<Usuario> membros;

    @Column(nullable = false)
    private Boolean ativo = true;
}