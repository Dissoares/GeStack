package br.com.gestack.api.controller;

import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import br.com.gestack.domains.service.UsuarioService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import br.com.gestack.domains.entities.Usuario;
import org.springframework.http.HttpStatus;
import br.com.gestack.api.dto.UsuarioDTO;
import java.util.Optional;
import java.util.List;

@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Object> salvar(@RequestBody Usuario usuario) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.salvar(usuario));
        } catch (DataIntegrityViolationException erro) {
            if (erro.getMostSpecificCause().getMessage().contains("email")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Já existe um usuário cadastrado com esse email");
            } else if (erro.getMostSpecificCause().getMessage().contains("nome")) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Já existe um usuário cadastrado com esse nome");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro no servidor");
            }
        }
    }

    @GetMapping
    public List<UsuarioDTO> listar() {
        return usuarioService.listar();
    }

    @GetMapping("/filtrar")
    public List<UsuarioDTO> filtrarPor(Usuario usuario) {
        return usuarioService.filtrarPor(usuario);
    }

    @GetMapping("/{id}")
    public Optional<Usuario> buscarPorId(@PathVariable Long id) {
        return usuarioService.buscarPorId(id);
    }

    @GetMapping("/por-nome")
    public List<UsuarioDTO> buscarPorNome(@RequestParam String nome) {
        return usuarioService.buscarPorNome(nome);
    }

    @PutMapping("/{id}")
    public Usuario atualizar(@PathVariable Long id, @RequestBody Usuario usuario) {
        usuario.setId(id);
        return usuarioService.atualizar(usuario);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        usuarioService.excluir(id);
    }
}
