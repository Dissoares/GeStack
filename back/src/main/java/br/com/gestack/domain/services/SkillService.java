package br.com.gestack.domain.services;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import br.com.gestack.domain.repository.UsuarioRepository;
import br.com.gestack.domain.repository.SkillRepository;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;
import br.com.gestack.domain.businnes.Usuario;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import br.com.gestack.domain.businnes.Skill;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Service
public class SkillService {
    private final SkillRepository skillRepository;
    private final UsuarioRepository usuarioRepository;

    public Skill cadastrar(Skill skill) {
        skill.setDataCadastro(LocalDateTime.now());
        return skillRepository.save(skill);
    }

    public List<Skill> buscarTudo() {
        return skillRepository.findAll(Sort.by(Sort.Direction.DESC, "dataCadastro"));
    }

    public Skill desativar(Long idSkill) {
        Skill skill = skillRepository.findById(idSkill)
                .orElseThrow(() -> new RuntimeException("Skill não encontrada"));

        skill.setAtivo(false);
        return skillRepository.save(skill);
    }

    public Skill atualizar(Skill skill) {
        return skillRepository.save(skill);
    }
}
