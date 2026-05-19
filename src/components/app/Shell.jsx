import { useState, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Icons } from '../Icons'

const KEY = "verdex.user.v1"
const initialState = {
  signedIn: false,
  name: "",
  email: "",
  uni: "UPSA",
  points: 0,
  totalEarned: 0,
  kg: 0,
  txns: [],
  redemptions: [],
}

function loadState() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...initialState }
    return { ...initialState, ...JSON.parse(raw) }
  } catch { return { ...initialState } }
}

function saveState(s) { try { localStorage.setItem(KEY, JSON.stringify(s)) } catch {} }

import Onboarding from './Onboarding'
import Home from './Home'
import Scan from './Scan'
import Rewards from './Rewards'
import MapPage from './MapPage'
import CampusMap from './CampusMap'
import LevelsPage from './LevelsPage'
import Profile from './Profile'
import Notifications from './Notifications'

export default function Shell() {
  const navigate = useNavigate()
  const location = useLocation()
  const [state, setState] = useState(loadState)
  const [toast, setToast] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => { saveState(state) }, [state])

  const pathname = location.pathname
  const activeTab = pathname.split('/')[2] || 'home'
  const scanActive = pathname.endsWith('/scan')

  const fmtTime = () => {
    const d = new Date()
    return d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0")
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2000)
  }

  const go = (nextTab) => navigate(`/app/${nextTab}`)

  const handleDeposit = (txn) => {
    setState((s) => ({
      ...s,
      points: s.points + txn.pts,
      totalEarned: s.totalEarned + txn.pts,
      kg: +(s.kg + (txn.kg || 0)).toFixed(2),
      txns: [txn, ...s.txns],
    }))
  }

  const handleRedeem = (red) => {
    setState((s) => ({
      ...s,
      points: s.points - red.pts,
      redemptions: [red, ...s.redemptions],
    }))
    showToast("Código guardado en tu historial")
  }

  const handleLogout = () => {
    if (confirm("¿Cerrar sesión? Se mantendrán tus datos.")) {
      setState((s) => ({ ...s, signedIn: false }))
      navigate('/app/login', { replace: true })
    }
  }

  const handleReset = () => {
    if (confirm("¿Reiniciar progreso a cero? No se puede deshacer.")) {
      setState((s) => ({ ...s, points: 0, totalEarned: 0, kg: 0, txns: [], redemptions: [] }))
      showToast("Progreso reiniciado")
    }
  }

  const initial = (state.name?.[0] || 'V').toUpperCase()

  const renderFrame = ({ children, bodyStyle, showHeader = true, showTabbar = true, showSidebar = true }) => (
    <div className="app-shell">
      <div className="app-frame">

        {/* ── Desktop sidebar ── */}
        {showSidebar && (
          <aside className="app-sidebar">
            <div className="app-sidebar-brand">
              <button className="app-brand app-brand-link" onClick={() => navigate('/')}>
                <span className="app-brand-mark"></span>
                <span className="app-brand-text">Verdex</span>
              </button>
            </div>
            <nav className="app-sidebar-nav">
              <button className="app-sidebar-item" data-on={activeTab === 'home'} onClick={() => go('home')}>{Icons.home}<span>Inicio</span></button>
              <button className="app-sidebar-item" data-on={activeTab === 'rewards'} onClick={() => go('rewards')}>{Icons.rewards}<span>Canjear</span></button>
              <button className="app-sidebar-item app-sidebar-scan" onClick={() => navigate('/app/scan')}>{Icons.scan}<span>Escanear</span></button>
              <button className="app-sidebar-item" data-on={activeTab === 'map'} onClick={() => go('map')}>{Icons.map}<span>Puntos</span></button>
              <button className="app-sidebar-item" data-on={activeTab === 'campus'} onClick={() => go('campus')}>{Icons.campus}<span>Mapa</span></button>
              <button className="app-sidebar-item" data-on={activeTab === 'levels'} onClick={() => go('levels')}>{Icons.trophy}<span>Nivel</span></button>
            </nav>
            {/* Recycling chain widget */}
            <div className="sb-chain">
              <div className="sb-chain-plants" aria-hidden="true">
                <svg width="28" height="32" viewBox="0 0 28 32" fill="none"><path d="M14 30L14 16" stroke="#3d8a52" strokeWidth="1.5" strokeLinecap="round"/><path d="M14 22C14 22 8 18 8 12C11 10 14 15 14 22Z" fill="#4a9e62" opacity="0.8"/><path d="M14 18C14 18 20 14 20 8C17 6 14 11 14 18Z" fill="#3d8a52" opacity="0.85"/><path d="M14 16C14 16 10 10 14 4C18 10 14 16 14 16Z" fill="#56b870" opacity="0.8"/></svg>
                <svg width="22" height="26" viewBox="0 0 22 26" fill="none" style={{marginLeft:-4}}><path d="M11 24L11 13" stroke="#3d8a52" strokeWidth="1.3" strokeLinecap="round"/><path d="M11 18C11 18 6 15 6 10C9 8 11 13 11 18Z" fill="#4a9e62" opacity="0.7"/><path d="M11 15C11 15 16 12 16 7C13 5 11 10 11 15Z" fill="#3d8a52" opacity="0.75"/></svg>
              </div>
              <div className="sb-chain-title">¿A dónde va tu plástico?</div>
              <div className="sb-chain-flow">
                <span>Contenedor</span>
                <span className="sb-arrow">→</span>
                <span>Verdex</span>
                <span className="sb-arrow">→</span>
                <span>Empacar S.A.</span>
                <span className="sb-arrow">→</span>
                <span>Nueva botella</span>
              </div>
              <p className="sb-chain-desc">Pagan Bs 2/kg — ingreso que sostiene la app sin que pagues nada.</p>
            </div>

            <div className="app-sidebar-foot">
              <Notifications state={state} />
              <button className="app-icon-btn avatar" onClick={() => go('profile')}>{initial}</button>
            </div>
          </aside>
        )}

        {/* ── Main column (mobile: full shell / desktop: content only) ── */}
        <div className="app-main">
          <div className="app-status">
            <span>{fmtTime()}</span>
            <span style={{display: 'flex', gap: 6, alignItems: 'center'}}>
              <span className="signal"><i></i><i></i><i></i><i></i></span>
              <span>5G</span><span>100%</span>
            </span>
          </div>

          {showHeader && (
            <div className="app-header">
              {/* Hamburger — only visible on mobile */}
              <button className="app-hamburger" onClick={() => setDrawerOpen(true)} aria-label="Abrir menú">
                <span/><span/><span/>
              </button>
              <div className="app-brand">
                <span className="app-brand-mark"></span>
                <span className="app-brand-text">Verdex</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Notifications state={state} position="down" />
                <button className="app-icon-btn avatar" onClick={() => go('profile')}>{initial}</button>
              </div>
            </div>
          )}

          {/* Mobile navigation drawer */}
          {drawerOpen && (
            <div className="mob-drawer-backdrop" onClick={() => setDrawerOpen(false)}/>
          )}
          <div className={'mob-drawer' + (drawerOpen ? ' open' : '')} aria-hidden={!drawerOpen}>
            <div className="mob-drawer-head">
              <div className="app-brand">
                <span className="app-brand-mark"></span>
                <span className="app-brand-text">Verdex</span>
              </div>
              <button className="mob-drawer-close" onClick={() => setDrawerOpen(false)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 3l10 10M13 3L3 13"/></svg>
              </button>
            </div>
            <nav className="mob-drawer-nav">
              {[
                { tab: 'home',    icon: Icons.home,    label: 'Inicio' },
                { tab: 'rewards', icon: Icons.rewards, label: 'Canjear' },
                { tab: 'map',     icon: Icons.map,     label: 'Puntos' },
                { tab: 'campus',  icon: Icons.campus,  label: 'Mapa' },
                { tab: 'levels',  icon: Icons.trophy,  label: 'Nivel' },
                { tab: 'profile', icon: Icons.user,    label: 'Perfil' },
              ].map(({ tab, icon, label }) => (
                <button
                  key={tab}
                  className={'mob-drawer-item' + (activeTab === tab ? ' active' : '')}
                  onClick={() => { go(tab); setDrawerOpen(false) }}
                >
                  {icon}<span>{label}</span>
                </button>
              ))}
              <button className="mob-drawer-scan" onClick={() => { navigate('/app/scan'); setDrawerOpen(false) }}>
                {Icons.scan}<span>Escanear</span>
              </button>
            </nav>
          </div>

          <div className="app-body" style={bodyStyle}>{children}</div>

          {showTabbar && (
            <div className="app-tabbar">
              <button className="app-tab" data-on={activeTab === 'home'} onClick={() => go('home')}>{Icons.home}<span>Inicio</span></button>
              <button className="app-tab" data-on={activeTab === 'rewards'} onClick={() => go('rewards')}>{Icons.rewards}<span>Canjear</span></button>
              <button className="app-tab fab" data-on={scanActive} onClick={() => navigate('/app/scan')}>{Icons.scan}<span>Escanear</span></button>
              <button className="app-tab" data-on={activeTab === 'map'} onClick={() => go('map')}>{Icons.map}<span>Puntos</span></button>
              <button className="app-tab" data-on={activeTab === 'levels'} onClick={() => go('levels')}>{Icons.trophy}<span>Nivel</span></button>
            </div>
          )}

          {toast && <div className="toast">{toast}</div>}
        </div>

      </div>
    </div>
  )

  if (!state.signedIn) {
    if (pathname !== '/app/login') {
      return <Navigate to="/app/login" replace />
    }

    return (
      renderFrame({
        showHeader: false,
        showTabbar: false,
        showSidebar: false,
        bodyStyle: { padding: 0 },
        children: (
          <Onboarding onSubmit={({ name, email, uni, seed }) => {
            const next = {
              ...initialState,
              signedIn: true,
              name,
              email,
              uni,
              points: seed ? 3840 : 0,
              totalEarned: seed ? 4150 : 0,
              kg: seed ? 14.6 : 0,
              txns: seed ? [
                { id: "t1", type: "deposit", label: "5 botellas PET · Cafetería", sub: "UPSA · Hoy 14:32", pts: 250, ic: "PET", ts: Date.now() - 3600000 },
                { id: "t2", type: "deposit", label: "3 latas aluminio", sub: "Hipermaxi · Ayer", pts: 180, ic: "AL", ts: Date.now() - 86400000 },
                { id: "t3", type: "deposit", label: "1.2 kg cartón · Oficina", sub: "Recolección B2B", pts: 420, ic: "CRT", ts: Date.now() - 2 * 86400000 },
                { id: "t4", type: "deposit", label: "12 botellas PET", sub: "Plaza Blacutt · 3d", pts: 600, ic: "PET", ts: Date.now() - 3 * 86400000 },
              ] : [],
              redemptions: seed ? [
                { id: "rd1", rewardId: "r1", name: "Café americano gratis", partner: "Cafetería UPSA", pts: 150, ts: Date.now() - 4 * 86400000, code: "VDX-A12B-CD34" },
                { id: "rd2", rewardId: "r2", name: "Snack saludable 10% off", partner: "Aliado local", pts: 300, ts: Date.now() - 6 * 86400000, code: "VDX-XX99-YY01" },
              ] : [],
            }
            setState(next)
            navigate('/app/home', { replace: true })
          }} />
        ),
      })
    )
  }

  return renderFrame({
    children: (
      <Routes>
        <Route index element={<Navigate to="/app/home" replace />} />
        <Route path="login" element={<Navigate to="/app/home" replace />} />
        <Route path="home" element={<Home state={state} go={go} openScan={() => navigate('/app/scan')} />} />
        <Route path="rewards" element={<Rewards state={state} onRedeem={handleRedeem} />} />
        <Route path="map" element={<MapPage />} />
        <Route path="campus" element={<CampusMap />} />
        <Route path="levels" element={<LevelsPage state={state} />} />
        <Route path="profile" element={<Profile state={state} onLogout={handleLogout} onReset={handleReset} />} />
        <Route path="scan" element={<Scan state={state} onDeposit={handleDeposit} onClose={() => navigate('/app/home')} />} />
        <Route path="*" element={<Navigate to="/app/home" replace />} />
      </Routes>
    ),
  })
}
