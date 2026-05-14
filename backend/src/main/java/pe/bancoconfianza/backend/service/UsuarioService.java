package pe.bancoconfianza.backend.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pe.bancoconfianza.backend.repository.UsuarioRepository;
import pe.bancoconfianza.backend.security.SupabaseUserDetails;

/**
 * UserDetailsService que soporta dos modos:
 * 1. Usuario existe en BD local → devuelve el Usuario (con roles propios)
 * 2. Usuario autenticado via Supabase Auth → devuelve SupabaseUserDetails
 *    (no requiere tabla de usuarios propia)
 */
@Service
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // Primero busca en la BD local
        return usuarioRepository.findByEmail(email)
                // Si no existe, crea un UserDetails mínimo para tokens de Supabase
                .map(u -> (UserDetails) u)
                .orElse(new SupabaseUserDetails(email));
    }
}
