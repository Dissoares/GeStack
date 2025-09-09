package br.com.gestack.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import br.com.gestack.api.dto.ListagemUsuariosDTO;
import br.com.gestack.domains.service.UsuarioService;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import br.com.gestack.domains.entities.Usuario;
import java.util.Optional;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/buscarTodos")
    public List<ListagemUsuariosDTO> buscarPor(Usuario usuario) {
        return usuarioService.buscaPor(usuario);
    }

    @GetMapping("/buscarPorNome")
    public List<ListagemUsuariosDTO> buscarPorNome(String nome) {
        return usuarioService.buscaPorNome(nome);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Busca um usuário pelo ID")
    public Optional<Usuario> buscarPorId(@PathVariable Long id) {
        return usuarioService.buscarPorId(id);
    }

    @PostMapping("/cadastrar")
    @Operation(summary = "Cadastra novo usuário")
    public Usuario cadastrar(@RequestBody Usuario usuario) {
        return usuarioService.cadastrar(usuario);
    }

    @PutMapping("/atualizar")
    @Operation(summary = "Atualiza um usuário existente")
    public Usuario atualizar(@RequestBody Usuario usuario) {
        return usuarioService.atualizar(usuario);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar um usuário")
    public void deletar(@PathVariable Long id) {
        usuarioService.excluir(id);
    }
}
