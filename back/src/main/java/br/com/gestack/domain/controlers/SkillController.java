package br.com.gestack.domain.controlers;

import br.com.gestack.domain.dtos.ListagemUsuariosDTO;
import br.com.gestack.domain.services.SkillService;
import org.springframework.web.bind.annotation.*;
import br.com.gestack.domain.businnes.Usuario;
import br.com.gestack.domain.businnes.Skill;
import lombok.AllArgsConstructor;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/skill")
public class SkillController {
    private final SkillService skillService;

    @PostMapping("/cadastrar")
    public Skill cadastrar(@RequestBody Skill skill) {
        return skillService.cadastrar(skill);
    }

    @GetMapping("/buscarTudo")
    public List<Skill> buscarTudo() {
        return skillService.buscarTudo();
    }
}
