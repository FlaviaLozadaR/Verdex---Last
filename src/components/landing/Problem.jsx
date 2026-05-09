export default function Problem() {
  return (
    <section id="problema" className="problem">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">El problema</div>
          </div>
          <div>
            <h2>
              No es falta de conciencia.<br />
              Es falta de <em>incentivo.</em>
            </h2>
            <p className="lede">
              En Bolivia, reciclar un kilo de cartón rinde Bs. 1,20. Ese precio no
              mueve a nadie. Verdex reemplaza el incentivo mínimo con un ecosistema
              de recompensas reales — descuentos, vales y beneficios canjeables.
            </p>
          </div>
        </div>

        <div className="problem-grid">
          <div className="compare before">
            <div className="label">Mercado actual</div>
            <div className="price">Bs. 1,20<small>/ kg de cartón</small></div>
            <p>
              Recicladoras tradicionales compran material a precios mínimos.
              <strong> Sin app, sin recompensas, sin red.</strong> El usuario no
              percibe valor — y por eso no participa.
            </p>
          </div>
          <div className="compare after">
            <div className="label">Modelo Verdex</div>
            <div className="price">Recompensa<small>real y canjeable</small></div>
            <p>
              Cada envase se traduce en <strong>puntos verdes</strong> en la app, que se
              canjean por descuentos en marcas aliadas. El incentivo deja de ser
              moral — pasa a ser económico.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
