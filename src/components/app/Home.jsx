import { Icons } from '../Icons'
import { REWARDS, levelFor, LEVELS } from '../../data/constants'

const TXN_ICONS = {
  PET: {
    grad: ['#1a6b3c','#2eaa62'],
    icon: (
      <g fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="15" y="6" width="10" height="5" rx="2" fill="rgba(255,255,255,0.2)"/>
        <path d="M12 11h16v22a5 5 0 01-5 5h-6a5 5 0 01-5-5V11z" fill="rgba(255,255,255,0.12)"/>
        <path d="M12 18h16" stroke="rgba(255,255,255,0.4)"/>
        <ellipse cx="24" cy="24" rx="4" ry="6" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
      </g>
    ),
  },
  AL: {
    grad: ['#7a5520','#c4952e'],
    icon: (
      <g fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 10h20v4H14z" fill="rgba(255,255,255,0.25)" rx="2"/>
        <path d="M15 14h18v18a3 3 0 01-3 3H18a3 3 0 01-3-3V14z" fill="rgba(255,255,255,0.12)"/>
        <path d="M14 34h20v2a2 2 0 01-2 2H16a2 2 0 01-2-2v-2z" fill="rgba(255,255,255,0.2)"/>
        <path d="M18 20h12M18 26h8" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
      </g>
    ),
  },
  CRT: {
    grad: ['#6b4a10','#b87d28'],
    icon: (
      <g fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 14l16-6 16 6v18l-16 6-16-6V14z" fill="rgba(255,255,255,0.12)"/>
        <path d="M8 14l16 6 16-6" />
        <path d="M24 20v18" />
        <path d="M16 11l16 6" stroke="rgba(255,255,255,0.4)"/>
      </g>
    ),
  },
  VID: {
    grad: ['#1a5a6a','#2a9aaa'],
    icon: (
      <g fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 6h14v5l3 7v14a3 3 0 01-3 3H17a3 3 0 01-3-3V18l3-7V6z" fill="rgba(255,255,255,0.12)"/>
        <path d="M14 18h20" />
        <path d="M18 6h12" stroke="rgba(255,255,255,0.5)"/>
        <ellipse cx="24" cy="26" rx="5" ry="7" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2"/>
      </g>
    ),
  },
  TT: {
    grad: ['#2a1a6a','#5a3aaa'],
    icon: (
      <g fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 8h20v6l2 4v14a2 2 0 01-2 2H14a2 2 0 01-2-2V18l2-4V8z" fill="rgba(255,255,255,0.12)"/>
        <path d="M12 18h24" />
        <path d="M18 8v6h12V8" stroke="rgba(255,255,255,0.5)"/>
        <path d="M19 23h10M19 28h7" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
      </g>
    ),
  },
  MX: {
    grad: ['#3a3a6a','#6a6aaa'],
    icon: (
      <g fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="14" fill="rgba(255,255,255,0.1)"/>
        <path d="M24 10v28M10 24h28" stroke="rgba(255,255,255,0.4)"/>
        <path d="M14 14l20 20M34 14L14 34" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2"/>
        <circle cx="24" cy="24" r="5" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.8)"/>
      </g>
    ),
  },
  '★': {
    grad: ['#6a4a10','#c4a030'],
    icon: (
      <g fill="rgba(255,255,255,0.9)">
        <path d="M24 8l3.6 7.2 8 1.2-5.8 5.6 1.4 8-7.2-3.8-7.2 3.8 1.4-8-5.8-5.6 8-1.2z"/>
      </g>
    ),
  },
}

const TxnIcon = ({ ic }) => {
  const def = TXN_ICONS[ic] || TXN_ICONS.MX
  const gradId = `tg-${ic}-${Math.random().toString(36).slice(2,6)}`
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={def.grad[0]}/>
          <stop offset="100%" stopColor={def.grad[1]}/>
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill={`url(#${gradId})`}/>
      {def.icon}
    </svg>
  )
}

const RewardIllustration = ({ id }) => {
  const defs = {
    r1: {
      grad: ['#7B4F2E','#C4853A'],
      icon: (
        <g fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 20h20l-3 16H17L14 20z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.9)"/>
          <path d="M34 24h4a4 4 0 010 8h-4" stroke="rgba(255,255,255,0.85)" strokeWidth="2"/>
          <path d="M20 8 Q21 5 20 2" strokeWidth="1.5" stroke="rgba(255,255,255,0.5)"/>
          <path d="M26 8 Q27 5 26 2" strokeWidth="1.5" stroke="rgba(255,255,255,0.5)"/>
          <path d="M32 8 Q33 5 32 2" strokeWidth="1.5" stroke="rgba(255,255,255,0.5)"/>
        </g>
      ),
    },
    r2: {
      grad: ['#2A6640','#4AAE6A'],
      icon: (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="24" cy="28" rx="14" ry="8" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.9)" strokeWidth="2"/>
          <path d="M24 20 C24 20 18 14 20 8 C22 4 28 6 26 12" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.85)" strokeWidth="1.8"/>
          <path d="M24 20 C24 20 30 12 34 14 C37 16 35 22 30 22" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.75)" strokeWidth="1.8"/>
          <path d="M14 28 Q16 36 24 38 Q32 36 34 28" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8"/>
        </g>
      ),
    },
    r3: {
      grad: ['#1B3F72','#2E6CB8'],
      icon: (
        <g fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 12h4l6 18h12l4-12H18" fill="rgba(255,255,255,0.12)"/>
          <circle cx="22" cy="34" r="2.5" fill="rgba(255,255,255,0.9)" stroke="none"/>
          <circle cx="32" cy="34" r="2.5" fill="rgba(255,255,255,0.9)" stroke="none"/>
          <path d="M14 12l-2-6H8" stroke="rgba(255,255,255,0.7)"/>
        </g>
      ),
    },
    r4: {
      grad: ['#4A2880','#8855CC'],
      icon: (
        <g fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round">
          <rect x="8" y="14" width="32" height="22" rx="3" fill="rgba(255,255,255,0.12)"/>
          <polygon points="20,18 20,32 32,25" fill="rgba(255,255,255,0.85)" stroke="none"/>
        </g>
      ),
    },
    r5: {
      grad: ['#8B1A1A','#CC3333'],
      icon: (
        <g fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round">
          <rect x="18" y="4" width="12" height="6" rx="2" fill="rgba(255,255,255,0.3)"/>
          <path d="M14 10h20v26a6 6 0 01-6 6h-8a6 6 0 01-6-6V10z" fill="rgba(255,255,255,0.12)"/>
          <path d="M14 18h20" stroke="rgba(255,255,255,0.5)"/>
          <path d="M19 10v28" stroke="rgba(255,255,255,0.2)"/>
        </g>
      ),
    },
    r6: {
      grad: ['#7A3010','#C05A28'],
      icon: (
        <g fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 14h28l-4 22H14L10 14z" fill="rgba(255,255,255,0.12)"/>
          <path d="M18 14 C18 8 30 8 30 14" />
          <path d="M20 22 L28 22 M20 28 L26 28" stroke="rgba(255,255,255,0.6)"/>
        </g>
      ),
    },
    r7: {
      grad: ['#0D2B6B','#1A52BB'],
      icon: (
        <g fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round">
          <rect x="18" y="4" width="12" height="6" rx="2" fill="rgba(255,255,255,0.3)"/>
          <path d="M14 10h20v26a6 6 0 01-6 6h-8a6 6 0 01-6-6V10z" fill="rgba(255,255,255,0.12)"/>
          <ellipse cx="24" cy="24" rx="5" ry="8" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
          <path d="M14 22h20M14 28h20" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
        </g>
      ),
    },
    r8: {
      grad: ['#1A5C30','#2E9E54'],
      icon: (
        <g fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 18h32v20a4 4 0 01-4 4H12a4 4 0 01-4-4V18z" fill="rgba(255,255,255,0.12)"/>
          <path d="M6 12h36v6H6z" fill="rgba(255,255,255,0.2)"/>
          <path d="M24 12v30" stroke="rgba(255,255,255,0.5)"/>
          <path d="M16 12 C16 6 24 4 24 12" />
          <path d="M32 12 C32 6 24 4 24 12" />
        </g>
      ),
    },
    r9: {
      grad: ['#1A5040','#2A8868'],
      icon: (
        <g fill="none" strokeLinecap="round">
          <path d="M24 36 C24 36 8 26 8 16 A8 8 0 0124 12 A8 8 0 0140 16 C40 26 24 36 24 36z" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.9)" strokeWidth="2"/>
          <path d="M16 16 C18 12 22 12 24 16" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/>
        </g>
      ),
    },
  }

  const d = defs[id] || defs.r1
  const gradId = `rg-${id}`
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={d.grad[0]}/>
          <stop offset="100%" stopColor={d.grad[1]}/>
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill={`url(#${gradId})`}/>
      {d.icon}
    </svg>
  )
}

export default function Home({ state, go, openScan }) {
  const lv = levelFor(state.points)
  const next = LEVELS[Math.min(lv.idx + 1, LEVELS.length - 1)]
  const range = Math.max(1, lv.max - lv.min)
  const pct = Math.min(100, ((state.points - lv.min) / range) * 100)
  const recent = state.txns.slice(0, 4)
  const depositCount = state.txns.filter(t => t.type === 'deposit').length
  const co2 = +(state.kg * 0.5).toFixed(1)
  const streak = state.txns.length > 0 ? Math.min(7, state.txns.length) : 0

  return (
    <div className="home">
      {/* Greeting */}
      <div className="home-greeting">
        <div className="home-hello">
          ¡Hola, <em>{state.name.split(' ').slice(-1)[0]}</em>!
          <svg className="home-hello-plant" viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Stem */}
            <path d="M16 34 L16 18" stroke="#2d7042" strokeWidth="2" strokeLinecap="round"/>
            {/* Left leaf */}
            <path d="M16 24 C16 24 8 20 8 12 C12 10 16 16 16 24Z" fill="#3d8a52" opacity="0.9"/>
            <path d="M16 24 L12 16" stroke="#2d7042" strokeWidth="0.8" strokeLinecap="round" opacity="0.6"/>
            {/* Right leaf */}
            <path d="M16 20 C16 20 24 16 24 8 C20 6 16 12 16 20Z" fill="#4a9e62" opacity="0.85"/>
            <path d="M16 20 L20 12" stroke="#2d7042" strokeWidth="0.8" strokeLinecap="round" opacity="0.6"/>
            {/* Top leaf */}
            <path d="M16 18 C16 18 12 10 16 4 C20 10 16 18 16 18Z" fill="#56b870" opacity="0.9"/>
            <path d="M16 18 L16 8" stroke="#2d7042" strokeWidth="0.8" strokeLinecap="round" opacity="0.6"/>
            {/* Soil pot */}
            <ellipse cx="16" cy="34" rx="7" ry="2.5" fill="#c8a87a" opacity="0.4"/>
            <path d="M10 34 Q16 36.5 22 34" stroke="#b8986a" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
          </svg>
        </div>
        <div className="home-sub">Cada acción cuenta. ¡Sigamos generando impacto!</div>
      </div>

      {/* Wallet card */}
      <div className="wallet-card home-wallet">
        <div className="home-wallet-left">
          <div className="lbl">PUNTOS VERDES</div>
          <div className="pts">{state.points.toLocaleString('es-BO')}<small>pts</small></div>
          <div className="lvl-bar"><i style={{ width: `${pct}%` }}></i></div>
        </div>

        {lv.idx < LEVELS.length - 1 && (
          <div className="home-wallet-mid">
            <div className="home-wallet-mid-lbl">Próximo nivel</div>
            <svg className="home-wallet-tree-icon" width="22" height="22" viewBox="0 0 22 22" fill="rgba(255,255,255,0.9)">
              <path d="M11 1L15 9H13L17 17H12V21H10V17H5L9 9H7L11 1Z"/>
            </svg>
            <div className="home-wallet-mid-nm">{next.nm}</div>
            <div className="home-wallet-mid-pts">{(next.min - state.points).toLocaleString('es-BO')} pts restantes</div>
          </div>
        )}

        {/* Forest illustration */}
        <div className="home-wallet-forest" aria-hidden="true">
          <svg viewBox="0 0 500 120" preserveAspectRatio="xMaxYMid slice" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="w-fade" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"  stopColor="#1d4229" stopOpacity="1"/>
                <stop offset="25%" stopColor="#1d4229" stopOpacity="0.92"/>
                <stop offset="48%" stopColor="#1d4229" stopOpacity="0.4"/>
                <stop offset="64%" stopColor="#1d4229" stopOpacity="0"/>
              </linearGradient>
              <filter id="w-b4"><feGaussianBlur stdDeviation="4"/></filter>
              <filter id="w-b2"><feGaussianBlur stdDeviation="2"/></filter>
            </defs>

            {/* Mountains — barely lighter than card, blurred */}
            <path d="M0,90 L55,52 L108,74 L170,32 L230,60 L292,18 L354,50 L415,22 L500,46 L500,120 L0,120Z"
                  fill="rgba(255,255,255,0.04)" filter="url(#w-b4)"/>
            <path d="M0,100 L65,64 L135,82 L200,48 L266,72 L334,36 L398,62 L458,30 L500,56 L500,120 L0,120Z"
                  fill="rgba(255,255,255,0.06)" filter="url(#w-b4)"/>

            {/* Far treeline — blurred, slightly lighter */}
            <path d="M0,120 L0,106 L14,90 L24,104 L36,84 L48,100 L60,76 L72,92 L86,66 L98,82 L114,58 L128,74 L144,50 L160,66 L178,42 L194,60 L212,34 L230,52 L250,24 L270,44 L292,14 L314,34 L338,8 L362,28 L388,4 L412,22 L438,0 L460,18 L484,0 L500,14 L500,120Z"
                  fill="rgba(255,255,255,0.07)" filter="url(#w-b2)"/>

            {/* Mid treeline */}
            <path d="M80,120 L80,112 L98,94 L112,110 L128,86 L144,106 L162,78 L178,98 L198,68 L216,90 L238,58 L258,80 L280,48 L300,72 L324,38 L348,62 L374,26 L398,52 L424,14 L448,42 L472,6 L500,28 L500,120Z"
                  fill="rgba(255,255,255,0.06)"/>

            {/* Near treeline — slightly darker than card */}
            <path d="M220,120 L220,116 L238,98 L252,116 L270,92 L286,112 L304,84 L320,108 L340,76 L358,100 L378,64 L396,90 L418,52 L438,78 L460,38 L480,64 L500,32 L500,120Z"
                  fill="rgba(0,0,0,0.12)"/>

            {/* Foreground trees — darker than card */}
            <polygon points="432,8 412,50 452,50"   fill="rgba(0,0,0,0.18)"/>
            <polygon points="432,30 408,78 456,78"   fill="rgba(0,0,0,0.20)"/>
            <polygon points="432,54 404,110 460,110" fill="rgba(0,0,0,0.22)"/>
            <rect x="428" y="109" width="9" height="11" fill="rgba(0,0,0,0.28)"/>

            <polygon points="472,18 453,58 491,58"   fill="rgba(0,0,0,0.16)"/>
            <polygon points="472,40 450,86 494,86"   fill="rgba(0,0,0,0.18)"/>
            <polygon points="472,61 446,116 498,116" fill="rgba(0,0,0,0.20)"/>

            <polygon points="404,36 386,70 422,70"   fill="rgba(0,0,0,0.14)"/>
            <polygon points="404,52 384,94 424,94"   fill="rgba(0,0,0,0.16)"/>
            <polygon points="404,68 380,116 428,116" fill="rgba(0,0,0,0.18)"/>

            <polygon points="500,30 482,66 518,66"   fill="rgba(0,0,0,0.14)"/>
            <polygon points="500,52 478,100 522,100" fill="rgba(0,0,0,0.16)"/>

            {/* Left fade */}
            <rect width="500" height="120" fill="url(#w-fade)"/>
          </svg>
        </div>
      </div>

      {/* Quick actions */}
      <div className="home-section-label">Acciones rápidas</div>
      <div className="quick-actions home-quick">
        <button className="quick-action" onClick={openScan}>
          <div className="ic">{Icons.scan}</div>
          <div className="nm">Escanear QR</div>
          <div className="desc">Depositar material</div>
        </button>
        <button className="quick-action" onClick={() => go('rewards')}>
          <div className="ic">{Icons.rewards}</div>
          <div className="nm">Canjear</div>
          <div className="desc">Catálogo de aliados</div>
        </button>
        <button className="quick-action" onClick={() => go('map')}>
          <div className="ic">{Icons.pin}</div>
          <div className="nm">Puntos cerca</div>
          <div className="desc">Contenedores</div>
        </button>
        <button className="quick-action" onClick={() => go('levels')}>
          <div className="ic">{Icons.trophy}</div>
          <div className="nm">Tu nivel</div>
          <div className="desc">Ver progreso</div>
        </button>
      </div>

      {/* Two-column: activity + recommendations */}
      <div className="home-two-col">
        <div>
          <div className="section-row">
            <h3>Tu actividad reciente</h3>
            {recent.length > 0 && (
              <a className="more" href="#" onClick={(e) => { e.preventDefault(); go('profile') }}>Ver todo</a>
            )}
          </div>
          {recent.length === 0 ? (
            <div className="empty">
              <strong>Aún no hay actividad</strong>
              Tocá <em>Escanear QR</em> para tu primer depósito.
            </div>
          ) : (
            <div className="txn-list">
              {recent.map((t) => (
                <div className="txn-row" key={t.id}>
                  <div className="txn-ic-img"><TxnIcon ic={t.ic} /></div>
                  <div>
                    <div className="txn-nm">{t.label}</div>
                    <div className="txn-sub">{t.sub}</div>
                  </div>
                  <div className={'txn-pts' + (t.pts < 0 ? ' minus' : '')}>
                    {t.pts > 0 ? '+' : ''}{t.pts.toLocaleString('es-BO')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="section-row">
            <h3>Recomendados para ti</h3>
            <a className="more" href="#" onClick={(e) => { e.preventDefault(); go('rewards') }}>Ver todo</a>
          </div>
          <div className="home-reward-list">
            {REWARDS.slice(0, 3).map((r) => {
              const can = state.points >= r.pts
              return (
                <div className="home-reward-card" key={r.id}>
                  <div className="home-reward-img">
                    <RewardIllustration id={r.id} />
                  </div>
                  <div className="home-reward-info">
                    <div className="home-reward-nm">{r.nm}</div>
                    <div className="home-reward-partner">{r.partner}</div>
                    <div className="home-reward-pts">{r.pts.toLocaleString('es-BO')} pts</div>
                  </div>
                  <button
                    className={'home-reward-btn' + (can ? '' : ' locked')}
                    disabled={!can}
                    onClick={() => go('rewards')}
                  >
                    {can ? 'Canjear' : `Faltan\n${(r.pts - state.points).toLocaleString('es-BO')}`}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Impact stats */}
      <div className="home-section-label" style={{ marginTop: 20 }}>Tu impacto en números</div>
      <div className="home-impact">
        <div className="home-impact-grid">
          <div className="home-impact-stat">
            <div className="home-impact-ic">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="9" cy="6" r="3"/><path d="M3 17c0-3 2.7-5 6-5s6 2 6 5"/></svg>
            </div>
            <div className="home-impact-v">{depositCount}</div>
            <div className="home-impact-k">Depósitos realizados</div>
          </div>
          <div className="home-impact-stat">
            <div className="home-impact-ic">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 14s1-1 3-1 3 2 6 2 3-1 3-1V4s-1 1-3 1-3-2-6-2-3 1-3 1z"/></svg>
            </div>
            <div className="home-impact-v">{state.kg.toFixed(1)}<span>kg</span></div>
            <div className="home-impact-k">Material reciclado</div>
          </div>
          <div className="home-impact-stat">
            <div className="home-impact-ic">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 2v3M9 13v3M2 9h3M13 9h3"/><circle cx="9" cy="9" r="3.5"/></svg>
            </div>
            <div className="home-impact-v">{co2}<span>kg</span></div>
            <div className="home-impact-k">CO₂ evitado</div>
          </div>
          <div className="home-impact-stat">
            <div className="home-impact-ic">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 1l2 6h6l-5 3.5 2 6L9 13l-5 3.5 2-6L1 7h6z"/></svg>
            </div>
            <div className="home-impact-v">{streak}</div>
            <div className="home-impact-k">Días consecutivos</div>
          </div>
        </div>
      </div>
    </div>
  )
}
