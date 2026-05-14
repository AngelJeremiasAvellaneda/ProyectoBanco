import { createContext, useContext, useState, useEffect } from 'react';
import {
  obtenerSesion,
  cerrarSesion,
  guardarSesion,
  cerrarSesionSupabase,
} from '../services/authService';
import { supabase } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [sesion, setSesion]     = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Carga sesión guardada en localStorage
    setSesion(obtenerSesion());
    setCargando(false);

    // Escucha cambios de sesión de Supabase solo si está configurado
    if (!supabase) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          cerrarSesion();
          setSesion(null);
        } else if (event === 'TOKEN_REFRESHED' && session) {
          const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
          if (usuario) {
            guardarSesion(session.access_token, usuario);
            setSesion({ token: session.access_token, usuario });
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  function iniciarSesion(token, usuario) {
    guardarSesion(token, usuario);
    setSesion({ token, usuario });
  }

  async function salir() {
    await cerrarSesionSupabase();
    setSesion(null);
  }

  return (
    <AuthContext.Provider value={{ sesion, cargando, iniciarSesion, salir }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
