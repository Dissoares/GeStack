package br.com.gestack.api.controller;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import br.com.gestack.domains.repository.UsuarioRepository;
import br.com.gestack.infrastructure.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import br.com.gestack.domains.entities.Usuario;
import br.com.gestack.api.dto.LoginDTO;
import java.util.HashMap;
import java.util.Map;

@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final  JwtUtil jwtUtil;
    private final  PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO login) {
        Usuario usuario = usuarioRepository.findByEmail(login.getEmail()).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (passwordEncoder.matches(login.getSenha(), usuario.getSenha())) {
            String token = jwtUtil.generateToken(usuario);
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return ResponseEntity.ok(response);
        } else {
            throw new RuntimeException("Senha inválida");
        }
    }
}
