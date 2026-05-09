import { useState, useEffect } from 'react'
import { MATERIALS } from '../../data/constants'

export default function Scan({ state, onDeposit, onClose }) {
  const [step, setStep] = useState("scanning")
  const [sel, setSel] = useState("pet")
  const [qty, setQty] = useState(3)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    if (step === "scanning") {
      const t = setTimeout(() => setStep("select"), 1700)
      return () => clearTimeout(t)
    }
  }, [step])

  const mat = MATERIALS.find((m) => m.id === sel)
  const total = mat.ptsPerUnit * qty
  const kg = +(mat.kgPerUnit * qty).toFixed(2)

  const confirm = () => {
    const txn = {
      id: "tx_" + Date.now(),
      type: "deposit",
      label: `${qty} × ${mat.nm} · ${mat.sub}`,
      sub: `UPSA · ${new Date().toLocaleString("es-BO", { hour: "2-digit", minute: "2-digit" })}`,
      pts: total,
      ic: mat.ic,
      kg,
      ts: Date.now(),
    }
    onDeposit(txn)
    setSuccess(txn)
    setStep("success")
  }

  if (step === "scanning") {
    return (
      <div className="scan">
        <div className="eyebrow">Escaneando contenedor</div>
        <h2>Acercá tu cámara al QR</h2>
        <div className="scan-frame">
          <div className="scan-corners"><i></i><i></i></div>
          <div className="scan-line"></div>
        </div>
        <p style={{ color: "var(--ink-3)", fontSize: 13 }}>Detectando código QR…</p>
        <button className="btn btn-ghost btn-block" onClick={onClose} style={{ marginTop: "auto" }}>Cancelar</button>
      </div>
    )
  }

  if (step === "success" && success) {
    return (
      <div className="modal-veil">
        <div className="modal">
          <div className="modal-ic">✓</div>
          <h3>¡Depósito registrado!</h3>
          <p>{success.label}</p>
          <div className="pts-pop">+{success.pts.toLocaleString("es-BO")}<small>pts</small></div>
          <p style={{ marginTop: 8 }}>{success.kg} kg recuperados · UPSA Bloque Central</p>
          <button className="btn btn-primary btn-block" onClick={onClose} style={{ marginTop: 8 }}>Listo</button>
        </div>
      </div>
    )
  }

  return (
    <div className="scan">
      <div className="eyebrow" style={{ alignSelf: "flex-start" }}>Contenedor · UPSA Bloque Central</div>
      <h2 style={{ alignSelf: "flex-start", textAlign: "left" }}>¿Qué estás depositando?</h2>

      <div className="scan-options" style={{ marginTop: 16 }}>
        {MATERIALS.slice(0, 6).map((m) => (
          <button key={m.id} className="scan-opt" data-on={sel === m.id} onClick={() => setSel(m.id)}>
            <span className="nm">{m.nm}</span>
            <span className="pts">{m.ptsPerUnit} pts/u</span>
          </button>
        ))}
      </div>

      <div className="qty-row">
        <span className="lbl">Cantidad</span>
        <div className="qty-controls">
          <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
          <span className="qty-val">{qty}</span>
          <button onClick={() => setQty(Math.min(50, qty + 1))}>+</button>
        </div>
      </div>

      <div className="scan-summary">
        <div>
          <div className="l">A sumar</div>
          <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--green-deep)", marginTop: 4 }}>
            {kg} kg · {mat.nm}
          </div>
        </div>
        <div className="r">+{total.toLocaleString("es-BO")}</div>
      </div>

      <button className="btn btn-primary btn-block" onClick={confirm}>Confirmar depósito</button>
      <button className="btn-link" onClick={onClose}>Cancelar</button>
    </div>
  )
}
