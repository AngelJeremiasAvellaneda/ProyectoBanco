# Credenciales de Prueba - BancoConfianza

**Contraseña general**: `123456` (Todos los usuarios)  
**Entorno**: Cargados automáticamente en `DataInitializer.java`

---

## 🏦 Homebanking - Clientes

| Email | Nombre | Contraseña | Rol | Estado | Cuenta |
|-------|--------|------------|-----|--------|---------|
| **demo@banco.pe** | Ana García López | 123456 | CLIENTE | ✅ Activo | 0011223344550001 (S/ 4,850) |
| **pedro@banco.pe** | Pedro Sánchez Ruiz | 123456 | CLIENTE | ✅ Activo | 0022334455660001 (S/ 750) |
| **lucia@banco.pe** | Lucía Ramírez Torres | 123456 | CLIENTE | ✅ Activo | 0033445566770001 (S/ 3,200) |
| **miguel@banco.pe** | Miguel Quispe Huanca | 123456 | CLIENTE | ✅ Activo | 0044556677880001 (S/ 500) |
| **carmen@banco.pe** | Carmen Flores Vidal | 123456 | CLIENTE | ✅ Activo | 0055667788990001 (S/ 1,800) |
| **jose@banco.pe** | José Mamani Ccopa | 123456 | CLIENTE | ✅ Activo | 0066778899000001 (S/ 200) |
| **rosa@banco.pe** | Rosa Condori Apaza | 123456 | CLIENTE | ✅ Activo | 0077889900110001 (S/ 0) |
| **luis@banco.pe** | Luis Vargas Medina | 123456 | CLIENTE | ✅ Activo | 0088990011220001 (S/ 950) |

### **Acceder a Homebanking**
1. Ir a: http://localhost:5173/login
2. Seleccionar **"Por Correo"** (segunda pestaña)
3. Ingresar email y contraseña `123456`
4. Dashboard cliente con saldo, cuentas, transferencias, solicitud de crédito

---

## 🏢 Core Crediticio - Personal Interno

| Email | Nombre | Contraseña | Rol | Módulos de Acceso |
|-------|--------|------------|-----|------------------|
| **asesor@banco.pe** | Carlos Mendoza Vega | 123456 | ASESOR | Bandeja créditos, Colocaciones, Mis KPIs |
| **asesor2@banco.pe** | Sofía Paredes Luna | 123456 | ASESOR | Bandeja créditos, Colocaciones, Mis KPIs |
| **jefe@banco.pe** | Roberto Castillo Díaz | 123456 | JEFE_REGIONAL | Panel regional, Ranking asesores, Colocaciones vs Meta |
| **riesgos@banco.pe** | Laura Fernández Ortiz | 123456 | RIESGOS | Análisis riesgos, Score distribution, Semáforo RDS |
| **comite@banco.pe** | Miguel Ángel Paredes | 123456 | COMITE | Evaluación créditos complejos, Aprobar/rechazar |
| **gerencia@banco.pe** | Dr. Jorge Villanueva Reyes | 123456 | GERENCIA | KPIs ejecutivos, Reportes, Auditoría, Gestión usuarios |
| **admin@banco.pe** | María Torres Silva | 123456 | ADMIN | Administración usuarios, Auditoría SOC, Configuración |

### **Acceder a Core**
1. Ir a: http://localhost:5173/login
2. Seleccionar **"Por Correo"** (segunda pestaña)
3. Ingresar email y contraseña `123456`
4. Redirige automáticamente según rol: `/core`, `/gerencia`, `/admin`, etc.

---

## 📊 Permisos por Rol

### **CLIENTE**
```
✅ Ver saldo y cuentas
✅ Transferencias
✅ Solicitar crédito
✅ Ver estado crédito y próxima cuota
✅ Estado de cuenta (movimientos)
```

### **ASESOR**
```
✅ Bandeja créditos (EN_EVALUACION)
✅ Ver evaluación: score crediticio, RDS, semáforo
✅ Aprobar o rechazar con motivo
✅ Dashboard colocaciones
✅ Ranking de asesores (regional)
```

### **JEFE_REGIONAL**
```
✅ Aprobación créditos HIPOTECARIOS
✅ Aprobación créditos monto > S/ 50,000
✅ Panel regional: colocaciones vs meta
✅ Ranking asesores, mora regional
✅ Desembolso automático si ruta = ASESOR
```

### **RIESGOS**
```
✅ Análisis crediticio avanzado
✅ Score distribution (deciles 0-200 a 900+)
✅ Semáforo RDS: VERDE / AMARILLO / ROJO
✅ Evaluaciones pendientes
✅ Dictamen para créditos complejos
```

### **COMITE**
```
✅ Aprobación créditos > S/ 150,000
✅ Aprobación créditos con RDS AMARILLO/ROJO
✅ Resolución final (aprueba o rechaza)
✅ Genera desembolso automático
```

### **GERENCIA**
```
✅ KPIs ejecutivos: colocaciones, mora, recuperaciones
✅ Rankings: por asesor, por región, productos
✅ Reportes: cumplimiento meta, performance
✅ Auditoría general (lectura)
✅ Gestión de usuarios (crear, editar roles)
```

### **ADMIN**
```
✅ Administración total de usuarios
✅ Crear/editar/eliminar roles
✅ Auditoría SOC completa
✅ Configuración del sistema
✅ Acceso a /actuator/health (diagnosticos)
```

---

## 🎮 Flujos de Prueba Recomendados

### **1. Flujo Homebanking → Crédito Desembolsado (5 min)**
```
1. Login como CLIENTE (demo@banco.pe / 123456)
2. Dashboard → "Solicitar Crédito"
3. Llenar: PERSONAL, S/ 5,000, 24 meses
4. Ver "En evaluación"
5. Logout, login como ASESOR (asesor@banco.pe / 123456)
6. Bandeja → Evaluar solicitud
7. Click "Aprobar automáticamente" (score ≥ 700)
8. Ver desembolso y nueva cuota en dashboard cliente
```

### **2. Cartera Morosa - Todas las Bandas (3 min)**
```
1. Login como RIESGOS (riesgos@banco.pe / 123456)
2. Panel Riesgos → "Evaluaciones en Bandeja"
3. Ver 5 créditos:
   ├─ CRED-2025-000010: PREVENTIVA (18 días)
   ├─ CRED-2025-000020: TEMPRANA (45 días)
   ├─ CRED-2025-000030: TARDÍA (90 días)
   ├─ CRED-2024-000050: JUDICIAL (135 días)
   └─ CRED-2024-000001: CASTIGO (200 días)
4. Click en cada crédito → Ver score, RDS, semáforo
```

### **3. Gestión Regional - Dashboard Jefe (2 min)**
```
1. Login como JEFE_REGIONAL (jefe@banco.pe / 123456)
2. Panel Regional → KPIs:
   ├─ Colocaciones regionales
   ├─ Mora regional: ~13%
   ├─ Productividad del equipo
   └─ Cumplimiento meta
3. Gráficas: Colocaciones vs Meta, Ranking asesores
4. Solicitudes pendientes: ver tabla y click "Desembolsar"
```

### **4. Auditoría - Trazabilidad Completa (2 min)**
```
1. Login como ADMIN (admin@banco.pe / 123456)
2. Auditoría → Centro de Auditoría SOC
3. Ver heatmap: Día × Hora (actividad por franja horaria)
4. Filtros: Por módulo (CRÉDITO, AUTH, CUENTA, COBRANZA)
5. Exportar CSV: Tabla completa de eventos
```

---

## 💳 Cuentas Bancarias de Prueba

| Número | Cliente | Tipo | Saldo | Movimientos |
|--------|---------|------|-------|------------|
| **0011223344550001** | Ana García | Ahorros | S/ 4,850 | +5 (desembolsos, pagos) |
| **0011223344550002** | Ana García | Corriente | S/ 1,200.50 | +1 (salario) |
| **0022334455660001** | Pedro Sánchez | Ahorros | S/ 750 | +2 (recepción transferencia) |
| **0033445566770001** | Lucía Ramírez | Ahorros | S/ 3,200 | +1 |
| **0044556677880001** | Miguel Quispe | Ahorros | S/ 500 | +1 |
| **0055667788990001** | Carmen Flores | Ahorros | S/ 1,800 | +1 |
| **0066778899000001** | José Mamani | Ahorros | S/ 200 | +1 |
| **0077889900110001** | Rosa Condori | Ahorros | S/ 0 | +1 |
| **0088990011220001** | Luis Vargas | Ahorros | S/ 950 | +1 |

---

## 📋 Créditos de Prueba

| Operación | Cliente | Producto | Monto | Estado | Score | RDS | Banda |
|-----------|---------|----------|-------|--------|-------|-----|-------|
| **CRED-2026-000001** | Ana García | PERSONAL | S/ 5,000 | ✅ DESEMBOLSADO | 750 | 11% | VERDE |
| **CRED-2026-000002** | Ana García | HIPOTECARIO | S/ 80,000 | ⏳ PEND_JEFE_REGIONAL | 820 | 22% | VERDE |
| **CRED-2026-000003** | Lucía Ramírez | VEHICULAR | S/ 15,000 | ⏳ APROBADO | 680 | 14% | VERDE |
| **CRED-2026-000004** | Miguel Quispe | PERSONAL | S/ 3,500 | 🔄 EN_EVALUACION | 610 | 14% | VERDE |
| **CRED-2026-000005** | José Mamani | PERSONAL | S/ 8,000 | ❌ RECHAZADO | 350 | 70% | **ROJO** |
| **CRED-2026-000006** | Carmen Flores | MICROEMPRESA | S/ 45,000 | ⏳ PEND_RIESGOS | 730 | 30% | **AMARILLO** |
| **CRED-2026-000007** | Luis Vargas | AGROPECUARIO | S/ 200,000 | ⏳ PEND_COMITE | 790 | 49% | **AMARILLO** |
| **CRED-2025-000010** | Pedro Sánchez | PERSONAL | S/ 4,000 | MORA | 620 | 11% | **PREVENTIVA** (18d) |
| **CRED-2025-000020** | Miguel Quispe | PERSONAL | S/ 3,000 | MORA | 580 | 19% | **TEMPRANA** (45d) |
| **CRED-2025-000030** | Carmen Flores | VEHICULAR | S/ 12,000 | MORA | 600 | 15% | **TARDÍA** (90d) |
| **CRED-2024-000050** | Rosa Condori | PERSONAL | S/ 6,000 | MORA | 520 | 23% | **JUDICIAL** (135d) |
| **CRED-2024-000001** | Luis Vargas | PERSONAL | S/ 2,500 | CASTIGO | 440 | 17% | **CASTIGO** (200d) |

---

## 🔒 Notas de Seguridad

⚠️ **IMPORTANTE**: Estas credenciales son **SOLO para desarrollo/testing**.

En producción:
- ✅ Cambiar todas las contraseñas
- ✅ Generar contraseñas aleatorias con 12+ caracteres
- ✅ JWT secret en vault (no en código)
- ✅ 2FA habilitado para roles críticos (ADMIN, GERENCIA, RIESGOS)
- ✅ Logs de acceso monitoreados

---

## 🚨 Resolver Problemas Comunes

### **No puedo hacer login**
```
1. ¿Backend corriendo en puerto 8080?
   → curl http://localhost:8080/api/public/health
   → Debe retornar: {"status":"UP","service":"BancoConfianza API"}

2. ¿Email y contraseña correctos?
   → Revisar archivo (están arriba)

3. ¿Base de datos PostgreSQL activa?
   → psql -U postgres -d bancoconfianza -c "SELECT COUNT(*) FROM usuarios;"
   → Debe retornar: 15
```

### **Crédito no me deja solicitar**
```
1. Verifica que tengas rol CLIENTE
   → Tu usuario debe estar en tabla

2. ¿Tienes al menos una cuenta activa?
   → GET /api/cuentas → Must return ≥ 1 cuenta

3. Intenta con PERSONAL S/ 1,000 (mínimo)
```

### **No veo créditos en bandeja ASESOR**
```
1. Login como ASESOR
2. Solicita crédito como CLIENTE primero
3. Espera a que aparezca en "Bandeja de Solicitudes"
   (puede tardar 5 seg por propagación caché)
4. Si sigue sin aparecer: Refresh página F5
```

---

## 📞 Contacto Soporte

- 🐛 **Bugs**: Revisar logs en `backend/logs/`
- 📱 **API**: `curl http://localhost:8080/api/public/health`
- 🔍 **Auditoría**: `GET /api/auditoria` (solo ADMIN)
- 🗄️ **BD**: Ver DataInitializer.java para semilla de datos

---

**Última actualización**: Junio 23, 2026  
**Versión**: 1.0
