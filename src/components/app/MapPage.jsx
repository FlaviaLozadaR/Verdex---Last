import { useState } from 'react'
import { POINTS } from '../../data/constants'

export default function MapPage() {
  const [active, setActive] = useState("p1")
  return (
    <div>
      <div className="page-title">Puntos cerca</div>
      <div className="page-sub">Contenedores Verdex, máquinas inteligentes.</div>

      <div className="map-stage">
        {POINTS.map((p) => (
          <button
            key={p.id}
            className="map-pin"
            data-active={active === p.id}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            onClick={() => setActive(p.id)}
          >{p.id.replace("p", "")}</button>
        ))}
      </div>

      <div className="point-list">
        {POINTS.map((p) => (
          <div key={p.id} className="point-row" data-active={active === p.id} onClick={() => setActive(p.id)}>
            <div className="point-ic">📍</div>
            <div>
              <div className="point-nm">{p.nm}</div>
              <div className="point-meta">{p.meta}</div>
            </div>
            <div className="point-dist">{p.dist}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
