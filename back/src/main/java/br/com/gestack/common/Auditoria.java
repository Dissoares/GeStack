package br.com.gestack.common;

import br.com.gestack.domains.entities.Usuario;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@MappedSuperclass
@Getter
@Setter
public abstract class Auditoria {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CRIADO_POR", nullable = false)
    private Usuario criadoPor;

    @Column(name = "DATA_CRIACAO", nullable = false)
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime dataCriacao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MODIFICADO_POR")
    private Usuario modificadoPor;

    @Column(name = "DATA_MODIFICACAO")
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime dataModificacao;

    @Column(name = "ATIVO", nullable = false)
    private Boolean ativo = true;

    @PrePersist
    public void prePersist() {
        this.dataCriacao = LocalDateTime.now();
        this.ativo = true;
    }

    @PreUpdate
    public void preUpdate() {
        this.dataModificacao = LocalDateTime.now();
    }
}
