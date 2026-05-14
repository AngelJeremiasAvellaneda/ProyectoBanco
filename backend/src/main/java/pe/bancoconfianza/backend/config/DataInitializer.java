package pe.bancoconfianza.backend.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import pe.bancoconfianza.backend.model.Cuenta;
import pe.bancoconfianza.backend.model.Movimiento;
import pe.bancoconfianza.backend.model.Usuario;
import pe.bancoconfianza.backend.repository.CuentaRepository;
import pe.bancoconfianza.backend.repository.MovimientoRepository;
import pe.bancoconfianza.backend.repository.UsuarioRepository;

import java.math.BigDecimal;

/**
 * Carga datos de prueba cuando la BD está vacía.
 * Funciona con cualquier perfil — detecta automáticamente si no hay usuarios.
 */
@Configuration
public class DataInitializer {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    @Bean
    CommandLineRunner seedData(
            UsuarioRepository usuarioRepo,
            CuentaRepository cuentaRepo,
            MovimientoRepository movimientoRepo,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {
            if (usuarioRepo.existsByEmail("demo@bancoconfianza.pe")) {
                log.info("[Seed] Usuario demo ya existe — omitiendo.");
                return;
            }

            // ── Usuario demo ──────────────────────────────────────────
            Usuario usuario = new Usuario();
            usuario.setNombre("Demo Usuario");
            usuario.setEmail("demo@bancoconfianza.pe");
            usuario.setPassword(passwordEncoder.encode("123456"));
            usuario.setRol(Usuario.Rol.CLIENTE);
            usuario = usuarioRepo.save(usuario);
            log.info("[Seed] Usuario creado: {} / 123456", usuario.getEmail());

            // ── Cuenta de Ahorros ─────────────────────────────────────
            Cuenta ahorros = new Cuenta();
            ahorros.setNumeroCuenta("0011223344556677");
            ahorros.setTipo(Cuenta.TipoCuenta.AHORROS);
            ahorros.setSaldo(new BigDecimal("3450.00"));
            ahorros.setMoneda("PEN");
            ahorros.setUsuario(usuario);
            ahorros = cuentaRepo.save(ahorros);

            // ── Cuenta Corriente ──────────────────────────────────────
            Cuenta corriente = new Cuenta();
            corriente.setNumeroCuenta("0011223344556688");
            corriente.setTipo(Cuenta.TipoCuenta.CORRIENTE);
            corriente.setSaldo(new BigDecimal("1200.50"));
            corriente.setMoneda("PEN");
            corriente.setUsuario(usuario);
            cuentaRepo.save(corriente);

            // ── Movimientos de ejemplo ────────────────────────────────
            Movimiento m1 = new Movimiento();
            m1.setCuenta(ahorros);
            m1.setTipo(Movimiento.TipoMovimiento.DEPOSITO);
            m1.setMonto(new BigDecimal("2000.00"));
            m1.setSaldoAnterior(new BigDecimal("1450.00"));
            m1.setSaldoPosterior(new BigDecimal("3450.00"));
            m1.setDescripcion("Deposito inicial");
            movimientoRepo.save(m1);

            Movimiento m2 = new Movimiento();
            m2.setCuenta(ahorros);
            m2.setTipo(Movimiento.TipoMovimiento.PAGO_SERVICIO);
            m2.setMonto(new BigDecimal("185.40"));
            m2.setSaldoAnterior(new BigDecimal("3635.40"));
            m2.setSaldoPosterior(new BigDecimal("3450.00"));
            m2.setDescripcion("Luz del Sur");
            movimientoRepo.save(m2);

            log.info("[Seed] Completado: 1 usuario, 2 cuentas, 2 movimientos.");
        };
    }
}
