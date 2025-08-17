package br.com.gestack.domain.dtos;

import br.com.gestack.domain.businnes.Skill;
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
