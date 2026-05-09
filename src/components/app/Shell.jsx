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
import LevelsPage from './LevelsPage'
import Profile from './Profile'

export default function Shell() {
  const navigate = useNavigate()
  const location = useLocation()
  const [state, setState] = useState(loadState)
  const [toast, setToast] = useState(null)

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

  const renderFrame = ({ children, bodyStyle, showHeader = true, showTabbar = true }) => (
    <div className="app-shell">
      <div className="app-frame">
        <div className="app-status">
          <span>{fmtTime()}</span>
          <span style={{display: "flex", gap: 6, alignItems: "center"}}>
            <span className="signal"><i></i><i></i><i></i><i></i></span>
            <span>5G</span>
            <span>100%</span>
          </span>
        </div>

        {showHeader && (
          <div className="app-header">
            <button
              className="app-brand app-brand-link"
              onClick={() => navigate('/')}
              aria-label="Volver a la web de Verdex"
            >
              <span className="app-brand-mark"></span>
              <span className="app-brand-text">Verdex</span>
            </button>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="app-icon-btn" onClick={() => showToast("Notificaciones al día")}>{Icons.bell}</button>
              <button className="app-icon-btn avatar" onClick={() => go("profile")}>{(state.name?.[0] || "V").toUpperCase()}</button>
            </div>
          </div>
        )}

        <div className="app-body" style={bodyStyle}>{children}</div>

        {showTabbar && (
          <div className="app-tabbar">
            <button className="app-tab" data-on={activeTab === "home"} onClick={() => go("home")}>{Icons.home}<span>Inicio</span></button>
            <button className="app-tab" data-on={activeTab === "rewards"} onClick={() => go("rewards")}>{Icons.rewards}<span>Canjear</span></button>
            <button className="app-tab fab" data-on={scanActive} onClick={() => navigate('/app/scan')}>{Icons.scan}<span>Escanear</span></button>
            <button className="app-tab" data-on={activeTab === "map"} onClick={() => go("map")}>{Icons.map}<span>Puntos</span></button>
            <button className="app-tab" data-on={activeTab === "levels"} onClick={() => go("levels")}>{Icons.trophy}<span>Nivel</span></button>
          </div>
        )}

        {toast && <div className="toast">{toast}</div>}
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
        <Route index element={<Navigate to="home" replace />} />
        <Route path="login" element={<Navigate to="home" replace />} />
        <Route path="home" element={<Home state={state} go={go} openScan={() => navigate('/app/scan')} />} />
        <Route path="rewards" element={<Rewards state={state} onRedeem={handleRedeem} />} />
        <Route path="map" element={<MapPage />} />
        <Route path="levels" element={<LevelsPage state={state} />} />
        <Route path="profile" element={<Profile state={state} onLogout={handleLogout} onReset={handleReset} />} />
        <Route path="scan" element={<Scan state={state} onDeposit={handleDeposit} onClose={() => navigate('/app/home')} />} />
        <Route path="*" element={<Navigate to="home" replace />} />
      </Routes>
    ),
  })
}
