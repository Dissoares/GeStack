package br.com.gestack.domain.controlers;

import org.springframework.beans.factory.annotation.Autowired;
import br.com.gestack.domain.services.UsuarioService;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import br.com.gestack.domain.businnes.Usuario;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@Tag(name = "Usuários", description = "Endpoints para gerenciamento de usuários")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> listarTodos() {
        return usuarioService.buscarTodos();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar usuário por ID")
    public Optional<Usuario> buscarPorId(
            @PathVariable Long id
    ) {
        return usuarioService.buscarPorId(id);
    }

    @PostMapping
    @Operation(summary = "Cadastrar novo usuário")
    public Usuario cadastrar(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Dados do novo usuário",
                    required = true,
                    content = @io.swagger.v3.oas.annotations.media.Content(
                            schema = @Schema(implementation = Usuario.class)
                    )
            )
            @RequestBody Usuario usuario
    ) {
        return usuarioService.cadastrar(usuario);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Atualizar um usuário existente")
    public Usuario atualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        usuario.setIdUsuario(id);
        return usuarioService.atualizar(usuario);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar um usuário")
    public void deletar(@PathVariable Long id) {
        usuarioService.excluir(id);
    }
}
