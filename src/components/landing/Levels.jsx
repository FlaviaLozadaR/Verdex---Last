import { useState } from 'react'
import { LANDING_LEVELS } from '../../data/constants'

export default function Levels() {
  const [active, setActive] = useState(2)
  const l = LANDING_LEVELS[active]
  const fillPct = ((active + 1) / LANDING_LEVELS.length) * 100
  return (
    <section id="niveles" className="levels section-themed">
      <div className="container">
        <div className="section-head">
          <div><div className="eyebrow">Gamificación · App Verdex</div></div>
          <div>
            <h2>Cuatro niveles. <em>Una sola misión.</em></h2>
            <p className="lede">
              Cada acción registrada eleva tu nivel.
            </p>
          </div>
        </div>

        <div className="level-progress">
          <div className="level-track">
            <div className="level-fill" style={{ width: `${fillPct}%` }}></div>
          </div>
          <div className="level-nodes">
            {LANDING_LEVELS.map((lv, i) => (
              <button
                key={lv.id}
                className="level-node"
                data-on={i <= active}
                onClick={() => setActive(i)}
              >
                <div className="nm">{lv.nm}</div>
                <div className="rng">{lv.rng}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="level-detail">
          <div>
            <div className="eyebrow">Nivel {active+1} de 4</div>
            <h3 style={{marginTop: 14}}>{l.nm}</h3>
            <p>{l.desc}</p>
          </div>
          <ul className="benefit-list">
            {l.benefits.map((b, i) => (
              <li key={i}>
                <div className="pts">{b.pts}</div>
                <div className="nm">{b.nm}</div>
                <div className="partner">{b.partner}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
