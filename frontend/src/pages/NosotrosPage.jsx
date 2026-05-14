import { useNavigate } from 'react-router-dom';
import {
  Landmark, Users, Award, Target, Heart, Globe,
  TrendingUp, Shield, CheckCircle, ArrowRight, MapPin, Calendar
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const VALORES = [
  { icon: Shield,    title: 'Integridad',    desc: 'Actuamos con honestidad y transparencia en cada operación.' },
  { icon: Heart,     title: 'Compromiso',    desc: 'Comprometidos con el desarrollo económico del Perú.' },
  { icon: Users,     title: 'Inclusión',     desc: 'Banca accesible para todos los peruanos, sin excepción.' },
  { icon: TrendingUp,title: 'Innovación',    desc: 'Tecnología de punta al servicio de nuestros clientes.' },
  { icon: Globe,     title: 'Sostenibilidad',desc: 'Crecimiento responsable con el medio ambiente y la sociedad.' },
  { icon: Target,    title: 'Excelencia',    desc: 'Buscamos la mejora continua en todos nuestros procesos.' },
];

const HITOS = [
  { year: '1998', title: 'Fundación', desc: 'BancoConfianza abre sus puertas en Lima con 3 agencias y 50 colaboradores.' },
  { year: '2005', title: 'Expansión regional', desc: 'Llegamos a 10 regiones del Perú con 45 agencias y más de 500 colaboradores.' },
  { year: '2012', title: 'Banca digital', desc: 'Lanzamos nuestra primera plataforma de banca en línea para personas y empresas.' },
  { year: '2018', title: 'App móvil', desc: 'Nuestra aplicación móvil supera el millón de descargas en su primer año.' },
  { year: '2022', title: '2 millones de clientes', desc: 'Alcanzamos los 2 millones de clientes activos a nivel nacional.' },
  { year: '2026', title: 'Banca del futuro', desc: 'Lanzamos nuestra plataforma de IA para asesoría financiera personalizada.' },
];

const EQUIPO = [
  { nombre: 'Dr. Roberto Vargas',   cargo: 'Gerente General',          iniciales: 'RV', color: 'from-blue-500 to-indigo-600' },
  { nombre: 'Lic. Carmen Flores',   cargo: 'Gerente de Operaciones',   iniciales: 'CF', color: 'from-emerald-500 to-teal-600' },
  { nombre: 'Ing. Luis Paredes',    cargo: 'Gerente de Tecnología',    iniciales: 'LP', color: 'from-violet-500 to-purple-600' },
  { nombre: 'Dra. Sofía Ríos',      cargo: 'Gerente de Riesgos',       iniciales: 'SR', color: 'from-orange-500 to-amber-600' },
];

const PREMIOS = [
  { year: '2025', premio: 'Mejor Banco Digital del Perú', entidad: 'Global Finance Magazine' },
  { year: '2024', premio: 'Premio a la Inclusión Financiera', entidad: 'SBS del Perú' },
  { year: '2023', premio: 'Mejor Experiencia de Cliente', entidad: 'Ipsos Perú' },
  { year: '2022', premio: 'Banco más Sostenible', entidad: 'Euromoney' },
];

export default function NosotrosPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-theme text-theme">
      <Navbar />

      {/* ── Header ── */}
      <div className="hero-gradient py-14">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-3">
          <span className="inline-block bg-white/10 border border-white/20 text-blue-100 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            Quiénes somos
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Más de 28 años<br />construyendo confianza</h1>
          <p className="text-blue-100 max-w-xl mx-auto">
            Somos una institución financiera peruana comprometida con el desarrollo económico y la inclusión financiera.
          </p>
        </div>
      </div>

      {/* ── Misión / Visión ── */}
      <section className="py-16 bg-theme">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-6">
          <div className="bg-theme-card border border-theme rounded-2xl p-8 shadow-card">
            <div className="w-10 h-10 bg-primary-lt rounded-xl flex items-center justify-center mb-4">
              <Target size={20} className="text-primary" />
            </div>
            <h2 className="text-theme font-black text-xl mb-3">Nuestra Misión</h2>
            <p className="text-theme-muted leading-relaxed">
              Brindar servicios financieros accesibles, innovadores y de calidad que contribuyan al desarrollo económico de los microempresarios y familias peruanas, promoviendo la inclusión financiera en todo el territorio nacional.
            </p>
          </div>
          <div className="bg-theme-card border border-theme rounded-2xl p-8 shadow-card">
            <div className="w-10 h-10 bg-primary-lt rounded-xl flex items-center justify-center mb-4">
              <Globe size={20} className="text-primary" />
            </div>
            <h2 className="text-theme font-black text-xl mb-3">Nuestra Visión</h2>
            <p className="text-theme-muted leading-relaxed">
              Ser el banco digital líder del Perú al 2030, reconocido por su innovación tecnológica, excelencia en el servicio al cliente y su contribución al desarrollo sostenible del país.
            </p>
          </div>
        </div>
      </section>

      {/* ── Valores ── */}
      <section className="py-16 bg-theme-alt">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="inline-block bg-primary-lt text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              Nuestros valores
            </span>
            <h2 className="text-3xl font-black text-theme">Lo que nos define</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALORES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-theme-card border border-theme rounded-2xl p-6 shadow-card card-hover flex gap-4">
                <div className="w-10 h-10 bg-primary-lt rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={19} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-theme font-bold text-sm mb-1">{title}</h3>
                  <p className="text-theme-muted text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Historia / Timeline ── */}
      <section className="py-16 bg-theme">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="inline-block bg-primary-lt text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              Nuestra historia
            </span>
            <h2 className="text-3xl font-black text-theme">Hitos que nos enorgullecen</h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-[var(--color-border)]" />

            <div className="space-y-6">
              {HITOS.map(({ year, title, desc }) => (
                <div key={year} className="flex gap-6 pl-14 relative">
                  {/* Dot */}
                  <div className="absolute left-3.5 top-1 w-5 h-5 bg-[var(--color-primary)] rounded-full border-4 border-[var(--color-bg)] shadow-md" />
                  <div className="bg-theme-card border border-theme rounded-2xl p-5 shadow-card flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-primary-lt text-primary text-xs font-black px-2.5 py-0.5 rounded-full">{year}</span>
                      <h3 className="text-theme font-bold text-sm">{title}</h3>
                    </div>
                    <p className="text-theme-muted text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Equipo directivo ── */}
      <section className="py-16 bg-theme-alt">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="inline-block bg-primary-lt text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              Equipo directivo
            </span>
            <h2 className="text-3xl font-black text-theme">Liderazgo con experiencia</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {EQUIPO.map(({ nombre, cargo, iniciales, color }) => (
              <div key={nombre} className="bg-theme-card border border-theme rounded-2xl p-6 text-center shadow-card card-hover">
                <div className={`w-16 h-16 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-xl font-black shadow-md`}>
                  {iniciales}
                </div>
                <h3 className="text-theme font-bold text-sm">{nombre}</h3>
                <p className="text-theme-muted text-xs mt-1">{cargo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Premios ── */}
      <section className="py-16 bg-theme">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="inline-block bg-primary-lt text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
              Reconocimientos
            </span>
            <h2 className="text-3xl font-black text-theme">Premios y distinciones</h2>
          </div>
          <div className="space-y-3">
            {PREMIOS.map(({ year, premio, entidad }) => (
              <div key={premio} className="bg-theme-card border border-theme rounded-2xl px-6 py-4 shadow-card flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <Award size={22} className="text-amber-500" />
                </div>
                <div className="flex-1">
                  <p className="text-theme font-semibold text-sm">{premio}</p>
                  <p className="text-theme-muted text-xs">{entidad}</p>
                </div>
                <span className="bg-primary-lt text-primary text-xs font-bold px-2.5 py-1 rounded-full shrink-0">{year}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Presencia ── */}
      <section className="py-16 bg-theme-alt">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-theme">Presencia nacional</h2>
            <p className="text-theme-muted text-sm mt-2">180+ agencias en 25 regiones del Perú</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {['Lima', 'Arequipa', 'Cusco', 'Trujillo', 'Piura', 'Chiclayo', 'Iquitos', 'Huancayo', 'Puno', 'Tacna'].map((ciudad) => (
              <div key={ciudad} className="bg-theme-card border border-theme rounded-xl px-4 py-3 flex items-center gap-2 shadow-card">
                <MapPin size={14} className="text-primary shrink-0" />
                <span className="text-theme text-sm font-medium">{ciudad}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="hero-gradient py-14">
        <div className="max-w-2xl mx-auto px-6 text-center space-y-4">
          <h2 className="text-3xl font-black text-white">¿Quieres ser parte de nuestro equipo?</h2>
          <p className="text-blue-100 text-sm">Buscamos personas comprometidas con la inclusión financiera del Perú.</p>
          <button
            onClick={() => navigate('/contacto')}
            className="inline-flex items-center gap-2 bg-white text-blue-900 hover:bg-blue-50 px-7 py-3 rounded-xl font-bold text-sm transition-all shadow-lg"
          >
            Ver vacantes <ArrowRight size={15} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
