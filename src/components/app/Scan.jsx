import { useState, useEffect, useRef } from 'react'
import jsQR from 'jsqr'
import { MATERIALS } from '../../data/constants'

// Solo acepta el QR oficial de Verdex
const QR_EXPECTED = 'https://verdex.app/scan/upsa-bloque-central'

function QRScanner({ onDetect, onClose }) {
  const videoRef  = useRef(null)
  const canvasRef = useRef(null)
  const timerRef  = useRef(null)
  const activeRef = useRef(true)

  // 'idle' | 'scanning' | 'wrong' | 'ok' | 'error'
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    activeRef.current = true
    let stream = null

    // Scan every 250ms — más confiable que requestAnimationFrame
    function scanFrame() {
      if (!activeRef.current) return
      const video  = videoRef.current
      const canvas = canvasRef.current
      if (!video || !canvas || video.readyState < 2 || video.videoWidth === 0) return

      canvas.width  = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      ctx.drawImage(video, 0, 0)
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      // Probar también invertido para mejor detección
      const code =
        jsQR(imgData.data, imgData.width, imgData.height, { inversionAttempts: 'attemptBoth' })

      if (!code) {
        setStatus('scanning')
        return
      }

      if (code.data === QR_EXPECTED) {
        setStatus('ok')
        clearInterval(timerRef.current)
        // Apagar cámara inmediatamente al detectar el QR
        stream?.getTracks().forEach(t => t.stop())
        if (videoRef.current) videoRef.current.srcObject = null
        setTimeout(() => { if (activeRef.current) onDetect(code.data) }, 800)
      } else {
        setStatus('wrong')
        // Resetear mensaje tras 2s y seguir buscando
        setTimeout(() => { if (activeRef.current) setStatus('scanning') }, 2000)
      }
    }

    // Intentar cámara trasera primero, si falla usar cualquiera
    async function startCamera() {
      const configs = [
        { video: { facingMode: 'environment', width: { ideal: 1920 }, height: { ideal: 1080 } } },
        { video: { facingMode: 'environment' } },
        { video: true },
      ]
      for (const cfg of configs) {
        try {
          stream = await navigator.mediaDevices.getUserMedia(cfg)
          break
        } catch { /* try next */ }
      }
      if (!stream) { setStatus('error'); return }
      if (!activeRef.current) { stream.getTracks().forEach(t => t.stop()); return }

      const video = videoRef.current
      if (!video) return
      video.srcObject = stream
      video.setAttribute('playsinline', true)
      video.muted = true
      await video.play()
      setStatus('scanning')
      timerRef.current = setInterval(scanFrame, 250)
    }

    startCamera()

    return () => {
      activeRef.current = false
      clearInterval(timerRef.current)
      stream?.getTracks().forEach(t => t.stop())
    }
  }, [])

  const hints = {
    idle:     { text: 'Iniciando cámara…',                         color: 'rgba(0,0,0,0.55)' },
    scanning: { text: 'Buscando QR de Verdex…',                    color: 'rgba(0,0,0,0.55)' },
    wrong:    { text: '❌ QR no válido — usá el QR de Verdex',      color: 'rgba(180,30,30,0.85)' },
    ok:       { text: '✅ ¡QR detectado!',                          color: 'rgba(30,120,60,0.9)' },
    error:    { text: '⚠ No se pudo acceder a la cámara. Verificá los permisos.', color: 'rgba(180,60,0,0.85)' },
  }
  const hint = hints[status]

  return (
    <div className="qrs-wrap">
      <div className="qrs-header">
        <div className="sc-location">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M7 1a4 4 0 014 4c0 3.5-4 8-4 8S3 8.5 3 5a4 4 0 014-4z"/><circle cx="7" cy="5" r="1.5"/></svg>
          <span>Contenedor · UPSA Bloque Central</span>
        </div>
        <h1 className="sc-title">Escaneá el QR del contenedor</h1>
        <p className="sc-sub">Solo el QR oficial de Verdex da acceso. Sin escanearlo no podés continuar.</p>
      </div>

      <div className={'qrs-frame' + (status === 'ok' ? ' ok' : status === 'wrong' ? ' bad' : '')}>
        {status !== 'error' && (
          <video ref={videoRef} className="qrs-video" playsInline muted autoPlay />
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {status !== 'error' && (
          <div className="qrs-corners"><span/><span/><span/><span/></div>
        )}

        <div className="qrs-hint" style={{ background: hint.color }}>
          {hint.text}
        </div>
      </div>

      <p className="qrs-lock-note">
        🔒 El acceso requiere el QR físico del contenedor Verdex.
      </p>

      <button className="sc-cancel" onClick={onClose}>Cancelar</button>
    </div>
  )
}

const MAT_ICONS = {
  pet: (
    <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="19" y="8" width="18" height="6" rx="3"/>
      <path d="M16 14h24v26a8 8 0 01-8 8h-8a8 8 0 01-8-8V14z"/>
      <path d="M16 22h24"/>
      <ellipse cx="28" cy="32" rx="6" ry="9" opacity="0.35"/>
    </svg>
  ),
  alu: (
    <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 14h20v5H18z" fill="currentColor" fillOpacity="0.15"/>
      <path d="M19 19h18v22a4 4 0 01-4 4H23a4 4 0 01-4-4V19z"/>
      <path d="M18 41h20v3a3 3 0 01-3 3H21a3 3 0 01-3-3v-3z" fill="currentColor" fillOpacity="0.15"/>
      <path d="M23 25h10M23 31h7" opacity="0.5"/>
    </svg>
  ),
  cart: (
    <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 14h36l-5 24H15L10 14z"/>
      <path d="M10 14 L8 8 H4"/>
      <path d="M20 14V10a8 8 0 0116 0v4"/>
      <circle cx="19" cy="44" r="3" fill="currentColor" fillOpacity="0.2"/>
      <circle cx="37" cy="44" r="3" fill="currentColor" fillOpacity="0.2"/>
    </svg>
  ),
  vid: (
    <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8h14v7l4 9v20a4 4 0 01-4 4H21a4 4 0 01-4-4V24l4-9V8z"/>
      <path d="M17 24h22"/>
      <path d="M21 8h14" strokeWidth="1"/>
      <ellipse cx="28" cy="34" rx="5" ry="8" opacity="0.25"/>
    </svg>
  ),
  tetra: (
    <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 14h24v8l3 5v17a3 3 0 01-3 3H16a3 3 0 01-3-3V27l3-5V14z"/>
      <path d="M13 22h30"/>
      <path d="M20 14v8h16V14"/>
      <path d="M22 30h12M22 36h8" opacity="0.5"/>
    </svg>
  ),
  mix: (
    <svg viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M28 8 C28 8 18 14 18 24 C18 34 28 48 28 48 C28 48 38 34 38 24 C38 14 28 8 28 8Z" opacity="0.2" fill="currentColor"/>
      <path d="M28 8 C28 8 18 14 18 24 C18 34 28 48 28 48 C28 48 38 34 38 24 C38 14 28 8 28 8Z"/>
      <path d="M18 24 Q28 20 38 24" opacity="0.6"/>
      <path d="M28 8v40" opacity="0.4"/>
    </svg>
  ),
}

export default function Scan({ state, onDeposit, onClose }) {
  const [step, setStep] = useState('scanning')
  const [sel, setSel] = useState('pet')
  const [qty, setQty] = useState(3)
  const [success, setSuccess] = useState(null)

  // No auto-advance — solo el QR correcto puede avanzar

  const mat = MATERIALS.find((m) => m.id === sel)
  const total = mat.ptsPerUnit * qty
  const kg = +(mat.kgPerUnit * qty).toFixed(2)

  const confirm = () => {
    const txn = {
      id: 'tx_' + Date.now(),
      type: 'deposit',
      label: `${qty} × ${mat.nm} · ${mat.sub}`,
      sub: `UPSA · ${new Date().toLocaleString('es-BO', { hour: '2-digit', minute: '2-digit' })}`,
      pts: total, ic: mat.ic, kg, ts: Date.now(),
    }
    onDeposit(txn)
    setSuccess(txn)
    setStep('success')
  }

  if (step === 'scanning') {
    return <QRScanner onDetect={() => setStep('select')} onClose={onClose} />
  }

  if (step === 'success' && success) {
    return (
      <div className="modal-veil">
        <div className="modal">
          <div className="modal-ic">✓</div>
          <h3>¡Depósito registrado!</h3>
          <p>{success.label}</p>
          <div className="pts-pop">+{success.pts.toLocaleString('es-BO')}<small>pts</small></div>
          <p style={{ marginTop: 8 }}>{success.kg} kg recuperados · UPSA Bloque Central</p>
          <button className="btn btn-primary btn-block" onClick={onClose} style={{ marginTop: 8 }}>Listo</button>
        </div>
      </div>
    )
  }

  return (
    <div className="sc-page">
      {/* Location */}
      <div className="sc-location">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M7 1a4 4 0 014 4c0 3.5-4 8-4 8S3 8.5 3 5a4 4 0 014-4z"/>
          <circle cx="7" cy="5" r="1.5"/>
        </svg>
        <span>Contenedor · UPSA Bloque Central</span>
      </div>

      {/* Title */}
      <h1 className="sc-title">¿Qué estás depositando?</h1>
      <p className="sc-sub">Seleccioná el tipo de material que vas a depositar para calcular tus puntos.</p>

      {/* Material grid */}
      <div className="sc-grid">
        {MATERIALS.slice(0, 6).map((m) => {
          const active = sel === m.id
          return (
            <button key={m.id} className={'sc-mat' + (active ? ' active' : '')} onClick={() => setSel(m.id)}>
              {active && (
                <div className="sc-check">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="7" fill="rgba(255,255,255,0.25)"/>
                    <path d="M3.5 7l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
              <div className="sc-mat-icon">{MAT_ICONS[m.id]}</div>
              <div className="sc-mat-nm">{m.nm}</div>
              <div className="sc-mat-pts">{m.ptsPerUnit} pts/u</div>
            </button>
          )
        })}
      </div>

      {/* Quantity */}
      <div className="sc-qty">
        <div className="sc-qty-label">
          <span className="sc-qty-title">Cantidad</span>
          <span className="sc-qty-sub">{mat.sub}</span>
        </div>
        <div className="sc-qty-controls">
          <button className="sc-qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
          <span className="sc-qty-val">{qty}</span>
          <button className="sc-qty-btn" onClick={() => setQty(Math.min(50, qty + 1))}>+</button>
        </div>
      </div>

      {/* Summary */}
      <div className="sc-summary">
        <div className="sc-summary-left">
          <div className="sc-summary-ic">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 17C3 17 5 8 14 5C14 5 14 12 9 15L3 17Z"/>
              <path d="M3 17L8 12" strokeOpacity="0.6"/>
            </svg>
          </div>
          <div>
            <div className="sc-summary-lbl">A sumar</div>
            <div className="sc-summary-detail">{kg} kg · {mat.nm}</div>
          </div>
        </div>
        <div className="sc-summary-pts">+{total.toLocaleString('es-BO')} <span>pts</span></div>
      </div>

      {/* Actions */}
      <button className="sc-confirm" onClick={confirm}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
          <path d="M3 17C3 17 5 8 14 5C14 5 14 12 9 15L3 17Z"/>
          <path d="M3 17L8 12" strokeOpacity="0.7"/>
        </svg>
        Confirmar depósito
      </button>
      <button className="sc-cancel" onClick={onClose}>Cancelar</button>
    </div>
  )
}
