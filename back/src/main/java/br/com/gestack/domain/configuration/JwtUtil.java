package br.com.gestack.domain.configuration;

import org.springframework.stereotype.Component;
import br.com.gestack.domain.businnes.Usuario;
import io.jsonwebtoken.SignatureAlgorithm;
import java.time.format.DateTimeFormatter;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import java.security.Key;
import java.util.HashMap;
import java.util.Date;
import java.util.Map;

@Component
public class JwtUtil {

    private final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    private final long EXPIRATION_TIME = 86400000;

    public String generateToken(Usuario usuario) {
        Map<String, Object> claims = new HashMap<>();

        claims.put("idUsuario", usuario.getIdUsuario());
        claims.put("nome", usuario.getNome());
        claims.put("email", usuario.getEmail());
        claims.put("nivelAcesso", usuario.getNivelAcesso().getId());
        claims.put("ativo", usuario.getStatus());

        if (usuario.getDataCadastro() != null) {
            claims.put("dataCadastro", usuario.getDataCadastro()
                    .format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")));
        }

        if (usuario.getSquad() != null) {
            claims.put("squadId", usuario.getSquad().getIdSquad());
            claims.put("squadNome", usuario.getSquad().getNome());
        }

        String token = Jwts.builder()
                .setClaims(claims)
                .setSubject(usuario.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY, SignatureAlgorithm.HS512)
                .compact();

        return token;
    }

    public String extractUsername(String token) {
        return getClaims(token).getSubject();
    }

    public Object extractClaim(String token, String claimName) {
        return getClaims(token).get(claimName);
    }

    public Map<String, Object> extractAllClaims(String token) {
        Claims claims = getClaims(token);
        Map<String, Object> customClaims = new HashMap<>();

        customClaims.put("idUsuario", claims.get("idUsuario"));
        customClaims.put("nome", claims.get("nome"));
        customClaims.put("email", claims.get("email"));
        customClaims.put("nivelAcesso", claims.get("nivelAcesso"));
        customClaims.put("ativo", claims.get("ativo"));
        customClaims.put("dataCadastro", claims.get("dataCadastro"));
        customClaims.put("squadId", claims.get("squadId"));
        customClaims.put("squadNome", claims.get("squadNome"));

        return customClaims;
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

    public boolean isTokenExpired(String token) {
        try {
            return getClaims(token).getExpiration().before(new Date());
        } catch (Exception e) {
            return true;
        }
    }
}