import { Link } from 'react-router-dom';
import { Landmark, Phone, Mail, MapPin, Share2, MessageCircle, Play, X } from 'lucide-react';

const COLS = [
  {
    title: 'Productos',
    links: [
      { label: 'Cuenta de Ahorros', to: '/productos' },
      { label: 'Crédito MYPE',      to: '/productos' },
      { label: 'Inversiones',       to: '/productos' },
      { label: 'Transferencias',    to: '/productos' },
      { label: 'Seguros',           to: '/productos' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Quiénes somos',         to: '/nosotros' },
      { label: 'Trabaja con nosotros',   to: '/nosotros' },
      { label: 'Responsabilidad social', to: '/nosotros' },
      { label: 'Prensa',                 to: '/nosotros' },
      { label: 'Transparencia',          to: '/nosotros' },
    ],
  },
  {
    title: 'Ayuda',
    links: [
      { label: 'Preguntas frecuentes', to: '/contacto' },
      { label: 'Simulador de crédito', to: '/simulador' },
      { label: 'Tarifario',            to: '/contacto' },
      { label: 'Libro de reclamaciones', to: '/contacto' },
      { label: 'Contáctanos',          to: '/contacto' },
    ],
  },
];

const SOCIAL = [
  { icon: Share2,         href: '#', label: 'Facebook' },
  { icon: MessageCircle,  href: '#', label: 'Instagram' },
  { icon: Play,           href: '#', label: 'YouTube' },
  { icon: X,              href: '#', label: 'Twitter/X' },
];

export default function Footer() {
  return (
    <footer className="bg-theme-alt border-t border-theme">
      {/* Top strip */}
      <div className="bg-[var(--color-primary)] py-3">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-white text-sm">
          <span className="font-semibold">📞 Línea gratuita: 0800-00-123</span>
          <span className="text-blue-100 text-xs">Lunes a Sábado 8:00 am – 8:00 pm | Domingos 9:00 am – 5:00 pm</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-[var(--color-primary)] rounded-xl flex items-center justify-center">
                <Landmark size={18} className="text-white" />
              </div>
              <span className="font-extrabold text-lg text-theme">
                Banco<span className="text-primary">Confianza</span>
              </span>
            </div>
            <p className="text-theme-muted text-sm leading-relaxed max-w-xs">
              Institución financiera supervisada por la Superintendencia de Banca, Seguros y AFP del Perú (SBS). Comprometidos con el desarrollo del microempresario peruano.
            </p>

            {/* Contact */}
            <div className="space-y-2">
              {[
                { icon: Phone,  text: '0800-00-123 (Gratuito)' },
                { icon: Mail,   text: 'atencion@bancoconfianza.pe' },
                { icon: MapPin, text: 'Av. Javier Prado Este 4200, Lima' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-theme-muted text-xs">
                  <Icon size={13} className="text-primary shrink-0" />
                  {text}
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="flex gap-2 pt-1">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-theme flex items-center justify-center text-theme-muted hover:text-primary hover:bg-primary-lt transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLS.map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-theme font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-theme-muted hover:text-primary text-sm transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-theme pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-theme-soft text-xs">
          <p>© 2026 BancoConfianza S.A. Todos los derechos reservados.</p>
          <div className="flex gap-5">
            {['Privacidad', 'Términos', 'Cookies', 'Tarifario'].map((l) => (
              <a key={l} href="#" className="hover:text-theme-muted transition-colors">{l}</a>
            ))}
          </div>
          <p className="text-theme-soft">Supervisado por la <span className="font-semibold">SBS</span></p>
        </div>
      </div>
    </footer>
  );
}
