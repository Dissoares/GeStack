package br.com.gestack.api.controller;

import br.com.gestack.domains.repository.UsuarioRepository;
import org.springframework.security.core.Authentication;
import br.com.gestack.domains.service.SkillService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import br.com.gestack.domains.entities.Usuario;
import br.com.gestack.domains.entities.Skill;
import org.springframework.http.HttpStatus;
import lombok.AllArgsConstructor;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/skill")
public class SkillController {
    private final SkillService skillService;
    private final UsuarioRepository usuarioRepository;

    @PostMapping("/cadastrar")
    public ResponseEntity<Skill> cadastrar(@RequestBody Skill skill) {
        return ResponseEntity.ok(skillService.cadastrar(skill));
    }

    @GetMapping("/buscarTudo")
    public List<Skill> buscarTudo() {
        return skillService.buscarTudo();
    }

    @PutMapping("/desativar/{idSkill}")
    public ResponseEntity<Skill> desativar(@PathVariable Long idSkill) {
        Skill skill = skillService.desativar(idSkill);
        return ResponseEntity.ok(skill);
    }

    @PutMapping("/atualizar")
    public ResponseEntity<Skill> atualizar(@RequestBody Skill skill) {
        return ResponseEntity.ok(skillService.atualizar(skill));
    }

}
