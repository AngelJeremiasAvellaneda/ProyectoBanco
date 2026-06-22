package pe.bancoconfianza.backend.controller;

import org.springframework.context.annotation.Profile;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pe.bancoconfianza.backend.model.Usuario;
import pe.bancoconfianza.backend.repository.UsuarioRepository;

import java.util.Map;

@RestController
@RequestMapping("/api/dev")
@Profile("dev")
public class DevController {

    private final UsuarioRepository usuarioRepo;
    private final PasswordEncoder passwordEncoder;

    public DevController(UsuarioRepository usuarioRepo, PasswordEncoder passwordEncoder) {
        this.usuarioRepo = usuarioRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/reset-demo-password")
    public ResponseEntity<?> resetDemoPassword(@RequestBody Map<String, String> body) {
        String newPassword = body.get("password");
        if (newPassword == null || newPassword.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "password required"));
        }

        return usuarioRepo.findByEmail("demo@banco.pe")
                .map(u -> {
                    u.setPassword(passwordEncoder.encode(newPassword));
                    usuarioRepo.save(u);
                    return ResponseEntity.ok(Map.of("message", "ok"));
                })
                .orElseGet(() -> ResponseEntity.status(404).body(Map.of("message", "user not found")));
    }

    @org.springframework.web.bind.annotation.GetMapping("/ping")
    public ResponseEntity<?> ping() {
        return ResponseEntity.ok(Map.of("status", "ok"));
    }

    @org.springframework.web.bind.annotation.GetMapping("/generate-hash")
    public ResponseEntity<?> generateHash(@org.springframework.web.bind.annotation.RequestParam String password) {
        String hash = passwordEncoder.encode(password);
        return ResponseEntity.ok(Map.of(
                "password", password,
                "hash", hash,
                "hashLength", hash.length()
        ));
    }

    @org.springframework.web.bind.annotation.GetMapping("/check-user")
    public ResponseEntity<?> checkUser(@org.springframework.web.bind.annotation.RequestParam String email) {
        return usuarioRepo.findByEmail(email)
                .map(u -> ResponseEntity.ok(Map.of(
                        "exists", true,
                        "email", u.getEmail(),
                        "nombre", u.getNombre(),
                        "rol", u.getRol().name(),
                        "passwordSet", u.getPassword() != null,
                        "passwordLength", u.getPassword() != null ? u.getPassword().length() : 0,
                        "activo", u.isActivo()
                )))
                .orElseGet(() -> ResponseEntity.ok(Map.of("exists", false, "email", email)));
    }

    @org.springframework.web.bind.annotation.PostMapping("/test-password")
    public ResponseEntity<?> testPassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        
        if (email == null || password == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "email and password required"));
        }

        return usuarioRepo.findByEmail(email)
                .map(u -> {
                    boolean matches = u.getPassword() != null && passwordEncoder.matches(password, u.getPassword());
                    return ResponseEntity.ok(Map.of(
                            "email", email,
                            "passwordMatches", matches,
                            "passwordSet", u.getPassword() != null,
                            "passwordStartsWith", u.getPassword() != null && u.getPassword().length() > 10 
                                    ? u.getPassword().substring(0, 10) : "N/A"
                    ));
                })
                .orElseGet(() -> ResponseEntity.status(404).body(Map.of("message", "user not found")));
    }

    @PostMapping("/update-password-direct")
    public ResponseEntity<?> updatePasswordDirect(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String newPassword = body.get("password");
        
        if (email == null || newPassword == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "email and password required"));
        }

        String hashedPassword = passwordEncoder.encode(newPassword);
        
        // Usar query nativa para evitar el problema del enum
        int updated = usuarioRepo.updatePasswordNative(email, hashedPassword);
        
        if (updated > 0) {
            return ResponseEntity.ok(Map.of(
                    "message", "Password updated successfully",
                    "email", email,
                    "updated", true
            ));
        } else {
            return ResponseEntity.status(404).body(Map.of("message", "user not found"));
        }
    }

    @org.springframework.web.bind.annotation.GetMapping("/test-creditos-pendientes")
    public ResponseEntity<?> testCreditosPendientes(@org.springframework.web.bind.annotation.RequestParam String email) {
        try {
            var usuario = usuarioRepo.findByEmail(email);
            if (usuario.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of("error", "Usuario no encontrado", "email", email));
            }
            return ResponseEntity.ok(Map.of(
                    "usuario", email,
                    "rol", usuario.get().getRol().name(),
                    "message", "Usuario encontrado, verificar CreditoService.getCreditosPendientes con este rol"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "error", e.getMessage(),
                    "stackTrace", e.getStackTrace()[0].toString()
            ));
        }
    }

    @org.springframework.web.bind.annotation.GetMapping("/test-cartera-morosa")
    public ResponseEntity<?> testCarteraMorosa() {
        try {
            return ResponseEntity.ok(Map.of(
                    "message", "Endpoint accesible, verificar RecuperacionesService.getCarteraMorosa"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "error", e.getMessage(),
                    "stackTrace", e.getStackTrace()[0].toString()
            ));
        }
    }

    @org.springframework.web.bind.annotation.GetMapping("/diagnostico-datos")
    public ResponseEntity<?> diagnosticoDatos() {
        try {
            var todosUsuarios = usuarioRepo.findAll();
            
            long clientesActivos = todosUsuarios.stream()
                .filter(u -> u.getRol() == pe.bancoconfianza.backend.model.Usuario.Rol.CLIENTE && u.isActivo())
                .count();
            
            long gerentes = todosUsuarios.stream()
                .filter(u -> u.getRol() == pe.bancoconfianza.backend.model.Usuario.Rol.GERENCIA)
                .count();
            
            long asesores = todosUsuarios.stream()
                .filter(u -> u.getRol() == pe.bancoconfianza.backend.model.Usuario.Rol.ASESOR)
                .count();
            
            return ResponseEntity.ok(Map.of(
                    "totalUsuarios", todosUsuarios.size(),
                    "clientesActivos", clientesActivos,
                    "gerentes", gerentes,
                    "asesores", asesores,
                    "rolesDetalle", todosUsuarios.stream()
                        .collect(java.util.stream.Collectors.groupingBy(
                            u -> u.getRol().name(),
                            java.util.stream.Collectors.counting()
                        ))
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                    "error", e.getMessage(),
                    "type", e.getClass().getName()
            ));
        }
    }
}
