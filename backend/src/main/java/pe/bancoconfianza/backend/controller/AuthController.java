package pe.bancoconfianza.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * AuthController — con Supabase Auth el login ocurre en el frontend.
 * Este controlador solo existe como referencia; los endpoints reales
 * son /api/cuentas/** (protegidos con el JWT de Supabase).
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    /**
     * Endpoint de prueba — confirma que el backend está listo.
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, String>> status() {
        return ResponseEntity.ok(Map.of(
                "auth", "Supabase Auth",
                "info", "El login se realiza en el frontend con @supabase/supabase-js"
        ));
    }
}
