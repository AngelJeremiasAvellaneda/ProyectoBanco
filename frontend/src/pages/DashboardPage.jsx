import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftRight, Send, CreditCard, Droplets, RefreshCw,
  Home, Globe, LogOut, Sun, Moon, Bell,
  Smartphone, History, PackageOpen, Star,
  ChevronRight, Eye, EyeOff, Menu, X,
  LayoutDashboard, User
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { BcpLogo } from '../components/Navbar';

/* ══════════════════════════════════════════
   NAVEGACIÓN DEL DASHBOARD
══════════════════════════════════════════ */
const NAV_ITEMS = [
  { label: 'Inicio',      Icon: Home,           id: 'home',        to: '/dashboard'   },
  { label: 'Operaciones', Icon: ArrowLeftRight,  id: 'operaciones', to: '/operaciones' },
  { label: 'Explora',     Icon: Globe,           id: 'explora',     to: '/explora'     },
];

/* Acciones rápidas — cada una navega a su ruta ComingSoon */
const QUICK_ACTIONS = [
  { label: 'Transferir\ndinero',  Icon: ArrowLeftRight, color: '#0052FF', bg: 'rgba(0,82,255,0.08)',   to: '/transferir'     },
  { label: 'Yapear\na celular',   Icon: Smartphone,     color: '#7c3aed', bg: 'rgba(124,58,237,0.08)', to: '/yapear'         },
  { label: 'Pagar\ntarjetas',     Icon: CreditCard,     color: '#0052FF', bg: 'rgba(0,82,255,0.08)',   to: '/pagar-tarjetas' },
  { label: 'Pagar\nservicios',    Icon: Droplets,       color: '#0052FF', bg: 'rgba(0,82,255,0.08)',   to: '/pagar-servicios'},
  { label: 'Tipo de\ncambio',     Icon: RefreshCw,      color: '#059669', bg: 'rgba(5,150,105,0.08)',  to: '/tipo-cambio-dashboard' },
  { label: 'Historial',           Icon: History,        color: '#F47920', bg: 'rgba(244,121,32,0.08)', to: '/historial'      },
];

/* ══════════════════════════════════════════
   NAVBAR DEL DASHBOARD
══════════════════════════════════════════ */
function DashboardNav({ activeId, onNavigate }) {
  const navigate = useNavigate();
  const { dark, toggle } = useTheme();
  const { sesion, salir } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  const usuario = sesion?.usuario;

  const navBg    = dark ? 'rgba(13,17,23,0.97)'  : 'rgba(255,255,255,0.97)';
  const border   = dark ? '#1F2630'               : '#e5e7eb';
  const textMain = dark ? '#E6EDF3'               : '#003087';
  const textMuted= dark ? '#8B9498'               : '#6b7280';
  const hoverBg  = dark ? 'rgba(0,82,255,0.12)'   : '#f0f4ff';

  async function handleLogout() {
    await salir();
    navigate('/');
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50"
        style={{ background: navBg, borderBottom: `1px solid ${border}`, boxShadow: dark ? '0 1px 0 rgba(255,255,255,.04)' : '0 1px 8px rgba(0,0,0,.06)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">

          <BcpLogo textColor={dark ? '#E6EDF3' : '#003087'} />

          {/* Badge "Mi Banca" */}
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
            style={{ background: dark ? 'rgba(0,82,255,0.15)' : '#eef3ff', color: '#0052FF' }}>
            <LayoutDashboard size={11} /> Mi Banca
          </span>

          {/* Nav items desktop */}
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {NAV_ITEMS.map(({ label, Icon, id, to }) => {
              const active = id === activeId;
              return (
                <button key={id}
                  onClick={() => navigate(to)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{
                    color: active ? '#F47920' : textMuted,
                    background: active ? (dark ? 'rgba(244,121,32,0.1)' : '#fff5ee') : 'transparent',
                    borderBottom: active ? '2px solid #F47920' : '2px solid transparent',
                  }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.background = hoverBg; e.currentTarget.style.color = '#0052FF'; } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = textMuted; } }}>
                  <Icon size={15} />
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Acciones derecha */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Notificaciones */}
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{ color: textMuted }}
              onMouseEnter={e => e.currentTarget.style.background = hoverBg}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>

            {/* Toggle tema */}
            <button onClick={toggle}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{ color: textMuted }}
              onMouseEnter={e => e.currentTarget.style.background = hoverBg}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              {dark ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} />}
            </button>

            {/* Avatar / menú usuario */}
            <div className="relative" data-user-menu>
              <button onClick={() => setUserMenu(v => !v)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold transition-all border"
                style={{ borderColor: dark ? '#0052FF' : '#003087', color: dark ? '#4D9FFF' : '#003087', background: 'transparent' }}
                onMouseEnter={e => e.currentTarget.style.background = hoverBg}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: 'linear-gradient(135deg,#0052FF,#0066cc)' }}>
                  {(usuario?.name || usuario?.email || 'U')[0].toUpperCase()}
                </div>
                <span className="max-w-24 truncate hidden sm:block">
                  {usuario?.name || usuario?.email?.split('@')[0]}
                </span>
              </button>

              {userMenu && (
                <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl shadow-xl overflow-hidden z-50 border"
                  style={{ background: dark ? '#1A1F27' : '#ffffff', borderColor: border }}>
                  <div className="px-4 py-3" style={{ borderBottom: `1px solid ${border}` }}>
                    <p className="text-sm font-semibold truncate" style={{ color: textMain }}>
                      {usuario?.name || usuario?.email?.split('@')[0]}
                    </p>
                    <p className="text-xs truncate" style={{ color: textMuted }}>{usuario?.email}</p>
                  </div>
                  <div className="p-1.5 space-y-0.5">
                    <button onClick={() => { navigate('/dashboard'); setUserMenu(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-colors text-left"
                      style={{ color: textMain }}
                      onMouseEnter={e => e.currentTarget.style.background = hoverBg}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <User size={15} style={{ color: textMuted }} /> Mi perfil
                    </button>
                    <div style={{ borderTop: `1px solid ${border}`, margin: '4px 0' }} />
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-red-500 transition-colors text-left"
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,77,79,0.1)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <LogOut size={15} /> Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Hamburguesa móvil */}
            <button onClick={() => setMobileOpen(v => !v)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{ color: textMain }}
              onMouseEnter={e => e.currentTarget.style.background = hoverBg}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 py-3 space-y-1" style={{ borderTop: `1px solid ${border}`, background: navBg }}>
            {NAV_ITEMS.map(({ label, Icon, id, to }) => (
              <button key={id} onClick={() => { navigate(to); setMobileOpen(false); }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left"
                style={{
                  color: id === activeId ? '#F47920' : textMuted,
                  background: id === activeId ? (dark ? 'rgba(244,121,32,0.1)' : '#fff5ee') : 'transparent',
                }}>
                <Icon size={16} /> {label}
              </button>
            ))}
            <div style={{ borderTop: `1px solid ${border}`, paddingTop: 8, marginTop: 4 }}>
              <button onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 text-left">
                <LogOut size={15} /> Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div style={{ height: 56 }} />
    </>
  );
}

/* ══════════════════════════════════════════
   TARJETA DE ACCIÓN RÁPIDA
══════════════════════════════════════════ */
function QuickCard({ label, Icon, color, bg, to }) {
  const navigate = useNavigate();
  const { dark } = useTheme();
  const cardBg = dark ? '#1A1F27' : '#ffffff';
  const border = dark ? '#1F2630' : '#e5e7eb';

  return (
    <button onClick={() => navigate(to)}
      className="flex flex-col items-center gap-2.5 p-4 rounded-2xl border transition-all hover:scale-[1.03] hover:shadow-md text-center"
      style={{ borderColor: border, background: cardBg }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.background = bg; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.background = cardBg; }}>
      <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: bg }}>
        <Icon size={20} style={{ color }} />
      </div>
      <span className="text-xs font-semibold leading-tight whitespace-pre-line"
        style={{ color: dark ? '#E6EDF3' : '#374151' }}>
        {label}
      </span>
    </button>
  );
}

/* ══════════════════════════════════════════
   ESTADO VACÍO GENÉRICO
══════════════════════════════════════════ */
function EmptyState({ icon: Icon, title, subtitle }) {
  const { dark } = useTheme();
  const textH  = dark ? '#E6EDF3' : '#374151';
  const textM  = dark ? '#8B9498' : '#9ca3af';
  const iconBg = dark ? 'rgba(255,255,255,0.05)' : '#f3f4f6';

  return (
    <div className="flex flex-col items-center justify-center py-10 px-6 text-center gap-3">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: iconBg }}>
        <Icon size={26} style={{ color: textM }} strokeWidth={1.5} />
      </div>
      <p className="text-sm font-semibold" style={{ color: textH }}>{title}</p>
      <p className="text-xs leading-relaxed max-w-xs" style={{ color: textM }}>{subtitle}</p>
    </div>
  );
}

/* ══════════════════════════════════════════
   TARJETA DE SALDO (cuenta)
══════════════════════════════════════════ */
function BalanceCard({ cuenta }) {
  const { dark } = useTheme();
  const [visible, setVisible] = useState(false);

  const cardBg = dark ? '#1A1F27' : '#ffffff';
  const border = dark ? '#1F2630' : '#e5e7eb';
  const textH  = dark ? '#E6EDF3' : '#003087';
  const textM  = dark ? '#8B9498' : '#6b7280';

  const saldo = visible
    ? `S/ ${Number(cuenta.saldo ?? 0).toLocaleString('es-PE', { minimumFractionDigits: 2 })}`
    : 'S/ ••••••';

  return (
    <div className="rounded-2xl border p-5 flex flex-col gap-3"
      style={{ background: cardBg, borderColor: border }}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#F47920' }}>
            {cuenta.tipo_cuenta || 'Cuenta'}
          </p>
          <p className="text-xs mt-0.5 font-mono" style={{ color: textM }}>
            {cuenta.numero_cuenta}
          </p>
        </div>
        <button onClick={() => setVisible(v => !v)}
          className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
          style={{ color: textM }}
          onMouseEnter={e => e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.06)' : '#f3f4f6'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          {visible ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>

      {/* Saldo */}
      <div>
        <p className="text-xs mb-1" style={{ color: textM }}>Saldo disponible</p>
        <p className="text-2xl font-black tracking-tight" style={{ color: textH }}>{saldo}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1" style={{ borderTop: `1px solid ${border}` }}>
        <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{ background: dark ? 'rgba(5,150,105,0.15)' : '#d1fae5', color: '#059669' }}>
          Activa
        </span>
        <button className="flex items-center gap-1 text-xs font-semibold transition-colors"
          style={{ color: '#0052FF' }}
          onMouseEnter={e => e.currentTarget.style.color = '#F47920'}
          onMouseLeave={e => e.currentTarget.style.color = '#0052FF'}>
          Ver detalle <ChevronRight size={12} />
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   PÁGINA PRINCIPAL
══════════════════════════════════════════ */
export default function DashboardPage() {
  const { sesion } = useAuth();
  const { dark } = useTheme();

  const usuario  = sesion?.usuario;
  const cuentas  = usuario?.cuentas  ?? [];
  const favoritos= usuario?.favoritos ?? [];
  const movimientos = usuario?.movimientos ?? [];

  /* Tokens de color */
  const pageBg  = dark ? '#0D1117'  : '#f0f4ff';
  const cardBg  = dark ? '#1A1F27'  : '#ffffff';
  const border  = dark ? '#1F2630'  : '#e5e7eb';
  const textH   = dark ? '#E6EDF3'  : '#003087';
  const textM   = dark ? '#8B9498'  : '#6b7280';

  const nombre = usuario?.name || usuario?.email?.split('@')[0] || 'Usuario';
  const hora   = new Date().getHours();
  const saludo = hora < 12 ? 'Buenos días' : hora < 19 ? 'Buenas tardes' : 'Buenas noches';

  return (
    <div style={{ background: pageBg, minHeight: '100vh' }}>
      <DashboardNav activeId="home" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ── Saludo ── */}
        <div>
          <h1 className="text-2xl font-black" style={{ color: textH }}>
            {saludo}, {nombre} 👋
          </h1>
          <p className="text-sm mt-1" style={{ color: textM }}>
            Aquí tienes un resumen de tus finanzas.
          </p>
        </div>

        {/* ── Acciones rápidas ── */}
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: textM }}>
            Acciones rápidas
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {QUICK_ACTIONS.map(a => <QuickCard key={a.to} {...a} />)}
          </div>
        </section>

        {/* ── Mis cuentas ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: textM }}>
              Mis cuentas
            </h2>
          </div>

          {cuentas.length === 0 ? (
            <div className="rounded-2xl border" style={{ background: cardBg, borderColor: border }}>
              <EmptyState
                icon={PackageOpen}
                title="Aún no tienes productos"
                subtitle="Cuando tengas cuentas o tarjetas activas, aparecerán aquí."
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cuentas.map(c => <BalanceCard key={c.id} cuenta={c} />)}
            </div>
          )}
        </section>

        {/* ── Dos columnas: Favoritos + Últimos movimientos ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Favoritos */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: textM }}>
              Favoritos
            </h2>
            <div className="rounded-2xl border" style={{ background: cardBg, borderColor: border }}>
              {favoritos.length === 0 ? (
                <EmptyState
                  icon={Star}
                  title="Sin favoritos aún"
                  subtitle="Agrega contactos o cuentas frecuentes para transferir más rápido."
                />
              ) : (
                <ul className="divide-y" style={{ borderColor: border }}>
                  {favoritos.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 px-5 py-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
                        style={{ background: 'linear-gradient(135deg,#0052FF,#0066cc)' }}>
                        {f.nombre?.[0]?.toUpperCase() ?? '?'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate" style={{ color: textH }}>{f.nombre}</p>
                        <p className="text-xs truncate" style={{ color: textM }}>{f.banco}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          {/* Últimos movimientos */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: textM }}>
              Últimos movimientos
            </h2>
            <div className="rounded-2xl border" style={{ background: cardBg, borderColor: border }}>
              {movimientos.length === 0 ? (
                <EmptyState
                  icon={History}
                  title="Sin movimientos"
                  subtitle="Tus transacciones recientes aparecerán aquí una vez que operes."
                />
              ) : (
                <ul className="divide-y" style={{ borderColor: border }}>
                  {movimientos.map((m, i) => {
                    const esDebito = m.tipo === 'DEBITO';
                    return (
                      <li key={i} className="flex items-center gap-3 px-5 py-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: esDebito ? 'rgba(239,68,68,0.1)' : 'rgba(5,150,105,0.1)' }}>
                          <Send size={15} style={{ color: esDebito ? '#ef4444' : '#059669' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate" style={{ color: textH }}>{m.descripcion}</p>
                          <p className="text-xs" style={{ color: textM }}>{m.fecha}</p>
                        </div>
                        <span className="text-sm font-bold shrink-0"
                          style={{ color: esDebito ? '#ef4444' : '#059669' }}>
                          {esDebito ? '-' : '+'}S/ {Number(m.monto).toFixed(2)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </section>
        </div>

      </main>
    </div>
  );
}
