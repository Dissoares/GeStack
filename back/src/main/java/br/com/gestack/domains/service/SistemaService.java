package br.com.gestack.domains.service;

import br.com.gestack.domains.repository.SistemaRepository;
import br.com.gestack.domains.entities.Sistema;
import org.springframework.stereotype.Service;
import br.com.gestack.domains.entities.Skill;
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

    public Sistema atualizar(Sistema sistema) {
        return sistemaRepository.save(sistema);
    }

    public List<Sistema> listarSistemas() {
        return sistemaRepository.findAll(Sort.by(Sort.Direction.DESC, "dataCriacao"));
    }

    public Sistema buscarSistemaPorId(Long id) {
        return sistemaRepository.findById(id).orElseThrow(() -> new RuntimeException("Sistema não encontrada"));
    }

    public Sistema desativar(Long id) {
        Sistema sistema = buscarSistemaPorId(id);
        sistema.setAtivo(false);
        return sistemaRepository.save(sistema);
    }

    public Sistema ativar(Long id) {
        Sistema sistema = buscarSistemaPorId(id);
        sistema.setAtivo(true);
        return sistemaRepository.save(sistema);
    }

    public void excluir(Long id) {
        sistemaRepository.deleteById(id);
    }
}
