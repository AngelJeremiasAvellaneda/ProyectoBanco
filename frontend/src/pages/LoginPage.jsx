import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Landmark, Mail, Lock, Eye, EyeOff, ArrowLeft,
  AlertCircle, Loader2, Sun, Moon, CheckCircle,
  Shield, Zap, TrendingUp, CreditCard, PiggyBank,
  Smartphone, Star, ArrowRight
} from 'lucide-react';
import { login } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

/* ── Floating feature chips (left panel) ── */
const FEATURES = [
  { icon: Zap,        label: 'Transferencias al instante',  color: 'from-blue-400 to-indigo-500',   delay: '0s'   },
  { icon: Shield,     label: 'Seguridad SSL 256-bit',        color: 'from-emerald-400 to-teal-500',  delay: '0.4s' },
  { icon: TrendingUp, label: 'Hasta 8.2% TEA en ahorros',   color: 'from-violet-400 to-purple-500', delay: '0.8s' },
  { icon: Smartphone, label: 'Banca móvil 24/7',             color: 'from-orange-400 to-amber-500',  delay: '1.2s' },
];

/* ── Decorative floating cards (left panel) ── */
function FloatingCard({ icon: Icon, label, value, color, style }) {
  return (
    <div
      className="absolute glass-card rounded-2xl px-4 py-3 flex items-center gap-3 animate-float pointer-events-none"
      style={style}
    >
      <div className={`w-9 h-9 rounded-xl bg-linear-to-br ${color} flex items-center justify-center shrink-0 shadow-lg`}>
        <Icon size={17} className="text-white" />
      </div>
      <div>
        <p className="text-white font-bold text-sm leading-tight">{value}</p>
        <p className="text-white/55 text-xs">{label}</p>
      </div>
    </div>
  );
}

/* ── SVG illustration — bank building with coins ── */
function BankIllustration() {
  return (
    <div className="relative w-72 h-72 mx-auto">
      {/* Main building */}
      <svg viewBox="0 0 280 280" className="w-full h-full drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
        {/* Shadow ellipse */}
        <ellipse cx="140" cy="255" rx="90" ry="12" fill="rgba(0,0,0,0.25)" />

        {/* Building base */}
        <rect x="55" y="130" width="170" height="110" rx="8" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>

        {/* Building columns */}
        {[80, 110, 140, 170, 200].map(x => (
          <rect key={x} x={x} y="130" width="14" height="110" rx="3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1"/>
        ))}

        {/* Roof / pediment */}
        <polygon points="40,130 140,70 240,130" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>

        {/* Roof detail line */}
        <line x1="40" y1="130" x2="240" y2="130" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>

        {/* Top triangle accent */}
        <polygon points="100,130 140,95 180,130" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>

        {/* Door */}
        <rect x="118" y="185" width="44" height="55" rx="22" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
        <rect x="126" y="193" width="28" height="40" rx="14" fill="rgba(255,255,255,0.08)"/>

        {/* Windows */}
        {[[75,155],[115,155],[155,155],[195,155],[75,185],[195,185]].map(([x,y],i) => (
          <rect key={i} x={x} y={y} width="22" height="18" rx="4"
            fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
        ))}

        {/* Landmark icon on top */}
        <circle cx="140" cy="68" r="18" fill="rgba(129,140,248,0.4)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
        <text x="140" y="74" textAnchor="middle" fontSize="16" fill="white">🏛</text>

        {/* Coin stack left */}
        {[0,1,2,3].map(i => (
          <ellipse key={i} cx="42" cy={230 - i * 9} rx="18" ry="6"
            fill={i % 2 === 0 ? 'rgba(251,191,36,0.85)' : 'rgba(245,158,11,0.85)'}
            stroke="rgba(255,255,255,0.2)" strokeWidth="0.8"/>
        ))}
        <rect x="24" y="194" width="36" height="36" rx="0" fill="rgba(251,191,36,0.0)"/>
        {[0,1,2,3].map(i => (
          <rect key={i} x="24" y={203 - i * 9} width="36" height="9"
            fill={i % 2 === 0 ? 'rgba(251,191,36,0.7)' : 'rgba(245,158,11,0.7)'}/>
        ))}
        <ellipse cx="42" cy="203" rx="18" ry="6" fill="rgba(253,224,71,0.9)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>

        {/* Coin stack right */}
        {[0,1,2].map(i => (
          <rect key={i} x="218" y={215 - i * 9} width="30" height="9"
            fill={i % 2 === 0 ? 'rgba(251,191,36,0.7)' : 'rgba(245,158,11,0.7)'}/>
        ))}
        <ellipse cx="233" cy="215" rx="15" ry="5" fill="rgba(253,224,71,0.9)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>

        {/* Stars / sparkles */}
        {[[30,60,'rgba(255,255,255,0.8)'],[250,80,'rgba(251,191,36,0.9)'],[20,160,'rgba(167,139,250,0.8)'],[260,170,'rgba(255,255,255,0.7)']].map(([x,y,c],i) => (
          <g key={i}>
            <line x1={x} y1={y-6} x2={x} y2={y+6} stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
            <line x1={x-6} y1={y} x2={x+6} y2={y} stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
          </g>
        ))}

        {/* Floating coins */}
        <circle cx="65" cy="95" r="10" fill="rgba(251,191,36,0.75)" stroke="rgba(255,255,255,0.3)" strokeWidth="1">
          <animateTransform attributeName="transform" type="translate" values="0,0;0,-8;0,0" dur="3s" repeatCount="indefinite"/>
        </circle>
        <text x="65" y="99" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.9)">
          <animateTransform attributeName="transform" type="translate" values="0,0;0,-8;0,0" dur="3s" repeatCount="indefinite"/>
          S/
        </text>

        <circle cx="215" cy="105" r="8" fill="rgba(251,191,36,0.7)" stroke="rgba(255,255,255,0.3)" strokeWidth="1">
          <animateTransform attributeName="transform" type="translate" values="0,0;0,-6;0,0" dur="2.5s" begin="0.5s" repeatCount="indefinite"/>
        </circle>
      </svg>
    </div>
  );
}

/* ── Input field component ── */
function InputField({ label, name, type, value, onChange, placeholder, autoComplete, icon: Icon, rightEl, error }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-bold text-theme-muted uppercase tracking-wide">{label}</label>
      <div className={`relative flex items-center rounded-2xl border-2 transition-all duration-200 ${
        error
          ? 'border-red-400 bg-red-50/50 dark:bg-red-500/5'
          : 'border-theme bg-theme-alt focus-within:border-(--color-primary) focus-within:bg-theme-card focus-within:shadow-glow'
      }`}>
        <div className="pl-4 pr-2 shrink-0">
          <Icon size={16} className="text-theme-soft" />
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="flex-1 py-3.5 pr-3 bg-transparent text-theme text-sm outline-none placeholder-theme-soft"
        />
        {rightEl && <div className="pr-3 shrink-0">{rightEl}</div>}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   LOGIN PAGE
══════════════════════════════════════════════ */
export default function LoginPage() {
  const navigate = useNavigate();
  const { iniciarSesion } = useAuth();
  const { dark, toggle } = useTheme();

  const [form, setForm]         = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState('');
  const [cargando, setCargando] = useState(false);
  const [step, setStep]         = useState(1); // 1 = email, 2 = password

  function handleChange(e) {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    if (error) setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password) { setError('Completa todos los campos.'); return; }
    setCargando(true);
    try {
      const data = await login(form.email, form.password);
      iniciarSesion(data.token, data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Credenciales incorrectas. Intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden" style={{ background: 'var(--color-bg)' }}>

      {/* ════════════════════════════════════════
          LEFT PANEL — ilustración + branding
      ════════════════════════════════════════ */}
      <div className="hidden lg:flex flex-col w-[52%] relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #1e1b4b 0%, #312e81 40%, #4c1d95 75%, #2e1065 100%)' }}>

        {/* Background pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="lp-iso" x="0" y="0" width="40" height="46" patternUnits="userSpaceOnUse">
              <polygon points="20,0 40,11.5 20,23 0,11.5" fill="none" stroke="rgba(255,255,255,1)" strokeWidth="0.6"/>
              <polygon points="0,11.5 20,23 20,46 0,34.5" fill="none" stroke="rgba(255,255,255,1)" strokeWidth="0.6"/>
              <polygon points="20,23 40,11.5 40,34.5 20,46" fill="none" stroke="rgba(255,255,255,1)" strokeWidth="0.6"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lp-iso)"/>
        </svg>

        {/* Glow blobs */}
        <div className="absolute top-1/4 -left-24 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.25) 0%, transparent 70%)' }}/>
        <div className="absolute bottom-1/4 right-0 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(192,132,252,0.2) 0%, transparent 70%)' }}/>
        <div className="absolute top-3/4 left-1/3 w-48 h-48 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.12) 0%, transparent 70%)' }}/>

        {/* ── TOP: Logo ── */}
        <div className="relative z-10 p-10 flex items-center gap-3">
          <div className="w-11 h-11 bg-linear-to-br from-indigo-400 to-violet-600 rounded-2xl flex items-center justify-center shadow-glow">
            <Landmark size={22} className="text-white"/>
          </div>
          <div>
            <span className="text-white font-black text-xl tracking-tight">
              Banco<span className="text-violet-300">Confianza</span>
            </span>
            <p className="text-white/40 text-xs">Supervisado por la SBS</p>
          </div>
        </div>

        {/* ── CENTER: Illustration + floating cards ── */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-10">

          {/* Headline */}
          <div className="text-center mb-6 space-y-2">
            <h2 className="text-4xl font-black text-white leading-tight">
              Tu banca digital,<br/>
              <span style={{
                background: 'linear-gradient(135deg, #a78bfa, #f0abfc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>siempre contigo</span>
            </h2>
            <p className="text-white/55 text-sm max-w-xs mx-auto leading-relaxed">
              Gestiona tus finanzas con seguridad y confianza desde cualquier lugar.
            </p>
          </div>

          {/* Illustration — sobresale hacia la derecha */}
          <div className="relative w-full flex justify-center" style={{ marginRight: '-60px' }}>
            <BankIllustration/>

            {/* Floating chip — balance */}
            <div className="absolute top-4 -left-2 glass-card rounded-2xl px-4 py-3 flex items-center gap-3 animate-float shadow-float"
              style={{ animationDelay: '0s' }}>
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center shrink-0">
                <PiggyBank size={17} className="text-white"/>
              </div>
              <div>
                <p className="text-white font-black text-sm">S/ 12,450</p>
                <p className="text-white/55 text-xs">Saldo disponible</p>
              </div>
            </div>

            {/* Floating chip — transfer */}
            <div className="absolute bottom-8 -left-4 glass-card rounded-2xl px-4 py-3 flex items-center gap-3 animate-float shadow-float"
              style={{ animationDelay: '1.5s' }}>
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-blue-400 to-indigo-500 flex items-center justify-center shrink-0">
                <Zap size={17} className="text-white"/>
              </div>
              <div>
                <p className="text-white font-bold text-xs">Transferencia</p>
                <p className="text-white/55 text-xs">Enviada al instante ✓</p>
              </div>
            </div>

            {/* Floating chip — rate */}
            <div className="absolute top-1/2 -right-2 glass-card rounded-2xl px-3 py-2.5 flex items-center gap-2.5 animate-float shadow-float"
              style={{ animationDelay: '0.8s' }}>
              <div className="w-8 h-8 rounded-xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0">
                <TrendingUp size={15} className="text-white"/>
              </div>
              <div>
                <p className="text-white font-black text-xs">+8.2% TEA</p>
                <p className="text-white/55 text-xs">Rendimiento</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM: Feature pills ── */}
        <div className="relative z-10 p-10 pt-4">
          <div className="grid grid-cols-2 gap-2">
            {FEATURES.map(({ icon: Icon, label, color, delay }) => (
              <div key={label}
                className="flex items-center gap-2.5 glass rounded-xl px-3 py-2.5 animate-fade-in"
                style={{ animationDelay: delay }}>
                <div className={`w-7 h-7 rounded-lg bg-linear-to-br ${color} flex items-center justify-center shrink-0`}>
                  <Icon size={13} className="text-white"/>
                </div>
                <span className="text-white/75 text-xs font-medium leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right-edge wave that bleeds into the form panel */}
        <div className="absolute top-0 right-0 h-full w-16 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, transparent, var(--color-bg-card))',
            opacity: 0.08,
          }}/>
      </div>

      {/* ════════════════════════════════════════
          RIGHT PANEL — form
      ════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-h-screen bg-theme-card relative overflow-hidden">

        {/* Subtle top-right glow */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.06) 0%, transparent 70%)' }}/>

        {/* ── Top bar ── */}
        <div className="flex items-center justify-between px-8 pt-8 pb-0">
          <button onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-theme-soft hover:text-theme text-sm font-medium transition-colors group">
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform"/>
            Volver al inicio
          </button>
          <button onClick={toggle}
            className="w-9 h-9 rounded-xl flex items-center justify-center border border-theme text-theme-muted hover:text-theme hover:bg-theme transition-all">
            {dark ? <Sun size={16} className="text-amber-400"/> : <Moon size={16}/>}
          </button>
        </div>

        {/* ── Form area ── */}
        <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-8">
          <div className="w-full max-w-sm mx-auto space-y-8">

            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-2.5">
              <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-glow">
                <Landmark size={20} className="text-white"/>
              </div>
              <span className="font-black text-lg text-theme">
                Banco<span className="text-primary">Confianza</span>
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-1 w-8 rounded-full bg-linear-to-r from-indigo-500 to-violet-500"/>
                <span className="text-xs font-bold text-theme-muted uppercase tracking-widest">Banca en Línea</span>
              </div>
              <h1 className="text-3xl font-black text-theme leading-tight">
                Bienvenido<br/>de vuelta 👋
              </h1>
              <p className="text-theme-soft text-sm pt-1">
                Ingresa tus credenciales para acceder a tu cuenta segura.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              <InputField
                label="Correo electrónico"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tucorreo@ejemplo.com"
                autoComplete="email"
                icon={Mail}
              />

              <InputField
                label="Contraseña"
                name="password"
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="current-password"
                icon={Lock}
                rightEl={
                  <button type="button" onClick={() => setShowPass(v => !v)}
                    className="text-theme-soft hover:text-theme-muted transition-colors p-1">
                    {showPass ? <EyeOff size={15}/> : <Eye size={15}/>}
                  </button>
                }
              />

              {/* Forgot password */}
              <div className="flex justify-end -mt-2">
                <a href="#" className="text-primary text-xs font-semibold hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2.5 bg-danger-lt border border-red-300/30 rounded-2xl px-4 py-3 text-danger text-sm animate-slide-up">
                  <AlertCircle size={15} className="shrink-0"/>
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={cargando}
                className="w-full flex items-center justify-center gap-2.5 text-white py-4 rounded-2xl font-bold text-sm transition-all btn-glow disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden group"
                style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }}
              >
                {/* Shimmer on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.15) 50%, transparent 65%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer-sweep 2s ease infinite',
                  }}/>
                {cargando ? (
                  <><Loader2 size={16} className="animate-spin"/> Verificando...</>
                ) : (
                  <><span>Ingresar a mi cuenta</span> <ArrowRight size={16}/></>
                )}
              </button>
            </form>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-4 pt-2">
              {[
                { icon: Shield,   text: 'SSL 256-bit' },
                { icon: CheckCircle, text: 'SBS Perú' },
                { icon: Star,     text: 'Banco #1' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-theme-soft text-xs">
                  <Icon size={12} className="text-primary"/>
                  {text}
                </div>
              ))}
            </div>

            {/* Footer */}
            <p className="text-center text-theme-soft text-xs leading-relaxed">
              Al ingresar aceptas nuestros{' '}
              <a href="#" className="text-theme-muted hover:text-theme font-medium transition-colors">Términos</a>
              {' '}y{' '}
              <a href="#" className="text-theme-muted hover:text-theme font-medium transition-colors">Privacidad</a>.
            </p>
          </div>
        </div>

        {/* ── Bottom decoration ── */}
        <div className="px-8 pb-8 flex items-center justify-center gap-2">
          <div className="h-px flex-1 bg-theme"/>
          <span className="text-theme-soft text-xs px-3">© 2026 BancoConfianza S.A.</span>
          <div className="h-px flex-1 bg-theme"/>
        </div>
      </div>
    </div>
  );
}
