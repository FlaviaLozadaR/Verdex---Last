import { Icons } from '../Icons'
import { LEVELS, levelFor } from '../../data/constants'

export default function LevelsPage({ state }) {
  const lv = levelFor(state.points)
  const next = LEVELS[Math.min(lv.idx + 1, LEVELS.length - 1)]
  const range = Math.max(1, lv.max - lv.min)
  const pct = Math.min(100, ((state.points - lv.min) / range) * 100)
  const remaining = lv.idx < LEVELS.length - 1 ? (next.min - state.points) : 0

  return (
    <div className="levels-page">
      <div className="page-title">Tu nivel</div>
      <div className="page-sub">Cada acción te acerca al siguiente tier.</div>

      <div className="level-hero">
        <div className="level-hero-copy">
          <div className="eyebrow">Progreso actual</div>
          <div className="level-hero-title">{lv.nm}</div>
          <p>
            Estás en el nivel {lv.idx + 1} de {LEVELS.length}. Cada depósito suma y desbloquea mejores beneficios.
          </p>
          <div className="level-hero-meta">
            <span className="level-chip">{state.points.toLocaleString("es-BO")} pts</span>
            <span className="level-chip muted">
              {lv.idx < LEVELS.length - 1 ? `${remaining.toLocaleString("es-BO")} pts para ${next.nm}` : 'Nivel máximo alcanzado'}
            </span>
          </div>
        </div>
        <div className="level-ring" style={{ background: `conic-gradient(var(--green) ${pct}%, var(--rule) 0)` }}>
          <div>
            <span>{Math.round(pct)}%</span>
            <small>avance</small>
          </div>
        </div>
      </div>

      <div className="level-track">
        <div>
          <div className="lbl">Nivel actual</div>
          <div className="nm">{lv.nm}</div>
        </div>
        <div className="level-track-right">
          <div className="next">
            {lv.idx < LEVELS.length - 1 ? `Siguiente meta: ${next.nm}` : 'Meta final alcanzada'}
          </div>
          <div className="bar"><i style={{ width: `${pct}%` }}></i></div>
        </div>
      </div>

      {LEVELS.map((l, i) => {
        const state_ =
          i < lv.idx ? "achieved" : i === lv.idx ? "current" : "locked"
        return (
          <div className="level-tier" data-state={state_} key={l.id}>
            <div className="level-tier-mark">{Icons.trophy}</div>
            <div>
              <div className="level-tier-nm">{l.nm}</div>
              <div className="level-tier-rng">
                {l.min.toLocaleString("es-BO")} – {l.max === 100000 ? "∞" : l.max.toLocaleString("es-BO")} pts
              </div>
            </div>
            <div className="level-tier-state">
              {state_ === "achieved" ? "Alcanzado" : state_ === "current" ? "Actual" : "Bloqueado"}
            </div>
          </div>
        )
      })}
    </div>
  )
}
