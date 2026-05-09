/* global React, ReactDOM */
const { useState, useEffect, useRef, useMemo } = React;

/* ==================== STORAGE ==================== */
const KEY = "verdex.user.v1";
const initialState = {
  signedIn: false,
  name: "",
  email: "",
  uni: "UPSA",
  points: 0,
  totalEarned: 0,
  kg: 0,
  txns: [], // {id, type, label, sub, pts, ts}
  redemptions: [], // {id, rewardId, name, pts, ts, code}
};
function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...initialState };
    return { ...initialState, ...JSON.parse(raw) };
  } catch { return { ...initialState }; }
}
function saveState(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {} }

/* ==================== DOMAIN DATA ==================== */
const MATERIALS = [
  { id: "pet", nm: "PET", sub: "Botella plástica", ptsPerUnit: 50, kgPerUnit: 0.04, ic: "PET" },
  { id: "alu", nm: "Aluminio", sub: "Lata", ptsPerUnit: 60, kgPerUnit: 0.015, ic: "AL" },
  { id: "cart", nm: "Cartón", sub: "Por kg", ptsPerUnit: 80, kgPerUnit: 1.0, ic: "CRT" },
  { id: "vid", nm: "Vidrio", sub: "Botella", ptsPerUnit: 40, kgPerUnit: 0.4, ic: "VID" },
  { id: "tetra", nm: "Tetra", sub: "Brik", ptsPerUnit: 30, kgPerUnit: 0.03, ic: "TT" },
  { id: "mix", nm: "Mixto", sub: "Por kg", ptsPerUnit: 35, kgPerUnit: 1.0, ic: "MX" },
];

const POINTS = [
  { id: "p1", nm: "UPSA · Bloque Central", meta: "Contenedor · 24/7", dist: "120 m", x: 28, y: 38 },
  { id: "p2", nm: "UPSA · Cafetería",       meta: "Contenedor · L–V 7–22", dist: "240 m", x: 52, y: 26 },
  { id: "p3", nm: "Hipermaxi Equipetrol",   meta: "Máquina inteligente", dist: "1.4 km", x: 72, y: 56 },
  { id: "p4", nm: "Fidalga 2do Anillo",     meta: "Máquina inteligente", dist: "2.1 km", x: 35, y: 72 },
  { id: "p5", nm: "Plaza Blacutt",          meta: "Espacio público · GAMSCS", dist: "3.0 km", x: 60, y: 80 },
  { id: "p6", nm: "Edificio Torre CAINCO",  meta: "Recolección B2B semanal", dist: "4.2 km", x: 18, y: 60 },
];

const REWARDS = [
  { id: "r1", nm: "Café americano gratis", partner: "Cafetería UPSA", cat: "Comida", pts: 150, ic: "C", color: "" },
  { id: "r2", nm: "Snack saludable 10% off", partner: "Aliado local", cat: "Comida", pts: 300, ic: "S", color: "" },
  { id: "r3", nm: "Vale Bs. 20 supermercado", partner: "Hipermaxi", cat: "Super", pts: 800, ic: "H", color: "ink" },
  { id: "r4", nm: "20% off entrada cine", partner: "MultiCine", cat: "Ocio", pts: 1500, ic: "M", color: "amber" },
  { id: "r5", nm: "Coca-Cola + envío gratis", partner: "Coca-Cola Bolivia", cat: "Bebidas", pts: 2000, ic: "K", color: "" },
  { id: "r6", nm: "Vale Bs. 100 compra total", partner: "Fidalga", cat: "Super", pts: 3500, ic: "F", color: "" },
  { id: "r7", nm: "Pack Pepsi familiar", partner: "Pepsi Bolivia", cat: "Bebidas", pts: 2400, ic: "P", color: "ink" },
  { id: "r8", nm: "Sorteo trimestral Verdex", partner: "Verdex", cat: "Sorteos", pts: 6000, ic: "V", color: "amber" },
  { id: "r9", nm: "Donación ONG ambiental", partner: "Red aliada", cat: "Impacto", pts: 1000, ic: "♥", color: "" },
];

const REWARD_CATS = ["Todos", "Comida", "Bebidas", "Super", "Ocio", "Sorteos", "Impacto"];

const LEVELS = [
  { id: "semilla", nm: "Semilla", min: 0, max: 500 },
  { id: "brote",   nm: "Brote",   min: 500, max: 2500 },
  { id: "arbol",   nm: "Árbol",   min: 2500, max: 10000 },
  { id: "bosque",  nm: "Bosque",  min: 10000, max: 100000 },
];
function levelFor(pts) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (pts >= LEVELS[i].min) return { ...LEVELS[i], idx: i };
  }
  return { ...LEVELS[0], idx: 0 };
}

/* ==================== ICONS ==================== */
const I = {
  home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  rewards: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 8h14v3H5zM6 11v9h12v-9M12 8v12M12 8c-2 0-4-1-4-3s2-2 3-1 1 4 1 4M12 8c2 0 4-1 4-3s-2-2-3-1-1 4-1 4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  scan: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 8V6a2 2 0 012-2h2M16 4h2a2 2 0 012 2v2M4 16v2a2 2 0 002 2h2M16 20h2a2 2 0 002-2v-2M7 12h10" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  map: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 4l-6 2v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7" strokeLinecap="round"/></svg>,
  bell: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 8a6 6 0 1112 0c0 7 3 8 3 8H3s3-1 3-8M10 21a2 2 0 004 0" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  arrow: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12l5 5 9-11" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  close: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M6 18L18 6" strokeLinecap="round"/></svg>,
  pin:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a7 7 0 017 7c0 5-7 13-7 13S5 14 5 9a7 7 0 017-7z" strokeLinejoin="round"/><circle cx="12" cy="9" r="2.5"/></svg>,
  qr: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 3h6v6H3zM15 3h6v6h-6zM3 15h6v6H3zM13 13h4M19 13v6M13 17v4M17 17h4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  trophy: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 4h8v6a4 4 0 01-8 0V4zM6 4H4v3a3 3 0 003 3M18 4h2v3a3 3 0 01-3 3M10 16h4v3h2l1 2H7l1-2h2v-3z" strokeLinejoin="round"/></svg>,
  leaf: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 19c0-9 6-15 15-15 0 9-6 15-15 15zM5 19l8-8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

/* ==================== ONBOARDING ==================== */
function Onboarding({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [uni, setUni] = useState("UPSA");
  const valid = name.trim().length >= 2 && /\S+@\S+\.\S+/.test(email);
  return (
    <div className="onb">
      <div className="onb-mark"></div>
      <div className="eyebrow">Verdex · App</div>
      <h1>Reciclá. Sumá. <em>Canjeá.</em></h1>
      <p>Crea tu cuenta para empezar a sumar puntos verdes con cada acción de reciclaje.</p>

      <form className="onb-form" onSubmit={(e) => { e.preventDefault(); if (valid) onSubmit({ name: name.trim(), email: email.trim(), uni }); }}>
        <div className="field">
          <label>Nombre</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" autoComplete="name" />
        </div>
        <div className="field">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" type="email" autoComplete="email" />
        </div>
        <div className="field">
          <label>Institución / Empresa</label>
          <select value={uni} onChange={(e) => setUni(e.target.value)}>
            <option>UPSA</option><option>UPB</option><option>UCB</option><option>UCEBOL</option>
            <option>Empresa privada</option><option>Particular</option>
          </select>
        </div>
        <button className="btn btn-primary btn-block" type="submit" disabled={!valid}>
          Crear cuenta y entrar
        </button>
        <button type="button" className="btn-link" onClick={() => onSubmit({ name: "Demo Verdex", email: "demo@verdex.bo", uni: "UPSA", seed: true })}>
          Probar con cuenta demo
        </button>
      </form>
    </div>
  );
}

/* ==================== HOME / DASHBOARD ==================== */
function Home({ state, go, openScan }) {
  const lv = levelFor(state.points);
  const next = LEVELS[Math.min(lv.idx + 1, LEVELS.length - 1)];
  const range = Math.max(1, lv.max - lv.min);
  const pct = Math.min(100, ((state.points - lv.min) / range) * 100);
  const recent = state.txns.slice(0, 5);

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
          <div className="ic">{I.qr}</div>
          <div className="nm">Escanear QR</div>
          <div className="desc">Depositar material</div>
        </button>
        <button className="quick-action" onClick={() => go("rewards")}>
          <div className="ic">{I.rewards}</div>
          <div className="nm">Canjear</div>
          <div className="desc">Catálogo de aliados</div>
        </button>
        <button className="quick-action" onClick={() => go("map")}>
          <div className="ic">{I.pin}</div>
          <div className="nm">Puntos cerca</div>
          <div className="desc">Contenedores y máquinas</div>
        </button>
        <button className="quick-action" onClick={() => go("levels")}>
          <div className="ic">{I.trophy}</div>
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
          Tocá <em>Escanear QR</em> para registrar tu primer depósito y sumar puntos verdes.
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
          const can = state.points >= r.pts;
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
          );
        })}
      </div>
    </div>
  );
}

/* ==================== SCAN ==================== */
function Scan({ state, onDeposit, onClose }) {
  const [step, setStep] = useState("scanning"); // scanning -> select -> success
  const [sel, setSel] = useState("pet");
  const [qty, setQty] = useState(3);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (step === "scanning") {
      const t = setTimeout(() => setStep("select"), 1700);
      return () => clearTimeout(t);
    }
  }, [step]);

  const mat = MATERIALS.find((m) => m.id === sel);
  const total = mat.ptsPerUnit * qty;
  const kg = +(mat.kgPerUnit * qty).toFixed(2);

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
    };
    onDeposit(txn);
    setSuccess(txn);
    setStep("success");
  };

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
    );
  }

  if (step === "success" && success) {
    return (
      <div className="modal-veil">
        <div className="modal">
          <div className="modal-ic">{I.check}</div>
          <h3>¡Depósito registrado!</h3>
          <p>{success.label}</p>
          <div className="pts-pop">+{success.pts.toLocaleString("es-BO")}<small>pts</small></div>
          <p style={{ marginTop: 8 }}>{success.kg} kg recuperados · UPSA Bloque Central</p>
          <button className="btn btn-primary btn-block" onClick={onClose} style={{ marginTop: 8 }}>Listo</button>
        </div>
      </div>
    );
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
  );
}

/* ==================== REWARDS ==================== */
function Rewards({ state, onRedeem }) {
  const [cat, setCat] = useState("Todos");
  const [confirm, setConfirm] = useState(null);
  const [success, setSuccess] = useState(null);

  const list = REWARDS
    .filter((r) => cat === "Todos" || r.cat === cat)
    .sort((a, b) => a.pts - b.pts);

  const doRedeem = (r) => {
    const code = "VDX-" + Math.random().toString(36).slice(2, 6).toUpperCase() + "-" + Math.random().toString(36).slice(2, 6).toUpperCase();
    const red = {
      id: "rd_" + Date.now(),
      rewardId: r.id,
      name: r.nm,
      partner: r.partner,
      pts: r.pts,
      ts: Date.now(),
      code,
      ic: r.ic,
    };
    onRedeem(red);
    setConfirm(null);
    setSuccess(red);
  };

  return (
    <div>
      <div className="page-title">Recompensas</div>
      <div className="page-sub">Canjeá tus puntos por beneficios reales en marcas aliadas.</div>

      <div className="filter-pills">
        {REWARD_CATS.map((c) => (
          <button key={c} className="filter-pill" data-on={cat === c} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>

      <div className="reward-grid">
        {list.map((r) => {
          const can = state.points >= r.pts;
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
          );
        })}
      </div>

      {confirm && (
        <div className="modal-veil" onClick={() => setConfirm(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-ic amber">{I.rewards}</div>
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
            <div className="modal-ic">{I.check}</div>
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
  );
}

/* ==================== MAP ==================== */
function MapPage() {
  const [active, setActive] = useState("p1");
  return (
    <div>
      <div className="page-title">Puntos cerca</div>
      <div className="page-sub">Contenedores Verdex, máquinas inteligentes y rutas de recolección.</div>

      <div className="map-stage">
        {POINTS.map((p) => (
          <button
            key={p.id}
            className="map-pin"
            data-active={active === p.id}
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
            onClick={() => setActive(p.id)}
          >{p.id.replace("p", "")}</button>
        ))}
      </div>

      <div className="point-list">
        {POINTS.map((p) => (
          <div key={p.id} className="point-row" data-active={active === p.id} onClick={() => setActive(p.id)}>
            <div className="point-ic">{I.pin}</div>
            <div>
              <div className="point-nm">{p.nm}</div>
              <div className="point-meta">{p.meta}</div>
            </div>
            <div className="point-dist">{p.dist}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==================== LEVELS PAGE ==================== */
function LevelsPage({ state }) {
  const lv = levelFor(state.points);
  const next = LEVELS[Math.min(lv.idx + 1, LEVELS.length - 1)];
  const range = Math.max(1, lv.max - lv.min);
  const pct = Math.min(100, ((state.points - lv.min) / range) * 100);

  return (
    <div>
      <div className="page-title">Tu nivel</div>
      <div className="page-sub">Cada acción te acerca al siguiente tier. Más nivel, más beneficios.</div>

      <div className="level-track">
        <div className="lbl">Nivel actual</div>
        <div className="nm">{lv.nm}</div>
        {lv.idx < LEVELS.length - 1 ? (
          <div className="next">{(next.min - state.points).toLocaleString("es-BO")} pts para {next.nm}</div>
        ) : (
          <div className="next">Nivel máximo alcanzado · Embajador Verdex</div>
        )}
        <div className="bar"><i style={{ width: `${pct}%` }}></i></div>
      </div>

      {LEVELS.map((l, i) => {
        const state_ =
          i < lv.idx ? "achieved" : i === lv.idx ? "current" : "locked";
        return (
          <div className="level-tier" data-state={state_} key={l.id}>
            <div className="level-tier-mark">{l.nm[0]}</div>
            <div>
              <div className="level-tier-nm">{l.nm}</div>
              <div className="level-tier-rng">
                {l.min.toLocaleString("es-BO")} – {l.max === 100000 ? "∞" : l.max.toLocaleString("es-BO")} pts
              </div>
            </div>
            <div className="level-tier-state">
              {state_ === "achieved" ? "Alcanzado" : state_ === "current" ? "Actual" : "Bloqueado"}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ==================== PROFILE ==================== */
function Profile({ state, onLogout, onReset }) {
  const initial = state.name?.[0]?.toUpperCase() || "V";
  const totalRedeemed = state.redemptions.reduce((s, r) => s + r.pts, 0);
  return (
    <div>
      <div className="page-title">Perfil</div>
      <div className="page-sub">Tu impacto acumulado en la red Verdex.</div>

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
          <div></div><span>Reiniciar progreso</span>{I.arrow}
        </button>
        <a className="menu-row" href="../Verdex.html">
          <div></div><span>Volver a la web Verdex</span>{I.arrow}
        </a>
        <button className="menu-row danger" onClick={onLogout}>
          <div></div><span>Cerrar sesión</span>{I.arrow}
        </button>
      </div>
    </div>
  );
}

/* ==================== SHELL ==================== */
function Shell() {
  const [state, setState] = useState(loadState);
  const [tab, setTab] = useState("home");
  const [scanOpen, setScanOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => { saveState(state); }, [state]);

  const fmtTime = () => {
    const d = new Date();
    return d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0");
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  if (!state.signedIn) {
    return (
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
          <div className="app-body" style={{ padding: 0 }}>
            <Onboarding onSubmit={({ name, email, uni, seed }) => {
              const next = {
                ...initialState,
                signedIn: true, name, email, uni,
                points: seed ? 3840 : 0,
                totalEarned: seed ? 4150 : 0,
                kg: seed ? 14.6 : 0,
                txns: seed ? [
                  { id: "t1", type: "deposit", label: "5 botellas PET · Cafetería", sub: "UPSA · Hoy 14:32", pts: 250, ic: "PET", ts: Date.now() - 3600000 },
                  { id: "t2", type: "deposit", label: "3 latas aluminio", sub: "Hipermaxi · Ayer", pts: 180, ic: "AL", ts: Date.now() - 86400000 },
                  { id: "t3", type: "deposit", label: "1.2 kg cartón · Oficina", sub: "Recolección B2B", pts: 420, ic: "CRT", ts: Date.now() - 2*86400000 },
                  { id: "t4", type: "deposit", label: "12 botellas PET", sub: "Plaza Blacutt · 3d", pts: 600, ic: "PET", ts: Date.now() - 3*86400000 },
                ] : [],
                redemptions: seed ? [
                  { id: "rd1", rewardId: "r1", name: "Café americano gratis", partner: "Cafetería UPSA", pts: 150, ts: Date.now() - 4*86400000, code: "VDX-A12B-CD34" },
                  { id: "rd2", rewardId: "r2", name: "Snack saludable 10% off", partner: "Aliado local", pts: 300, ts: Date.now() - 6*86400000, code: "VDX-XX99-YY01" },
                ] : [],
              };
              setState(next);
              setTab("home");
            }} />
          </div>
        </div>
      </div>
    );
  }

  /* deposit handler from Scan */
  const handleDeposit = (txn) => {
    setState((s) => ({
      ...s,
      points: s.points + txn.pts,
      totalEarned: s.totalEarned + txn.pts,
      kg: +(s.kg + (txn.kg || 0)).toFixed(2),
      txns: [txn, ...s.txns],
    }));
  };

  const handleRedeem = (red) => {
    setState((s) => ({
      ...s,
      points: s.points - red.pts,
      redemptions: [red, ...s.redemptions],
    }));
    showToast("Código guardado en tu historial");
  };

  const handleLogout = () => {
    if (confirm("¿Cerrar sesión? Se mantendrán tus datos.")) {
      setState((s) => ({ ...s, signedIn: false }));
      setTab("home");
    }
  };
  const handleReset = () => {
    if (confirm("¿Reiniciar progreso a cero? No se puede deshacer.")) {
      setState((s) => ({ ...s, points: 0, totalEarned: 0, kg: 0, txns: [], redemptions: [] }));
      showToast("Progreso reiniciado");
    }
  };

  const initial = state.name?.[0]?.toUpperCase() || "V";

  return (
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

        <div className="app-header">
          <div className="app-brand">
            <span className="app-brand-mark"></span>
            <span className="app-brand-text">Verdex</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="app-icon-btn" onClick={() => showToast("Notificaciones al día")}>{I.bell}</button>
            <button className="app-icon-btn avatar" onClick={() => setTab("profile")}>{initial}</button>
          </div>
        </div>

        <div className="app-body" key={tab}>
          {tab === "home" && <Home state={state} go={setTab} openScan={() => setScanOpen(true)} />}
          {tab === "rewards" && <Rewards state={state} onRedeem={handleRedeem} />}
          {tab === "map" && <MapPage />}
          {tab === "levels" && <LevelsPage state={state} />}
          {tab === "profile" && <Profile state={state} onLogout={handleLogout} onReset={handleReset} />}
        </div>

        {scanOpen && (
          <div style={{ position: "absolute", inset: 0, background: "var(--bg)", zIndex: 50, display: "flex", flexDirection: "column" }}>
            <div className="app-status">
              <span>{fmtTime()}</span>
              <span style={{display: "flex", gap: 6, alignItems: "center"}}>
                <span className="signal"><i></i><i></i><i></i><i></i></span>
                <span>5G</span><span>100%</span>
              </span>
            </div>
            <div className="app-header">
              <div className="app-brand">
                <span className="app-brand-mark"></span>
                <span className="app-brand-text">Depósito</span>
              </div>
              <button className="app-icon-btn" onClick={() => setScanOpen(false)}>{I.close}</button>
            </div>
            <div className="app-body" style={{ padding: "0 20px 24px" }}>
              <Scan state={state} onDeposit={handleDeposit} onClose={() => setScanOpen(false)} />
            </div>
          </div>
        )}

        <div className="app-tabbar">
          <button className="app-tab" data-on={tab === "home"} onClick={() => setTab("home")}>{I.home}<span>Inicio</span></button>
          <button className="app-tab" data-on={tab === "rewards"} onClick={() => setTab("rewards")}>{I.rewards}<span>Canjear</span></button>
          <button className="app-tab fab" onClick={() => setScanOpen(true)}>{I.scan}<span>Escanear</span></button>
          <button className="app-tab" data-on={tab === "map"} onClick={() => setTab("map")}>{I.map}<span>Puntos</span></button>
          <button className="app-tab" data-on={tab === "levels"} onClick={() => setTab("levels")}>{I.trophy}<span>Nivel</span></button>
        </div>

        {toast && <div className="toast">{toast}</div>}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Shell />);
