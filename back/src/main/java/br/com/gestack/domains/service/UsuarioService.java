package br.com.gestack.domains.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import br.com.gestack.domains.repository.UsuarioRepository;
import org.springframework.data.repository.query.Param;
import br.com.gestack.api.dto.ListagemUsuariosDTO;
import br.com.gestack.domains.entities.Usuario;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;
import java.util.Optional;
import java.util.List;

@AllArgsConstructor
@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario cadastrar(Usuario usuario) {
        String senhaCriptografada = passwordEncoder.encode(usuario.getSenha());
        usuario.setSenha(senhaCriptografada);
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

    public List<ListagemUsuariosDTO> buscaPor(Usuario usuario) {
        Integer nivelAcesso = usuario.getNivelAcesso() != null ? usuario.getNivelAcesso().getId() : null;
         return usuarioRepository.buscarPor(usuario.getNome(), usuario.getEmail(), nivelAcesso, usuario.getAtivo());
    }
}
