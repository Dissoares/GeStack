package br.com.gestack.api.dto;

import java.time.LocalDateTime;

public interface ListagemUsuariosDTO {
    Long getIdUsuario();
    String getNomeUsuario();
    String getEmail();
    Integer getPerfil();
    LocalDateTime getDataCriacao();
    Boolean getAtivo();
    Long getIdSquad();
    String getNomeSquad();
    Long getIdLider();
    String getNomeLider();
    Integer getPerfilLider();
}