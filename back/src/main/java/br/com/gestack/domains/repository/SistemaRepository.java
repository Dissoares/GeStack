package br.com.gestack.domains.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.com.gestack.domains.entities.Sistema;

@Repository
public interface SistemaRepository extends JpaRepository<Sistema, Long> {
}
