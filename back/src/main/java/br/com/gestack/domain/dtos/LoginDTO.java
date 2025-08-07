package br.com.gestack.domain.dtos;

import lombok.Data;

@Data
public class LoginDTO {
    public String email;
    public String senha;
}
