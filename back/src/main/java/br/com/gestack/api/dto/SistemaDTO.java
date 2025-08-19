package br.com.gestack.api.dto;

import br.com.gestack.domains.entities.Skill;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SistemaDTO {
    private String nome;
    private String descricao;
    private List<Skill> skillIds;
}
