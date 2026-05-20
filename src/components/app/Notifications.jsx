import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

function timeAgo(ts) {
  const diff = Date.now() - ts
  const m = Math.floor(diff / 60000)
  const h = Math.floor(diff / 3600000)
  const d = Math.floor(diff / 86400000)
  if (m < 1) return 'Ahora mismo'
  if (m < 60) return `Hace ${m} min`
  if (h < 24) return `Hace ${h}h`
  return `Hace ${d}d`
}

function buildNotifications(state) {
  const notes = []

  // Welcome
  notes.push({
    id: 'welcome',
    type: 'welcome',
    title: '¡Bienvenido a Verdex!',
    body: 'Tu cuenta está activa. Empezá a reciclar y sumar puntos verdes.',
    ts: Date.now() - 7 * 86400000,
    read: false,
  })

  // Deposits → notification per deposit (last 5)
  state.txns.filter(t => t.type === 'deposit').slice(0, 5).forEach(t => {
    notes.push({
      id: `dep-${t.id}`,
      type: 'deposit',
      title: '¡Depósito registrado!',
      body: `${t.label} — sumaste +${t.pts.toLocaleString('es-BO')} pts verdes.`,
      ts: t.ts,
      read: false,
    })
  })

  // Redemptions
  state.redemptions.slice(0, 3).forEach(r => {
    notes.push({
      id: `red-${r.id}`,
      type: 'redeem',
      title: 'Canje exitoso',
      body: `${r.name} canjeado en ${r.partner}. Código: ${r.code}`,
      ts: r.ts,
      read: false,
    })
  })

  // Points milestone
  if (state.totalEarned >= 1000) {
    notes.push({
      id: 'milestone-1k',
      type: 'milestone',
      title: '¡Superaste los 1.000 pts!',
      body: 'Tu impacto crece. Seguí reciclando para alcanzar el siguiente nivel.',
      ts: Date.now() - 2 * 86400000,
      read: false,
    })
  }

  // Sort by time desc
  return notes.sort((a, b) => b.ts - a.ts)
}

const ICONS = {
  welcome:   <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 2C9 2 5 6 5 9.5a4 4 0 008 0C13 6 9 2 9 2z"/></svg>,
  deposit:   <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="7" width="10" height="7" rx="1.5"/><path d="M4 9h10"/><path d="M7 7V5a2 2 0 014 0v2"/></svg>,
  redeem:    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h12v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/><path d="M2 5h14v2H2z"/><path d="M9 5V2"/><path d="M6 5C6 3 7 2 9 2c2 0 3 1 3 3"/></svg>,
  milestone: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 1l2 6h6l-5 3.5 2 6L9 13l-5 3.5 2-6L1 7h6z"/></svg>,
}

const BG = { welcome: 'var(--green-soft)', deposit: 'var(--green-soft)', redeem: 'var(--amber-soft)', milestone: 'var(--amber-soft)' }
const CLR = { welcome: 'var(--green)', deposit: 'var(--green)', redeem: 'var(--amber-deep)', milestone: 'var(--amber-deep)' }

export default function Notifications({ state, position = 'up' }) {
  const [open, setOpen]   = useState(false)
  const [panelStyle, setPanelStyle] = useState({})
  const [read, setRead]   = useState(() => {
    try { return JSON.parse(localStorage.getItem('vdx.notif.read') || '[]') } catch { return [] }
  })
  const btnRef   = useRef(null)
  const panelRef = useRef(null)

  const notes  = buildNotifications(state)
  const unread = notes.filter(n => !read.includes(n.id)).length

  const calcPosition = () => {
    if (!btnRef.current) return
    const r   = btnRef.current.getBoundingClientRect()
    const panelW = 320
    if (position === 'up') {
      // Anclar el borde INFERIOR del panel al borde superior del botón
      setPanelStyle({
        bottom:    window.innerHeight - r.top + 8,
        left:      Math.min(r.left, window.innerWidth - panelW - 8),
        maxHeight: Math.min(480, r.top - 16),
      })
    } else {
      // Abrir hacia abajo desde el botón, alineado a la derecha
      setPanelStyle({
        top:  r.bottom + 8,
        left: Math.max(8, r.right - panelW),
        maxHeight: Math.min(480, window.innerHeight - r.bottom - 16),
      })
    }
  }

  useEffect(() => {
    if (open) calcPosition()
  }, [open])

  useEffect(() => {
    const handler = (e) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target) &&
        btnRef.current   && !btnRef.current.contains(e.target)
      ) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const markAll = () => {
    const ids = notes.map(n => n.id)
    setRead(ids)
    localStorage.setItem('vdx.notif.read', JSON.stringify(ids))
  }

  const markOne = (id) => {
    const next = [...new Set([...read, id])]
    setRead(next)
    localStorage.setItem('vdx.notif.read', JSON.stringify(next))
  }

  const panel = open ? (
    <div
      ref={panelRef}
      className="notif-panel"
      style={{ position: 'fixed', ...panelStyle }}
    >
          <div className="notif-panel-head">
            <span className="notif-panel-title">Notificaciones</span>
            {unread > 0 && (
              <button className="notif-mark-all" onClick={markAll}>Marcar todo como leído</button>
            )}
          </div>

          <div className="notif-list">
            {notes.length === 0 ? (
              <div className="notif-empty">Sin notificaciones</div>
            ) : notes.map(n => {
              const isRead = read.includes(n.id)
              return (
                <div
                  key={n.id}
                  className={'notif-item' + (isRead ? ' read' : '')}
                  onClick={() => markOne(n.id)}
                >
                  <div className="notif-ic" style={{ background: BG[n.type], color: CLR[n.type] }}>
                    {ICONS[n.type]}
                  </div>
                  <div className="notif-content">
                    <div className="notif-title">{n.title}</div>
                    <div className="notif-body">{n.body}</div>
                    <div className="notif-time">{timeAgo(n.ts)}</div>
                  </div>
                  {!isRead && <div className="notif-dot"/>}
                </div>
              )
            })}
          </div>
    </div>
  ) : null

  return (
    <>
      <button ref={btnRef} className="app-icon-btn notif-btn" onClick={() => setOpen(o => !o)}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 7a4 4 0 018 0c0 5 2 6 2 6H3s2-1 2-6z"/>
          <path d="M7 15a2 2 0 004 0"/>
        </svg>
        {unread > 0 && <span className="notif-badge">{unread > 9 ? '9+' : unread}</span>}
      </button>
      {createPortal(panel, document.body)}
    </>
  )
}
