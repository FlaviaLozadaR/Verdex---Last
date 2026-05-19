import { useState } from 'react'

const POINTS = [
  {
    id: 'p1', label: 'Bloque B · 2do piso', sub: '38 m · acepta PET, lata, cartón',
    level: 'Medio', x: 36, y: 52,
    stats: [{ k: 'PET', v: '8–18 CVX' }, { k: 'LATA', v: '14 CVX' }, { k: 'CARTÓN', v: '5 CVX' }],
  },
  {
    id: 'p2', label: 'Cafetería UPSA', sub: '95 m · acepta PET, lata',
    level: 'Alto', x: 38, y: 72,
    stats: [{ k: 'PET', v: '12–20 CVX' }, { k: 'LATA', v: '18 CVX' }, { k: 'VIDRIO', v: '6 CVX' }],
  },
  {
    id: 'p3', label: 'Biblioteca Central', sub: '140 m · acepta PET',
    level: 'Bajo', x: 65, y: 32,
    stats: [{ k: 'PET', v: '6–12 CVX' }, { k: 'CARTÓN', v: '4 CVX' }, { k: 'TETRA', v: '3 CVX' }],
  },
  {
    id: 'p4', label: 'Parque Interno', sub: '220 m · acepta PET, cartón',
    level: 'Medio', x: 22, y: 30,
    stats: [{ k: 'PET', v: '8–14 CVX' }, { k: 'CARTÓN', v: '5 CVX' }, { k: 'MIXTO', v: '3 CVX' }],
  },
  {
    id: 'p5', label: 'Bloque D · Planta baja', sub: '310 m · acepta PET, lata',
    level: 'Bajo', x: 70, y: 70,
    stats: [{ k: 'PET', v: '6–10 CVX' }, { k: 'LATA', v: '10 CVX' }, { k: 'VIDRIO', v: '4 CVX' }],
  },
]

const LEVEL_COLOR = { Alto: 'var(--green)', Medio: 'var(--amber-deep)', Bajo: 'var(--ink-3)' }

const LeafIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 12C2 12 3 5 10 3C10 3 10 9 5 11L2 12Z" fill="currentColor" opacity="0.9"/>
    <path d="M2 12L6 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7"/>
  </svg>
)

const MapIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 4l5-2 6 3 5-2v12l-5 2-6-3-5 2V4z"/>
    <path d="M6 2v12M12 5v12"/>
  </svg>
)

export default function CampusMap() {
  const [active, setActive] = useState('p1')
  const point = POINTS.find(p => p.id === active)

  return (
    <div className="campus-map-page">
      {/* Header */}
      <div className="campus-map-header">
        <div className="campus-map-title">
          <MapIcon />
          <span>UPSA · Campus principal</span>
        </div>
        <div className="campus-map-count">{POINTS.length} puntos activos</div>
      </div>

      <div className="campus-map-layout">
        {/* Map */}
        <div className="campus-map-stage">
          {/* Street grid */}
          <svg className="campus-map-grid" viewBox="0 0 100 100" preserveAspectRatio="none">
            <rect width="100" height="100" fill="#f0f0eb"/>
            {/* Streets */}
            <rect x="28" y="0" width="3" height="100" fill="#e0dfd8"/>
            <rect x="58" y="0" width="3" height="100" fill="#e0dfd8"/>
            <rect x="0" y="42" width="100" height="3" fill="#e0dfd8"/>
            <rect x="0" y="62" width="100" height="3" fill="#e0dfd8"/>
            {/* Buildings */}
            <rect x="5" y="10" width="20" height="28" rx="1" fill="#e8e7e0" stroke="#d4d3cc" strokeWidth="0.5"/>
            <rect x="34" y="10" width="22" height="28" rx="1" fill="#e8e7e0" stroke="#d4d3cc" strokeWidth="0.5"/>
            <rect x="62" y="10" width="32" height="28" rx="1" fill="#e8e7e0" stroke="#d4d3cc" strokeWidth="0.5"/>
            <rect x="5" y="48" width="20" height="12" rx="1" fill="#e8e7e0" stroke="#d4d3cc" strokeWidth="0.5"/>
            <rect x="34" y="48" width="22" height="12" rx="1" fill="#e8e7e0" stroke="#d4d3cc" strokeWidth="0.5"/>
            <rect x="62" y="48" width="32" height="12" rx="1" fill="#e8e7e0" stroke="#d4d3cc" strokeWidth="0.5"/>
            <rect x="5" y="66" width="20" height="28" rx="1" fill="#e8e7e0" stroke="#d4d3cc" strokeWidth="0.5"/>
            <rect x="34" y="66" width="22" height="28" rx="1" fill="#e8e7e0" stroke="#d4d3cc" strokeWidth="0.5"/>
            <rect x="62" y="66" width="32" height="28" rx="1" fill="#e8e7e0" stroke="#d4d3cc" strokeWidth="0.5"/>
            {/* Labels */}
            <text x="15" y="26" fontSize="3" fill="#aaa" textAnchor="middle" fontFamily="monospace">Parque</text>
            <text x="45" y="24" fontSize="3" fill="#aaa" textAnchor="middle" fontFamily="monospace">Bloque B</text>
            <text x="78" y="24" fontSize="3" fill="#aaa" textAnchor="middle" fontFamily="monospace">Biblioteca</text>
            <text x="15" y="55" fontSize="3" fill="#aaa" textAnchor="middle" fontFamily="monospace">Lab</text>
            <text x="45" y="55" fontSize="3" fill="#aaa" textAnchor="middle" fontFamily="monospace">Aulas</text>
            <text x="78" y="55" fontSize="3" fill="#aaa" textAnchor="middle" fontFamily="monospace">Admin</text>
            <text x="15" y="80" fontSize="3" fill="#aaa" textAnchor="middle" fontFamily="monospace">Cafetería</text>
            <text x="45" y="80" fontSize="3" fill="#aaa" textAnchor="middle" fontFamily="monospace">SUM</text>
            <text x="78" y="80" fontSize="3" fill="#aaa" textAnchor="middle" fontFamily="monospace">Bloque D</text>
          </svg>

          {/* Pins */}
          {POINTS.map(p => (
            <button
              key={p.id}
              className={'campus-pin' + (p.id === active ? ' active' : '')}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              onClick={() => setActive(p.id)}
            >
              <LeafIcon />
              {p.id === active && <div className="campus-pin-ring" />}
            </button>
          ))}
        </div>

        {/* Detail panel */}
        {point && (
          <div className="campus-detail">
            <div className="campus-detail-head">
              <div className="campus-detail-icon"><LeafIcon /></div>
              <div>
                <div className="campus-detail-nm">{point.label}</div>
                <div className="campus-detail-sub">{point.sub}</div>
              </div>
              <div className="campus-detail-level" style={{ color: LEVEL_COLOR[point.level] }}>
                {point.level}
              </div>
            </div>
            <div className="campus-detail-stats">
              {point.stats.map((s, i) => (
                <div key={i} className="campus-detail-stat">
                  <div className="campus-detail-stat-k">{s.k}</div>
                  <div className="campus-detail-stat-v">{s.v}</div>
                </div>
              ))}
            </div>
            <div className="campus-detail-list">
              {POINTS.filter(p => p.id !== active).map(p => (
                <button key={p.id} className="campus-list-row" onClick={() => setActive(p.id)}>
                  <div className="campus-list-icon"><LeafIcon /></div>
                  <div>
                    <div className="campus-list-nm">{p.label}</div>
                    <div className="campus-list-sub">{p.sub}</div>
                  </div>
                  <div className="campus-list-level" style={{ color: LEVEL_COLOR[p.level] }}>{p.level}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
