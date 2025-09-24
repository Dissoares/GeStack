package br.com.gestack.api.controller;

import br.com.gestack.domains.service.SistemaService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import br.com.gestack.domains.entities.Sistema;
import br.com.gestack.domains.entities.Skill;
import org.springframework.http.HttpStatus;
import lombok.AllArgsConstructor;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/sistema")
public class SistemaController {

    private final SistemaService sistemaService;

    @PostMapping("/cadastrar")
    public Sistema cadastrar(@RequestBody Sistema sistema) {
        return sistemaService.cadastrar(sistema);
    }

    @GetMapping("/listarSistemas")
    public List<Sistema> listarSistemas() {
        return sistemaService.listarSistemas();
    }

    @PutMapping("/desativar/{id}")
    public ResponseEntity<Sistema> desativar(@PathVariable Long id) {
        return ResponseEntity.ok(sistemaService.desativar(id));
    }

    @PutMapping("/ativar/{id}")
    public ResponseEntity<Sistema> ativar(@PathVariable Long id) {
        return ResponseEntity.ok(sistemaService.ativar(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        sistemaService.excluir(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/atualizar")
    public ResponseEntity<Object> atualizar(@RequestBody Sistema sistema) {
        try {
            Sistema atualizado = sistemaService.atualizar(sistema);
            return ResponseEntity.ok(atualizado);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Sistema já existe");
        }
    }

}
