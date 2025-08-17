package br.com.gestack.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.com.gestack.domain.businnes.Sistema;

@Repository
public interface SistemaRepository extends JpaRepository<Sistema, Long> {
}
