package pe.bancoconfianza.backend.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import pe.bancoconfianza.backend.dto.CuentaDto;
import pe.bancoconfianza.backend.dto.MovimientoDto;
import pe.bancoconfianza.backend.dto.TransferenciaRequest;
import pe.bancoconfianza.backend.service.CuentaService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cuentas")
public class CuentaController {

    private final CuentaService cuentaService;

    public CuentaController(CuentaService cuentaService) {
        this.cuentaService = cuentaService;
    }

    /**
     * GET /api/cuentas
     * Devuelve las cuentas activas del usuario autenticado.
     */
    @GetMapping
    public ResponseEntity<List<CuentaDto>> getMisCuentas(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(cuentaService.getCuentasDelUsuario(userDetails.getUsername()));
    }

    /**
     * GET /api/cuentas/{id}/movimientos
     * Devuelve los últimos 10 movimientos de la cuenta indicada.
     */
    @GetMapping("/{id}/movimientos")
    public ResponseEntity<List<MovimientoDto>> getMovimientos(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(cuentaService.getMovimientos(id, userDetails.getUsername()));
    }

    /**
     * POST /api/cuentas/transferir
     * Realiza una transferencia entre cuentas.
     */
    @PostMapping("/transferir")
    public ResponseEntity<Map<String, String>> transferir(
            @Valid @RequestBody TransferenciaRequest req,
            @AuthenticationPrincipal UserDetails userDetails) {
        cuentaService.transferir(req, userDetails.getUsername());
        return ResponseEntity.ok(Map.of("message", "Transferencia realizada con éxito."));
    }

    /**
     * POST /api/cuentas/prueba
     * Crea una cuenta de ahorros de prueba con S/ 1,000 (solo para desarrollo).
     */
    @PostMapping("/prueba")
    public ResponseEntity<CuentaDto> crearCuentaPrueba(
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(cuentaService.crearCuentaPrueba(userDetails.getUsername()));
    }
}
