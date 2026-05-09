import { useState, useMemo } from 'react'
import { INVEST } from '../../data/constants'

export default function Investment() {
  const [scenario, setScenario] = useState("hi")
  const total = useMemo(() => INVEST.reduce((s, r) => s + r[scenario], 0), [scenario])
  const max = Math.max(...INVEST.map(r => r[scenario]))

  return (
    <section id="inversion">
      <div className="container">
        <div className="section-head">
          <div><div className="eyebrow">Modelo de ingresos · Inversión</div></div>
          <div>
            <h2>Tres flujos. <em>Ingreso desde el primer mes.</em></h2>
            <p className="lede">
              La venta de material reciclado genera ingreso desde que los primeros
              contenedores empiezan a llenarse.
            </p>
          </div>
        </div>

        <div className="revenue-grid">
          <div className="rev-card">
            <div className="pct">B2B</div>
            <h4>Servicio de recolección</h4>
            <p>Empresas privadas pagan una cuota mensual.</p>
            <div className="stream">Ingreso recurrente</div>
          </div>
          <div className="rev-card">
            <div className="pct">5–10%</div>
            <h4>Comisión por vale canjeado</h4>
            <p>Aliados comerciales aportan comisión sobre cada cupón.</p>
            <div className="stream">Ingreso transaccional</div>
          </div>
          <div className="rev-card">
            <div className="pct">Bulk</div>
            <h4>Venta de materia prima</h4>
            <p>Material consolidado vendido como insumo.</p>
            <div className="stream">Ingreso principal · Mes 1</div>
          </div>
        </div>

        <div className="invest">
          <div className="invest-head">
            <h3>Inversión estimada · Fase piloto</h3>
            <div className="invest-total">
              <div className="lbl">Total</div>
              <div className="v">USD {total.toLocaleString("es-BO")}<small> /piloto</small></div>
            </div>
          </div>

          <div className="invest-toggle">
            <span style={{color:"var(--ink-3)", marginRight: 12}}>Escenario</span>
            <button data-on={scenario === "lo"} onClick={() => setScenario("lo")}>Mínimo</button>
            <button data-on={scenario === "hi"} onClick={() => setScenario("hi")}>Máximo</button>
            <div className="gap"></div>
            <span style={{color:"var(--ink-3)"}}>USD 17.000 – 26.000</span>
          </div>

          <div className="invest-rows">
            {INVEST.map((r, i) => (
              <div className="invest-row" key={i}>
                <div className="idx mono">0{i+1}</div>
                <div>
                  <div className="nm">{r.nm}</div>
                  <div className="mono" style={{fontSize: 12, color:"var(--ink-3)", marginTop: 2}}>{r.note}</div>
                </div>
                <div className="bar"><i style={{ width: `${(r[scenario] / max) * 100}%` }}></i></div>
                <div className="amt">USD {r[scenario].toLocaleString("es-BO")}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
