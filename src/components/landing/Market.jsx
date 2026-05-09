export default function Market() {
  const phases = [
    {
      n: "FASE 01", h: "Santa Cruz · Piloto",
      p: "Universidades privadas como canal de validación rápida.",
      tags: ["UPSA", "UPB", "UCB", "UCEBOL", "Hipermaxi", "Fidalga", "3B"],
    },
    {
      n: "FASE 02", h: "Expansión departamental",
      p: "Espacios públicos en convenio con el municipio.",
      tags: ["GAM Santa Cruz", "Espacios públicos", "Empresas privadas"],
    },
    {
      n: "FASE 03", h: "Eje troncal",
      p: "La Paz y Cochabamba. Replicar la lógica con instituciones.",
      tags: ["La Paz", "Cochabamba", "Industria nacional"],
    },
  ]

  return (
    <section id="mercado" className="market">
      <div className="container">
        <div className="section-head">
          <div><div className="eyebrow">Mercado y expansión</div></div>
          <div>
            <h2>De Santa Cruz al <em>eje troncal.</em></h2>
            <p className="lede">
              El modelo replica en cualquier ciudad.
            </p>
          </div>
        </div>

        <div className="phases">
          {phases.map((ph, i) => (
            <div className="phase" key={i}>
              <div className="num">{ph.n}</div>
              <h3>{ph.h}</h3>
              <p>{ph.p}</p>
              <div className="where">
                {ph.tags.map((t, j) => <span key={j} className="tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>

        <div className="partners">
          <div className="partners-row">
            <div className="label">Universidades piloto</div>
            <div className="partner-pills">
              <span className="partner-pill">UPSA</span>
              <span className="partner-pill">UPB</span>
              <span className="partner-pill">UCB</span>
              <span className="partner-pill">UCEBOL</span>
            </div>
          </div>
          <div className="partners-row">
            <div className="label">Supermercados objetivo</div>
            <div className="partner-pills">
              <span className="partner-pill">Hipermaxi</span>
              <span className="partner-pill">Fidalga</span>
              <span className="partner-pill">3B</span>
            </div>
          </div>
          <div className="partners-row">
            <div className="label">Marcas de consumo masivo</div>
            <div className="partner-pills">
              <span className="partner-pill">Coca-Cola Bolivia</span>
              <span className="partner-pill">Pepsi</span>
              <span className="partner-pill">Mendocina</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
