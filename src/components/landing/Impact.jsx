import { useEffect, useState, useRef, useCallback } from 'react'

function useCount(target, run) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf, start
    const dur = 1600
    const step = (t) => {
      if (!start) start = t
      const p = Math.min(1, (t - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setV(target * eased)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [run, target])
  return v
}

function Metric({ value, suffix, label, run, format = (v) => Math.round(v).toLocaleString("es-BO") }) {
  const v = useCount(value, run)
  return (
    <div className="metric">
      <div className="v">{format(v)}<small>{suffix}</small></div>
      <div className="k">{label}</div>
    </div>
  )
}

export default function Impact() {
  const ref = useRef(null)
  const [run, setRun] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setRun(true); obs.disconnect() }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="impacto" className="impact" ref={ref}>
      <div className="container">
        <div className="section-head">
          <div><div className="eyebrow">Impacto medible</div></div>
          <div>
            <h2>Métricas concretas. <em>Indicadores sólidos.</em></h2>
            <p className="lede">
              Toneladas recuperadas, usuarios activos, empresas afiliadas.
            </p>
          </div>
        </div>

        <div className="metrics">
          <Metric value={120} suffix="+" label="Contenedores piloto" run={run} />
          <Metric value={4} suffix=" canales" label="Físicos + digitales" run={run} />
          <Metric value={98} suffix="%" label="Tasa retorno (referencia Pfand)" run={run} />
          <Metric value={26000} suffix=" USD" label="Inversión techo" run={run} />
        </div>

        <div className="differential">
          <h3>Lo que nos hace <em>diferentes.</em></h3>
          <ul className="diff-list">
            <li><span className="check">+</span><span>Único modelo en Bolivia que combina infraestructura física + app + red de alianzas.</span></li>
            <li><span className="check">+</span><span>Incentivo económico real, no moral.</span></li>
            <li><span className="check">+</span><span>Atiende dos perfiles: universitario con smartphone y recolector informal sin app.</span></li>
            <li><span className="check">+</span><span>Modelo de ingresos desde el primer mes.</span></li>
          </ul>
        </div>
      </div>
    </section>
  )
}
