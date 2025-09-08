package br.com.gestack.domains.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import br.com.gestack.utils.PerfilEnumConverter;
import br.com.gestack.core.enums.PerfilEnum;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import lombok.*;

@Setter
@Getter
@Entity
@Table(schema = "GESQUAD", name = "USUARIO")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_USUARIO")
    private Long idUsuario;

    @Column(name = "NOME", nullable = false, length = 250)
    private String nome;

    @Column(name = "EMAIL", unique = true, nullable = false, length = 250)
    private String email;

    @Column(name = "SENHA", nullable = false, length = 250)
    private String senha;

    @Convert(converter = PerfilEnumConverter.class)
    @Column(name = "NIVEL_ACESSO", nullable = false)
    private PerfilEnum perfil;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SQUAD_FK")
    @JsonBackReference
    private Squad squad;

    @Column(name = "EH_LIDER", nullable = false)
    private Boolean ehLider;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RegistroEscala> escala = new ArrayList<>();

    @Column(name = "ATIVO", nullable = false)
    private Boolean ativo = true;
}
