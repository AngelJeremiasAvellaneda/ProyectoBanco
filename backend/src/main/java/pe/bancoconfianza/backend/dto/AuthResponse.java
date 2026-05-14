package pe.bancoconfianza.backend.dto;

/**
 * Respuesta del endpoint de autenticación.
 * El frontend espera { token, user: { id, name, email } }
 */
public record AuthResponse(
        String token,
        UserDto user
) {
    public record UserDto(Long id, String name, String email) {}
}
