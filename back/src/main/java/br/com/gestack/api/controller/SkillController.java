package br.com.gestack.api.controller;

import br.com.gestack.domains.repository.UsuarioRepository;
import org.springframework.dao.DataIntegrityViolationException;
import br.com.gestack.domains.service.SkillService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Object> cadastrar(@RequestBody Skill skill) {
        try {
            Skill cadastrado = skillService.cadastrar(skill);
            return ResponseEntity.ok(cadastrado);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Skill já existe");
        }
    }

    @GetMapping("/buscarTudo")
    public List<Skill> buscarTudo() {
        return skillService.buscarTudo();
    }

    @PutMapping("/ativar/{idSkill}")
    public ResponseEntity<Skill> ativar(@PathVariable Long idSkill) {
        Skill skill = skillService.ativar(idSkill);
        return ResponseEntity.ok(skill);
    }

    @PutMapping("/desativar/{idSkill}")
    public ResponseEntity<Skill> desativar(@PathVariable Long idSkill) {
        Skill skill = skillService.desativar(idSkill);
        return ResponseEntity.ok(skill);
    }

    @PutMapping("/atualizar")
    public ResponseEntity<Object> atualizar(@RequestBody Skill skill) {
        try {
            Skill atualizado = skillService.atualizar(skill);
            return ResponseEntity.ok(atualizado);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Skill já existe");
        }
    }
}
