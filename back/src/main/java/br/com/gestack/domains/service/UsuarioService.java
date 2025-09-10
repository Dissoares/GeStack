package br.com.gestack.domains.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import br.com.gestack.domains.repository.UsuarioRepository;
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

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario salvar(Usuario usuario) {
        String senhaCriptografada = passwordEncoder.encode(usuario.getSenha());
        usuario.setSenha(senhaCriptografada);
        usuario.setDataCriacao(LocalDateTime.now());
        usuario.setAtivo(true);
        return usuarioRepository.save(usuario);
    }

    public Usuario atualizar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public void excluir(Long idUsuario) {
        usuarioRepository.deleteById(idUsuario);
    }

    public Optional<Usuario> buscarPorId(Long idUsuario) {
        return usuarioRepository.findById(idUsuario);
    }

    public List<UsuarioDTO> filtrarPor(Usuario usuario) {
        return usuarioRepository.buscarUsuarios(
                usuario.getNome(),
                usuario.getEmail(),
                usuario.getPerfil(),
                usuario.getAtivo()
        );
    }

    public List<UsuarioDTO> listar() {
        List<Usuario> usuarios = usuarioRepository.findAll(Sort.by(Sort.Direction.DESC, "dataCriacao"));
        return usuarios.stream().map(u -> new
                UsuarioDTO(u.getId(),
                u.getNome(),
                u.getEmail(),
                u.getPerfil(),
                u.getDataCriacao(),
                u.getAtivo()))
                .toList();
    }

    public List<UsuarioDTO> buscarPorNome(String nome) {
        return usuarioRepository.findByNomeContainingIgnoreCase(nome);
    }
}
