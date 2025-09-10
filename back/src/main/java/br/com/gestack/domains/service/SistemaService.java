package br.com.gestack.domains.service;

import br.com.gestack.domains.repository.SistemaRepository;
import br.com.gestack.domains.entities.Sistema;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import lombok.AllArgsConstructor;
import java.util.List;

@AllArgsConstructor
@Service
public class SistemaService {

    private final SistemaRepository sistemaRepository;

    public Sistema cadastrar(Sistema sistema) {
        return sistemaRepository.save(sistema);
    }

    public List<Sistema> listarSistemas() {
        return sistemaRepository.findAll(Sort.by(Sort.Direction.DESC, "dataCriacao"));
    }
}
