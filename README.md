# BancoConfianza — Home Banking

**Autor:** Angel Addair Jeremias Avellaneda  
**Curso:** Desarrollo de Aplicaciones Web  
**Fecha:** Mayo 2026

---

## Descripción

Aplicación web de banca en línea para la financiera BancoConfianza. Permite a los clientes autenticarse, consultar sus cuentas, ver movimientos y acceder a productos financieros desde cualquier dispositivo.

El sistema está compuesto por dos partes independientes que se comunican entre sí:

- **Frontend** — React 19 + Vite + Tailwind CSS
- **Backend** — Spring Boot 3.3 + Spring Security + JPA

- **Cuenta de prueba** 
— angel123@gmail.com 
— angel123

La autenticación se delega completamente a **Supabase Auth**, que emite tokens JWT firmados con RS256. El backend valida esos tokens descargando las claves públicas del endpoint JWKS de Supabase.

---

## Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                     NAVEGADOR                           │
│                                                         │
│   React 19 (Vite)          Puerto 5173                  │
│   ├── Supabase Auth SDK  ──────────────► Supabase Cloud │
│   │   (login / logout)                  (JWT RS256)     │
│   └── Axios ─────────────────────────► Spring Boot      │
│       (Bearer JWT en header)            Puerto 8080     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  SPRING BOOT BACKEND                    │
│                                                         │
│   JwtAuthFilter ──► valida JWT con JWKS de Supabase     │
│   SecurityConfig ──► rutas públicas / protegidas        │
│   CuentaController ──► /api/cuentas/**                  │
│   HealthController ──► /api/public/health               │
│   H2 (dev) / PostgreSQL Supabase (prod)                 │
└─────────────────────────────────────────────────────────┘
```

---

## Requisitos previos

| Herramienta | Versión mínima | Verificar |
|---|---|---|
| Java JDK | 21 | `java -version` |
| Node.js | 18 | `node -v` |
| npm | 9 | `npm -v` |
| Maven Wrapper | incluido | `.\mvnw.cmd --version` |

No se necesita instalar Maven globalmente — el proyecto incluye `mvnw.cmd` que usa la instalación local.

---

## Estructura del proyecto

```
banco/
├── backend/                    # Spring Boot API
│   ├── src/main/java/pe/bancoconfianza/backend/
│   │   ├── config/             # SecurityConfig, CORS, JWT properties, DataInitializer
│   │   ├── controller/         # AuthController, CuentaController, HealthController
│   │   ├── dto/                # LoginRequest, AuthResponse, CuentaDto, MovimientoDto
│   │   ├── exception/          # GlobalExceptionHandler
│   │   ├── model/              # Usuario, Cuenta, Movimiento
│   │   ├── repository/         # UsuarioRepository, CuentaRepository, MovimientoRepository
│   │   ├── security/           # JwtService (valida RS256 Supabase), JwtAuthFilter
│   │   └── service/            # UsuarioService, CuentaService
│   ├── src/main/resources/
│   │   ├── application.properties          # Configuración principal (H2 por defecto)
│   │   └── application-dev.properties      # Perfil dev con H2 + consola
│   ├── mvnw.cmd                # Maven Wrapper para Windows
│   └── pom.xml
│
├── frontend/                   # React SPA
│   ├── src/
│   │   ├── components/         # Navbar, Footer, ProtectedRoute, BackendStatusWidget
│   │   ├── context/            # AuthContext, ThemeContext
│   │   ├── hooks/              # useBackendStatus
│   │   ├── lib/                # supabase.js (cliente Supabase)
│   │   ├── pages/              # LandingPage, LoginPage, DashboardPage, ...
│   │   └── services/           # authService.js (login/logout con Supabase)
│   ├── .env                    # Variables de entorno (VITE_SUPABASE_URL, etc.)
│   └── package.json
│
└── README.md                   # Este archivo
```

---

## Configuración inicial

### 1. Variables de entorno del frontend

Edita `frontend/.env`:

```env
VITE_SUPABASE_URL=https://utdlprovegxdjjgsykxl.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_rNBB2yKCL5MqvaR511Ef2A_QsfqlNAM
```

Estos valores se obtienen en: **Supabase Dashboard → Project Settings → API**

### 2. Variables de entorno del backend (opcional)

El backend funciona con H2 en memoria por defecto. Si quieres conectar a Supabase PostgreSQL, define estas variables de entorno antes de levantar:

```env
SUPABASE_DB_URL=jdbc:postgresql://aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require
SUPABASE_DB_USER=postgres.utdlprovegxdjjgsykxl
SUPABASE_DB_PASSWORD=tu_password
SUPABASE_URL=https://utdlprovegxdjjgsykxl.supabase.co
```

---

## Ejecución

Se necesitan **dos terminales** abiertas simultáneamente.

### Terminal 1 — Backend (Spring Boot)

```cmd
cd backend
.\mvnw.cmd spring-boot:run
```

El servidor arranca en `http://localhost:8080`.  
Verifica que está corriendo: `http://localhost:8080/api/public/health`

Respuesta esperada:
```json
{
  "status": "UP",
  "service": "BancoConfianza API",
  "usuarios": 1
}
```

### Terminal 2 — Frontend (React + Vite)

```cmd
cd frontend
npm install
npm run dev
```

La aplicación abre en `http://localhost:5173`.

---

## Flujo de uso

```
1. Abre http://localhost:5173
   └── Ves la landing page pública de BancoConfianza

2. Clic en "Banca en Línea" o "Ingresar a mi cuenta"
   └── Te lleva al formulario de login

3. Ingresa credenciales de un usuario registrado en Supabase Auth
   └── El SDK de Supabase autentica y devuelve un JWT

4. El JWT se guarda en localStorage y se envía al backend
   └── El backend valida la firma RS256 con las claves JWKS de Supabase

5. Accedes al Dashboard privado
   └── Ves tus cuentas, saldos y movimientos

6. Clic en "Cerrar sesión"
   └── Se limpia la sesión en Supabase y en localStorage
   └── Vuelves a la landing page

7. Si intentas ir a /dashboard sin sesión
   └── ProtectedRoute te redirige al login automáticamente
```

---

## Crear usuario de prueba

Desde el **Supabase Dashboard → Authentication → Users → Add user → Create new user**:

| Campo | Valor |
|---|---|
| Email | demo@bancoconfianza.pe |
| Password | 123456 |

O usa cualquier email/password válido — Supabase Auth lo gestiona.

---

## Endpoints del backend

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| GET | `/api/public/health` | No | Estado del servidor |
| GET | `/actuator/health` | No | Health check de Spring |
| GET | `/api/cuentas` | JWT | Cuentas del usuario |
| GET | `/api/cuentas/{id}/movimientos` | JWT | Últimos movimientos |
| POST | `/api/cuentas/transferir` | JWT | Transferencia entre cuentas |
| POST | `/api/cuentas/prueba` | JWT | Crear cuenta de prueba |

---

## Tecnologías utilizadas

### Frontend
| Tecnología | Versión | Uso |
|---|---|---|
| React | 19 | Framework UI |
| Vite | 8 | Bundler y dev server |
| Tailwind CSS | 4 | Estilos utilitarios |
| React Router | 7 | Navegación SPA |
| Axios | 1.x | Llamadas HTTP al backend |
| Supabase JS | 2.x | Autenticación con Supabase Auth |
| Lucide React | 1.x | Iconos |

### Backend
| Tecnología | Versión | Uso |
|---|---|---|
| Java | 21 | Lenguaje |
| Spring Boot | 3.3 | Framework principal |
| Spring Security | 6.x | Seguridad y filtros JWT |
| Spring Data JPA | 3.x | Acceso a datos |
| JJWT | 0.12.5 | Parseo y validación de JWT |
| H2 | 2.x | Base de datos en memoria (dev) |
| PostgreSQL | 42.x | Driver para Supabase (prod) |
| Spring Actuator | 3.x | Health checks |

### Infraestructura
| Servicio | Uso |
|---|---|
| Supabase Auth | Autenticación de usuarios (JWT RS256) |
| Supabase PostgreSQL | Base de datos en producción |

---

## Características implementadas

- **Página pública** — Landing page con información de la financiera, productos, testimonios y noticias
- **Autenticación** — Login/logout con Supabase Auth, tokens JWT RS256
- **Rutas protegidas** — `ProtectedRoute` redirige al login si no hay sesión
- **Navbar inteligente** — Muestra avatar y menú de usuario cuando hay sesión activa
- **Dashboard privado** — Panel con cuentas, saldos, movimientos y acciones rápidas
- **Tema claro/oscuro** — Toggle persistente en localStorage
- **Widget de estado** — Indicador flotante que monitorea la conexión con el backend cada 30 segundos, con toast de 5 minutos al detectar cambios
- **Páginas adicionales** — Productos, Nosotros, Simulador de crédito, Contacto
- **CORS configurado** — Backend acepta peticiones desde `localhost:5173`
- **Manejo de errores** — `GlobalExceptionHandler` con respuestas consistentes

---

## Notas de desarrollo

- El backend usa **H2 en memoria** por defecto. Los datos se pierden al reiniciar. Para persistencia, configura las variables de entorno de Supabase PostgreSQL.
- El `DataInitializer` crea automáticamente un usuario demo si la tabla está vacía.
- La consola H2 está disponible en `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:homebanking`, usuario: `sa`, sin contraseña).
- El widget de estado del backend usa `GET /api/public/health` como endpoint principal y `GET /actuator/health` como fallback.

---

## Auditoría

**Desarrollado por:** Angel Addair Jeremias Avellaneda  
**Institución:** BancoConfianza S.A.  
**Supervisado por:** Superintendencia de Banca, Seguros y AFP del Perú (SBS)  
**Versión:** 1.0.0  
**Fecha de entrega:** Mayo 2026
