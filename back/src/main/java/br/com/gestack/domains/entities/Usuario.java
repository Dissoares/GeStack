package br.com.gestack.domains.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import br.com.gestack.utils.PerfilEnumConverter;
import br.com.gestack.core.enums.PerfilEnum;
import java.time.LocalDateTime;
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
    @Column(name = "PERFIL", nullable = false)
    private PerfilEnum perfil;

    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<RegistroEscala> escala = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CRIADO_POR", updatable = false)
    private Usuario criadoPor;

    @Column(name = "DATA_CRIACAO", updatable = false)
    private LocalDateTime dataCriacao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MODIFICADO_POR")
    private Usuario modificadoPor;

    @Column(name = "DATA_MODIFICACAO")
    private LocalDateTime dataModificacao;

    @Column(name = "ATIVO")
    private Boolean ativo = true;
}
