# Autoevaluación — BCP HomebanKing
## Rúbrica del Curso — Checklist Completo

---

## ✅ CHECKLIST GENERAL

### Integración Core ↔ Homebanking
- [x] El cliente solicita crédito desde `/solicitar-credito`
- [x] El Core evalúa automáticamente (Score + RDS + Sujeto de Crédito)
- [x] El Core aprueba/rechaza desde `/core/solicitudes`
- [x] Al desembolsar: se acredita saldo en cuenta del cliente (`/core/desembolsos`)
- [x] El cliente ve su crédito activo y cronograma desde `/creditos`
- [x] Al desembolsar se genera automáticamente el cronograma francés

### Reglas de Negocio
- [x] Scoring crediticio (0–1000) con 4 factores
- [x] RDS — Ratio Deuda/Sueldo con semáforo Verde/Amarillo/Rojo
- [x] Sujeto de crédito (score mínimo 400 + RDS ≤ 50%)
- [x] Ruta de aprobación por montos (5 niveles)
- [x] Auto-aprobación si ASESOR + score ≥ 700
- [x] Cronograma francés (cuotas iguales)
- [x] Mora diaria (0.1% del capital por día)
- [x] Bandas de mora: AL_DÍA, PREVENTIVA, TEMPRANA, TARDÍA, JUDICIAL, CASTIGO

### RBAC + JWT
- [x] JWT Bearer Token en todos los requests
- [x] `@PreAuthorize` en todos los endpoints sensibles
- [x] ProtectedRoute en frontend con verificación de roles
- [x] 7 roles: CLIENTE, ASESOR, ADMIN, JEFE_REGIONAL, RIESGOS, COMITE, GERENCIA
- [x] Dashboard diferenciado por rol (accesos rápidos distintos)
- [x] No confiar solo en frontend — validación en backend

### Recuperaciones
- [x] Cartera morosa con KPIs (total créditos, en mora, tasa mora, saldo por banda)
- [x] Bandas de mora con clasificación automática
- [x] Registro de gestiones de cobranza (llamada, visita, email, carta, acuerdo)
- [x] Historial de gestiones por crédito
- [x] Derivación a vía judicial (días mora ≥ 121)
- [x] Castigo contable (días mora > 180)

### Auditoría
- [x] Registro de: Login, Logout, Solicitud Crédito, Aprobación, Rechazo, Desembolso
- [x] Registro de: Transferencia, Gestión Cobranza, Judicial, Castigo, Edición Usuario
- [x] Guardar: Usuario, Fecha, Acción, IP, Módulo, Descripción, Recurso ID
- [x] Vista de auditoría en `/auditoria` (ADMIN/GERENCIA)
- [x] Mis accesos en `/perfil` (cualquier usuario autenticado)

---

## 📱 MÓDULOS FRONTEND

### HomebanKing — Cliente
| Módulo                | Ruta                    | Estado  |
|-----------------------|-------------------------|---------|
| Dashboard             | `/dashboard`            | ✅ |
| Mis Cuentas           | `/cuentas`              | ✅ |
| Movimientos / Estado  | `/cuentas/movimientos`  | ✅ |
| Transferencias propias| `/transferencias`       | ✅ |
| Transferencias terceros| `/transferencias/terceros` | ✅ |
| Solicitar Crédito + Simulador | `/solicitar-credito` | ✅ |
| Mis Créditos          | `/creditos`             | ✅ |
| Cronograma de Cuotas  | `/creditos` (detalle)   | ✅ |
| Estado de solicitud   | `/creditos/estado`      | ✅ |
| Perfil + Seguridad    | `/perfil`               | ✅ |
| Auditoría de accesos  | `/perfil`               | ✅ |

### Core Bancario — Operadores
| Módulo                | Ruta                    | Roles           | Estado |
|-----------------------|-------------------------|-----------------|--------|
| Hub con KPIs por rol  | `/core`                 | Todos Core      | ✅ |
| Solicitudes           | `/core/solicitudes`     | Todos Core      | ✅ |
| Evaluación            | `/core/evaluacion`      | Todos Core      | ✅ |
| Comité                | `/core/comite`          | COMITE/GERENCIA | ✅ |
| Desembolsos           | `/core/desembolsos`     | ADMIN/JEFE/GERENCIA | ✅ |
| Recuperaciones        | `/core/recuperaciones`  | Todos Core      | ✅ |
| Cobranzas             | `/core/cobranzas`       | Todos Core      | ✅ |
| Gestión Usuarios      | `/admin/usuarios`       | ADMIN/GERENCIA  | ✅ |
| Auditoría             | `/auditoria`            | ADMIN/GERENCIA  | ✅ |

---

## 🔧 BACKEND

### Entidades / Tablas
- [x] usuarios
- [x] cuentas
- [x] movimientos
- [x] creditos
- [x] cuotas_credito
- [x] gestiones_cobranza
- [x] auditoria_eventos

### APIs
- [x] /api/auth/** — perfil, usuarios admin
- [x] /api/cuentas/** — cuentas, movimientos, transferencias
- [x] /api/creditos/** — solicitud, evaluación, resolución, desembolso, cronograma
- [x] /api/recuperaciones/** — cartera morosa, gestiones, judicial, castigo
- [x] /api/auditoria/** — eventos globales y por usuario

---

## 📊 UX/UI

- [x] Modo oscuro / claro
- [x] Responsive (mobile-first)
- [x] Toast notifications
- [x] Loading states
- [x] Estados vacíos con mensajes informativos
- [x] Cards con KPIs
- [x] Tablas modernas con filtros y búsqueda
- [x] Exportación CSV (movimientos, auditoría)
- [x] Semáforo RDS visual en tiempo real
- [x] Badges de estado con colores semánticos
- [x] Gráficos de bandas de mora

---

## 📚 DOCUMENTACIÓN

- [x] ARQUITECTURA.md — diagrama y descripción completa
- [x] AUTOEVALUACION.md — este archivo
- [x] backend/README.md — instrucciones de ejecución
- [x] Javadoc en servicios y controladores
- [x] Comentarios en código frontend

---

## 🎯 CALIFICACIÓN ESPERADA: 20/20

| Criterio                          | Puntos |
|-----------------------------------|--------|
| Integración Core ↔ Homebanking   | 4/4    |
| Reglas de negocio (Score/RDS/Mora)| 4/4    |
| RBAC + JWT                        | 3/3    |
| Recuperaciones                    | 3/3    |
| Arquitectura + Código             | 3/3    |
| Documentación                     | 3/3    |
| **TOTAL**                         | **20/20** |
