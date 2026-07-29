import { useState } from 'react'
import { levelFor, LEVELS } from '../../data/constants'

const IcLeaf    = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 18C4 18 6 8 16 5C16 5 16 13 10 16L4 18Z"/><path d="M4 18L9 13"/></svg>
const IcRecycle = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 3l3 5H8l3-5z"/><path d="M8 8L5 13h6"/><path d="M14 8l3 5h-6"/><path d="M8 18h6M11 13v5"/></svg>
const IcGift    = () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h14v10a2 2 0 01-2 2H6a2 2 0 01-2-2V10z"/><path d="M3 6h16v4H3z"/><path d="M11 6V2a3 3 0 00-3 3c0 1 1 1 3 1z"/><path d="M11 6V2a3 3 0 013 3c0 1-1 1-3 1z"/><path d="M11 6v16"/></svg>
const IcUser    = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="10" cy="7" r="4"/><path d="M3 19c0-4 3-6 7-6s7 2 7 6"/></svg>
const IcLock    = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="9" width="12" height="9" rx="2"/><path d="M7 9V6a3 3 0 016 0v3"/></svg>
const IcBell    = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 8a5 5 0 0110 0c0 6 2.5 7 2.5 7h-15S5 14 5 8z"/><path d="M8.5 17a1.5 1.5 0 003 0"/></svg>
const IcGlobe   = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="10" cy="10" r="7"/><path d="M3 10h14M10 3c-2 2-3 4.5-3 7s1 5 3 7M10 3c2 2 3 4.5 3 7s-1 5-3 7"/></svg>
const IcLogout  = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 3h4v14h-4"/><path d="M8 13l4-3-4-3"/><path d="M12 10H3"/></svg>
const IcChevron = () => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M6 4l4 4-4 4"/></svg>
const IcDeposit = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><rect x="5" y="2" width="8" height="4" rx="1.5"/><path d="M3 6h12v8a3 3 0 01-3 3H6a3 3 0 01-3-3V6z"/></svg>
const IcCO2     = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><circle cx="9" cy="9" r="6.5"/><path d="M9 5v4l2.5 2.5"/></svg>
const IcStreak  = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M9 2C9 2 5 7 5 10.5a4 4 0 008 0C13 7 9 2 9 2z"/></svg>
const IcLevel   = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15h10l-1.5-5h1L9 4 5.5 10h1L5 15z"/></svg>

function fmtDate(ts) {
  const d = new Date(ts), now = new Date()
  const diff = Math.floor((now - d) / 86400000)
  if (diff === 0) return `Hoy, ${d.toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' })}`
  if (diff === 1) return `Ayer, ${d.toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' })}`
  return `${diff} días atrás`
}

const IcSwitch  = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h10l-3-3M16 13H6l3 3"/></svg>

export default function Profile({ state, onLogout, onReset, onSwitchRole }) {
  const [filter, setFilter] = useState('todos')
  const initial = state.name?.[0]?.toUpperCase() || 'V'
  const lv = levelFor(state.points)
  const next = LEVELS[Math.min(lv.idx + 1, LEVELS.length - 1)]
  const range = Math.max(1, lv.max - lv.min)
  const pct = Math.min(100, ((state.points - lv.min) / range) * 100)
  const co2 = +(state.kg * 0.5).toFixed(1)
  const streak = Math.min(7, state.txns.length)
  const deposits = state.txns.filter(t => t.type === 'deposit').length

  const allMovements = [
    ...state.txns.map(t => ({ ...t, kind: 'deposit' })),
    ...state.redemptions.map(r => ({ id: r.id, ic: '★', label: r.name, sub: `Canje · ${r.partner}`, pts: -r.pts, ts: r.ts, kind: 'redeem' }))
  ].sort((a, b) => b.ts - a.ts)

  const filtered = filter === 'todos' ? allMovements
    : filter === 'depositos' ? allMovements.filter(t => t.kind === 'deposit')
    : allMovements.filter(t => t.kind === 'redeem')

  return (
    <div className="pf-page">
      <h1 className="pf-title">Perfil</h1>
      <p className="pf-sub">Tu impacto acumulado.</p>

      {/* Profile hero card */}
      <div className="pf-hero">
        <div className="pf-hero-left">
          <div className="pf-avatar-wrap">
            <div className="pf-avatar">{initial}</div>
            <div className="pf-avatar-leaf">🌿</div>
          </div>
          <div className="pf-hero-info">
            <div className="pf-name">{state.name}</div>
            <div className="pf-meta">{state.email} · {state.uni}</div>
            <div className="pf-tagline">Cada acción cuenta. Gracias por construir un futuro más sostenible.</div>
          </div>
        </div>
        {/* Nature illustration */}
        <div className="pf-hero-nature" aria-hidden="true">
          <svg viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="150" cy="158" rx="170" ry="25" fill="rgba(70,130,75,0.08)"/>
            <ellipse cx="260" cy="162" rx="90" ry="18" fill="rgba(70,130,75,0.06)"/>
            <path d="M210 155 L210 95" stroke="rgba(55,100,60,0.28)" strokeWidth="6" strokeLinecap="round"/>
            <path d="M210 130 C198 122 185 120 178 112" stroke="rgba(55,100,60,0.20)" strokeWidth="3" strokeLinecap="round"/>
            <path d="M210 118 C222 110 234 108 240 100" stroke="rgba(55,100,60,0.16)" strokeWidth="2.5" strokeLinecap="round"/>
            <ellipse cx="210" cy="82" rx="40" ry="30" fill="rgba(65,125,70,0.14)"/>
            <ellipse cx="210" cy="68" rx="32" ry="25" fill="rgba(60,120,68,0.17)"/>
            <ellipse cx="210" cy="55" rx="24" ry="20" fill="rgba(55,115,65,0.20)"/>
            <ellipse cx="210" cy="44" rx="16" ry="14" fill="rgba(52,112,62,0.22)"/>
            <ellipse cx="174" cy="108" rx="17" ry="12" fill="rgba(65,125,70,0.14)"/>
            <ellipse cx="244" cy="100" rx="15" ry="11" fill="rgba(65,125,70,0.12)"/>
            <path d="M270 155 L270 130" stroke="rgba(55,100,60,0.18)" strokeWidth="3.5" strokeLinecap="round"/>
            <ellipse cx="270" cy="122" rx="18" ry="13" fill="rgba(65,125,70,0.10)"/>
            <ellipse cx="270" cy="113" rx="13" ry="10" fill="rgba(60,120,68,0.12)"/>
            <path d="M55 30 C48 18 62 12 68 24 C64 28 56 30 55 30Z" fill="rgba(65,130,70,0.16)" stroke="rgba(55,110,60,0.20)" strokeWidth="0.8"/>
            <path d="M100 12 C93 0 107 -6 114 8 C110 12 101 12 100 12Z" fill="rgba(65,130,70,0.13)" stroke="rgba(55,110,60,0.17)" strokeWidth="0.8"/>
            <path d="M160 8 C153 -4 167 -10 174 6 C170 10 161 9 160 8Z" fill="rgba(65,130,70,0.11)" stroke="rgba(55,110,60,0.15)" strokeWidth="0.8"/>
            <path d="M280 30 C273 18 287 12 294 26 C290 30 281 30 280 30Z" fill="rgba(65,130,70,0.10)" stroke="rgba(55,110,60,0.14)" strokeWidth="0.8"/>
          </svg>
        </div>
      </div>

      {/* Stats row */}
      <div className="pf-stats">
        <div className="pf-stat">
          <div className="pf-stat-ic"><IcLeaf/></div>
          <div>
            <div className="pf-stat-v">{state.totalEarned.toLocaleString('es-BO')} <span>pts</span></div>
            <div className="pf-stat-k">Total ganado</div>
          </div>
        </div>
        <div className="pf-stat">
          <div className="pf-stat-ic"><IcRecycle/></div>
          <div>
            <div className="pf-stat-v">{state.kg.toFixed(1)} <span>kg</span></div>
            <div className="pf-stat-k">Reciclado</div>
          </div>
        </div>
        <div className="pf-stat">
          <div className="pf-stat-ic"><IcGift/></div>
          <div>
            <div className="pf-stat-v">{state.redemptions.length}</div>
            <div className="pf-stat-k">Canjes</div>
          </div>
        </div>
      </div>

      {/* Impact summary */}
      <div className="pf-impact">
        <div className="pf-impact-title">Resumen de impacto</div>
        <div className="pf-impact-row">
          <div className="pf-impact-item">
            <div className="pf-impact-ic"><IcDeposit/></div>
            <div className="pf-impact-text">
              <div className="pf-impact-v">{deposits}</div>
              <div className="pf-impact-k">Depósitos realizados</div>
            </div>
          </div>
          <div className="pf-impact-item">
            <div className="pf-impact-ic"><IcCO2/></div>
            <div className="pf-impact-text">
              <div className="pf-impact-v">{co2} <span>kg</span></div>
              <div className="pf-impact-k">CO₂ evitado aprox.</div>
            </div>
          </div>
          <div className="pf-impact-item">
            <div className="pf-impact-ic"><IcStreak/></div>
            <div className="pf-impact-text">
              <div className="pf-impact-v">{streak} <span>días</span></div>
              <div className="pf-impact-k">Racha actual</div>
            </div>
          </div>
          <div className="pf-impact-item">
            <div className="pf-impact-ic"><IcLevel/></div>
            <div className="pf-impact-text">
              <div className="pf-impact-v">Nivel {lv.idx + 1}</div>
              <div className="pf-impact-k">{lv.nm}</div>
              <div className="pf-impact-bar"><div style={{ width: `${pct}%` }}/></div>
            </div>
          </div>
          <button className="pf-impact-btn">Ver detalles de impacto <IcChevron/></button>
        </div>
      </div>

      {/* Transaction history */}
      <div className="pf-hist-header">
        <h3 className="pf-hist-title">Historial completo</h3>
        <select className="pf-filter-sel" value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="todos">Todos los movimientos</option>
          <option value="depositos">Solo depósitos</option>
          <option value="canjes">Solo canjes</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty"><strong>Sin movimientos aún</strong></div>
      ) : (
        <div className="pf-hist-list">
          {filtered.map(t => (
            <div key={t.id} className="pf-hist-row">
              <div className={'pf-hist-dot' + (t.pts < 0 ? ' minus' : '')}/>
              <div className={'pf-hist-badge' + (t.pts < 0 ? ' minus' : '')}>{t.ic}</div>
              <div className="pf-hist-info">
                <span className="pf-hist-nm">{t.label}</span>
                {t.sub && <><span className="pf-hist-sep">·</span><span className="pf-hist-sub">{t.sub.split('·')[0].trim()}</span></>}
                {t.ts && <><span className="pf-hist-sep">·</span><span className="pf-hist-time">{fmtDate(t.ts)}</span></>}
              </div>
              <div className={'pf-hist-pts' + (t.pts < 0 ? ' minus' : '')}>
                {t.pts > 0 ? '+' : ''}{t.pts.toLocaleString('es-BO')} <span>pts</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recycling chain card */}
      <div className="pf-chain">
        <div className="pf-chain-deco" aria-hidden="true">
          <svg viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 75L30 35" stroke="#3d8a52" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M30 55C30 55 16 48 16 34C22 30 30 42 30 55Z" fill="#4a9e62" opacity="0.75"/>
            <path d="M30 46C30 46 44 39 44 25C38 21 30 33 30 46Z" fill="#3d8a52" opacity="0.80"/>
            <path d="M30 38C30 38 22 26 30 14C38 26 30 38 30 38Z" fill="#56b870" opacity="0.80"/>
          </svg>
          <svg viewBox="0 0 40 55" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 52L20 25" stroke="#3d8a52" strokeWidth="2" strokeLinecap="round"/>
            <path d="M20 38C20 38 10 33 10 22C15 19 20 29 20 38Z" fill="#4a9e62" opacity="0.70"/>
            <path d="M20 31C20 31 30 26 30 15C25 12 20 22 20 31Z" fill="#3d8a52" opacity="0.75"/>
          </svg>
          <svg viewBox="0 0 50 70" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 66L25 30" stroke="#3d8a52" strokeWidth="2.2" strokeLinecap="round"/>
            <path d="M25 48C25 48 13 42 13 28C19 25 25 37 25 48Z" fill="#56b870" opacity="0.65"/>
            <path d="M25 40C25 40 37 34 37 20C31 17 25 29 25 40Z" fill="#4a9e62" opacity="0.70"/>
            <path d="M25 32C25 32 18 22 25 12C32 22 25 32 25 32Z" fill="#3d8a52" opacity="0.75"/>
          </svg>
        </div>
        <div className="pf-chain-content">
          <div className="pf-chain-title">¿A dónde va tu plástico?</div>
          <div className="pf-chain-flow">
            {['Contenedor', 'Verdex', 'Empacar S.A.', 'Nueva botella'].map((step, i, arr) => (
              <span key={i} className="pf-chain-step-wrap">
                <span className="pf-chain-step">{step}</span>
                {i < arr.length - 1 && <span className="pf-chain-arrow">→</span>}
              </span>
            ))}
          </div>
          <p className="pf-chain-desc">
            Verdex consolida el PET de UPSA y lo vende a Empacar S.A. en el Parque Industrial.
            Pagan <strong>Bs 2/kg</strong> — ingreso que sostiene la app sin que tengas que pagar nada.
          </p>
        </div>
      </div>

      {/* Account section */}
      <h3 className="pf-sect-title">Cuenta</h3>
      <div className="pf-account">
        {[
          { ic: <IcUser/>,   nm: 'Editar perfil',    desc: 'Actualiza tu información',     action: null },
          { ic: <IcLock/>,   nm: 'Seguridad',         desc: 'Contraseña y acceso',          action: null },
          { ic: <IcBell/>,   nm: 'Notificaciones',    desc: 'Preferencias y alertas',       action: null },
          { ic: <IcGlobe/>,  nm: 'Idioma',            desc: 'Español',                      action: null },
          { ic: <IcSwitch/>, nm: state.role === 'empresa' ? 'Cambiar a vista usuario' : 'Cambiar a vista empresa', desc: 'Alterna el modo de la cuenta (demo)', action: onSwitchRole },
          { ic: <IcLogout/>, nm: 'Cerrar sesión',     desc: 'Salir de tu cuenta',           action: onLogout, danger: true },
        ].map((item, i) => (
          <button key={i} className={'pf-account-row' + (item.danger ? ' danger' : '')} onClick={item.action || undefined}>
            <div className="pf-account-ic">{item.ic}</div>
            <div className="pf-account-info">
              <div className="pf-account-nm">{item.nm}</div>
              <div className="pf-account-desc">{item.desc}</div>
            </div>
            <IcChevron/>
          </button>
        ))}
      </div>
    </div>
  )
}
