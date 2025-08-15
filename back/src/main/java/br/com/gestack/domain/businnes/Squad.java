package br.com.gestack.domain.businnes;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.*;
@Setter
@Getter
@Entity
@Table(schema = "GESQUAD", name = "SQUAD")
public class Squad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_SQUAD")
    private Long idSquad;

    @Column(name = "SQUAD_NOME", unique = true, nullable = false, length = 100)
    private String nome;

    @OneToMany(mappedBy = "squad", cascade = CascadeType.ALL, orphanRemoval = false, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Usuario> membros = new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "LIDER_FK", referencedColumnName = "ID_USUARIO", nullable = false, unique = true)
    private Usuario lider;

    @Column(name = "DATA_CADASTRO", nullable = false)
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime dataCadastro;

    @Column(name = "DATA_MODIFICACAO")
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime dataModificacao;

    @Column(name = "ATIVO", nullable = false)
    private Boolean status = true;
}