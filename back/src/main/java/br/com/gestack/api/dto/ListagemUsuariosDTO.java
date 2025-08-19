package br.com.gestack.api.dto;

import br.com.gestack.core.enums.NivelAcessoEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ListagemUsuariosDTO {
    public Long idUsuario;
    public String nomeUsuario;
    public String email;
    public NivelAcessoEnum nivelAcesso;
    public LocalDateTime dataCriacao;
    public Boolean ativo;
    public Long idSquad;
    public String nomeSquad;
    public Long idLider;
    public String nomeLider;
    public NivelAcessoEnum perfilLider;

    public ListagemUsuariosDTO(Long idUsuario, String nomeUsuario, String email, NivelAcessoEnum nivelAcesso, LocalDateTime dataCriacao, Boolean ativo,
                               Long idSquad, String nomeSquad, Long idLider, String nomeLider, NivelAcessoEnum perfilLider) {
        this.idUsuario = idUsuario;
        this.nomeUsuario = nomeUsuario;
        this.email = email;
        this.nivelAcesso = nivelAcesso;
        this.dataCriacao = dataCriacao;
        this.ativo = ativo;
        this.idSquad = idSquad;
        this.nomeSquad = nomeSquad;
        this.idLider = idLider;
        this.nomeLider = nomeLider;
        this.perfilLider = perfilLider;
    }
}
