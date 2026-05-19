import { LEVELS, levelFor } from '../../data/constants'

function PlantProgress({ pct, milestones, totalRange }) {
  const id = 'pc'
  return (
    <div className="lv-plant-wrap">
      <svg viewBox="0 0 400 60" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height: 60, display:'block' }}>
        <defs>
          <clipPath id={id}>
            <rect x="0" y="0" width={`${pct}%`} height="100%"/>
          </clipPath>
        </defs>

        {/* ── Background (faded) plant ── */}
        <g opacity="0.20" stroke="#4a7a52" fill="none" strokeLinecap="round">
          <path d="M2 34 Q30 26 60 32 Q90 38 120 30 Q150 22 180 30 Q210 38 240 30 Q270 22 300 28 Q330 34 360 26 Q385 20 400 22" strokeWidth="4.5"/>
          <path d="M60 32 C52 14 66 6 72 20Z" fill="#4a7a52"/>
          <path d="M120 30 C112 12 126 4 132 18Z" fill="#4a7a52"/>
          <path d="M180 30 C172 12 186 4 192 18Z" fill="#4a7a52"/>
          <path d="M240 30 C232 12 246 4 252 18Z" fill="#4a7a52"/>
          <path d="M300 28 C292 10 306 2 312 16Z" fill="#4a7a52"/>
          <path d="M360 26 C352 8 366 0 372 14Z" fill="#4a7a52"/>
          <path d="M90 34 C82 50 96 54 100 40Z" fill="#4a7a52"/>
          <path d="M150 28 C142 44 156 48 160 34Z" fill="#4a7a52"/>
          <path d="M210 32 C202 48 216 52 220 38Z" fill="#4a7a52"/>
          <path d="M270 28 C262 44 276 48 280 34Z" fill="#4a7a52"/>
          <path d="M330 28 C322 44 336 48 340 34Z" fill="#4a7a52"/>
          <circle cx="400" cy="22" r="6" fill="#4a7a52"/>
        </g>

        {/* ── Green (clipped) plant ── */}
        <g clipPath={`url(#${id})`} stroke="var(--green)" fill="none" strokeLinecap="round">
          <path d="M2 34 Q30 26 60 32 Q90 38 120 30 Q150 22 180 30 Q210 38 240 30 Q270 22 300 28 Q330 34 360 26 Q385 20 400 22" strokeWidth="4.5"/>
          <path d="M60 32 C52 14 66 6 72 20Z" fill="var(--green)"/>
          <path d="M120 30 C112 12 126 4 132 18Z" fill="var(--green)"/>
          <path d="M180 30 C172 12 186 4 192 18Z" fill="var(--green)"/>
          <path d="M240 30 C232 12 246 4 252 18Z" fill="var(--green)"/>
          <path d="M300 28 C292 10 306 2 312 16Z" fill="var(--green)"/>
          <path d="M360 26 C352 8 366 0 372 14Z" fill="var(--green)"/>
          <path d="M90 34 C82 50 96 54 100 40Z" fill="var(--green)"/>
          <path d="M150 28 C142 44 156 48 160 34Z" fill="var(--green)"/>
          <path d="M210 32 C202 48 216 52 220 38Z" fill="var(--green)"/>
          <path d="M270 28 C262 44 276 48 280 34Z" fill="var(--green)"/>
          <path d="M330 28 C322 44 336 48 340 34Z" fill="var(--green)"/>
          <circle cx="400" cy="22" r="6" fill="var(--green)"/>
        </g>

        {/* Milestone dots */}
        {milestones.map(m => {
          const x = (m / totalRange) * 400
          return <circle key={m} cx={x} cy="32" r="2.5" fill="rgba(60,110,70,0.25)"/>
        })}
      </svg>

      {/* Milestone labels */}
      <div className="lv-milestones">
        {milestones.map(m => (
          <span key={m} style={{ left: `${(m / totalRange) * 100}%` }}>
            {m.toLocaleString('es-BO')}
          </span>
        ))}
        <span style={{ right: 0, transform: 'none' }}>∞</span>
      </div>
    </div>
  )
}

const LEVEL_ICONS = {
  semilla: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 32 C20 32 12 24 12 17 A8 8 0 0128 17 C28 24 20 32 20 32Z" fill="currentColor" fillOpacity="0.15"/>
      <path d="M20 32 C20 32 12 24 12 17 A8 8 0 0128 17 C28 24 20 32 20 32Z"/>
      <path d="M20 32V20"/>
    </svg>
  ),
  brote: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 34V16"/>
      <path d="M20 22 C20 22 14 18 14 12 C18 10 22 14 20 22Z" fill="currentColor" fillOpacity="0.15"/>
      <path d="M20 22 C20 22 14 18 14 12 C18 10 22 14 20 22Z"/>
      <path d="M20 26 C20 26 26 22 26 16 C22 14 18 18 20 26Z" fill="currentColor" fillOpacity="0.15"/>
      <path d="M20 26 C20 26 26 22 26 16 C22 14 18 18 20 26Z"/>
    </svg>
  ),
  arbol: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 34v-6"/>
      <path d="M10 28h20l-4-8h2l-8-10-8 10h2l-4 8z" fill="currentColor" fillOpacity="0.15"/>
      <path d="M10 28h20l-4-8h2l-8-10-8 10h2l-4 8z"/>
    </svg>
  ),
  bosque: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 32v-4"/><path d="M8 28h12l-3-6h1.5l-6-8-6 8H8l-3 6h-1z" fill="currentColor" fillOpacity="0.12"/>
      <path d="M8 28h12l-3-6h1.5l-6-8-6 8H8l-3 6z"/>
      <path d="M26 32v-4"/>
      <path d="M20 28h12l-3-6h1.5l-6-8-6 8H20l-3 6z" fill="currentColor" fillOpacity="0.15"/>
      <path d="M20 28h12l-3-6h1.5l-6-8-6 8H20l-3 6z"/>
    </svg>
  ),
}

function CircularProgress({ pct }) {
  const r = 54
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  return (
    <div className="lv-ring-wrap">
      <svg viewBox="0 0 130 130" className="lv-ring-svg">
        <circle cx="65" cy="65" r={r} fill="none" stroke="var(--rule)" strokeWidth="10"/>
        <circle
          cx="65" cy="65" r={r}
          fill="none"
          stroke="var(--green)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform="rotate(-90 65 65)"
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(.2,.7,.2,1)' }}
        />
      </svg>
      <div className="lv-ring-label">
        <div className="lv-ring-pct">{Math.round(pct)}%</div>
        <div className="lv-ring-sub">AVANCE</div>
      </div>
    </div>
  )
}

export default function LevelsPage({ state }) {
  const lv = levelFor(state.points)
  const next = LEVELS[Math.min(lv.idx + 1, LEVELS.length - 1)]
  const range = Math.max(1, lv.max - lv.min)
  const pct = Math.min(100, ((state.points - lv.min) / range) * 100)
  const remaining = lv.idx < LEVELS.length - 1 ? (next.min - state.points) : 0

  // Progress bar milestones
  const milestones = [0, 500, 2500, 10000]
  const totalRange = 10000
  const barPct = Math.min(100, (state.points / totalRange) * 100)

  return (
    <div className="lv-page">
      <h1 className="lv-title">Tu nivel</h1>
      <p className="lv-sub">Cada acción te acerca al siguiente tier.</p>

      {/* Hero card */}
      <div className="lv-hero">
        {/* LEFT: text + chips */}
        <div className="lv-hero-left">
          <div className="lv-eyebrow">Progreso actual</div>
          <div className="lv-hero-nm">{lv.nm}</div>
          <p className="lv-hero-desc">
            Estás en el nivel {lv.idx + 1} de {LEVELS.length}.<br/>
            Cada depósito suma y desbloquea mejores beneficios.
          </p>
          <div className="lv-chips">
            <div className="lv-chip-pts">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="7" cy="7" r="5.5"/><path d="M7 4.5v2.5l1.5 1.5"/></svg>
              {state.points.toLocaleString('es-BO')} pts
            </div>
            {lv.idx < LEVELS.length - 1 ? (
              <div className="lv-chip-next">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="7" cy="7" r="5.5" strokeDasharray="3 2"/></svg>
                {remaining.toLocaleString('es-BO')} pts para {next.nm}
              </div>
            ) : (
              <div className="lv-chip-next">Nivel máximo alcanzado 🎉</div>
            )}
          </div>
        </div>

        {/* RIGHT: ring + illustration + bar */}
        <div className="lv-hero-right">
          {/* Nature illustration (behind ring) */}
          <div className="lv-nature" aria-hidden="true">
            <svg viewBox="0 0 340 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Ground hills */}
              <ellipse cx="170" cy="182" rx="200" ry="30" fill="rgba(70,130,75,0.10)"/>
              <ellipse cx="300" cy="185" rx="120" ry="22" fill="rgba(70,130,75,0.08)"/>
              <ellipse cx="50" cy="188" rx="90" ry="18" fill="rgba(70,130,75,0.07)"/>

              {/* ── Big center tree ── */}
              <path d="M190 178 L190 108" stroke="rgba(55,100,60,0.30)" strokeWidth="7" strokeLinecap="round"/>
              <path d="M190 140 C178 132 165 130 158 122" stroke="rgba(55,100,60,0.22)" strokeWidth="3.5" strokeLinecap="round"/>
              <path d="M190 130 C202 122 214 120 220 112" stroke="rgba(55,100,60,0.18)" strokeWidth="3" strokeLinecap="round"/>
              <ellipse cx="190" cy="95"  rx="42" ry="32" fill="rgba(65,125,70,0.16)"/>
              <ellipse cx="190" cy="80"  rx="34" ry="27" fill="rgba(60,120,68,0.19)"/>
              <ellipse cx="190" cy="66"  rx="26" ry="22" fill="rgba(55,115,65,0.22)"/>
              <ellipse cx="190" cy="54"  rx="18" ry="16" fill="rgba(52,112,62,0.24)"/>
              <ellipse cx="155" cy="118" rx="18" ry="13" fill="rgba(65,125,70,0.16)"/>
              <ellipse cx="222" cy="110" rx="16" ry="12" fill="rgba(65,125,70,0.14)"/>

              {/* ── Small left tree ── */}
              <path d="M65 178 L65 138" stroke="rgba(55,100,60,0.22)" strokeWidth="4" strokeLinecap="round"/>
              <ellipse cx="65" cy="126" rx="24" ry="18" fill="rgba(65,125,70,0.13)"/>
              <ellipse cx="65" cy="115" rx="18" ry="14" fill="rgba(60,120,68,0.15)"/>
              <ellipse cx="65" cy="106" rx="13" ry="11" fill="rgba(55,115,65,0.17)"/>

              {/* ── Small right tree ── */}
              <path d="M290 178 L290 145" stroke="rgba(55,100,60,0.20)" strokeWidth="4" strokeLinecap="round"/>
              <ellipse cx="290" cy="134" rx="22" ry="16" fill="rgba(65,125,70,0.12)"/>
              <ellipse cx="290" cy="124" rx="17" ry="13" fill="rgba(60,120,68,0.14)"/>
              <ellipse cx="290" cy="115" rx="12" ry="10" fill="rgba(55,115,65,0.16)"/>

              {/* ── Tiny bush left ── */}
              <ellipse cx="30"  cy="168" rx="20" ry="12" fill="rgba(65,125,70,0.12)"/>
              <ellipse cx="30"  cy="160" rx="14" ry="10" fill="rgba(60,120,68,0.14)"/>

              {/* ── Tiny bush right ── */}
              <ellipse cx="325" cy="168" rx="18" ry="11" fill="rgba(65,125,70,0.11)"/>
              <ellipse cx="325" cy="160" rx="13" ry="9"  fill="rgba(60,120,68,0.13)"/>

              {/* ── Floating leaves (real leaf shapes) ── */}
              {/* Leaf = pointed oval with center vein */}
              <path d="M85 38 C80 28 90 22 96 32 C92 36 86 38 85 38Z" fill="rgba(65,130,70,0.18)" stroke="rgba(55,110,60,0.22)" strokeWidth="0.8"/>
              <path d="M84 38 L90 30" stroke="rgba(55,110,60,0.18)" strokeWidth="0.6"/>

              <path d="M118 20 C112 10 123 4 130 15 C126 19 119 20 118 20Z" fill="rgba(65,130,70,0.15)" stroke="rgba(55,110,60,0.20)" strokeWidth="0.8"/>
              <path d="M118 20 L124 12" stroke="rgba(55,110,60,0.16)" strokeWidth="0.6"/>

              <path d="M50 55 C44 44 56 38 62 50 C58 54 51 55 50 55Z" fill="rgba(65,130,70,0.14)" stroke="rgba(55,110,60,0.18)" strokeWidth="0.8"/>
              <path d="M50 55 L56 46" stroke="rgba(55,110,60,0.15)" strokeWidth="0.6"/>

              <path d="M255 25 C249 14 261 8 268 20 C264 24 256 25 255 25Z" fill="rgba(65,130,70,0.13)" stroke="rgba(55,110,60,0.17)" strokeWidth="0.8"/>
              <path d="M255 25 L261 16" stroke="rgba(55,110,60,0.14)" strokeWidth="0.6"/>

              <path d="M310 48 C304 37 316 31 322 43 C318 47 311 48 310 48Z" fill="rgba(65,130,70,0.12)" stroke="rgba(55,110,60,0.16)" strokeWidth="0.8"/>
              <path d="M310 48 L316 39" stroke="rgba(55,110,60,0.13)" strokeWidth="0.6"/>

              <path d="M140 12 C134 2 146 -4 152 8 C148 12 141 13 140 12Z" fill="rgba(65,130,70,0.11)" stroke="rgba(55,110,60,0.15)" strokeWidth="0.8"/>
              <path d="M140 12 L146 3" stroke="rgba(55,110,60,0.12)" strokeWidth="0.6"/>

              <path d="M20 90 C14 80 26 74 32 86 C28 90 21 90 20 90Z" fill="rgba(65,130,70,0.11)" stroke="rgba(55,110,60,0.14)" strokeWidth="0.8"/>
            </svg>
          </div>

          {/* Circular ring */}
          <CircularProgress pct={pct} />

          {/* Plant progress */}
          <PlantProgress pct={barPct} milestones={milestones} totalRange={totalRange} />
        </div>
      </div>

      {/* Level progression */}
      <div className="lv-eyebrow" style={{ marginTop: 28, marginBottom: 14 }}>Tu progresión de niveles</div>
      <div className="lv-tiers">
        {LEVELS.map((l, i) => {
          const st = i < lv.idx ? 'achieved' : i === lv.idx ? 'current' : 'locked'
          return (
            <div key={l.id} className="lv-tier-row">
              {/* Timeline dot */}
              <div className="lv-timeline">
                <div className={'lv-dot' + (st === 'achieved' ? ' done' : st === 'current' ? ' now' : '')}>
                  {st === 'achieved' && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                  {st === 'current' && <div className="lv-dot-inner"/>}
                </div>
                {i < LEVELS.length - 1 && <div className={'lv-line' + (i < lv.idx ? ' done' : '')}/>}
              </div>

              {/* Card */}
              <div className={'lv-tier' + (st === 'current' ? ' current' : st === 'locked' ? ' locked' : '')}>
                <div className={'lv-tier-icon' + (st === 'locked' ? ' locked' : '')}>{LEVEL_ICONS[l.id]}</div>
                <div className="lv-tier-info">
                  <div className="lv-tier-nm">{l.nm}</div>
                  <div className="lv-tier-rng">{l.min.toLocaleString('es-BO')} – {l.max === 100000 ? '∞' : l.max.toLocaleString('es-BO')} pts</div>
                </div>
                <div className={'lv-badge lv-badge-' + st}>
                  {st === 'achieved' && (
                    <><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5l3 3 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>Alcanzado</>
                  )}
                  {st === 'current' && (
                    <><svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 2l1.2 3.7H12L8.9 7.9l1.2 3.6-3.6-2.6-3.6 2.6 1.2-3.6L1 5.7h4.3z" fill="currentColor"/></svg>Actual</>
                  )}
                  {st === 'locked' && (
                    <><svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="6" width="7" height="5" rx="1"/><path d="M4.5 6V4.5a2 2 0 014 0V6"/></svg>Bloqueado</>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
