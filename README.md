# BancoConfianza - Sistema Integral de Banca Digital

**Estado**: ✅ Producción (v1.0)  
**Última actualización**: Junio 2026  
**Tecnología**: Java 21 + Spring Boot 3 + React 18 + PostgreSQL 16

---

## 📋 Descripción General

BancoConfianza es un **sistema bancario integral** que cubre el flujo completo desde apertura de cuenta digital (Homebanking) hasta recuperaciones de crédito (R2). Implementa:

✅ **Homebanking** - Gestión de cuentas, transferencias, consultas  
✅ **Créditos** - Solicitud, evaluación, aprobación, desembolso, cuotas  
✅ **Recuperaciones** - Gestión de mora en 5 bandas (Preventiva → Judicial → Castigo)  
✅ **RBAC Completo** - 7 roles con permisos segmentados (CLIENTE, ASESOR, JEFE_REGIONAL, RIESGOS, COMITE, GERENCIA, ADMIN)  
✅ **Auditoría SOC** - Trazabilidad completa de operaciones  
✅ **Power BI Ready** - Base de datos diseñada para reporting

---

## 🏗️ Arquitectura

```
BancoConfianza/
├── backend/                      # Java 21 + Spring Boot 3
│   ├── src/main/java/
│   │   ├── controller/          # 10 endpoints RESTful
│   │   ├── service/             # Lógica de negocio (créditos, recuperaciones)
│   │   ├── model/               # JPA entities (Usuario, Cuenta, Credito, etc.)
│   │   ├── repository/          # Data access layer
│   │   ├── config/              # Security, CORS, JWT, DataInitializer
│   │   └── exception/           # Global error handling
│   ├── resources/
│   │   ├── application.yml      # Configuración Spring
│   │   └── data.sql             # Seed con 15 usuarios de prueba + créditos
│   └── pom.xml
│
├── frontend/                     # React 18 + Vite
│   ├── src/
│   │   ├── modules/             # Dashboards por rol (CLIENTE, ASESOR, JEFE, etc.)
│   │   ├── services/            # API calls (authService, creditoService, etc.)
│   │   ├── context/             # Auth, Theme, Toast contexts
│   │   └── shared/              # Componentes reutilizables
│   └── package.json
│
└── README.md                     # Este archivo
```

---

## 🚀 Instalación y Ejecución

### **Backend**

```bash
cd backend/

# Compilar y ejecutar
./mvnw clean spring-boot:run

# O si prefieres JAR
./mvnw clean package
java -jar target/homebanking-backend.jar
```

**Requisitos**:
- Java 21+
- Maven 3.9+
- PostgreSQL 16+ (configurado en `application.yml`)

**Puerto**: http://localhost:8080

---

### **Frontend**

```bash
cd frontend/

# Instalar dependencias
npm install

# Desarrollo (hot-reload)
npm run dev

# Producción
npm run build
npm run preview
```

**Requisitos**:
- Node.js 18+
- npm 9+

**Puerto**: http://localhost:5173

---

## 🔐 Seguridad

- **JWT** para autenticación stateless
- **BCrypt** para hash de contraseñas
- **CORS** configurado para localhost (dev) y dominio producción
- **RBAC** con 7 roles y permisos granulares
- **SQL Injection Prevention** con JPA parameterizado
- **Error Handling** sanitizado en producción (sin stack traces a clientes)
- **Auditoría SOC** - Todas las operaciones registradas

---

## 📊 Flujo de Negocio

### **1. Homebanking (Cliente)**
```
CLIENTE accede a:
  ├─ Dashboard: Saldo, cuentas, créditos activos
  ├─ Transferencias: Entre cuentas propias, a terceros
  ├─ Solicitar Crédito: 4 productos (PERSONAL, VEHICULAR, HIPOTECARIO, MICROEMPRESA)
  └─ Estado de Cuenta: Movimientos, cuotas, mora
```

### **2. Core Crediticio (ASESOR → JEFE_REGIONAL → RIESGOS/COMITE)**
```
ASESOR:
  ├─ Recibe solicitud del cliente (score automático: 300-850)
  ├─ Calcula RDS (Ratio Deuda-Servicio) → Semáforo: VERDE/AMARILLO/ROJO
  └─ Aprueba (score ≥ 700 + RDS ≤ 50%) o rechaza

JEFE_REGIONAL:
  ├─ Revisa créditos HIPOTECARIOS y montos altos (>S/50,000)
  └─ Aprueba o rechaza (genera desembolso automático si ≤S/50,000)

RIESGOS/COMITE:
  ├─ Dictamen para créditos complejos (RDS AMARILLO, montos >S/150,000)
  └─ Aprobación final o rechazo
```

### **3. Recuperaciones R2 (JEFE_REGIONAL → GESTOR RIESGOS)**
```
Sistema detecta mora:
  ├─ PREVENTIVA   (1-30 días)   → Llamada, SMS
  ├─ TEMPRANA     (31-60 días)  → Visita, Carta
  ├─ TARDÍA       (61-120 días) → Carta Notarial
  ├─ JUDICIAL     (121-180 días)→ Derivación legal
  └─ CASTIGO      (>180 días)   → Castigo contable
```

---

## 📱 Acceso por Rol

Ver archivo **`CREDENCIALES_PRUEBA.md`** para usuarios de prueba con credenciales.

Roles disponibles:
- **CLIENTE**: Homebanking + solicitud crédito
- **ASESOR**: Evaluación créditos, colocaciones
- **JEFE_REGIONAL**: Aprobación créditos altos, gestión regional
- **RIESGOS**: Análisis crediticio, scores, RDS
- **COMITE**: Aprobación créditos complejos
- **GERENCIA**: KPIs, reportes, auditoría
- **ADMIN**: Gestión usuarios, configuración sistema

---

## 💾 Base de Datos

### **Tablas Principales**
- `usuarios` - Todos los usuarios del sistema
- `cuentas` - Cuentas bancarias (ahorros, corriente)
- `creditos` - Solicitudes y créditos desembolsados
- `cuotas_credito` - Cronograma de pagos (1000+ cuotas de prueba)
- `movimientos` - Transferencias, depósitos, pagos (1000+ registros)
- `gestiones_cobranza` - Historial de recuperación R2
- `auditoria_eventos` - Trazabilidad completa SOC

### **Conexión PostgreSQL**
```yaml
# application.yml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/bancoconfianza
    username: postgres
    password: YOUR_PASSWORD
```

---

## 🧪 Datos de Prueba

Sistema incluye:
- **15 usuarios** con acceso inmediato (ver `CREDENCIALES_PRUEBA.md`)
- **9 cuentas bancarias** con saldos reales
- **7 créditos** en todos los estados (EN_EVALUACION, APROBADO, DESEMBOLSADO, RECHAZADO)
- **5 créditos en mora** mostrando todas las bandas de recuperación
- **1000+ cuotas** con cronograma completo
- **1000+ movimientos** para análisis

Se cargan automáticamente al iniciar el backend (ver `DataInitializer.java`).

---

## 📈 Power BI

Estructura preparada para dashboards:

```sql
-- Colocaciones por mes
SELECT DATE_TRUNC('month', fecha_desembolso), COUNT(*), SUM(monto)
FROM creditos
WHERE estado = 'DESEMBOLSADO'
GROUP BY DATE_TRUNC('month', fecha_desembolso);

-- Tasa de mora por banda
SELECT rango_dias_mora, COUNT(*), ROUND(100.0 * COUNT(*) / total, 2) as pct_mora
FROM (SELECT *, (SELECT COUNT(*) FROM cuotas_credito WHERE estado_cuota = 'VENCIDA') as total)
GROUP BY rango_dias_mora;

-- Productividad por asesor
SELECT usuario_id, COUNT(*) as colocaciones, SUM(monto) as volumen
FROM creditos
WHERE estado IN ('APROBADO', 'DESEMBOLSADO') AND asesor_id IS NOT NULL
GROUP BY usuario_id
ORDER BY COUNT(*) DESC;
```

---

## 🔄 API Endpoints

### **Autenticación**
- `POST /api/auth/login` - Login usuario (email + password)
- `GET /api/auth/me` - Datos usuario autenticado
- `GET /api/auth/usuarios` - Lista usuarios (ADMIN)

### **Créditos**
- `POST /api/creditos/solicitar` - Cliente solicita crédito
- `GET /api/creditos/pendientes` - Créditos sin resolver (ASESOR, JEFE_REGIONAL)
- `POST /api/creditos/resolver` - Asesor/Jefe aprueba o rechaza
- `GET /api/creditos/mis-solicitudes` - Créditos del cliente autenticado

### **Cuentas & Movimientos**
- `GET /api/cuentas` - Lista cuentas usuario
- `GET /api/cuentas/{id}/movimientos` - Historial de cuenta
- `POST /api/cuentas/transferencia` - Nueva transferencia

### **Recuperaciones**
- `GET /api/cartera-morosa` - Estado mora por banda
- `POST /api/recuperaciones/gestionar` - Registrar gestión de cobranza

### **Auditoría**
- `GET /api/auditoria` - Eventos auditoría (admin)

---

## 🛠️ Configuración Producción

### **1. Variables de Entorno**
```bash
# Backend
SPRING_DATASOURCE_URL=jdbc:postgresql://prod-db:5432/bancoconfianza
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=***VAULT***
JWT_SECRET=***VAULT***

# Frontend
VITE_API_BASE_URL=https://api.bancoconfianza.pe
```

### **2. Seguridad**
- ✅ JWT secret en vault
- ✅ CORS restringido a dominio oficial
- ✅ `/actuator/**` protegido (solo ADMIN)
- ✅ `/api/public/health` sin información sensible
- ✅ Demo data y test users removidos
- ✅ Console logs sanitizados

### **3. Build**
```bash
# Backend JAR
./mvnw clean package -DskipTests

# Frontend build
npm run build  # → dist/
```

---

## 📞 Soporte

Para problemas técnicos, revisar:
1. `backend/logs/` - Logs del servidor
2. Browser DevTools → Network/Console → Errores API
3. PostgreSQL logs si hay problemas de base de datos
4. Auditoría: `GET /api/auditoria` para trazabilidad

---

## 📄 Licencia

Proyecto educativo - BCP 2026

---

## 🎯 Próximas Mejoras (Roadmap)

- [ ] Notificaciones por email/SMS
- [ ] Two-Factor Authentication (2FA)
- [ ] Apple/Google Pay integration
- [ ] Machine learning para scoring dinámico
- [ ] Blockchain para auditoría inmutable
- [ ] Mobile app (iOS/Android)

---

**¿Listo para comenzar?** Ver `CREDENCIALES_PRUEBA.md` para acceder como ADMIN, ASESOR, CLIENTE, etc.
