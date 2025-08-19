package br.com.gestack.domains.service;

import br.com.gestack.domains.repository.SistemaRepository;
import br.com.gestack.domains.entities.Sistema;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class SistemaService {

    private final SistemaRepository sistemaRepository;

    public Sistema cadastrar(Sistema sistema) {
        Sistema novoSistema = new Sistema();
        novoSistema.setNome(sistema.getNome());
        novoSistema.setDescricao(sistema.getDescricao());
        return sistemaRepository.save(novoSistema);
    }
}
