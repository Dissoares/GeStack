package br.com.gestack.domain.services;

import br.com.gestack.domain.repository.SkillRepository;
import org.springframework.stereotype.Service;
import br.com.gestack.domain.businnes.Skill;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Service
public class SkillService {
    private final SkillRepository skillRepository;

    public Skill cadastrar(Skill skill) {
        skill.setDataCadastro(LocalDateTime.now());
        return skillRepository.save(skill);
    }

    public List<Skill> buscarTudo() {
        return skillRepository.findAll();
    }
}
