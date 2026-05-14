-- ─────────────────────────────────────────────────────────────
-- Datos de prueba para perfil DEV (H2 en memoria)
-- Usuario: demo@bancoconfianza.pe / 123456
-- ─────────────────────────────────────────────────────────────

-- Usuario de prueba
-- Password "123456" hasheado con BCrypt (10 rounds)
INSERT INTO usuarios (nombre, email, password, rol, activo, created_at)
VALUES (
    'Demo Usuario',
    'demo@bancoconfianza.pe',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    'CLIENTE',
    true,
    CURRENT_TIMESTAMP
);

-- Cuenta de ahorros para el usuario demo
INSERT INTO cuentas (numero_cuenta, tipo, saldo, moneda, activa, usuario_id, created_at)
VALUES (
    '0011223344556677',
    'AHORROS',
    3450.00,
    'PEN',
    true,
    1,
    CURRENT_TIMESTAMP
);

-- Cuenta corriente para el usuario demo
INSERT INTO cuentas (numero_cuenta, tipo, saldo, moneda, activa, usuario_id, created_at)
VALUES (
    '0011223344556688',
    'CORRIENTE',
    1200.50,
    'PEN',
    true,
    1,
    CURRENT_TIMESTAMP
);

-- Movimientos de ejemplo
INSERT INTO movimientos (cuenta_id, tipo, monto, saldo_anterior, saldo_posterior, descripcion, created_at)
VALUES
    (1, 'DEPOSITO',   2000.00, 1450.00, 3450.00, 'Depósito inicial', CURRENT_TIMESTAMP),
    (1, 'PAGO_SERVICIO', 185.40, 3635.40, 3450.00, 'Luz del Sur', CURRENT_TIMESTAMP);
