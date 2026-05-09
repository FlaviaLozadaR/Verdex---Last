import { useState } from 'react'
import { CHANNELS } from '../../data/constants'

export default function Channels() {
  const [active, setActive] = useState(0)
  const c = CHANNELS[active]
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
            <div className="placeholder" style={{position:"absolute", inset:0}}>
              <span>{c.visual}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
