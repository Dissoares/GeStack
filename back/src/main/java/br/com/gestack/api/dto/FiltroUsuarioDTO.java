package br.com.gestack.api.dto;

import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FiltroUsuarioDTO {
    private Long id;
    private String nome;
    private String email;
    private Integer perfil;
    private LocalDateTime dataCriacao;
    private Boolean ativo;
}
