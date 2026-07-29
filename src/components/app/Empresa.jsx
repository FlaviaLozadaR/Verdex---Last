import { useState } from 'react'
import { Icons } from '../Icons'

const IcDrop  = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 2c3 4 5.5 7.2 5.5 10a5.5 5.5 0 01-11 0C3.5 9.2 6 6 9 2z"/></svg>
const IcCO2   = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="9" cy="9" r="6.5"/><path d="M9 5v4l2.5 2.5"/></svg>
const IcUsers = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6.5" cy="6" r="2.6"/><path d="M1.5 16c0-3 2.2-5 5-5s5 2 5 5"/><circle cx="13" cy="7" r="2.1"/><path d="M11 11.2c2.3.3 3.9 2 3.9 4.8"/></svg>
const IcPin   = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 1.5a5.2 5.2 0 015.2 5.2c0 3.7-5.2 9.8-5.2 9.8S3.8 10.4 3.8 6.7A5.2 5.2 0 019 1.5z"/><circle cx="9" cy="6.7" r="1.8"/></svg>
const IcMedal = () => <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="13" cy="10" r="6.5"/><path d="M9 15.5L7 24l6-3 6 3-2-8.5"/></svg>
const IcDownload = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v8m0 0l-3-3m3 3l3-3M2.5 12.5h11"/></svg>

const PERIODS = {
  mes: {
    label: 'Este mes',
    kg: 1240, delta: '+12% vs. mes anterior',
    co2: 620, agua: 18600, usuarios: 348, puntos: 6,
    rankScale: 1,
  },
  trimestre: {
    label: 'Trimestre',
    kg: 3260, delta: '+28% vs. trimestre anterior',
    co2: 1630, agua: 48900, usuarios: 412, puntos: 7,
    rankScale: 2.6,
  },
  anio: {
    label: 'Año',
    kg: 12480, delta: '+41% vs. año anterior',
    co2: 6240, agua: 187200, usuarios: 512, puntos: 9,
    rankScale: 10.1,
  },
}

const MONTHS = [
  { m: 'Feb', kg: 780 },
  { m: 'Mar', kg: 860 },
  { m: 'Abr', kg: 910 },
  { m: 'May', kg: 990 },
  { m: 'Jun', kg: 1080 },
  { m: 'Jul', kg: 1240 },
]

const RANKING_BASE = [
  { name: 'UPSA · Campus Norte', kg: 410 },
  { name: 'Hipermaxi Equipetrol', kg: 305 },
  { name: 'Plaza Blacutt', kg: 265 },
  { name: 'Torre Empresarial', kg: 260 },
]

export default function Empresa({ state, onSwitchRole, notify }) {
  const [period, setPeriod] = useState('mes')
  const d = PERIODS[period]
  const maxMonth = Math.max(...MONTHS.map(x => x.kg))
  const ranking = RANKING_BASE
    .map(r => ({ ...r, kg: Math.round(r.kg * d.rankScale) }))
    .sort((a, b) => b.kg - a.kg)
  const maxRank = ranking[0].kg

  const handleReport = () => {
    if (notify) notify('Reporte ESG generado (demo) — la descarga real llega pronto')
  }

  return (
    <div className="emp-page">
      {/* Greeting */}
      <div className="emp-greeting">
        <div className="emp-hello">
          Hola, <em>{state.company || 'tu empresa'}</em>
        </div>
        <div className="emp-sub">Así impacta tu marca a través de Verdex.</div>
      </div>

      {/* Period toggle */}
      <div className="emp-period">
        {Object.entries(PERIODS).map(([key, p]) => (
          <button
            key={key}
            className={'emp-period-btn' + (period === key ? ' active' : '')}
            onClick={() => setPeriod(key)}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Hero wallet card */}
      <div className="wallet-card emp-hero">
        <div className="lbl">MATERIAL RECICLADO A TRAVÉS DE TU MARCA</div>
        <div className="pts">{d.kg.toLocaleString('es-BO')}<small>kg</small></div>
        <div className="emp-hero-delta">{d.delta}</div>
        <div className="emp-hero-badge">
          {Icons.leaf}<span>Nivel ESG: Oro</span>
        </div>
      </div>

      {/* Impact stats */}
      <div className="home-section-label" style={{ marginTop: 20 }}>Impacto en números</div>
      <div className="home-impact">
        <div className="home-impact-grid">
          <div className="home-impact-stat">
            <div className="home-impact-ic"><IcCO2/></div>
            <div className="home-impact-v">{d.co2.toLocaleString('es-BO')}<span>kg</span></div>
            <div className="home-impact-k">CO₂ evitado</div>
          </div>
          <div className="home-impact-stat">
            <div className="home-impact-ic"><IcDrop/></div>
            <div className="home-impact-v">{(d.agua / 1000).toFixed(1)}<span>m³</span></div>
            <div className="home-impact-k">Agua ahorrada</div>
          </div>
          <div className="home-impact-stat">
            <div className="home-impact-ic"><IcUsers/></div>
            <div className="home-impact-v">{d.usuarios}</div>
            <div className="home-impact-k">Usuarios activos</div>
          </div>
          <div className="home-impact-stat">
            <div className="home-impact-ic"><IcPin/></div>
            <div className="home-impact-v">{d.puntos}</div>
            <div className="home-impact-k">Puntos de recolección</div>
          </div>
        </div>
      </div>

      {/* Monthly trend */}
      <div className="section-row"><h3>Tendencia mensual</h3><span className="emp-chart-unit">kg reciclados</span></div>
      <div className="emp-chart">
        {MONTHS.map(({ m, kg }) => (
          <div className="emp-bar-col" key={m}>
            <div className="emp-bar-track">
              <div className="emp-bar-fill" style={{ height: `${(kg / maxMonth) * 100}%` }}></div>
            </div>
            <div className="emp-bar-v">{kg}</div>
            <div className="emp-bar-m">{m}</div>
          </div>
        ))}
      </div>

      {/* Ranking */}
      <div className="section-row"><h3>Ranking por sede</h3></div>
      <div className="emp-rank-list">
        {ranking.map((r, i) => (
          <div className="emp-rank-row" key={r.name}>
            <div className="emp-rank-pos">{i + 1}</div>
            <div className="emp-rank-info">
              <div className="emp-rank-nm">{r.name}</div>
              <div className="emp-rank-bar"><i style={{ width: `${(r.kg / maxRank) * 100}%` }}></i></div>
            </div>
            <div className="emp-rank-kg">{r.kg.toLocaleString('es-BO')} <span>kg</span></div>
          </div>
        ))}
      </div>

      {/* ESG report callout */}
      <div className="emp-report">
        <div className="emp-report-ic"><IcMedal/></div>
        <div className="emp-report-info">
          <div className="emp-report-title">Certificado de impacto Verdex</div>
          <div className="emp-report-desc">Nivel Oro · válido para tu memoria de sostenibilidad</div>
        </div>
        <button className="emp-report-btn" onClick={handleReport}>
          <IcDownload/> Descargar reporte ESG
        </button>
      </div>

      <button className="emp-switch-link" onClick={onSwitchRole}>Ver la app como usuario final →</button>
    </div>
  )
}
