package pe.bancoconfianza.backend.controller;

import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.bancoconfianza.backend.repository.UsuarioRepository;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * Endpoint público de salud — usado por el widget del frontend.
 * No requiere autenticación (permitido en SecurityConfig bajo /api/public/**)
 */
@RestController
@RequestMapping("/api/public")
public class HealthController {

    private final UsuarioRepository usuarioRepository;
    private final Environment environment;

    public HealthController(UsuarioRepository usuarioRepository, Environment environment) {
        this.usuarioRepository = usuarioRepository;
        this.environment = environment;
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        return ResponseEntity.ok(Map.of(
                "status",    "UP",
                "service",   "BancoConfianza API",
                "timestamp", LocalDateTime.now().toString(),
                "profiles",  String.join(",", environment.getActiveProfiles()),
                "usuarios",  usuarioRepository.count()
        ));
    }
}
