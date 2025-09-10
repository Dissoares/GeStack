package br.com.gestack.domains.service;

import br.com.gestack.domains.repository.UsuarioRepository;
import br.com.gestack.domains.repository.SkillRepository;
import org.springframework.stereotype.Service;
import br.com.gestack.domains.entities.Skill;
import org.springframework.data.domain.Sort;
import lombok.AllArgsConstructor;
import java.util.List;

@AllArgsConstructor
@Service
public class SkillService {
    private final SkillRepository skillRepository;
    private final UsuarioRepository usuarioRepository;

    public Skill cadastrar(Skill skill) {
        skill.setAtivo(true);
        return skillRepository.save(skill);
    }

    public List<Skill> buscarTudo() {
        return skillRepository.findAll(Sort.by(Sort.Direction.DESC, "dataCriacao"));
    }

    public Skill ativar(Long idSkill) {
        Skill skill = buscarSkillPorId(idSkill);
        skill.setAtivo(true);
        return skillRepository.save(skill);
    }

    public Skill desativar(Long idSkill) {
        Skill skill = buscarSkillPorId(idSkill);
        skill.setAtivo(false);
        return skillRepository.save(skill);
    }

    public Skill buscarSkillPorId(Long idSkill){
        return skillRepository.findById(idSkill).orElseThrow(() -> new RuntimeException("Skill não encontrada"));
    }

    public Skill atualizar(Skill skill) {
        return skillRepository.save(skill);
    }

    public void excluir (Long idSkill) {
        skillRepository.deleteById(idSkill);
    }
}
