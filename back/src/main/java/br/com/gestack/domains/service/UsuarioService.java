package br.com.gestack.domains.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import br.com.gestack.domains.repository.UsuarioRepository;
import org.springframework.security.core.Authentication;
import br.com.gestack.api.dto.FiltroUsuarioDTO;
import br.com.gestack.domains.entities.Usuario;
import org.springframework.stereotype.Service;
import br.com.gestack.domains.entities.Skill;
import org.springframework.data.domain.Sort;
import br.com.gestack.api.dto.UsuarioDTO;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;

@AllArgsConstructor
@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    private Usuario getUsuarioLogado() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (principal instanceof Usuario) {
            return (Usuario) principal;
        }
        return null;
    }

    public Usuario salvar(Usuario usuario) {
        Usuario usuarioLogado = getUsuarioLogado();

        if (usuario.getId() == null) {
            String senhaCriptografada = passwordEncoder.encode(usuario.getSenha());
            usuario.setSenha(senhaCriptografada);
            usuario.setDataCriacao(LocalDateTime.now());
            usuario.setAtivo(true);

            if (usuarioLogado != null ) {
                usuario.setCriadoPor(usuarioLogado);
            }
            return usuarioRepository.save(usuario);
        } else {
            Usuario existente = usuarioRepository.findById(usuario.getId()).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

            if (usuario.getSenha() != null && !usuario.getSenha().isBlank()) {
                usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
            } else {
                usuario.setSenha(existente.getSenha());
            }

            if (usuarioLogado.getId() != null) {
                usuario.setModificadoPor(usuarioLogado);
            } else {
                usuario.setModificadoPor(usuario);
            }
            usuario.setDataModificacao(LocalDateTime.now());
            return usuarioRepository.save(usuario);
        }
    }

    public List<UsuarioDTO> listar() {
        List<Usuario> usuarios = usuarioRepository.findAll(Sort.by(Sort.Direction.DESC, "dataCriacao"));
        return usuarios.stream().map(usuario -> new
                UsuarioDTO(usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getPerfil(),
                usuario.getDataCriacao(),
                usuario.getAtivo()))
        .toList();
    }

    public List<UsuarioDTO> filtrarPor(Usuario usuario) {

        List<FiltroUsuarioDTO> usuarios = usuarioRepository.filtrarPor(
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getPerfil(),
                usuario.getAtivo()
        );
        return usuarios.stream().map(s -> new UsuarioDTO(s.getId(), s.getNome(), s.getEmail(), s.getPerfil(), s.getDataCriacao(), s.getAtivo())).toList();

    }

    public Usuario buscarPorId(Long id){
        return usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    public List<UsuarioDTO> buscarPorNome(String nome) {
        return usuarioRepository.findByNomeContainingIgnoreCase(nome);
    }

    public Usuario atualizar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public void excluir(Long idUsuario) {
        usuarioRepository.deleteById(idUsuario);
    }

    public Usuario ativar(Long id) {
        Usuario usuario = buscarPorId(id);
        usuario.setAtivo(true);
        return usuarioRepository.save(usuario);
    }

    public Usuario desativar(Long id) {
        Usuario usuario = buscarPorId(id);
        usuario.setAtivo(false);
        return usuarioRepository.save(usuario);
    }
}
