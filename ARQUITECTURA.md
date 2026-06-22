# Arquitectura del Sistema — BCP HomebanKing

## Stack Tecnológico

| Capa       | Tecnología                              |
|------------|-----------------------------------------|
| Frontend   | React 19 + Vite 8 + Tailwind CSS 4     |
| Backend    | Spring Boot 3.3 + Java 21               |
| Base datos | H2 (dev) / PostgreSQL via Supabase (prod) |
| Auth       | Supabase Auth + JWT (JJWT 0.12.5)      |
| Seguridad  | Spring Security + RBAC via @PreAuthorize |
| ORM        | Spring Data JPA + Hibernate             |

---

## Módulos del Sistema

### 🏦 HomebanKing (Frontend — Cliente)

| Ruta                      | Componente               | Descripción                              |
|---------------------------|--------------------------|------------------------------------------|
| `/dashboard`              | DashboardPage            | Dashboard con cuentas, movimientos, KPIs |
| `/cuentas`                | CuentasPage              | Lista de cuentas, movimientos, export CSV |
| `/cuentas/movimientos`    | CuentasPage              | Historial con filtros                    |
| `/transferencias`         | TransferenciasPage       | Transferencias propias y a terceros      |
| `/solicitar-credito`      | SolicitarCreditoPage     | Formulario + simulador + RDS en tiempo real |
| `/creditos`               | MisCreditosPage          | Mis solicitudes + cronograma de cuotas   |
| `/perfil`                 | PerfilPage               | Editar perfil + auditoría de accesos     |

### ⚙️ Core Bancario (Frontend — Operadores)

| Ruta                      | Componente               | Roles Permitidos                  |
|---------------------------|--------------------------|-----------------------------------|
| `/core`                   | CoreLandingPage          | ASESOR, ADMIN, JEFE_REGIONAL, RIESGOS, COMITE, GERENCIA |
| `/core/solicitudes`       | CoreSolicitudesPage      | Todos los roles Core              |
| `/core/evaluacion`        | CoreSolicitudesPage      | Todos los roles Core              |
| `/core/comite`            | CoreSolicitudesPage      | COMITE, GERENCIA, ADMIN           |
| `/core/desembolsos`       | CoreDesembolsosPage      | ADMIN, JEFE_REGIONAL, GERENCIA    |
| `/core/recuperaciones`    | CoreRecuperacionesPage   | Todos los roles Core              |
| `/core/cobranzas`         | CoreRecuperacionesPage   | Todos los roles Core              |
| `/admin/usuarios`         | AdminUsuariosPage        | ADMIN, GERENCIA                   |
| `/auditoria`              | AuditoriaPage            | ADMIN, GERENCIA                   |

---

## Modelo de Roles (RBAC)

```
CLIENTE       → HomebanKing: dashboard, cuentas, créditos, transferencias, perfil
ASESOR        → Core: solicitudes, recuperaciones/cobranza
ADMIN         → Core: solicitudes, desembolsos, usuarios, auditoría
JEFE_REGIONAL → Core: solicitudes, desembolsos
RIESGOS       → Core: solicitudes (dictamen de riesgos)
COMITE        → Core: solicitudes (resolución comité)
GERENCIA      → Core: todo + desembolsos + admin + auditoría
```

---

## Flujo de Crédito

```
Cliente solicita
      ↓
Evaluación automática (Score + RDS + Sujeto de Crédito)
      ↓
¿Elegible?
  NO → RECHAZADO
  SÍ → Determinar Ruta de Aprobación por monto:
         ≤ S/ 5,000   → ASESOR (auto-aprobado si score ≥ 700)
         ≤ S/ 20,000  → ADMIN
         ≤ S/ 50,000  → JEFE_REGIONAL
         ≤ S/ 150,000 → RIESGOS
         > S/ 150,000 → COMITE
      ↓
Aprobación por actor competente
      ↓
APROBADO → Desembolso por ADMIN/JEFE_REGIONAL/GERENCIA
      ↓
DESEMBOLSADO → Cronograma francés generado (cuotas iguales)
      ↓
Seguimiento de mora → Bandas: AL_DÍA / PREVENTIVA / TEMPRANA / TARDÍA / JUDICIAL / CASTIGO
```

---

## Reglas de Negocio Implementadas

### Scoring Crediticio (0–1000)
| Factor                      | Puntos |
|-----------------------------|--------|
| Historial sin mora          | +400   |
| Cuota/Ingreso < 20%         | +300   |
| Cuota/Ingreso < 30%         | +200   |
| Cuota/Ingreso < 40%         | +100   |
| 2+ cuentas activas          | +200   |
| 1 cuenta activa             | +100   |
| RDS actual < 20%            | +100   |

Score mínimo para crédito: **400**

### RDS — Ratio Deuda/Sueldo
| RDS         | Semáforo  | Decisión       |
|-------------|-----------|----------------|
| ≤ 30%       | 🟢 Verde  | Aprobable      |
| 31% – 50%   | 🟡 Amarillo | Análisis     |
| > 50%       | 🔴 Rojo   | Rechazado      |

### Bandas de Mora
| Banda      | Días mora  |
|------------|-----------|
| AL_DÍA     | 0         |
| PREVENTIVA | 1–30      |
| TEMPRANA   | 31–60     |
| TARDÍA     | 61–120    |
| JUDICIAL   | 121+      |
| CASTIGO    | 180+      |

---

## Seguridad

- **JWT Bearer Token** en cada request
- **RBAC** con `@PreAuthorize` en todos los endpoints sensibles
- **CORS** configurado por entorno (CorsProperties)
- **Stateless session** (sin cookies de sesión)
- **Auditoría** asíncrona de todas las acciones relevantes

---

## Entidades del Dominio

```
Usuario       — id, nombre, email, password, rol, activo, createdAt
Cuenta        — id, numeroCuenta, tipo, saldo, moneda, activa, usuario
Movimiento    — id, cuenta, tipo, monto, saldoAnterior, saldoPosterior, descripcion
Credito       — id, numeroOperacion, cliente, tipoProducto, monto, tea, plazo, score, rds, estado, ruta
CuotaCredito  — id, credito, numeroCuota, fechaVencimiento, capital, interes, cuotaTotal, estadoCuota, diasMora
GestionCobranza — id, credito, gestor, tipoGestion, resultado, descripcion, fechaCompromiso, diasMora
AuditoriaEvento — id, emailActor, rolActor, accion, modulo, descripcion, recursoId, ipOrigen, createdAt
```

---

## Endpoints REST

### Auth
| Método | Ruta                          | Rol Requerido   |
|--------|-------------------------------|-----------------|
| GET    | /api/auth/status              | Público         |
| GET    | /api/auth/me                  | Autenticado     |
| PUT    | /api/auth/me/perfil           | Autenticado     |
| GET    | /api/auth/usuarios            | ADMIN, GERENCIA |
| PUT    | /api/auth/usuarios/{id}/rol   | ADMIN           |
| PUT    | /api/auth/usuarios/{id}/activo| ADMIN           |

### Cuentas
| Método | Ruta                          | Rol Requerido   |
|--------|-------------------------------|-----------------|
| GET    | /api/cuentas                  | Autenticado     |
| GET    | /api/cuentas/{id}/movimientos | Autenticado     |
| POST   | /api/cuentas/transferir       | Autenticado     |
| POST   | /api/cuentas/prueba           | Autenticado     |

### Créditos
| Método | Ruta                          | Rol Requerido                    |
|--------|-------------------------------|----------------------------------|
| POST   | /api/creditos/solicitar       | CLIENTE                          |
| GET    | /api/creditos/mis-solicitudes | CLIENTE                          |
| GET    | /api/creditos/{id}            | Autenticado                      |
| GET    | /api/creditos/{id}/cronograma | Autenticado                      |
| GET    | /api/creditos/pendientes      | Roles Core                       |
| PUT    | /api/creditos/{id}/resolver   | Roles Core                       |
| POST   | /api/creditos/{id}/desembolsar| ADMIN, JEFE_REGIONAL, GERENCIA   |
| GET    | /api/creditos/todas           | ADMIN, GERENCIA, JEFE_REGIONAL   |

### Recuperaciones
| Método | Ruta                                     | Rol Requerido                  |
|--------|------------------------------------------|--------------------------------|
| GET    | /api/recuperaciones/cartera-morosa       | Roles Core (sin CLIENTE)       |
| POST   | /api/recuperaciones/gestiones            | ASESOR, ADMIN, JEFE, RIESGOS   |
| GET    | /api/recuperaciones/gestiones/{creditoId}| Roles Core (sin CLIENTE)       |
| POST   | /api/recuperaciones/{id}/judicial        | JEFE_REGIONAL, RIESGOS, ADMIN  |
| POST   | /api/recuperaciones/{id}/castigar        | GERENCIA, ADMIN                |

### Auditoría
| Método | Ruta                      | Rol Requerido   |
|--------|---------------------------|-----------------|
| GET    | /api/auditoria            | ADMIN, GERENCIA |
| GET    | /api/auditoria/mis-accesos| Autenticado     |

---

## Usuarios de Prueba (DEV)

| Email                  | Contraseña | Rol           |
|------------------------|------------|---------------|
| cliente@viabcp.com     | 123456     | CLIENTE       |
| asesor@viabcp.com      | 123456     | ASESOR        |
| admin@viabcp.com       | 123456     | ADMIN         |
| jefe@viabcp.com        | 123456     | JEFE_REGIONAL |
| riesgos@viabcp.com     | 123456     | RIESGOS       |
| comite@viabcp.com      | 123456     | COMITE        |
| gerencia@viabcp.com    | 123456     | GERENCIA      |
| demo@viabcp.com        | 123456     | CLIENTE       |
