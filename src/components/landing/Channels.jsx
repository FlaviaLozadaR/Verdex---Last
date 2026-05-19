import { useState } from 'react'
import { CHANNELS } from '../../data/constants'

const VISUALS = {
  uni: {
    bg: 'var(--green-soft)',
    color: 'var(--green)',
    label: 'Campus universitario',
    steps: ['Escanear QR en contenedor', 'Depositar el envase', 'Sumar puntos al instante'],
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="14" height="14" rx="2"/>
        <rect x="8" y="8" width="6" height="6" fill="currentColor" stroke="none"/>
        <rect x="26" y="4" width="14" height="14" rx="2"/>
        <rect x="30" y="8" width="6" height="6" fill="currentColor" stroke="none"/>
        <rect x="4" y="26" width="14" height="14" rx="2"/>
        <rect x="8" y="30" width="6" height="6" fill="currentColor" stroke="none"/>
        <path d="M26 26h6M32 26v6M26 32h4M26 38h14M32 32h8"/>
      </svg>
    ),
  },
  emp: {
    bg: 'var(--bg-2)',
    color: 'var(--ink)',
    label: 'Recolección B2B · Semanal',
    steps: ['Solicitar retiro programado', 'Pesar y registrar material', 'Emitir certificado RSE'],
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="6" width="28" height="34" rx="3"/>
        <path d="M15 16h14M15 22h14M15 28h8"/>
        <path d="M18 4h8a2 2 0 010 4h-8a2 2 0 010-4z"/>
      </svg>
    ),
  },
  pub: {
    bg: 'var(--green-soft)',
    color: 'var(--green-deep)',
    label: 'Cobertura toda la ciudad',
    steps: ['Ubicar punto Verdex', 'Depositar sin app requerida', 'Ticket físico o digital'],
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4a11 11 0 0111 11c0 9-11 22-11 22S11 24 11 15A11 11 0 0122 4z"/>
        <circle cx="22" cy="15" r="4"/>
        <path d="M12 36c-4 1-6 2.5-6 4h32c0-1.5-2-3-6-4"/>
      </svg>
    ),
  },
  sup: {
    bg: 'var(--amber-soft)',
    color: 'var(--amber-deep)',
    label: 'Máquina inteligente',
    steps: ['Insertar envase en máquina', 'Identificar por código de barras', 'Ticket físico + QR de puntos'],
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="4" width="28" height="38" rx="4"/>
        <rect x="13" y="10" width="18" height="11" rx="2"/>
        <circle cx="22" cy="32" r="4"/>
        <path d="M13 28h4M27 28h4"/>
      </svg>
    ),
  },
}

export default function Channels() {
  const [active, setActive] = useState(0)
  const c = CHANNELS[active]
  const viz = VISUALS[c.id]

  return (
    <section id="canales">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">Cuatro canales · Un ecosistema</div>
          </div>
          <div>
            <h2>El sistema opera <em>donde la gente ya está.</em></h2>
            <p className="lede">
              Universidades, empresas, espacios públicos y comercios.
            </p>
          </div>
        </div>

        <div className="channels-tabs" role="tablist">
          {CHANNELS.map((ch, i) => (
            <button
              key={ch.id}
              className="channel-tab"
              data-active={i === active}
              onClick={() => setActive(i)}
              role="tab"
            >
              <span className="num">CANAL · 0{i+1}</span>
              <span className="nm">{ch.short}</span>
            </button>
          ))}
        </div>

        <div className="channel-panel">
          <div className="channel-copy">
            <div className="eyebrow">Canal 0{active+1} · {c.short}</div>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
            <div className="channel-stats">
              {c.stats.map((s, i) => (
                <div key={i}>
                  <div className="k">{s.k}</div>
                  <div className="v">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="channel-visual">
            <div className="ch-viz" style={{ '--viz-bg': viz.bg, '--viz-color': viz.color }}>
              <div className="ch-viz-top">
                <div className="ch-viz-icon">{viz.icon}</div>
                <div className="ch-viz-label">{viz.label}</div>
              </div>
              <div className="ch-viz-flow">
                {viz.steps.map((step, i) => (
                  <div key={i} className="ch-viz-step">
                    <span className="ch-viz-n">{i + 1}</span>
                    <span className="ch-viz-text">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
