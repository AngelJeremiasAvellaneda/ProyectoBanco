import { useNavigate } from 'react-router-dom';
import {
  PiggyBank, CreditCard, TrendingUp, Globe, Home,
  Car, Leaf, ArrowRight, Calculator, Wallet, Shield
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

/* ─── Ahorros data ─── */
const AHORROS = [
  {
    title: 'Cuenta de Ahorros',
    subtitle: 'Sin comisiones',
    badge: 'Popular',
    bgFrom: '#059669',
    bgTo: '#0d9488',
    Icon: PiggyBank,
    pattern: 'scales',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&q=60',
    tasa: '4.5% TEA',
    tasaLabel: 'Rendimiento',
    monto: 'Desde S/ 0',
    plazo: 'Sin plazo',
    desc: 'Sin monto mínimo de apertura. Sin comisiones de mantenimiento. Retiros ilimitados en cualquier agencia o cajero.',
    beneficios: ['Sin monto mínimo', 'Tarjeta de débito gratis', 'Banca móvil incluida', 'Seguro de depósitos', 'Retiros ilimitados', 'Apertura online'],
    requisitos: ['DNI vigente', 'Mayor de 18 años', 'Sin historial requerido', 'Apertura en 5 min'],
    metrics: [
      { label: 'Rendimiento', value: 7, max: 10 },
      { label: 'Liquidez',    value: 10, max: 10 },
      { label: 'Seguridad',   value: 9,  max: 10 },
    ],
  },
  {
    title: 'Depósito a Plazo',
    subtitle: 'Mejor tasa',
    badge: 'Mejor tasa',
    bgFrom: '#2563eb',
    bgTo: '#4f46e5',
    Icon: TrendingUp,
    tasa: 'Hasta 8.2% TEA',
    tasaLabel: 'Rendimiento',
    monto: 'Desde S/ 500',
    plazo: '30–360 días',
    desc: 'Elige el plazo que más te convenga: 30, 60, 90, 180 o 360 días. Renovación automática disponible.',
    beneficios: ['Renovación automática', 'Pago de intereses mensual', 'Sin penalidad anticipada', 'Certificado digital'],
    requisitos: ['DNI vigente', 'Cuenta de ahorros', 'Monto mínimo S/ 500', 'Firma digital'],
    metrics: [
      { label: 'Rendimiento', value: 9,  max: 10 },
      { label: 'Liquidez',    value: 5,  max: 10 },
      { label: 'Seguridad',   value: 10, max: 10 },
    ],
  },
  {
    title: 'Fondo Mutuo',
    subtitle: 'Rentabilidad variable',
    badge: null,
    bgFrom: '#7c3aed',
    bgTo: '#6d28d9',
    Icon: Globe,
    tasa: 'Variable',
    tasaLabel: 'Rentabilidad',
    monto: 'Desde S/ 100',
    plazo: 'Flexible',
    desc: 'Invierte en el mercado de capitales con gestión profesional y diversificación automática del portafolio.',
    beneficios: ['Gestión profesional', 'Diversificación auto', 'Liquidez inmediata', 'Reportes en tiempo real'],
    requisitos: ['DNI vigente', 'Cuenta de ahorros', 'Perfil de riesgo', 'Firma digital'],
    metrics: [
      { label: 'Rentabilidad', value: 8, max: 10 },
      { label: 'Riesgo',       value: 5, max: 10 },
      { label: 'Liquidez',     value: 7, max: 10 },
    ],
  },
];

/* ─── Créditos data ─── */
const CREDITOS = [
  {
    title: 'Crédito MYPE',
    subtitle: 'Desde S/ 500',
    badge: '24h',
    bgFrom: '#2563eb',
    bgTo: '#4f46e5',
    Icon: CreditCard,
    tasa: 'Desde 18% TEA',
    tasaLabel: 'Tasa desde',
    monto: 'S/ 500–50,000',
    plazo: '6–60 meses',
    desc: 'Financiamiento rápido para capital de trabajo, compra de activos o expansión de tu negocio. Aprobación en 24 horas.',
    beneficios: ['Aprobación en 24h', 'Sin garantía hasta S/5,000', 'Desembolso inmediato', 'Cuotas fijas mensuales'],
    requisitos: ['DNI vigente', 'RUC activo', '6 meses de actividad', 'Sin deudas en SBS'],
    metrics: [
      { label: 'Rapidez',  value: 9, max: 10 },
      { label: 'Acceso',   value: 8, max: 10 },
      { label: 'Monto',    value: 7, max: 10 },
    ],
  },
  {
    title: 'Crédito Hipotecario',
    subtitle: 'Tu casa propia',
    badge: null,
    bgFrom: '#059669',
    bgTo: '#0d9488',
    Icon: Home,
    tasa: 'Desde 8.5% TEA',
    tasaLabel: 'Tasa desde',
    monto: 'Hasta S/ 500,000',
    plazo: 'Hasta 20 años',
    desc: 'Financia la compra, construcción o mejora de tu vivienda con las mejores condiciones del mercado peruano.',
    beneficios: ['Cuota inicial desde 10%', 'Seguro de desgravamen', 'Tasación incluida', 'Asesoría legal gratis'],
    requisitos: ['Ingresos demostrables', 'Cuota inicial 10%', 'Tasación del inmueble', 'Seguro de desgravamen'],
    metrics: [
      { label: 'Tasa',     value: 9,  max: 10 },
      { label: 'Plazo',    value: 10, max: 10 },
      { label: 'Monto',    value: 9,  max: 10 },
    ],
  },
  {
    title: 'Crédito Vehicular',
    subtitle: 'Tu vehículo ideal',
    badge: null,
    bgFrom: '#d97706',
    bgTo: '#ea580c',
    Icon: Car,
    tasa: 'Desde 12% TEA',
    tasaLabel: 'Tasa desde',
    monto: 'Hasta S/ 120,000',
    plazo: 'Hasta 60 meses',
    desc: 'Adquiere el vehículo que necesitas para tu negocio o uso personal con financiamiento flexible y rápido.',
    beneficios: ['Cuota inicial 20%', 'Seguro vehicular incluido', 'GPS de rastreo', 'Cuotas fijas'],
    requisitos: ['DNI vigente', 'Ingresos mínimos S/ 1,500', 'Cuota inicial 20%', 'Seguro vehicular'],
    metrics: [
      { label: 'Rapidez',  value: 8, max: 10 },
      { label: 'Tasa',     value: 7, max: 10 },
      { label: 'Monto',    value: 8, max: 10 },
    ],
  },
  {
    title: 'Crédito Agropecuario',
    subtitle: 'Para el campo',
    badge: 'Campo',
    bgFrom: '#16a34a',
    bgTo: '#15803d',
    Icon: Leaf,
    tasa: 'Desde 15% TEA',
    tasaLabel: 'Tasa desde',
    monto: 'S/ 1,000–80,000',
    plazo: '3–36 meses',
    desc: 'Diseñado para productores agrícolas y ganaderos. Financiamiento para campaña, equipos y mejoras del fundo.',
    beneficios: ['Período de gracia', 'Cuotas estacionales', 'Asesoría técnica', 'Seguro agrícola'],
    requisitos: ['DNI vigente', 'Título de propiedad', 'Plan de cultivo', 'Sin deudas vencidas'],
    metrics: [
      { label: 'Acceso',   value: 8, max: 10 },
      { label: 'Plazo',    value: 7, max: 10 },
      { label: 'Apoyo',    value: 9, max: 10 },
    ],
  },
];

/* ─── Tasas ─── */
const TASAS = [
  { producto: 'Cuenta de Ahorros Libre',  tasa: '4.5%',       tipo: 'TEA', moneda: 'Soles' },
  { producto: 'Depósito a Plazo 30 días', tasa: '5.2%',       tipo: 'TEA', moneda: 'Soles' },
  { producto: 'Depósito a Plazo 90 días', tasa: '6.8%',       tipo: 'TEA', moneda: 'Soles' },
  { producto: 'Depósito a Plazo 360 días',tasa: '8.2%',       tipo: 'TEA', moneda: 'Soles' },
  { producto: 'Crédito MYPE',             tasa: 'Desde 18%',  tipo: 'TEA', moneda: 'Soles' },
  { producto: 'Crédito Hipotecario',      tasa: 'Desde 8.5%', tipo: 'TEA', moneda: 'Soles' },
  { producto: 'Crédito Vehicular',        tasa: 'Desde 12%',  tipo: 'TEA', moneda: 'Soles' },
  { producto: 'Crédito Agropecuario',     tasa: 'Desde 15%',  tipo: 'TEA', moneda: 'Soles' },
];

export default function ProductosPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-theme text-theme">
      <Navbar />

      {/* Header */}
      <div className="hero-gradient py-14">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
          <span className="inline-block bg-white/10 border border-white/20 text-blue-100 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            Productos financieros
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Nuestros productos</h1>
          <p className="text-blue-100 max-w-xl mx-auto text-sm">
            Presiona el botón <span className="font-bold">›</span> en cada producto para ver todos los detalles, beneficios y solicitar.
          </p>
        </div>
      </div>

      {/* ── AHORROS ── */}
      <section className="py-16 bg-theme">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-emerald-500/15 rounded-xl flex items-center justify-center">
              <PiggyBank size={18} className="text-emerald-500" />
            </div>
            <h2 className="text-2xl font-black text-theme">Ahorros e Inversiones</h2>
          </div>
          <p className="text-theme-muted text-sm mb-8 ml-11">
            Haz crecer tu dinero con las mejores tasas del mercado. Presiona <span className="font-bold text-primary">›</span> para ver detalles.
          </p>

          {/* Extra top padding for floating icons (44px overlap for lg) */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-14 overflow-visible">
            {AHORROS.map(p => (
              <ProductCard
                key={p.title}
                {...p}
                size="lg"
                onSolicitar={() => navigate('/login')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CRÉDITOS ── */}
      <section className="py-16 bg-theme-alt">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500/15 rounded-xl flex items-center justify-center">
                <CreditCard size={18} className="text-blue-500" />
              </div>
              <h2 className="text-2xl font-black text-theme">Créditos</h2>
            </div>
            <button onClick={() => navigate('/simulador')}
              className="hidden sm:flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline">
              <Calculator size={15} />
              Simular cuota
            </button>
          </div>
          <p className="text-theme-muted text-sm mb-8 ml-11">
            Financia tus proyectos con las mejores condiciones. Presiona <span className="font-bold text-primary">›</span> para ver requisitos y simular.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 pt-14 overflow-visible">
            {CREDITOS.map(c => (
              <ProductCard
                key={c.title}
                {...c}
                size="lg"
                onSolicitar={() => navigate('/login')}
                onSimular={() => navigate('/simulador')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── TASAS VIGENTES ── */}
      <section className="py-16 bg-theme">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-theme">Tasas vigentes</h2>
            <p className="text-theme-muted text-sm mt-1">Actualizado al 14 de mayo de 2026</p>
          </div>
          <div className="bg-theme-card border border-theme rounded-2xl overflow-hidden shadow-card">
            <div className="grid grid-cols-4 bg-primary-lt px-5 py-3 text-primary text-xs font-bold uppercase tracking-wide">
              <span className="col-span-2">Producto</span>
              <span>Tasa</span>
              <span>Moneda</span>
            </div>
            {TASAS.map((t, i) => (
              <div key={t.producto}
                className={`grid grid-cols-4 px-5 py-3.5 text-sm border-t border-theme ${i % 2 === 0 ? '' : 'bg-theme'}`}>
                <span className="col-span-2 text-theme font-medium">{t.producto}</span>
                <span className="text-success font-bold">{t.tasa} {t.tipo}</span>
                <span className="text-theme-muted">{t.moneda}</span>
              </div>
            ))}
          </div>
          <p className="text-theme-soft text-xs text-center mt-3">
            * Las tasas pueden variar según el perfil del cliente y las condiciones del mercado.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient py-14">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-4">
          <h2 className="text-3xl font-black text-white">¿Necesitas asesoría personalizada?</h2>
          <p className="text-blue-100 text-sm">Nuestros asesores están disponibles para ayudarte a elegir el producto ideal.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => navigate('/contacto')}
              className="flex items-center gap-2 bg-white text-blue-900 hover:bg-blue-50 px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg">
              Contactar asesor <ArrowRight size={15} />
            </button>
            <button onClick={() => navigate('/simulador')}
              className="flex items-center gap-2 border border-white/30 hover:border-white/60 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all">
              <Calculator size={15} />
              Simular crédito
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
