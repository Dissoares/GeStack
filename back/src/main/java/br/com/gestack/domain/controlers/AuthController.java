package br.com.gestack.domain.controlers;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import br.com.gestack.domain.repository.UsuarioRepository;
import br.com.gestack.domain.configuration.JwtUtil;
import org.springframework.http.ResponseEntity;
import br.com.gestack.domain.businnes.Usuario;
import br.com.gestack.domain.dtos.LoginDTO;
import org.springframework.http.HttpStatus;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO login) {
        Usuario usuario = usuarioRepository.findByEmail(login.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

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
