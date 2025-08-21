package br.com.gestack.common;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.CreatedBy;
import com.fasterxml.jackson.annotation.JsonIgnore;
import br.com.gestack.domains.entities.Usuario;
import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public abstract class Auditoria {
    @CreatedBy
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CRIADO_POR", nullable = false, updatable = false)
    @JsonIgnore
    private Usuario criadoPor;

    @CreatedDate
    @Column(name = "DATA_CRIACAO", nullable = false, updatable = false)
    private LocalDateTime dataCriacao;

    @LastModifiedBy
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MODIFICADO_POR", insertable = false)
    @JsonIgnore
    private Usuario modificadoPor;

    @LastModifiedDate
    @Column(name = "DATA_MODIFICACAO", insertable = false)
    private LocalDateTime dataModificacao;
}
