package br.com.gestack.api.controller;

import br.com.gestack.domains.service.SistemaService;
import org.springframework.web.bind.annotation.*;
import br.com.gestack.domains.entities.Sistema;
import br.com.gestack.domains.entities.Skill;
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
}
