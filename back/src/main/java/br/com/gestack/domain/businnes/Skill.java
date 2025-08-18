package br.com.gestack.domain.businnes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(schema = "GESQUAD", name = "SKILL")
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_SKILL")
    private Long idSkill;

    @Column(name = "NOME", nullable = false, unique = true)
    private String nome;

    @Column(name = "CATEGORIA")
    private Integer categoria;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SISTEMA_FK")
    private Sistema sistema;

    @CreationTimestamp
    @Column(name = "DATA_CADASTRO", updatable = false)
    private LocalDateTime dataCadastro;

    @UpdateTimestamp
    @Column(name = "DATA_MODIFICACAO")
    private LocalDateTime dataModificacao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MODIFICADO_POR")
    @JsonIgnore
    private Usuario modificadoPor;

    @Column(name = "ATIVO", nullable = false)
    private Boolean ativo = true;

    @PrePersist
    public void prePersist() {
        this.dataCadastro = LocalDateTime.now();
        this.ativo = true;
    }

    @PreUpdate
    public void preUpdate() {
        this.dataModificacao = LocalDateTime.now();
    }
}
