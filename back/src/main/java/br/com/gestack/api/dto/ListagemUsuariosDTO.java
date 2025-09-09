package br.com.gestack.api.dto;

import java.time.LocalDateTime;

public interface ListagemUsuariosDTO {
    Long getIdUsuario();
    String getNome();
    String getEmail();
    Integer getPerfil();
    LocalDateTime getDataCriacao();
    Boolean getAtivo();
}