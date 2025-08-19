package br.com.gestack.domain.controlers;

import br.com.gestack.domain.repository.UsuarioRepository;
import org.springframework.security.core.Authentication;
import br.com.gestack.domain.services.SkillService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import br.com.gestack.domain.businnes.Usuario;
import br.com.gestack.domain.businnes.Skill;
import org.springframework.http.HttpStatus;
import lombok.AllArgsConstructor;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@RestController
@RequestMapping("/api/skill")
public class SkillController {
    private final SkillService skillService;
    private final UsuarioRepository usuarioRepository;

    @PostMapping("/cadastrar")
    public ResponseEntity<Skill> cadastrar(@RequestBody Skill skill) {
        try {
            skillService.cadastrar(skill);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
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
    public ResponseEntity<Skill> atualizar(@RequestBody Skill skill, Authentication auth) {
        Usuario usuarioLogado = (Usuario) auth.getPrincipal();
        Usuario usuario = usuarioRepository.findById(usuarioLogado.getIdUsuario()).orElseThrow(() -> new RuntimeException("Usuário logado não encontrado"));
        skill.setModificadoPor(usuario);

        try {
            Skill atualizado = skillService.atualizar(skill);
            return ResponseEntity.ok(atualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

}
