package br.com.gestack.domain.configuration;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import br.com.gestack.domain.repository.UsuarioRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import jakarta.servlet.http.HttpServletRequest;
import br.com.gestack.domain.businnes.Usuario;
import jakarta.servlet.ServletException;
import jakarta.servlet.FilterChain;
import lombok.AllArgsConstructor;
import java.util.Collections;
import java.io.IOException;

@AllArgsConstructor
@Component
public class JwtFilter extends OncePerRequestFilter  {

    private final JwtUtil jwtUtil;
    private final UsuarioRepository usuarioRepository;

    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);

            try {
                if (jwtUtil.isTokenValid(token)) {
                    String email = jwtUtil.extractUsername(token);
                    Usuario usuario = usuarioRepository.findByEmail(email).orElse(null);

                    if (usuario != null) {
                        UsernamePasswordAuthenticationToken authentication =
                                new UsernamePasswordAuthenticationToken(usuario, null, Collections.emptyList());
                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }

            } catch (Exception e) {
                System.out.println("Token inválido: " + e.getMessage());
            }
        }

        System.out.println("Usuário autenticado: " + SecurityContextHolder.getContext().getAuthentication());
        chain.doFilter(request, response);
    }
}
