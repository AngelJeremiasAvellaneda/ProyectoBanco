import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import BackendStatusWidget from './components/BackendStatusWidget';

/* Páginas existentes */
import LandingPage    from './pages/LandingPage';
import LoginPage      from './pages/LoginPage';
import DashboardPage  from './pages/DashboardPage';
import ProductosPage  from './pages/ProductosPage';
import NosotrosPage   from './pages/NosotrosPage';
import SimuladorPage  from './pages/SimuladorPage';
import ContactoPage   from './pages/ContactoPage';
import NotFoundPage   from './pages/NotFoundPage';

/* Página "próximamente" — para rutas en construcción */
import ComingSoonPage from './pages/ComingSoonPage';

/* Rutas en construcción — todas usan ComingSoonPage */
const COMING_SOON_ROUTES = [
  /* Segmentos */
  '/pymes', '/empresas',
  /* Acciones del dashboard */
  '/transferir', '/yapear', '/pagar-tarjetas', '/pagar-servicios',
  '/tipo-cambio-dashboard', '/historial',
  /* Dashboard sub-secciones */
  '/operaciones', '/explora',
  /* Soluciones digitales */
  '/banca-internet', '/app-bcp', '/yape', '/pagos-qr',
  /* Beneficios */
  '/puntos', '/descuentos', '/cashback',
  /* Educación / legales */
  '/preguntas','/educacion', '/tarifario', '/privacidad', '/terminos', '/cookies',
  /* Sub-productos: Cuentas */
  '/productos/cuentas/cuenta-contigo',
  '/productos/cuentas/cuenta-digital',
  '/productos/cuentas/cuenta-premio',
  '/productos/cuentas/cuenta-sueldo',
  '/productos/cuentas/cuenta-ilimitada',
  '/productos/cuentas/cuenta-cts',
  /* Sub-productos: Tarjetas */
  '/productos/tarjetas/visa-clasica',
  '/productos/tarjetas/visa-oro',
  '/productos/tarjetas/visa-platinum',
  '/productos/tarjetas/debito',
  /* Sub-productos: Préstamos */
  '/productos/prestamos/credito-efectivo',
  '/productos/prestamos/instacash',
  '/productos/prestamos/credito-hipotecario',
  '/productos/prestamos/credito-vehicular',
  '/productos/prestamos/credito-agropecuario',
  /* Sub-productos: Seguros */
  '/productos/seguros/seguro-vida',
  '/productos/seguros/seguro-vehicular',
  '/productos/seguros/seguro-hogar',
  '/productos/seguros/seguro-salud',
  /* Sub-productos: Inversiones */
  '/productos/inversiones/deposito-plazo',
  '/productos/inversiones/fondo-conservador',
  '/productos/inversiones/fondo-balanceado',
  '/productos/inversiones/fondo-inversion',
  /* Sub-productos: Tipo de cambio */
  '/productos/tipo-cambio/online',
  '/productos/tipo-cambio/agencia',
  /* Sub-productos: Servicios */
  '/productos/servicios/pago-servicios',
  '/productos/servicios/recarga-celular',
  '/productos/servicios/transferencias',
];

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* ── Páginas públicas principales ── */}
            <Route path="/"                element={<LandingPage />} />
            <Route path="/productos"       element={<ProductosPage />} />
            <Route path="/productos/:cat"  element={<ProductosPage />} />
            <Route path="/nosotros"        element={<NosotrosPage />} />
            <Route path="/simulador"       element={<SimuladorPage />} />
            <Route path="/contacto"        element={<ContactoPage />} />
            <Route path="/login"           element={<LoginPage />} />

            {/* ── Página protegida ── */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            {/* ── Rutas en construcción ── */}
            {COMING_SOON_ROUTES.map(path => (
              <Route key={path} path={path} element={<ComingSoonPage />} />
            ))}

            {/* ── 404 — ruta no existe ── */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>

          <BackendStatusWidget />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
