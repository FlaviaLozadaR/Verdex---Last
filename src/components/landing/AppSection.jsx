export default function AppSection() {
  const transactions = [
    { ic: "PET", nm: "5 botellas PET · UPSA", sub: "QR · Hoy 14:32", pts: "+250" },
    { ic: "AL", nm: "3 latas aluminio", sub: "Hipermaxi · Ayer", pts: "+180" },
    { ic: "★", nm: "Canje · Café cafetería", sub: "Cupón · 2 días", pts: "−150" },
    { ic: "CRT", nm: "1.2kg cartón · Oficina", sub: "Recolección semanal", pts: "+420" },
  ]
  return (
    <section id="modelo">
      <div className="container">
        <div className="section-head">
          <div><div className="eyebrow">La app</div></div>
          <div>
            <h2>Wallet de puntos verdes.<br/><em>Historial de impacto.</em></h2>
            <p className="lede">
              Una sola app para escanear, sumar puntos, canjear vales y ver tu
              huella real.
            </p>
          </div>
        </div>

        <div className="app">
          <div className="app-copy">
            <ol className="flow-steps">
              <li>
                <div className="n serif">01</div>
                <div>
                  <h4>Depositás</h4>
                  <p>En un contenedor del campus, una máquina del super o vía recolección de tu empresa.</p>
                </div>
              </li>
              <li>
                <div className="n serif">02</div>
                <div>
                  <h4>Se registra</h4>
                  <p>QR para usuarios con app, ticket físico para los que no.</p>
                </div>
              </li>
              <li>
                <div className="n serif">03</div>
                <div>
                  <h4>Sumás puntos</h4>
                  <p>Los puntos verdes se acreditan al instante en tu wallet.</p>
                </div>
              </li>
              <li>
                <div className="n serif">04</div>
                <div>
                  <h4>Canjeás</h4>
                  <p>Descuentos en marcas aliadas — el incentivo es real.</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="phone-stage">
            <div className="phone">
              <div className="phone-screen">
                <div className="app-card wallet">
                  <div className="lbl">Tu wallet</div>
                  <div className="pts">3.840<small>pts</small></div>
                  <div className="lvl">
                    <span>Árbol</span>
                    <span>6.160 pts a Bosque</span>
                  </div>
                  <div className="lvl-bar"><div></div></div>
                </div>
                <div className="app-card">
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 10}}>
                    <span style={{fontFamily:"var(--mono)", fontSize: 10, letterSpacing: "0.14em", textTransform:"uppercase", color:"var(--ink-3)"}}>Actividad</span>
                    <span style={{fontFamily:"var(--mono)", fontSize: 10, color:"var(--ink-3)"}}>Esta semana</span>
                  </div>
                  <div style={{display:"flex", flexDirection:"column", gap: 10}}>
                    {transactions.map((t, i) => (
                      <div className="txn" key={i}>
                        <div className="txn-ic">{t.ic}</div>
                        <div>
                          <div className="txn-nm">{t.nm}</div>
                          <div className="txn-sub">{t.sub}</div>
                        </div>
                        <div className="txn-pts">{t.pts}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
