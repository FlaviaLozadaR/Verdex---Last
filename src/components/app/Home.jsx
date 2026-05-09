import { Icons } from '../Icons'
import { REWARDS, REWARD_CATS, levelFor, LEVELS } from '../../data/constants'

export default function Home({ state, go, openScan }) {
  const lv = levelFor(state.points)
  const next = LEVELS[Math.min(lv.idx + 1, LEVELS.length - 1)]
  const range = Math.max(1, lv.max - lv.min)
  const pct = Math.min(100, ((state.points - lv.min) / range) * 100)
  const recent = state.txns.slice(0, 5)

  return (
    <div>
      <div className="page-title" style={{ fontSize: 22, marginTop: 0 }}>
        Hola, <em style={{ fontStyle: "italic", color: "var(--green)" }}>{state.name.split(" ")[0]}</em>
      </div>
      <div className="page-sub">Bs. de impacto, kg de diferencia.</div>

      <div className="wallet-card">
        <div className="lbl">Puntos verdes</div>
        <div className="pts">{state.points.toLocaleString("es-BO")}<small>pts</small></div>
        <div className="lvl-row">
          <span className="lvl-name">{lv.nm}</span>
          {lv.idx < LEVELS.length - 1 ? (
            <span>{(next.min - state.points).toLocaleString("es-BO")} pts a {next.nm}</span>
          ) : (
            <span>Nivel máximo alcanzado</span>
          )}
        </div>
        <div className="lvl-bar"><i style={{ width: `${pct}%` }}></i></div>
      </div>

      <div className="quick-actions">
        <button className="quick-action" onClick={openScan}>
          <div className="ic">{Icons.scan}</div>
          <div className="nm">Escanear QR</div>
          <div className="desc">Depositar material</div>
        </button>
        <button className="quick-action" onClick={() => go("rewards")}>
          <div className="ic">{Icons.rewards}</div>
          <div className="nm">Canjear</div>
          <div className="desc">Catálogo de aliados</div>
        </button>
        <button className="quick-action" onClick={() => go("map")}>
          <div className="ic">{Icons.pin}</div>
          <div className="nm">Puntos cerca</div>
          <div className="desc">Contenedores y máquinas</div>
        </button>
        <button className="quick-action" onClick={() => go("levels")}>
          <div className="ic">{Icons.trophy}</div>
          <div className="nm">Tu nivel</div>
          <div className="desc">{lv.nm} · ranking</div>
        </button>
      </div>

      <div className="section-row">
        <h3>Actividad reciente</h3>
        {recent.length > 0 && <a className="more" href="#" onClick={(e) => { e.preventDefault(); go("profile"); }}>Ver todo</a>}
      </div>

      {recent.length === 0 ? (
        <div className="empty">
          <strong>Aún no hay actividad</strong>
          Tocá <em>Escanear QR</em> para registrar tu primer depósito.
        </div>
      ) : (
        <div className="txn-list">
          {recent.map((t) => (
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
        <h3>Recomendados</h3>
        <a className="more" href="#" onClick={(e) => { e.preventDefault(); go("rewards"); }}>Ver todo</a>
      </div>
      <div className="reward-grid">
        {REWARDS.slice(0, 3).map((r) => {
          const can = state.points >= r.pts
          return (
            <div className={"reward" + (can ? "" : " locked")} key={r.id} onClick={() => can && go("rewards")}>
              <div className="reward-logo" data-color={r.color}>{r.ic}</div>
              <div>
                <div className="reward-nm">{r.nm}</div>
                <div className="reward-partner">{r.partner}</div>
              </div>
              <div className="reward-cta">
                <div className={"reward-pts" + (can ? "" : " locked")}>{r.pts.toLocaleString("es-BO")} pts</div>
                <button className="reward-action" disabled={!can} onClick={(e) => { e.stopPropagation(); if (can) go("rewards"); }}>
                  {can ? "Canjear" : "Bloqueado"}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
