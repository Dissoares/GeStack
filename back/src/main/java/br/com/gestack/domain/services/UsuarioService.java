package br.com.gestack.domain.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import br.com.gestack.domain.repository.UsuarioRepository;
import br.com.gestack.domain.businnes.Usuario;
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

    public List<Usuario> buscaPor(Usuario usuario) {
        List<Usuario> listaUsuarios =  usuarioRepository.buscarPor(usuario);
        return listaUsuarios;
    }
}
