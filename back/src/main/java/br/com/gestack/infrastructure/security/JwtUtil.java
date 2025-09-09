package br.com.gestack.infrastructure.security;

import org.springframework.stereotype.Component;
import br.com.gestack.domains.entities.Usuario;
import io.jsonwebtoken.SignatureAlgorithm;
import java.nio.charset.StandardCharsets;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import java.security.Key;
import java.util.HashMap;
import java.util.Date;
import java.util.Map;

@Component
public class JwtUtil {

    private static final String SECRET_STRING = "w4pZy3F8kQ2v9X7Nf6vG5J9yH8tL1qM3vP2rS6aX7bY8cD9eF0gH1iJ2kL3mN4oP";
    private final Key SECRET_KEY = Keys.hmacShaKeyFor(SECRET_STRING.getBytes(StandardCharsets.UTF_8));

    private static final long EXPIRATION_TIME = 24 * 60 * 60 * 1000;

    public String generateToken(Usuario usuario) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("idUsuario", usuario.getIdUsuario());
        claims.put("nome", usuario.getNome());
        claims.put("email", usuario.getEmail());
        claims.put("perfil", usuario.getPerfil().getCodigo());
        claims.put("ativo", usuario.getAtivo());
        claims.put("dataCriacao", usuario.getDataCriacao().toString());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(usuario.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS512)
                .compact();
    }

    public String extractUsername(String token) {
        return getClaims(token).getSubject();
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean isTokenValid(String token) {
        try {
            Claims claims = getClaims(token);
            return !claims.getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }
}
