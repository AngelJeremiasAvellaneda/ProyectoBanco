package pe.bancoconfianza.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Endpoint público de salud — usado por el widget del frontend.
 * No requiere autenticación (permitido en SecurityConfig bajo /api/public/**)
 */
@RestController
@RequestMapping("/api/public")
public class HealthController {

    public HealthController() {
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        // Only expose minimal health check info — no server internals
        return ResponseEntity.ok(Map.of(
                "status",    "UP",
                "service",   "BancoConfianza API"
        ));
    }
}
