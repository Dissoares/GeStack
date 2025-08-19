package br.com.gestack.infrastructure.security;

import org.springframework.security.core.context.SecurityContextHolder;
import br.com.gestack.domains.repository.UsuarioRepository;
import org.springframework.security.core.Authentication;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;
import br.com.gestack.domains.entities.Usuario;
import java.util.Optional;

@Component("auditorProvider")
public class SpringSecurityAuditorAware implements AuditorAware<Usuario> {

    private final UsuarioRepository usuarioRepository;

    public SpringSecurityAuditorAware(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public Optional<Usuario> getCurrentAuditor() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated()) {
            return Optional.empty();
        }

        Usuario principal = (Usuario) auth.getPrincipal();

        Usuario managed = usuarioRepository.findById(principal.getIdUsuario())
                .orElseThrow(() -> new IllegalStateException("Usuário não encontrado"));

        return Optional.of(managed);
    }
}
