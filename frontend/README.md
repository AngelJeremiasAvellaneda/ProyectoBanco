# 🏦 Home Banking BCP - Frontend

**Arquitectura modular de nivel empresarial para sistema bancario**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Zod](https://img.shields.io/badge/Zod-3.0-3E67B1?logo=zod)](https://zod.dev/)

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Arquitectura](#-arquitectura)
- [Instalación](#-instalación)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Path Aliases](#-path-aliases)
- [Documentación](#-documentación)
- [Stack Tecnológico](#-stack-tecnológico)

---

## ✨ Características

### Core Features

- 🏗️ **Arquitectura Modular** - Organizado por roles del negocio
- 🔒 **Seguridad Robusta** - Session timeout, validación, guards RBAC
- ♿ **Accesibilidad WCAG 2.1 AA** - Compatible con lectores de pantalla
- 🎨 **Modo Oscuro** - Theme switcher integrado
- 📱 **Responsive Design** - Mobile-first con Tailwind CSS
- ⚡ **Optimización** - Lazy loading, code splitting, memoization
- 🌐 **i18n Ready** - Preparado para multi-idioma
- 🧪 **Testing Ready** - Estructura preparada para tests

### Funcionalidades Bancarias

**Cliente:**
- ✅ Dashboard personalizado
- ✅ Gestión de cuentas
- ✅ Transferencias
- ✅ Solicitud de créditos
- ✅ Historial de movimientos

**Core Bancario:**
- ✅ Evaluación de créditos (Asesor)
- ✅ Desembolsos (Jefe Regional)
- ✅ Análisis de riesgos (Riesgos)
- ✅ Aprobaciones (Comité)
- ✅ Recuperaciones (Cobranza)
- ✅ KPIs ejecutivos (Gerencia)

**Administración:**
- ✅ Gestión de usuarios
- ✅ Auditoría completa
- ✅ Configuración del sistema

---

## 🏗️ Arquitectura

### Arquitectura Modular por Roles

```
src/
├── app/              → Configuración global (router, guards, providers)
├── modules/          → Módulos por rol del negocio
│   ├── cliente/      → Dashboard, cuentas, créditos, perfil
│   ├── asesor/       → Evaluación de solicitudes
│   ├── admin/        → Gestión usuarios, auditoría
│   └── ...           → 9 módulos totales
├── shared/           → Componentes, hooks, utils reutilizables
├── layouts/          → Layouts por contexto (public, client, core, admin)
├── pages/            → Solo páginas públicas + auth + errores
└── context/          → Contexts globales (Auth, Theme)
```

### Principios de Diseño

- ✅ **Separation of Concerns** - Cada módulo es independiente
- ✅ **DRY (Don't Repeat Yourself)** - Componentes reutilizables en shared/
- ✅ **Single Responsibility** - Cada componente tiene una función clara
- ✅ **Scalability** - Fácil agregar nuevos módulos sin afectar existentes

---

## 🚀 Instalación

### Requisitos Previos

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Pasos

```bash
# 1. Clonar el repositorio
git clone <repository-url>
cd banco/frontend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# 4. Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

---

## 📜 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo con HMR

# Build
npm run build        # Genera build de producción optimizado
npm run preview      # Preview del build de producción

# Linting
npm run lint         # Ejecuta ESLint para verificar código

# Testing (próximamente)
npm run test         # Ejecuta tests unitarios
npm run test:e2e     # Ejecuta tests E2E con Cypress
```

---

## 📁 Estructura del Proyecto

### Vista General

```
frontend/
├── public/                  → Assets estáticos
├── src/
│   ├── app/                 → ⚙️ Configuración
│   │   ├── router/          → Rutas centralizadas
│   │   ├── guards/          → AuthGuard, RoleGuard, GuestGuard
│   │   └── providers/       → Providers wrapper
│   │
│   ├── modules/             → 🎯 Módulos por Rol
│   │   ├── cliente/         → Cliente bancario
│   │   ├── asesor/          → Asesor de créditos
│   │   ├── jefeRegional/    → Jefe regional
│   │   ├── riesgos/         → Análisis de riesgos
│   │   ├── comite/          → Comité de créditos
│   │   ├── gerencia/        → Gerencia general
│   │   ├── cobranza/        → Gestión de cobranza
│   │   ├── admin/           → Administrador
│   │   └── shared/          → Componentes core compartidos
│   │
│   ├── shared/              → 🔧 Recursos Compartidos
│   │   ├── components/      → UI components (FormField, Toast, etc.)
│   │   ├── hooks/           → Custom hooks (useToast, useConfirm)
│   │   ├── validators/      → Schemas Zod
│   │   ├── utils/           → Utilidades (formatters, helpers)
│   │   └── constants/       → Constantes (roles, routes, etc.)
│   │
│   ├── layouts/             → 📐 Layouts
│   │   ├── PublicLayout     → Páginas públicas
│   │   ├── ClientLayout     → Cliente (nav horizontal)
│   │   ├── CoreLayout       → Core bancario (sidebar)
│   │   └── AdminLayout      → Admin (sidebar)
│   │
│   ├── pages/               → 📄 Páginas Públicas
│   │   ├── public/          → Landing, productos, nosotros
│   │   ├── auth/            → Login
│   │   └── errors/          → 404, 403
│   │
│   ├── context/             → 🌐 Contexts
│   │   ├── AuthContext      → Autenticación + Session timeout
│   │   └── ThemeContext     → Modo oscuro
│   │
│   ├── services/            → 🔌 API Services
│   │   ├── authService      → Login, logout, refresh
│   │   ├── creditoService   → Créditos
│   │   └── cuentaService    → Cuentas
│   │
│   ├── App.jsx              → Punto de entrada
│   └── main.jsx             → Render root
│
├── .env                     → Variables de entorno
├── vite.config.js           → Configuración Vite + aliases
├── jsconfig.json            → Path aliases para IDE
├── tailwind.config.js       → Configuración Tailwind
├── eslint.config.js         → Configuración ESLint
└── package.json             → Dependencias
```

---

## 🔗 Path Aliases

Para imports más limpios y mantenibles:

```javascript
// ✅ Con alias (recomendado)
import { FormField, useToast, formatSoles } from '@/shared';
import { authService } from '@/services';
import ClientLayout from '@/layouts/ClientLayout';

// ❌ Sin alias (evitar)
import FormField from '../../../shared/components/FormField';
import { useToast } from '../../../shared/hooks/useToast';
```

### Aliases Configurados

| Alias | Ruta |
|-------|------|
| `@/*` | `src/*` |
| `@/shared/*` | `src/shared/*` |
| `@/modules/*` | `src/modules/*` |
| `@/layouts/*` | `src/layouts/*` |
| `@/pages/*` | `src/pages/*` |
| `@/context/*` | `src/context/*` |
| `@/services/*` | `src/services/*` |

---

## 📚 Documentación

### Guías Disponibles

- **[DIAGNOSTICO_REFACTORIZACION.md](./DIAGNOSTICO_REFACTORIZACION.md)**  
  Análisis técnico completo de la arquitectura

- **[REPORTE_REFACTORIZACION.md](./REPORTE_REFACTORIZACION.md)**  
  Reporte detallado de cambios y migraciones

- **[GUIA_DESARROLLO.md](./GUIA_DESARROLLO.md)**  
  Buenas prácticas, convenciones, ejemplos

- **[RESUMEN_EJECUTIVO.md](./RESUMEN_EJECUTIVO.md)**  
  Vista de alto nivel para stakeholders

### Recursos Útiles

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Zod Documentation](https://zod.dev/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 🛠️ Stack Tecnológico

### Core

- **[React 19](https://react.dev/)** - UI Framework
- **[Vite 6](https://vitejs.dev/)** - Build Tool & Dev Server
- **[React Router 7](https://reactrouter.com/)** - Client-side routing
- **[TailwindCSS 4](https://tailwindcss.com/)** - Utility-first CSS

### State & Data

- **[Context API](https://react.dev/reference/react/useContext)** - Global state
- **[Axios](https://axios-http.com/)** - HTTP client
- **[Zod](https://zod.dev/)** - Schema validation

### UI & Icons

- **[Lucide React](https://lucide.dev/)** - Icon library
- **Custom Components** - Biblioteca propia de componentes

### Dev Tools

- **[ESLint](https://eslint.org/)** - Linting
- **[Prettier](https://prettier.io/)** - Code formatting (recomendado)

### Backend

- **Spring Boot** - API REST
- **PostgreSQL** - Base de datos
- **JWT** - Autenticación

---

## 🔒 Seguridad

### Implementaciones

- ✅ **Session Timeout** - Auto-logout después de 15 min de inactividad
- ✅ **JWT Authentication** - Tokens seguros en localStorage
- ✅ **Role-Based Access Control** - Guards por rol y permiso
- ✅ **Input Validation** - Validación con Zod en frontend
- ✅ **XSS Protection** - Sanitización de inputs
- ✅ **Error Boundaries** - Captura de errores sin exponer stack traces

---

## ♿ Accesibilidad

### Cumplimiento WCAG 2.1 AA

- ✅ **Labels en formularios** - Todos los inputs tienen labels
- ✅ **ARIA attributes** - aria-label, aria-describedby, aria-invalid
- ✅ **Navegación por teclado** - Tab, Enter, Escape funcionan
- ✅ **Focus visible** - Focus indicators claros
- ✅ **Skip-to-main** - Link para saltar navegación
- ✅ **Contraste de colores** - Mínimo 4.5:1
- ✅ **Touch targets** - Mínimo 44x44px

---

## 🧪 Testing (Próximamente)

### Estrategia de Testing

```
Tests Unitarios (Vitest)          → 70% cobertura objetivo
Tests de Integración              → Componentes + Hooks
Tests E2E (Cypress)               → Flujos críticos
Tests de Accesibilidad (axe-core) → WCAG compliance
```

---

## 🤝 Contribuir

### Workflow

1. Fork el repositorio
2. Crear branch feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'feat: agregar nueva funcionalidad'`
4. Push al branch: `git push origin feature/nueva-funcionalidad`
5. Abrir Pull Request

### Convenciones

- **Commits:** Seguir [Conventional Commits](https://www.conventionalcommits.org/)
- **Código:** Seguir la [GUIA_DESARROLLO.md](./GUIA_DESARROLLO.md)
- **Tests:** Agregar tests para nuevas funcionalidades

---

## 📄 Licencia

Este proyecto es privado y confidencial. Todos los derechos reservados.

---

## 👥 Equipo

**Desarrollo:**
- Equipo de Desarrollo BCP

**Arquitectura:**
- Kiro AI - Senior Software Architect

**Última actualización:** 8 de Junio de 2026  
**Versión:** 2.0.0
