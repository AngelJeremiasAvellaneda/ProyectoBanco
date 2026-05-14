import { useNavigate } from 'react-router-dom';
import {
  Shield, TrendingUp, CreditCard, ChevronRight,
  Star, Users, Lock, Zap, ArrowRight,
  CheckCircle, BarChart3, Wallet, PiggyBank,
  Globe, Smartphone, HeadphonesIcon, Award, LayoutDashboard
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';

const STATS = [
  { value: '2.4M+',   label: 'Clientes activos',  icon: Users },
  { value: 'S/ 8.2B', label: 'En depósitos',       icon: Wallet },
  { value: '98.7%',   label: 'Satisfacción',        icon: Star },
  { value: '180+',    label: 'Agencias a nivel nacional', icon: Globe },
];

const PRODUCTS = [
  {
    icon: PiggyBank,
    title: 'Cuenta de Ahorros',
    desc: 'Hasta 6.5% TEA. Sin comisiones de mantenimiento. Disponible 24/7 desde cualquier dispositivo.',
    color: 'from-emerald-500 to-teal-600',
    badge: 'Más popular',
    link: '/productos',
  },
  {
    icon: CreditCard,
    title: 'Crédito MYPE',
    desc: 'Desde S/ 500 hasta S/ 50,000. Aprobación en 24 horas con mínimos requisitos.',
    color: 'from-blue-500 to-indigo-600',
    badge: 'Nuevo',
    link: '/productos',
  },
  {
    icon: TrendingUp,
    title: 'Inversiones',
    desc: 'Fondos mutuos y depósitos a plazo fijo con las mejores tasas del mercado peruano.',
    color: 'from-violet-500 to-purple-600',
    badge: null,
    link: '/productos',
  },
  {
    icon: Globe,
    title: 'Transferencias',
    desc: 'Envía dinero al instante a cualquier banco del Perú sin costo adicional.',
    color: 'from-orange-500 to-amber-600',
    badge: null,
    link: '/productos',
  },
];

const FEATURES = [
  { icon: Lock,          title: 'Seguridad bancaria',      desc: 'Cifrado de 256 bits y autenticación de dos factores en cada operación.' },
  { icon: Zap,           title: 'Operaciones al instante', desc: 'Transferencias y pagos procesados en tiempo real, los 365 días del año.' },
  { icon: BarChart3,     title: 'Control total',           desc: 'Visualiza y gestiona tus finanzas desde un solo lugar con reportes detallados.' },
  { icon: Shield,        title: 'Supervisado por SBS',     desc: 'Regulado y supervisado por la Superintendencia de Banca, Seguros y AFP.' },
  { icon: Smartphone,    title: 'App móvil',               desc: 'Disponible para iOS y Android. Banca en la palma de tu mano.' },
  { icon: HeadphonesIcon,title: 'Soporte 24/7',            desc: 'Atención al cliente disponible todos los días del año por múltiples canales.' },
];

const TESTIMONIALS = [
  { name: 'María Quispe',   role: 'Emprendedora, Cusco',    text: 'Obtuve mi crédito MYPE en 24 horas. Pude expandir mi negocio de textiles gracias a BancoConfianza.', rating: 5, avatar: 'MQ' },
  { name: 'Carlos Mendoza', role: 'Agricultor, Junín',      text: 'Las transferencias son instantáneas. Ya no pierdo tiempo yendo al banco. Todo desde mi celular.', rating: 5, avatar: 'CM' },
  { name: 'Ana Torres',     role: 'Comerciante, Lima',      text: 'La banca en línea es increíble. Manejo todas mis cuentas y pago mis servicios sin salir de casa.', rating: 5, avatar: 'AT' },
  { name: 'Pedro Huanca',   role: 'Ganadero, Puno',         text: 'El crédito agropecuario me ayudó a comprar más ganado. El proceso fue muy sencillo y rápido.', rating: 5, avatar: 'PH' },
];

const NOTICIAS = [
  { tag: 'Finanzas',   title: 'BancoConfianza lanza nueva tasa preferencial para MYPE en 2026', date: '10 May 2026' },
  { tag: 'Tecnología', title: 'Nueva app móvil con reconocimiento facial disponible para todos los clientes', date: '5 May 2026' },
  { tag: 'Empresa',    title: 'Apertura de 15 nuevas agencias en regiones del sur del Perú', date: '28 Abr 2026' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { sesion } = useAuth();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-theme text-theme overflow-x-hidden">
      <Navbar />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative hero-gradient overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-blue-100 text-sm">
              <CheckCircle size={14} />
              Supervisado por la SBS del Perú
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-white">
              Tu dinero,{' '}
              <span className="text-gradient">más seguro</span>{' '}
              que nunca
            </h1>

            <p className="text-blue-100 text-lg leading-relaxed max-w-lg">
              Banca digital de confianza para el microempresario peruano. Créditos rápidos, ahorros con las mejores tasas y transferencias al instante.
            </p>

            <div className="flex flex-wrap gap-3">
              {sesion ? (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2 bg-white text-blue-900 hover:bg-blue-50 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg"
                >
                  <LayoutDashboard size={16} />
                  Ir a mi panel
                </button>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-2 bg-white text-blue-900 hover:bg-blue-50 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg"
                >
                  Ingresar a mi cuenta
                  <ArrowRight size={16} />
                </button>
              )}
              <button
                onClick={() => navigate('/simulador')}
                className="flex items-center gap-2 border border-white/30 hover:border-white/60 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200"
              >
                Simular crédito
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-5 pt-1">
              {[
                { icon: Shield, text: 'Fondo de Seguro de Depósitos' },
                { icon: Lock,   text: 'SSL 256-bit' },
                { icon: Award,  text: 'Mejor banco digital 2025' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-blue-200 text-xs">
                  <Icon size={13} />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Right — card mockup */}
          <div className="hidden lg:flex justify-center items-center relative h-80">
            {/* Main card */}
            <div className="absolute w-72 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 shadow-2xl animate-float z-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-blue-200 text-xs mb-1">Cuenta Principal</p>
                  <p className="text-white font-black text-2xl">S/ 12,450.00</p>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <CreditCard size={20} className="text-white" />
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-blue-200 text-xs">Titular</p>
                  <p className="text-white font-semibold text-sm">Juan Pérez García</p>
                </div>
                <p className="text-blue-200 text-sm font-mono">•••• 4821</p>
              </div>
            </div>

            {/* Floating chips */}
            <div className="absolute top-4 right-4 glass rounded-2xl p-3.5 animate-float-delay shadow-xl z-20">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp size={14} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-white text-xs font-bold">+S/ 320</p>
                  <p className="text-slate-300 text-xs">Intereses este mes</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-4 left-0 glass rounded-2xl p-3.5 animate-float shadow-xl z-20">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Zap size={14} className="text-blue-300" />
                </div>
                <div>
                  <p className="text-white text-xs font-bold">Transferencia</p>
                  <p className="text-slate-300 text-xs">Enviada al instante</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="var(--color-bg)" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════ */}
      <section className="bg-theme py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {STATS.map(({ value, label, icon: Icon }) => (
            <div key={label} className="group relative pt-8 pb-5 px-4 bg-theme-card border border-theme rounded-2xl text-center shadow-card card-hover overflow-visible">
              {/* Floating icon */}
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-12 h-12 bg-linear-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-float group-hover:scale-110 transition-transform duration-300">
                <Icon size={20} className="text-white" />
              </div>
              <p className="text-2xl font-black text-theme">{value}</p>
              <p className="text-theme-muted text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          PRODUCTS
      ══════════════════════════════════════ */}
      <section id="productos" className="py-20 bg-theme-alt">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 space-y-3">
            <span className="inline-block bg-primary-lt text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              Nuestros productos
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-theme">
              Todo lo que necesitas,<br />en un solo lugar
            </h2>
            <p className="text-theme-muted max-w-xl mx-auto text-sm">
              Diseñados para el microempresario peruano con las mejores condiciones del mercado.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {PRODUCTS.map(({ icon: Icon, title, desc, color, badge, link }) => (
              <div
                key={title}
                onClick={() => navigate(link)}
                className="group relative pt-10 pb-6 px-5 bg-theme-card border border-theme rounded-2xl card-hover cursor-pointer shadow-card overflow-visible"
              >
                {/* Floating icon — sobresale por arriba */}
                <div className={`absolute -top-5 left-5 w-14 h-14 bg-linear-to-br ${color} rounded-2xl flex items-center justify-center shadow-float group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={26} className="text-white" />
                </div>
                {badge && (
                  <span className="absolute top-3 right-3 bg-primary-lt text-primary text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {badge}
                  </span>
                )}
                <h3 className="text-theme font-bold text-base mb-2">{title}</h3>
                <p className="text-theme-muted text-sm leading-relaxed">{desc}</p>
                <div className="mt-4 flex items-center gap-1 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Ver más <ChevronRight size={15} />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/productos')}
              className="inline-flex items-center gap-2 border border-theme text-theme-muted hover:text-theme hover:border-[var(--color-primary)] px-6 py-2.5 rounded-xl text-sm font-semibold transition-all"
            >
              Ver todos los productos <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURES
      ══════════════════════════════════════ */}
      <section id="beneficios" className="py-20 bg-theme">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 space-y-3">
            <span className="inline-block bg-primary-lt text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              ¿Por qué elegirnos?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-theme">
              Banca moderna con<br /><span className="text-gradient">seguridad de primer nivel</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {FEATURES.map(({ icon: Icon, title, desc }, i) => {
              const grads = [
                'from-blue-500 to-indigo-600',
                'from-violet-500 to-purple-600',
                'from-emerald-500 to-teal-600',
                'from-orange-500 to-amber-600',
                'from-pink-500 to-rose-600',
                'from-cyan-500 to-blue-600',
              ];
              return (
                <div key={title} className="group relative pt-10 pb-6 px-5 bg-theme-card border border-theme rounded-2xl shadow-card card-hover overflow-visible">
                  <div className={`absolute -top-5 left-5 w-12 h-12 bg-linear-to-br ${grads[i % grads.length]} rounded-2xl flex items-center justify-center shadow-float group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <h4 className="text-theme font-bold text-sm mb-2">{title}</h4>
                  <p className="text-theme-muted text-xs leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════ */}
      <section id="testimonios" className="py-20 bg-theme-alt">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12 space-y-3">
            <span className="inline-block bg-primary-lt text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
              Testimonios
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-theme">Lo que dicen nuestros clientes</h2>
          </div>

          {/* Carousel */}
          <div className="relative min-h-[200px]">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className={`transition-all duration-500 ${
                  i === activeTestimonial
                    ? 'opacity-100 translate-y-0 relative'
                    : 'opacity-0 absolute inset-0 translate-y-3 pointer-events-none'
                }`}
              >
                <div className="bg-theme-card border border-theme rounded-3xl p-8 shadow-card">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={16} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-theme text-base leading-relaxed italic mb-6">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-theme font-semibold text-sm">{t.name}</p>
                      <p className="text-theme-muted text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === activeTestimonial ? 'bg-[var(--color-primary)] w-6' : 'bg-[var(--color-border)] w-2'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          NOTICIAS
      ══════════════════════════════════════ */}
      <section className="py-20 bg-theme">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="inline-block bg-primary-lt text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                Noticias
              </span>
              <h2 className="text-2xl font-black text-theme">Últimas novedades</h2>
            </div>
            <button className="hidden sm:flex items-center gap-1 text-primary text-sm font-semibold hover:underline">
              Ver todas <ChevronRight size={15} />
            </button>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {NOTICIAS.map(({ tag, title, date }) => (
              <div key={title} className="bg-theme-card border border-theme rounded-2xl p-5 shadow-card card-hover cursor-pointer group">
                <span className="inline-block bg-primary-lt text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3">
                  {tag}
                </span>
                <h3 className="text-theme font-semibold text-sm leading-snug mb-3 group-hover:text-primary transition-colors">
                  {title}
                </h3>
                <p className="text-theme-soft text-xs">{date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════ */}
      <section className="hero-gradient py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center space-y-5">
          <h2 className="text-3xl sm:text-4xl font-black text-white">¿Listo para empezar?</h2>
          <p className="text-blue-100">Únete a más de 2.4 millones de peruanos que ya confían en nosotros.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {sesion ? (
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 bg-white text-blue-900 hover:bg-blue-50 px-7 py-3 rounded-xl font-bold text-sm transition-all shadow-lg"
              >
                <LayoutDashboard size={16} /> Ir a mi panel
              </button>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 bg-white text-blue-900 hover:bg-blue-50 px-7 py-3 rounded-xl font-bold text-sm transition-all shadow-lg"
              >
                Ingresar a Banca en Línea <ArrowRight size={16} />
              </button>
            )}
            <button
              onClick={() => navigate('/simulador')}
              className="flex items-center gap-2 border border-white/30 hover:border-white/60 text-white px-7 py-3 rounded-xl font-semibold text-sm transition-all"
            >
              Simular mi crédito
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
