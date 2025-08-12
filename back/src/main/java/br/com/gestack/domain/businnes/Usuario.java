package br.com.gestack.domain.businnes;

import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import br.com.gestack.domain.utils.NivelAcessoConverter;
import br.com.gestack.domain.enums.NivelAcessoEnum;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idUsuario")
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

    @Convert(converter = NivelAcessoConverter.class)
    @Column(name = "nivel_acesso", nullable = false)
    private NivelAcessoEnum nivelAcesso;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "squad_fk")
    private Squad squad;

    @Column(nullable = false)
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime dataCadastro;

    @Column(nullable = false)
    private Boolean status = true;
}


