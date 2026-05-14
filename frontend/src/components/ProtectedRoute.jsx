import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { sesion, cargando } = useAuth();

  if (cargando) {
    return (
      <div className="min-h-screen bg-theme flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-11 h-11 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
          <p className="text-theme-muted text-sm">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  if (!sesion) return <Navigate to="/login" replace />;
  return children;
}
