export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div className="foot">
            <div className="foot-brand">Verdex</div>
            <p>Plataforma híbrida de reciclaje con sistema de recompensas. Santa Cruz de la Sierra, Bolivia.</p>
          </div>
          <div className="foot">
            <h5>Modelo</h5>
            <ul>
              <li><a href="#canales">Canales</a></li>
              <li><a href="#niveles">Niveles</a></li>
              <li><a href="#modelo">App</a></li>
              <li><a href="#inversion">Inversión</a></li>
            </ul>
          </div>
          <div className="foot">
            <h5>Aliados</h5>
            <ul>
              <li><a href="#">Universidades</a></li>
              <li><a href="#">Supermercados</a></li>
              <li><a href="#">Empresas</a></li>
              <li><a href="#">Municipios</a></li>
            </ul>
          </div>
          <div className="foot">
            <h5>Contacto</h5>
            <ul>
              <li><a href="mailto:hola@verdex.bo">hola@verdex.bo</a></li>
              <li><a href="#">Santa Cruz, Bolivia</a></li>
              <li><a href="#">Prensa</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-base">
          <span>© 2026 Verdex · UPSA Feria de Innovación</span>
          <span>Inspirado en el sistema Pfand alemán</span>
        </div>
      </div>
    </footer>
  )
}
