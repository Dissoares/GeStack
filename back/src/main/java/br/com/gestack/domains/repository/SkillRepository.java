package br.com.gestack.domains.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.com.gestack.domains.entities.Skill;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
}
