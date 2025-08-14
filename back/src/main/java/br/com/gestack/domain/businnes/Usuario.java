package br.com.gestack.domain.businnes;

import com.fasterxml.jackson.annotation.JsonBackReference;
import br.com.gestack.domain.utils.NivelAcessoConverter;
import br.com.gestack.domain.enums.NivelAcessoEnum;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Entity
@Table(schema = "PUBLIC", name = "USUARIO")
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

    @Convert(converter = NivelAcessoConverter.class)
    @Column(name = "NIVEL_ACESSO", nullable = false)
    private NivelAcessoEnum nivelAcesso;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SQUAD_FK", nullable = true)
    @JsonBackReference
    private Squad squad;

    @Column(name = "EH_LIDER", nullable = false)
    private Boolean isLider = false;

    @Column(name = "DATA_CADASTRO", nullable = false)
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime dataCadastro;

    @Column(name = "DATA_MODIFICACAO", nullable = true)
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm")
    private LocalDateTime dataModificacao;

    @Column(name = "STATUS", nullable = false)
    private Boolean status = true;
}
