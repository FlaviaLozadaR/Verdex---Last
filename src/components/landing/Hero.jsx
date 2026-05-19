import { Icons } from '../Icons'

export default function Hero({ onOpenApp }) {
  return (
    <header id="top" className="hero">
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">Feria de Innovación y Emprendimiento · UPSA 2026</div>
            <h1>
              Reciclar deja<br />
              de no <em>convenir.</em>
            </h1>
          </div>
          <div className="hero-aside">
            <div className="hero-stat">98<sup>%</sup></div>
            <p>
              Tasa de retorno del sistema <strong>Pfand alemán</strong> — el modelo
              que inspira a Verdex. Lo adaptamos a Bolivia con alianzas comerciales
              locales como motor económico.
            </p>
          </div>
        </div>

        <p className="hero-sub">
          Verdex es la primera plataforma híbrida en Bolivia que combina
          contenedores físicos, máquinas inteligentes y una app de recompensas en
          un solo ecosistema circular. Cada acción verde se convierte en puntos
          canjeables por descuentos reales en empresas afiliadas.
        </p>

        <div className="hero-meta">
          <button className="btn btn-primary" onClick={onOpenApp}>
            Abrir la app Verdex
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <a href="#modelo" className="btn btn-ghost">Ver el modelo</a>
        </div>

        <div className="ticker">
          <div className="ticker-track">
            <span>Universidades</span><span>Supermercados</span><span>Empresas</span>
            <span>Municipios</span><span>App móvil</span><span>Máquinas inteligentes</span>
            <span>Vales canjeables</span><span>Materia prima a industria</span>
            <span>Universidades</span><span>Supermercados</span><span>Empresas</span>
            <span>Municipios</span><span>App móvil</span><span>Máquinas inteligentes</span>
            <span>Vales canjeables</span><span>Materia prima a industria</span>
          </div>
        </div>
      </div>
    </header>
  )
}
