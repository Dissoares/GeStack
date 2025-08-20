package br.com.gestack.infrastructure.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import br.com.gestack.domains.repository.UsuarioRepository;
import org.springframework.security.core.Authentication;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;
import br.com.gestack.domains.entities.Usuario;

import java.util.Optional;
@Component("auditorAware")
public class AuditorAwareImpl implements AuditorAware<Usuario> {

    private final UsuarioRepository usuarioRepository;

    public AuditorAwareImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public Optional<Usuario> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return Optional.empty();
        }
        Object principal = authentication.getPrincipal();
        if (principal instanceof Usuario usuario) {
            return usuarioRepository.findById(usuario.getIdUsuario());
        }
        if (principal instanceof UserDetails userDetails) {
            return usuarioRepository.findByEmail(userDetails.getUsername());
        }
        return Optional.empty();
    }
}