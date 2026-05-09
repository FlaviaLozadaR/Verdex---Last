export default function CTA({ onOpenApp }) {
  return (
    <section id="contacto" className="cta">
      <div className="container">
        <h2>Sumate al primer ecosistema circular <em>de Bolivia.</em></h2>
        <p>
          Universidades, supermercados, embotelladoras, municipios y marcas de
          consumo — Verdex es una red, y crece con cada nuevo aliado.
        </p>
        <div className="cta-btns">
          <button className="btn btn-primary" onClick={onOpenApp} style={{border: 'none', background: 'inherit', padding: 'inherit', display: 'inherit'}}>Empezar a reciclar</button>
          <a href="mailto:hola@verdex.bo" className="btn btn-ghost">Quiero ser aliado</a>
        </div>
      </div>
    </section>
  )
}
