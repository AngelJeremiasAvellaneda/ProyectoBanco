import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import BackendStatusWidget from './components/BackendStatusWidget';
import LandingPage    from './pages/LandingPage';
import LoginPage      from './pages/LoginPage';
import DashboardPage  from './pages/DashboardPage';
import ProductosPage  from './pages/ProductosPage';
import NosotrosPage   from './pages/NosotrosPage';
import SimuladorPage  from './pages/SimuladorPage';
import ContactoPage   from './pages/ContactoPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/"           element={<LandingPage />} />
            <Route path="/productos"  element={<ProductosPage />} />
            <Route path="/nosotros"   element={<NosotrosPage />} />
            <Route path="/simulador"  element={<SimuladorPage />} />
            <Route path="/contacto"   element={<ContactoPage />} />
            <Route path="/login"      element={<LoginPage />} />

            {/* Protected */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Widget flotante de estado del backend — visible en todas las páginas */}
          <BackendStatusWidget />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
