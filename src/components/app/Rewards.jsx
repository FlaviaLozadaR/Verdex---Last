import { useState } from 'react'
import { REWARDS, REWARD_CATS } from '../../data/constants'

export default function Rewards({ state, onRedeem }) {
  const [cat, setCat] = useState("Todos")
  const [confirm, setConfirm] = useState(null)
  const [success, setSuccess] = useState(null)

  const list = REWARDS
    .filter((r) => cat === "Todos" || r.cat === cat)
    .sort((a, b) => a.pts - b.pts)

  const doRedeem = (r) => {
    const code = "VDX-" + Math.random().toString(36).slice(2, 6).toUpperCase() + "-" + Math.random().toString(36).slice(2, 6).toUpperCase()
    const red = {
      id: "rd_" + Date.now(),
      rewardId: r.id,
      name: r.nm,
      partner: r.partner,
      pts: r.pts,
      ts: Date.now(),
      code,
      ic: r.ic,
    }
    onRedeem(red)
    setConfirm(null)
    setSuccess(red)
  }

  return (
    <div>
      <div className="page-title">Recompensas</div>
      <div className="page-sub">Canjeá tus puntos por beneficios reales.</div>

      <div className="filter-pills">
        {REWARD_CATS.map((c) => (
          <button key={c} className="filter-pill" data-on={cat === c} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      <div className="reward-grid">
        {list.map((r) => {
          const can = state.points >= r.pts
          return (
            <div className={"reward" + (can ? "" : " locked")} key={r.id}>
              <div className="reward-logo" data-color={r.color}>{r.ic}</div>
              <div>
                <div className="reward-nm">{r.nm}</div>
                <div className="reward-partner">{r.partner} · {r.cat}</div>
              </div>
              <div className="reward-cta">
                <div className={"reward-pts" + (can ? "" : " locked")}>{r.pts.toLocaleString("es-BO")} pts</div>
                <button className="reward-action" disabled={!can} onClick={() => setConfirm(r)}>
                  {can ? "Canjear" : `Faltan ${(r.pts - state.points).toLocaleString("es-BO")}`}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {confirm && (
        <div className="modal-veil" onClick={() => setConfirm(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-ic amber">🎁</div>
            <h3>Confirmar canje</h3>
            <p>{confirm.nm} · {confirm.partner}</p>
            <div className="pts-pop" style={{ color: "var(--amber-deep)" }}>−{confirm.pts.toLocaleString("es-BO")}<small>pts</small></div>
            <p>Saldo después del canje: {(state.points - confirm.pts).toLocaleString("es-BO")} pts</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <button className="btn btn-ghost" onClick={() => setConfirm(null)}>Cancelar</button>
              <button className="btn btn-primary" onClick={() => doRedeem(confirm)}>Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="modal-veil" onClick={() => setSuccess(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-ic">✓</div>
            <h3>¡Canjeado!</h3>
            <p>{success.name}</p>
            <div style={{
              margin: "16px 0", padding: "16px",
              border: "1px dashed var(--green)",
              borderRadius: 12, background: "var(--green-soft)",
              fontFamily: "var(--mono)", fontSize: 18, letterSpacing: "0.06em",
              color: "var(--green-deep)"
            }}>
              {success.code}
            </div>
            <p>Mostrá este código en {success.partner} para usar tu beneficio.</p>
            <button className="btn btn-primary btn-block" onClick={() => setSuccess(null)}>Listo</button>
          </div>
        </div>
      )}
    </div>
  )
}
