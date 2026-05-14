import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Landmark, LogOut, Bell, Settings, CreditCard, TrendingUp,
  ArrowUpRight, ArrowDownLeft, Wallet, PiggyBank,
  Send, QrCode, Receipt, RefreshCw, ChevronRight, Eye, EyeOff,
  Home, History, User, Shield, Zap, Sun, Moon, BarChart3,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

/* ─── Datos de demo (se reemplazarán con llamadas al backend) ─── */
const ACCOUNTS = [
  { id: 1, type: 'Cuenta de Ahorros', number: '•••• •••• 4821', balance: 3450.00, currency: 'S/', grad: 'from-indigo-500 via-purple-600 to-violet-700', icon: PiggyBank, tasa: '4.5% TEA' },
  { id: 2, type: 'Cuenta Corriente',  number: '•••• •••• 7293', balance: 1200.50, currency: 'S/', grad: 'from-emerald-500 via-teal-500 to-cyan-600',    icon: Wallet,   tasa: 'Sin costo' },
];

const TRANSACTIONS = [
  { id: 1, desc: 'Transferencia recibida', sub: 'De: Carlos Mendoza', amount: +1500,   date: 'Hoy, 10:32',    type: 'in',  icon: ArrowDownLeft, color: 'from-emerald-400 to-teal-500' },
  { id: 2, desc: 'Pago de servicios',      sub: 'Luz del Sur',        amount: -185.40, date: 'Hoy, 08:15',    type: 'out', icon: Receipt,       color: 'from-orange-400 to-amber-500' },
  { id: 3, desc: 'Transferencia enviada',  sub: 'A: María Torres',    amount: -500,    date: 'Ayer, 16:45',   type: 'out', icon: ArrowUpRight,  color: 'from-red-400 to-rose-500' },
  { id: 4, desc: 'Depósito en efectivo',   sub: 'Agencia Miraflores', amount: +2000,   date: 'Ayer, 11:20',   type: 'in',  icon: ArrowDownLeft, color: 'from-blue-400 to-indigo-500' },
  { id: 5, desc: 'Pago de crédito',        sub: 'Cuota mensual MYPE', amount: -650,    date: '12 May, 09:00', type: 'out', icon: CreditCard,    color: 'from-violet-400 to-purple-500' },
  { id: 6, desc: 'Intereses acreditados',  sub: 'Cuenta de Ahorros',  amount: +32.80,  date: '10 May, 00:00', type: 'in',  icon: TrendingUp,    color: 'from-emerald-400 to-green-500' },
];

const QUICK_ACTIONS = [
  { label: 'Transferir', icon: Send,      bgFrom: '#3b82f6', bgTo: '#4f46e5', sub: 'Envía dinero' },
  { label: 'Pagar',      icon: QrCode,    bgFrom: '#7c3aed', bgTo: '#6d28d9', sub: 'Servicios' },
  { label: 'Historial',  icon: History,   bgFrom: '#059669', bgTo: '#0d9488', sub: 'Movimientos' },
  { label: 'Recargar',   icon: RefreshCw, bgFrom: '#d97706', bgTo: '#ea580c', sub: 'Saldo' },
];

const NAV_ITEMS = [
  { label: 'Inicio',      icon: Home,      id: 'home' },
  { label: 'Movimientos', icon: History,   id: 'movimientos' },
  { label: 'Transferir',  icon: Send,      id: 'transferir' },
  { label: 'Inversiones', icon: BarChart3, id: 'inversiones' },
  { label: 'Perfil',      icon: User,      id: 'perfil' },
];

/* ─── Quick Action Card ─── */
function QuickActionCard({ label, icon: Icon, bgFrom, bgTo, sub, onClick }) {
  return (
    <button onClick={onClick}
      className="group relative cursor-pointer select-none"
      style={{ paddingTop: 28 }}>
      <div className="absolute right-4 top-0 w-14 h-14 z-20 pointer-events-none"
        style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.35))' }}>
        <div className="w-full h-full rounded-2xl flex items-center justify-center animate-float group-hover:scale-110 transition-transform duration-300"
          style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.3), rgba(255,255,255,0.1))', border: '1px solid rgba(255,255,255,0.25)' }}>
          <Icon size={22} className="text-white drop-shadow" />
        </div>
      </div>
      <div className="relative rounded-2xl overflow-hidden h-24 transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-float"
        style={{ background: `linear-gradient(135deg, ${bgFrom}, ${bgTo})` }}>
        <div className="absolute -top-5 -right-5 w-16 h-16 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute bottom-3 left-4">
          <p className="text-white font-bold text-sm leading-tight">{label}</p>
          <p className="text-white/60 text-xs">{sub}</p>
        </div>
      </div>
    </button>
  );
}

/* ─── Main ─── */
export default function DashboardPage() {
  const navigate = useNavigate();
  const { sesion, salir } = useAuth();
  const { dark, toggle } = useTheme();
  const [showBalance, setShowBalance]   = useState(true);
  const [activeAccount, setActiveAccount] = useState(0);
  const [activeNav, setActiveNav]       = useState('home');
  const [selectedTx, setSelectedTx]     = useState(TRANSACTIONS[0]);

  const usuario = sesion?.usuario;
  const account = ACCOUNTS[activeAccount];
  const fmt = (n) => n.toLocaleString('es-PE', { minimumFractionDigits: 2 });

  async function handleLogout() {
    await salir();
    navigate('/');
  }

  return (
    <div className="min-h-screen bg-theme text-theme flex overflow-hidden">

      {/* ══ SIDEBAR ══ */}
      <aside className="hidden lg:flex flex-col items-center w-18 bg-sidebar py-6 fixed h-full z-40 gap-2">
        <Link to="/" className="w-10 h-10 bg-linear-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center mb-6 shadow-glow hover-scale">
          <Landmark size={18} className="text-white" />
        </Link>

        <nav className="flex-1 flex flex-col gap-1 w-full px-3">
          {NAV_ITEMS.map(({ icon: Icon, id, label }) => (
            <button key={id} onClick={() => setActiveNav(id)} title={label}
              className={`group relative w-full h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                activeNav === id ? 'sidebar-active text-sidebar-active' : 'text-sidebar hover:text-sidebar-active'
              }`}>
              <Icon size={19} />
              {activeNav === id && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-(--color-primary) rounded-r-full" />
              )}
              <span className="absolute left-14 bg-sidebar text-sidebar-active text-xs font-semibold px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity shadow-lg border border-white/10 z-50">
                {label}
              </span>
            </button>
          ))}
        </nav>

        <div className="flex flex-col gap-1 w-full px-3">
          <button onClick={toggle} title={dark ? 'Tema claro' : 'Tema oscuro'}
            className="w-full h-11 rounded-xl flex items-center justify-center text-sidebar hover:text-sidebar-active transition-all">
            {dark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
          </button>
          <button title="Configuración"
            className="w-full h-11 rounded-xl flex items-center justify-center text-sidebar hover:text-sidebar-active transition-all">
            <Settings size={18} />
          </button>
          <button onClick={handleLogout} title="Cerrar sesión"
            className="w-full h-11 rounded-xl flex items-center justify-center text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      {/* ══ MAIN ══ */}
      <main className="flex-1 lg:ml-18 flex min-h-screen overflow-hidden">

        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">

          {/* Topbar */}
          <header className="sticky top-0 z-20 bg-theme-nav backdrop-blur-xl border-b border-theme px-6 py-3.5 flex items-center justify-between">
            <div>
              <p className="text-theme-soft text-xs">Bienvenido de vuelta 👋</p>
              <h1 className="text-theme font-bold text-base">
                {usuario?.name || usuario?.email?.split('@')[0] || 'Usuario'}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={toggle}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-theme-muted hover:bg-theme-alt transition-all">
                {dark ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} />}
              </button>
              <button className="relative w-8 h-8 bg-theme-alt rounded-xl flex items-center justify-center hover:bg-theme-card transition-all">
                <Bell size={15} className="text-theme-muted" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-(--color-primary) rounded-full animate-pulse" />
              </button>
              <div className="w-8 h-8 bg-linear-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-glow">
                {(usuario?.name || usuario?.email || 'U')[0].toUpperCase()}
              </div>
            </div>
          </header>

          <div className="flex-1 p-5 space-y-6">

            {/* ── BALANCE CARD ── */}
            <div className={`relative bg-linear-to-br ${account.grad} rounded-3xl p-6 overflow-hidden shadow-float`}>
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full" />
              <div className="absolute -bottom-14 -left-8 w-56 h-56 bg-black/10 rounded-full" />
              <div className="relative">
                {/* Tabs de cuentas */}
                <div className="flex gap-2 mb-5 flex-wrap">
                  {ACCOUNTS.map((acc, i) => (
                    <button key={acc.id} onClick={() => setActiveAccount(i)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                        activeAccount === i
                          ? 'bg-white/25 text-white border border-white/40'
                          : 'bg-white/8 text-white/60 hover:bg-white/15 border border-transparent'
                      }`}>
                      <acc.icon size={12} />
                      {acc.type}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white/60 text-xs mb-1">Saldo disponible</p>
                    <div className="flex items-center gap-2.5">
                      <span className="text-4xl font-black text-white tracking-tight">
                        {showBalance ? `S/ ${fmt(account.balance)}` : 'S/ ••••••'}
                      </span>
                      <button onClick={() => setShowBalance(v => !v)}
                        className="text-white/50 hover:text-white transition-colors">
                        {showBalance ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                    <p className="text-white/50 text-xs mt-1 font-mono">{account.number}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 bg-white/15 rounded-full px-3 py-1.5 mb-2">
                      <TrendingUp size={12} className="text-white" />
                      <span className="text-white text-xs font-semibold">+2.4%</span>
                    </div>
                    <p className="text-white/50 text-xs">{account.tasa}</p>
                  </div>
                </div>

                <div className="flex gap-6 mt-5 pt-4 border-t border-white/15">
                  {[['Ingresos', '+S/ 3,532'], ['Gastos', '-S/ 1,335'], ['Crédito', 'S/ 8,000']].map(([l, v]) => (
                    <div key={l}>
                      <p className="text-white/50 text-xs">{l}</p>
                      <p className="text-white font-bold text-sm">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── ACCIONES RÁPIDAS ── */}
            <div>
              <p className="text-theme-soft text-xs font-semibold uppercase tracking-widest mb-3">Acciones rápidas</p>
              <div className="grid grid-cols-4 gap-3 pt-8 overflow-visible">
                {QUICK_ACTIONS.map(props => (
                  <QuickActionCard key={props.label} {...props} />
                ))}
              </div>
            </div>

            {/* ── MOVIMIENTOS ── */}
            <div className="bg-theme-card border border-theme rounded-2xl overflow-hidden shadow-card">
              <div className="flex items-center justify-between px-5 py-4 border-b border-theme">
                <h3 className="text-theme font-bold text-sm">Últimos movimientos</h3>
                <button className="flex items-center gap-1 text-primary text-xs font-semibold hover:underline">
                  Ver todos <ChevronRight size={13} />
                </button>
              </div>
              <div className="divide-y divide-(--color-border)">
                {TRANSACTIONS.map((tx) => (
                  <button key={tx.id} onClick={() => setSelectedTx(tx)}
                    className={`w-full flex items-center gap-3.5 px-5 py-3.5 hover:bg-theme-alt transition-all text-left ${
                      selectedTx?.id === tx.id ? 'bg-primary-lt' : ''
                    }`}>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-linear-to-br ${tx.color} shadow-md`}>
                      <tx.icon size={15} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-theme text-sm font-medium truncate">{tx.desc}</p>
                      <p className="text-theme-soft text-xs">{tx.sub}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`font-bold text-sm ${tx.type === 'in' ? 'text-success' : 'text-danger'}`}>
                        {tx.type === 'in' ? '+' : ''}S/ {Math.abs(tx.amount).toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-theme-soft text-xs">{tx.date}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ══ PANEL DERECHO — detalle de movimiento ══ */}
        <aside className="hidden xl:flex flex-col w-72 bg-theme-card border-l border-theme overflow-y-auto">
          <div className="p-5 border-b border-theme">
            <p className="text-theme-soft text-xs font-semibold uppercase tracking-widest mb-1">Detalle</p>
            <h2 className="text-theme font-bold text-sm">Movimiento seleccionado</h2>
          </div>

          {selectedTx && (
            <div className="p-5 space-y-4 animate-fade-in" key={selectedTx.id}>
              <div className="flex flex-col items-center text-center py-3">
                <div className={`w-14 h-14 rounded-2xl bg-linear-to-br ${selectedTx.color} flex items-center justify-center shadow-float mb-3`}>
                  <selectedTx.icon size={24} className="text-white" />
                </div>
                <p className={`text-3xl font-black ${selectedTx.type === 'in' ? 'text-success' : 'text-danger'}`}>
                  {selectedTx.type === 'in' ? '+' : ''}S/ {Math.abs(selectedTx.amount).toLocaleString('es-PE', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-theme font-semibold text-sm mt-1">{selectedTx.desc}</p>
                <p className="text-theme-soft text-xs mt-0.5">{selectedTx.sub}</p>
              </div>

              <div className="bg-theme rounded-2xl p-4 space-y-3">
                {[
                  { label: 'Fecha',  value: selectedTx.date },
                  { label: 'Tipo',   value: selectedTx.type === 'in' ? 'Ingreso' : 'Egreso' },
                  { label: 'Estado', value: 'Completado' },
                  { label: 'Ref.',   value: `#TXN-${String(selectedTx.id).padStart(6, '0')}` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-theme-soft text-xs">{label}</span>
                    <span className="text-theme text-xs font-semibold">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 bg-success-lt rounded-xl px-4 py-3">
                <div className="w-2 h-2 bg-(--color-success) rounded-full animate-pulse" />
                <span className="text-success text-xs font-semibold">Transacción completada</span>
              </div>

              <div className="space-y-2">
                <button className="w-full bg-primary-lt text-primary py-2.5 rounded-xl text-xs font-semibold hover:bg-(--color-primary) hover:text-white transition-all">
                  Descargar comprobante
                </button>
                <button className="w-full border border-theme text-theme-muted py-2.5 rounded-xl text-xs font-semibold hover:border-(--color-primary) hover:text-primary transition-all">
                  Reportar problema
                </button>
              </div>
            </div>
          )}

          {/* Sesión segura */}
          <div className="mx-5 mb-5 mt-auto">
            <div className="bg-linear-to-br from-indigo-500 to-violet-600 rounded-2xl p-4 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
              <div className="relative">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                  <Shield size={16} className="text-white" />
                </div>
                <p className="text-white font-bold text-sm">Sesión segura</p>
                <p className="text-white/60 text-xs mt-0.5">SSL 256-bit activo</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <Zap size={11} className="text-emerald-300" />
                  <span className="text-emerald-300 text-xs font-semibold">Protegido</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-theme-card/95 backdrop-blur-xl border-t border-theme flex z-40">
        {NAV_ITEMS.map(({ label, icon: Icon, id }) => (
          <button key={id} onClick={() => setActiveNav(id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
              activeNav === id ? 'text-primary' : 'text-theme-soft'
            }`}>
            <Icon size={19} />
            {label}
          </button>
        ))}
        <button onClick={handleLogout}
          className="flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium text-danger">
          <LogOut size={19} />
          Salir
        </button>
      </nav>
    </div>
  );
}
