package br.com.gestack.domain.dtos;

import br.com.gestack.domain.enums.NivelAcessoEnum;
import java.time.LocalDateTime;

public class ListagemUsuariosDTO {
    public Long idUsuario;
    public String nomeUsuario;
    public String email;
    public NivelAcessoEnum nivelAcesso;
    public LocalDateTime dataCadastro;
    public Boolean status;
    public Long idSquad;
    public String nomeSquad;
    public Long idLider;
    public String nomeLider;
    public NivelAcessoEnum perfilLider;

    public ListagemUsuariosDTO(Long idUsuario, String nomeUsuario, String email, NivelAcessoEnum nivelAcesso, LocalDateTime dataCadastro, Boolean status,
                               Long idSquad, String nomeSquad, Long idLider, String nomeLider, NivelAcessoEnum perfilLider) {
        this.idUsuario = idUsuario;
        this.nomeUsuario = nomeUsuario;
        this.email = email;
        this.nivelAcesso = nivelAcesso;
        this.dataCadastro = dataCadastro;
        this.status = status;
        this.idSquad = idSquad;
        this.nomeSquad = nomeSquad;
        this.idLider = idLider;
        this.nomeLider = nomeLider;
        this.perfilLider = perfilLider;
    }
}
