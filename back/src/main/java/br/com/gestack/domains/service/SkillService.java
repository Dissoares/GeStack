package br.com.gestack.domains.service;

import br.com.gestack.domains.repository.UsuarioRepository;
import br.com.gestack.domains.repository.SkillRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import br.com.gestack.domains.entities.Skill;
import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
@Service
public class SkillService {
    private final SkillRepository skillRepository;
    private final UsuarioRepository usuarioRepository;

    public Skill cadastrar(Skill skill) {
        return skillRepository.save(skill);
    }

    public List<Skill> buscarTudo() {
        return skillRepository.findAll(Sort.by(Sort.Direction.DESC, "dataCriacao"));
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
