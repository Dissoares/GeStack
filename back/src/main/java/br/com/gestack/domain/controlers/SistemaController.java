package br.com.gestack.domain.controlers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import br.com.gestack.domain.services.SistemaService;
import br.com.gestack.domain.businnes.Sistema;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api/sistema")
public class SistemaController {

    private final SistemaService sistemaService;

    @PostMapping("/cadastrar")
    public Sistema cadastrar(@RequestBody Sistema sistema) {
        return sistemaService.cadastrar(sistema);
    }
}
