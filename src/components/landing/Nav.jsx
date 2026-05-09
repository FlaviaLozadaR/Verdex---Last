import { useState } from 'react'

export default function Nav({ onOpenApp }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  return (
    <nav className="nav">
      <div className="container nav-row">
        <a href="#top" className="brand">
          <span className="brand-mark"></span>
          <span>Verdex</span>
        </a>
        <div className="nav-links">
          <a href="#modelo" onClick={handleLinkClick}>Modelo</a>
          <a href="#canales" onClick={handleLinkClick}>Canales</a>
          <a href="#niveles" onClick={handleLinkClick}>Niveles</a>
          <a href="#mercado" onClick={handleLinkClick}>Mercado</a>
          <a href="#inversion" onClick={handleLinkClick}>Inversión</a>
          <button className="nav-cta" onClick={onOpenApp}>
            <span className="dot"></span>
            Abrir app
          </button>
        </div>

        <button
          className={`nav-hamburger${menuOpen ? ' is-open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {menuOpen && (
        <div className="nav-backdrop" onClick={() => setMenuOpen(false)} />
      )}

      <div className={`nav-drawer${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
        <button
          className="nav-drawer-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Cerrar menú"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        <div className="nav-drawer-links">
          <a href="#modelo" onClick={handleLinkClick}>Modelo</a>
          <a href="#canales" onClick={handleLinkClick}>Canales</a>
          <a href="#niveles" onClick={handleLinkClick}>Niveles</a>
          <a href="#mercado" onClick={handleLinkClick}>Mercado</a>
          <a href="#inversion" onClick={handleLinkClick}>Inversión</a>
        </div>
        <div className="nav-drawer-footer">
          <button className="nav-cta" onClick={() => { onOpenApp(); setMenuOpen(false) }}>
            <span className="dot"></span>
            Abrir app
          </button>
        </div>
      </div>
    </nav>
  )
}
