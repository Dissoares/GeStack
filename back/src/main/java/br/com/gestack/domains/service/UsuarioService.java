package br.com.gestack.domains.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import br.com.gestack.domains.repository.UsuarioRepository;
import br.com.gestack.api.dto.FiltroUsuarioDTO;
import br.com.gestack.domains.entities.Usuario;
import org.springframework.stereotype.Service;
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

    public Usuario salvar(Usuario usuario) {
        String senhaCriptografada = passwordEncoder.encode(usuario.getSenha());
        usuario.setSenha(senhaCriptografada);
        usuario.setDataCriacao(LocalDateTime.now());
        usuario.setAtivo(true);
        return usuarioRepository.save(usuario);
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

    public Optional<Usuario> buscarPorId(Long idUsuario) {
        return usuarioRepository.findById(idUsuario);
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
}
