import axios from 'axios';
import { supabase, supabaseConfigured } from '../lib/supabase';

// ── Cliente axios para el backend Spring Boot ──────────────────────────────
export const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

// Adjunta el token de Supabase en cada request al backend
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Login con Supabase Auth ────────────────────────────────────────────────
export async function login(email, password) {
  if (!supabaseConfigured || !supabase) {
    throw Object.assign(new Error('supabase_not_configured'), {
      response: {
        data: {
          message:
            'Supabase no está configurado. Agrega VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en frontend/.env',
        },
      },
    });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw Object.assign(new Error(error.message), {
      response: { data: { message: traducirError(error.message) } },
    });
  }

  const token   = data.session.access_token;
  const usuario = {
    id:    data.user.id,
    email: data.user.email,
    name:
      data.user.user_metadata?.nombre ||
      data.user.user_metadata?.full_name ||
      data.user.email.split('@')[0],
  };

  return { token, user: usuario };
}

// ── Registro con Supabase Auth ─────────────────────────────────────────────
export async function register(email, password, nombre) {
  if (!supabaseConfigured || !supabase) {
    throw Object.assign(new Error('supabase_not_configured'), {
      response: { data: { message: 'Supabase no está configurado.' } },
    });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { nombre } },
  });

  if (error) {
    throw Object.assign(new Error(error.message), {
      response: { data: { message: traducirError(error.message) } },
    });
  }

  if (!data.session) {
    throw Object.assign(new Error('confirm_email'), {
      response: {
        data: { message: 'Revisa tu correo para confirmar tu cuenta.' },
      },
    });
  }

  return {
    token: data.session.access_token,
    user: {
      id:    data.user.id,
      email: data.user.email,
      name:  nombre || data.user.email.split('@')[0],
    },
  };
}

// ── Cerrar sesión ──────────────────────────────────────────────────────────
export async function cerrarSesionSupabase() {
  if (supabase) await supabase.auth.signOut();
  cerrarSesion();
}

// ── Helpers de sesión local ────────────────────────────────────────────────
export function guardarSesion(token, usuario) {
  localStorage.setItem('token', token);
  localStorage.setItem('usuario', JSON.stringify(usuario));
}

export function obtenerSesion() {
  const token   = localStorage.getItem('token');
  const usuario = localStorage.getItem('usuario');
  if (!token) return null;
  try {
    return { token, usuario: JSON.parse(usuario) };
  } catch {
    return null;
  }
}

export function cerrarSesion() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
}

export function haySession() {
  return !!localStorage.getItem('token');
}

// ── Traducciones de errores de Supabase ───────────────────────────────────
function traducirError(msg) {
  if (!msg) return 'Error desconocido.';
  const m = msg.toLowerCase();
  if (m.includes('invalid login') || m.includes('invalid credentials'))
    return 'Correo o contraseña incorrectos.';
  if (m.includes('email not confirmed'))
    return 'Confirma tu correo antes de ingresar.';
  if (m.includes('user already registered'))
    return 'Este correo ya está registrado.';
  if (m.includes('password'))
    return 'La contraseña debe tener al menos 6 caracteres.';
  if (m.includes('rate limit'))
    return 'Demasiados intentos. Espera unos minutos.';
  return msg;
}
