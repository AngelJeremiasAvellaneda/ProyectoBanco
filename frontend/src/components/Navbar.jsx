import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Landmark, Lock, Sun, Moon, Menu, X, LayoutDashboard, LogOut, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { label: 'Inicio',    to: '/' },
  { label: 'Productos', to: '/productos' },
  { label: 'Nosotros',  to: '/nosotros' },
  { label: 'Simulador', to: '/simulador' },
  { label: 'Contacto',  to: '/contacto' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { dark, toggle } = useTheme();
  const { sesion, salir } = useAuth();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [userMenu, setUserMenu]   = useState(false);

  const usuario = sesion?.usuario;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMenuOpen(false); setUserMenu(false); }, [location.pathname]);

  // Cierra el menú de usuario al hacer click fuera
  useEffect(() => {
    if (!userMenu) return;
    const fn = (e) => {
      if (!e.target.closest('[data-user-menu]')) setUserMenu(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [userMenu]);

  const isActive = (to) => location.pathname === to;

  async function handleLogout() {
    await salir();
    navigate('/');
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-theme-nav backdrop-blur-md shadow-nav border-b border-theme'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 bg-linear-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-glow">
              <Landmark size={17} className="text-white" />
            </div>
            <span className="font-extrabold text-lg text-theme tracking-tight">
              Banco<span className="text-primary">Confianza</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(({ label, to }) => (
              <Link key={to} to={to}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive(to)
                    ? 'bg-primary-lt text-primary font-semibold'
                    : 'text-theme-muted hover:text-theme hover:bg-theme-alt'
                }`}>
                {label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button onClick={toggle} aria-label="Cambiar tema"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-theme-muted hover:text-theme hover:bg-theme-alt transition-all duration-200">
              {dark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
            </button>

            {/* Autenticado → avatar + menú */}
            {usuario ? (
              <div className="relative" data-user-menu>
                <button
                  onClick={() => setUserMenu(v => !v)}
                  className="hidden sm:flex items-center gap-2 bg-theme-alt hover:bg-theme-card border border-theme px-3 py-1.5 rounded-xl transition-all"
                >
                  <div className="w-6 h-6 bg-linear-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                    {(usuario.name || usuario.email || 'U')[0].toUpperCase()}
                  </div>
                  <span className="text-theme text-sm font-medium max-w-[120px] truncate">
                    {usuario.name || usuario.email?.split('@')[0]}
                  </span>
                </button>

                {/* Dropdown */}
                {userMenu && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-theme-card border border-theme rounded-2xl shadow-float overflow-hidden animate-slide-up z-50">
                    <div className="px-4 py-3 border-b border-theme">
                      <p className="text-theme text-sm font-semibold truncate">
                        {usuario.name || usuario.email?.split('@')[0]}
                      </p>
                      <p className="text-theme-soft text-xs truncate">{usuario.email}</p>
                    </div>
                    <div className="p-1.5 space-y-0.5">
                      <button onClick={() => navigate('/dashboard')}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-theme hover:bg-theme-alt transition-colors text-left">
                        <LayoutDashboard size={15} className="text-primary" />
                        Mi panel
                      </button>
                      <button onClick={() => navigate('/dashboard')}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-theme hover:bg-theme-alt transition-colors text-left">
                        <User size={15} className="text-theme-muted" />
                        Mi perfil
                      </button>
                      <div className="border-t border-theme my-1" />
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-danger hover:bg-danger-lt transition-colors text-left">
                        <LogOut size={15} />
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* No autenticado → botón login */
              <button onClick={() => navigate('/login')}
                className="hidden sm:flex items-center gap-1.5 bg-linear-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 btn-glow shadow-glow">
                <Lock size={14} />
                Banca en Línea
              </button>
            )}

            {/* Mobile hamburger */}
            <button onClick={() => setMenuOpen(v => !v)}
              className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-theme-muted hover:text-theme hover:bg-theme-alt transition-all">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-theme-nav border-t border-theme px-4 py-3 space-y-1">
            {NAV_LINKS.map(({ label, to }) => (
              <Link key={to} to={to}
                className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive(to) ? 'bg-primary-lt text-primary' : 'text-theme-muted hover:text-theme hover:bg-theme-alt'
                }`}>
                {label}
              </Link>
            ))}
            <div className="pt-2 pb-1 space-y-2">
              {usuario ? (
                <>
                  <button onClick={() => navigate('/dashboard')}
                    className="w-full flex items-center justify-center gap-2 bg-primary-lt text-primary py-2.5 rounded-xl text-sm font-semibold">
                    <LayoutDashboard size={14} />
                    Mi panel — {usuario.name || usuario.email?.split('@')[0]}
                  </button>
                  <button onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 border border-theme text-danger py-2.5 rounded-xl text-sm font-semibold">
                    <LogOut size={14} />
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <button onClick={() => navigate('/login')}
                  className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-indigo-500 to-violet-600 text-white py-2.5 rounded-xl text-sm font-semibold">
                  <Lock size={14} />
                  Banca en Línea
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
