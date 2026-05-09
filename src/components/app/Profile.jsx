export default function Profile({ state, onLogout, onReset }) {
  const initial = state.name?.[0]?.toUpperCase() || "V"
  const totalRedeemed = state.redemptions.reduce((s, r) => s + r.pts, 0)
  return (
    <div>
      <div className="page-title">Perfil</div>
      <div className="page-sub">Tu impacto acumulado.</div>

      <div className="profile-card">
        <div className="profile-avatar">{initial}</div>
        <div className="profile-info">
          <div className="nm">{state.name}</div>
          <div className="em">{state.email} · {state.uni}</div>
        </div>
      </div>

      <div className="stat-row">
        <div className="stat-card">
          <div className="v">{state.totalEarned.toLocaleString("es-BO")}<small>pts</small></div>
          <div className="k">Total ganado</div>
        </div>
        <div className="stat-card">
          <div className="v">{state.kg.toFixed(1)}<small>kg</small></div>
          <div className="k">Reciclado</div>
        </div>
        <div className="stat-card">
          <div className="v">{state.redemptions.length}</div>
          <div className="k">Canjes</div>
        </div>
      </div>

      <div className="section-row">
        <h3>Historial completo</h3>
      </div>

      {state.txns.length === 0 && state.redemptions.length === 0 ? (
        <div className="empty">
          <strong>Sin movimientos aún</strong>
          Tu historial aparecerá acá apenas registres tu primer depósito.
        </div>
      ) : (
        <div className="txn-list">
          {[...state.txns, ...state.redemptions.map((r) => ({
            id: r.id, ic: "★", label: r.name, sub: `Canje · ${r.partner}`, pts: -r.pts, ts: r.ts,
          }))].sort((a, b) => b.ts - a.ts).slice(0, 30).map((t) => (
            <div className="txn-row" key={t.id}>
              <div className={"txn-ic" + (t.pts < 0 ? " minus" : "")}>{t.ic}</div>
              <div>
                <div className="txn-nm">{t.label}</div>
                <div className="txn-sub">{t.sub}</div>
              </div>
              <div className={"txn-pts" + (t.pts < 0 ? " minus" : "")}>
                {t.pts > 0 ? "+" : ""}{t.pts.toLocaleString("es-BO")}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="section-row">
        <h3>Cuenta</h3>
      </div>
      <div className="menu-list">
        <button className="menu-row" onClick={onReset}>
          <div></div><span>Reiniciar progreso</span>→
        </button>
        <button className="menu-row danger" onClick={onLogout}>
          <div></div><span>Cerrar sesión</span>→
        </button>
      </div>
    </div>
  )
}
