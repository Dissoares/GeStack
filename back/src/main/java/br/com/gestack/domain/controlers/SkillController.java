package br.com.gestack.domain.controlers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import br.com.gestack.domain.repository.UsuarioRepository;
import org.springframework.security.core.Authentication;
import br.com.gestack.domain.dtos.ListagemUsuariosDTO;
import br.com.gestack.domain.services.SkillService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import br.com.gestack.domain.businnes.Usuario;
import br.com.gestack.domain.businnes.Skill;
import lombok.AllArgsConstructor;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/skill")
public class SkillController {
    private final SkillService skillService;
    private final UsuarioRepository usuarioRepository;

    @PostMapping("/cadastrar")
    public Skill cadastrar(@RequestBody Skill skill) {
        return skillService.cadastrar(skill);
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
    public ResponseEntity<Skill> atualizar(@RequestBody Skill skill,  Authentication auth) {
        Usuario usuarioLogado = (Usuario) auth.getPrincipal();

        Usuario usuario = usuarioRepository.findById(usuarioLogado.getIdUsuario())
                .orElseThrow(() -> new RuntimeException("Usuário logado não encontrado"));

        skill.setModificadoPor(usuario);
        return ResponseEntity.ok(skillService.atualizar(skill));
    }

}
