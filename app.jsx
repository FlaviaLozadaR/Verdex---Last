/* global React, ReactDOM */
const { useState, useEffect, useRef, useMemo } = React;

/* ==================== NAV ==================== */
function Nav() {
  return (
    <nav className="nav">
      <div className="container nav-row">
        <a href="#top" className="brand">
          <span className="brand-mark"></span>
          <span>Verdex</span>
        </a>
        <div className="nav-links">
          <a href="#modelo">Modelo</a>
          <a href="#canales">Canales</a>
          <a href="#niveles">Niveles</a>
          <a href="#mercado">Mercado</a>
          <a href="#inversion">Inversión</a>
          <a href="app/index.html" className="nav-cta">
            <span className="dot"></span>
            Abrir app
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ==================== HERO ==================== */
function Hero() {
  return (
    <header id="top" className="hero">
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="eyebrow">Feria de Innovación y Emprendimiento · UPSA 2026</div>
            <h1>
              Reciclar deja<br />
              de no <em>convenir.</em>
            </h1>
          </div>
          <div className="hero-aside">
            <div className="hero-stat">98<sup>%</sup></div>
            <p>
              Tasa de retorno del sistema <strong>Pfand alemán</strong> — el modelo
              que inspira a Verdex. Lo adaptamos a Bolivia con alianzas comerciales
              locales como motor económico.
            </p>
          </div>
        </div>

        <p className="hero-sub">
          Verdex es la primera plataforma híbrida en Bolivia que combina
          contenedores físicos, máquinas inteligentes y una app de recompensas en
          un solo ecosistema circular. Cada acción verde se convierte en puntos
          canjeables por descuentos reales en empresas afiliadas.
        </p>

        <div className="hero-meta">
          <a href="app/index.html" className="btn btn-primary">
            Abrir la app Verdex
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <a href="#modelo" className="btn btn-ghost">Ver el modelo</a>
        </div>

        <div className="ticker">
          <div className="ticker-track">
            <span>Universidades</span><span>Supermercados</span><span>Empresas</span>
            <span>Municipios</span><span>App móvil</span><span>Máquinas inteligentes</span>
            <span>Vales canjeables</span><span>Materia prima a industria</span>
            <span>Universidades</span><span>Supermercados</span><span>Empresas</span>
            <span>Municipios</span><span>App móvil</span><span>Máquinas inteligentes</span>
            <span>Vales canjeables</span><span>Materia prima a industria</span>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ==================== PROBLEM ==================== */
function Problem() {
  return (
    <section id="problema" className="problem">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">El problema</div>
          </div>
          <div>
            <h2>
              No es falta de conciencia.<br />
              Es falta de <em>incentivo.</em>
            </h2>
            <p className="lede">
              En Bolivia, reciclar un kilo de cartón rinde Bs. 1,20. Ese precio no
              mueve a nadie. Verdex reemplaza el incentivo mínimo con un ecosistema
              de recompensas reales — descuentos, vales y beneficios canjeables.
            </p>
          </div>
        </div>

        <div className="problem-grid">
          <div className="compare before">
            <div className="label">Mercado actual</div>
            <div className="price">Bs. 1,20<small>/ kg de cartón</small></div>
            <p>
              Recicladoras tradicionales compran material a precios mínimos.
              <strong> Sin app, sin recompensas, sin red.</strong> El usuario no
              percibe valor — y por eso no participa.
            </p>
          </div>
          <div className="compare after">
            <div className="label">Modelo Verdex</div>
            <div className="price">Recompensa<small>real y canjeable</small></div>
            <p>
              Cada envase se traduce en <strong>puntos verdes</strong> en la app, que se
              canjean por descuentos en marcas aliadas. El incentivo deja de ser
              moral — pasa a ser económico.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==================== CHANNELS ==================== */
const CHANNELS = [
  {
    id: "uni",
    short: "Universidades",
    title: "Contenedores en campus con registro vía QR.",
    body: "UPSA, UPB, UCB, UCEBOL como mercado piloto. Comunidades cerradas, alto consumo de bebidas envasadas y apertura a iniciativas de impacto. El estudiante escanea el QR, deposita el envase y suma puntos al instante.",
    stats: [
      { k: "Costo unidad", v: "USD 30–60" },
      { k: "Fase piloto", v: "80–120" },
      { k: "Hábito", v: "Diario" },
    ],
    visual: "Render contenedor universidad",
  },
  {
    id: "emp",
    short: "Empresas",
    title: "Recolección semanal remunerada con certificado.",
    body: "Servicio B2B para oficinas, embotelladoras y comercios con generación regular de reciclables. Verdex retira el material, lo pesa, lo registra y entrega un certificado de sostenibilidad mensual válido para reportes RSE.",
    stats: [
      { k: "Frecuencia", v: "Semanal" },
      { k: "Modelo", v: "Suscripción" },
      { k: "Entregable", v: "Certificado" },
    ],
    visual: "Foto operativo recolección B2B",
  },
  {
    id: "pub",
    short: "Espacios públicos",
    title: "Alianzas con municipios para cobertura ciudad.",
    body: "Segundo anillo de expansión. Contenedores Verdex en parques, paseos y avenidas en convenio con la alcaldía. Permite que recolectores informales sin smartphone también participen — vía tickets físicos.",
    stats: [
      { k: "Aliado", v: "GAMSCS" },
      { k: "Acceso", v: "Universal" },
      { k: "Fase", v: "2" },
    ],
    visual: "Mapa puntos urbanos",
  },
  {
    id: "sup",
    short: "Supermercados",
    title: "Máquinas inteligentes con tickets físicos y digitales.",
    body: "Hipermaxi, Fidalga, 3B. La máquina identifica el envase por código de barras, lo pesa, lo compacta y emite un ticket — físico para clientes sin app, digital para los que sí. El supermercado gana tráfico; el cliente gana descuentos en su próxima compra.",
    stats: [
      { k: "Inversión", v: "USD 4–6k" },
      { k: "Por punto", v: "1–2 unid" },
      { k: "Ticket", v: "Físico + QR" },
    ],
    visual: "Render máquina inteligente",
  },
];

function Channels() {
  const [active, setActive] = useState(0);
  const c = CHANNELS[active];
  return (
    <section id="canales">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="eyebrow">Cuatro canales · Un ecosistema</div>
          </div>
          <div>
            <h2>El sistema opera <em>donde la gente ya está.</em></h2>
            <p className="lede">
              Universidades, empresas, espacios públicos y comercios. Tanto un
              universitario con smartphone como un recolector informal sin app
              pueden participar del ecosistema.
            </p>
          </div>
        </div>

        <div className="channels-tabs" role="tablist">
          {CHANNELS.map((ch, i) => (
            <button
              key={ch.id}
              className="channel-tab"
              data-active={i === active}
              onClick={() => setActive(i)}
              role="tab"
            >
              <span className="num">CANAL · 0{i+1}</span>
              <span className="nm">{ch.short}</span>
            </button>
          ))}
        </div>

        <div className="channel-panel">
          <div className="channel-copy">
            <div className="eyebrow">Canal 0{active+1} · {c.short}</div>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
            <div className="channel-stats">
              {c.stats.map((s, i) => (
                <div key={i}>
                  <div className="k">{s.k}</div>
                  <div className="v">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="channel-visual">
            <div className="placeholder" style={{position:"absolute", inset:0}}>
              <span>{c.visual}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==================== LEVELS ==================== */
const LEVELS = [
  {
    id: "semilla", nm: "Semilla", rng: "0 – 500 PTS",
    desc: "El punto de partida. Con tus primeras acciones desbloqueás el catálogo básico de beneficios — café gratis, snacks y cupones de bienvenida en marcas aliadas.",
    benefits: [
      { pts: "150 PTS", nm: "Café gratis en campus", partner: "Cafetería UPSA" },
      { pts: "300 PTS", nm: "10% off en snack saludable", partner: "Aliado local" },
      { pts: "500 PTS", nm: "Cupón cumple Verdex", partner: "Verdex" },
    ],
  },
  {
    id: "brote", nm: "Brote", rng: "500 – 2.500 PTS",
    desc: "Beneficios que ya hacen la diferencia. Acceso a vales en supermercados aliados y descuentos progresivos en restaurantes y servicios de la red Verdex.",
    benefits: [
      { pts: "800 PTS", nm: "Vale Bs. 20 en supermercado", partner: "Hipermaxi" },
      { pts: "1.500 PTS", nm: "20% off en cine", partner: "MultiCine" },
      { pts: "2.000 PTS", nm: "Bebida + envío gratis", partner: "Coca-Cola Bolivia" },
    ],
  },
  {
    id: "arbol", nm: "Árbol", rng: "2.500 – 10.000 PTS",
    desc: "Reciclás de forma constante. Acceso a ofertas de mayor valor, sorteos exclusivos y la posibilidad de transferir puntos a una causa o ONG ambiental.",
    benefits: [
      { pts: "3.500 PTS", nm: "Vale Bs. 100 en compra", partner: "Fidalga" },
      { pts: "6.000 PTS", nm: "Entrada a sorteo trimestral", partner: "Verdex" },
      { pts: "10.000 PTS", nm: "Donación a ONG ambiental", partner: "Red aliada" },
    ],
  },
  {
    id: "bosque", nm: "Bosque", rng: "10.000+ PTS",
    desc: "Embajador del ecosistema. Beneficios premium, acceso anticipado a nuevas alianzas, y reconocimiento público en el ranking ciudad. El nivel para los que cambian la regla.",
    benefits: [
      { pts: "12.000 PTS", nm: "Voucher de viaje regional", partner: "Aliado turismo" },
      { pts: "20.000 PTS", nm: "Tech embajador del año", partner: "Verdex" },
      { pts: "—", nm: "Reconocimiento público", partner: "Ranking ciudad" },
    ],
  },
];

function Levels() {
  const [active, setActive] = useState(2);
  const l = LEVELS[active];
  const fillPct = ((active + 1) / LEVELS.length) * 100;
  return (
    <section id="niveles" className="levels section-themed">
      <div className="container">
        <div className="section-head">
          <div><div className="eyebrow">Gamificación · App Verdex</div></div>
          <div>
            <h2>Cuatro niveles. <em>Una sola misión.</em></h2>
            <p className="lede">
              Cada acción registrada eleva tu nivel — Semilla, Brote, Árbol, Bosque.
              Con cada paso desbloqueás recompensas más valiosas y subís en el
              ranking ciudad.
            </p>
          </div>
        </div>

        <div className="level-progress">
          <div className="level-track">
            <div className="level-fill" style={{ width: `${fillPct}%` }}></div>
          </div>
          <div className="level-nodes">
            {LEVELS.map((lv, i) => (
              <button
                key={lv.id}
                className="level-node"
                data-on={i <= active}
                onClick={() => setActive(i)}
              >
                <div className="nm">{lv.nm}</div>
                <div className="rng">{lv.rng}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="level-detail">
          <div>
            <div className="eyebrow">Nivel {active+1} de 4</div>
            <h3 style={{marginTop: 14}}>{l.nm}</h3>
            <p>{l.desc}</p>
          </div>
          <ul className="benefit-list">
            {l.benefits.map((b, i) => (
              <li key={i}>
                <div className="pts">{b.pts}</div>
                <div className="nm">{b.nm}</div>
                <div className="partner">{b.partner}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ==================== APP / WALLET ==================== */
function AppSection() {
  const transactions = [
    { ic: "PET", nm: "5 botellas PET · UPSA", sub: "QR · Hoy 14:32", pts: "+250" },
    { ic: "AL", nm: "3 latas aluminio", sub: "Hipermaxi · Ayer", pts: "+180" },
    { ic: "★", nm: "Canje · Café cafetería", sub: "Cupón · 2 días", pts: "−150" },
    { ic: "CRT", nm: "1.2kg cartón · Oficina", sub: "Recolección semanal", pts: "+420" },
  ];
  return (
    <section id="modelo">
      <div className="container">
        <div className="section-head">
          <div><div className="eyebrow">La app</div></div>
          <div>
            <h2>Wallet de puntos verdes.<br/><em>Historial de impacto.</em></h2>
            <p className="lede">
              Una sola app para escanear, sumar puntos, canjear vales y ver tu
              huella real — kilogramos reciclados, descuentos conseguidos y tu
              posición en el ranking.
            </p>
          </div>
        </div>

        <div className="app">
          <div className="app-copy">
            <ol className="flow-steps">
              <li>
                <div className="n serif">01</div>
                <div>
                  <h4>Depositás</h4>
                  <p>En un contenedor del campus, una máquina del super o vía recolección de tu empresa.</p>
                </div>
              </li>
              <li>
                <div className="n serif">02</div>
                <div>
                  <h4>Se registra</h4>
                  <p>QR para usuarios con app, ticket físico para los que no — el sistema es universal.</p>
                </div>
              </li>
              <li>
                <div className="n serif">03</div>
                <div>
                  <h4>Sumás puntos</h4>
                  <p>Los puntos verdes se acreditan al instante en tu wallet con detalle del material y la cantidad.</p>
                </div>
              </li>
              <li>
                <div className="n serif">04</div>
                <div>
                  <h4>Canjeás</h4>
                  <p>Descuentos en marcas aliadas, vales de consumo y beneficios canjeables — el incentivo es real.</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="phone-stage">
            <div className="phone">
              <div className="phone-screen">
                <div className="app-card wallet">
                  <div className="lbl">Tu wallet</div>
                  <div className="pts">3.840<small>pts</small></div>
                  <div className="lvl">
                    <span>Árbol</span>
                    <span>6.160 pts a Bosque</span>
                  </div>
                  <div className="lvl-bar"><div></div></div>
                </div>
                <div className="app-card">
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 10}}>
                    <span style={{fontFamily:"var(--mono)", fontSize: 10, letterSpacing: "0.14em", textTransform:"uppercase", color:"var(--ink-3)"}}>Actividad</span>
                    <span style={{fontFamily:"var(--mono)", fontSize: 10, color:"var(--ink-3)"}}>Esta semana</span>
                  </div>
                  <div style={{display:"flex", flexDirection:"column", gap: 10}}>
                    {transactions.map((t, i) => (
                      <div className="txn" key={i}>
                        <div className="txn-ic">{t.ic}</div>
                        <div>
                          <div className="txn-nm">{t.nm}</div>
                          <div className="txn-sub">{t.sub}</div>
                        </div>
                        <div className="txn-pts">{t.pts}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==================== MARKET ==================== */
function Market() {
  const phases = [
    {
      n: "FASE 01", h: "Santa Cruz · Piloto",
      p: "Universidades privadas como canal de validación rápida. Comunidades cerradas con hábito de consumo de bebidas envasadas y apertura a impacto.",
      tags: ["UPSA", "UPB", "UCB", "UCEBOL", "Hipermaxi", "Fidalga", "3B"],
    },
    {
      n: "FASE 02", h: "Expansión departamental",
      p: "Espacios públicos en convenio con el municipio. Cobertura ciudad para incluir a recolectores informales y duplicar volumen.",
      tags: ["GAM Santa Cruz", "Espacios públicos", "Empresas privadas"],
    },
    {
      n: "FASE 03", h: "Eje troncal",
      p: "La Paz y Cochabamba. Replicar la lógica con instituciones, comercios y recolección semanal — vendiendo material consolidado a industria local.",
      tags: ["La Paz", "Cochabamba", "Industria nacional"],
    },
  ];

  return (
    <section id="mercado" className="market">
      <div className="container">
        <div className="section-head">
          <div><div className="eyebrow">Mercado y expansión</div></div>
          <div>
            <h2>De Santa Cruz al <em>eje troncal.</em></h2>
            <p className="lede">
              El modelo replica en cualquier ciudad con la misma lógica:
              contenedores en instituciones, máquinas en comercios, recolección
              semanal y venta a industria local.
            </p>
          </div>
        </div>

        <div className="phases">
          {phases.map((ph, i) => (
            <div className="phase" key={i}>
              <div className="num">{ph.n}</div>
              <h3>{ph.h}</h3>
              <p>{ph.p}</p>
              <div className="where">
                {ph.tags.map((t, j) => <span key={j} className="tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>

        <div className="partners">
          <div className="partners-row">
            <div className="label">Universidades piloto</div>
            <div className="partner-pills">
              <span className="partner-pill">UPSA</span>
              <span className="partner-pill">UPB</span>
              <span className="partner-pill">UCB</span>
              <span className="partner-pill">UCEBOL</span>
            </div>
          </div>
          <div className="partners-row">
            <div className="label">Supermercados objetivo</div>
            <div className="partner-pills">
              <span className="partner-pill">Hipermaxi</span>
              <span className="partner-pill">Fidalga</span>
              <span className="partner-pill">3B</span>
            </div>
          </div>
          <div className="partners-row">
            <div className="label">Marcas de consumo masivo</div>
            <div className="partner-pills">
              <span className="partner-pill">Coca-Cola Bolivia</span>
              <span className="partner-pill">Pepsi</span>
              <span className="partner-pill">Mendocina</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==================== INVESTMENT ==================== */
const INVEST = [
  { nm: "Contenedores físicos Verdex", note: "80–120 unidades, fase piloto", lo: 3000, hi: 5000 },
  { nm: "Desarrollo de app y plataforma", note: "Móvil + dashboard de operación", lo: 4000, hi: 6000 },
  { nm: "Máquinas inteligentes", note: "1–2 unidades para puntos de alto volumen", lo: 4000, hi: 6000 },
  { nm: "Equipo de recolección y logística", note: "3 meses operativos", lo: 2400, hi: 3600 },
  { nm: "Desarrollo comercial y alianzas", note: "3 meses, incorporación de aliados", lo: 1600, hi: 2400 },
  { nm: "Capital de trabajo", note: "3 meses runway", lo: 2000, hi: 3000 },
];

function Investment() {
  const [scenario, setScenario] = useState("hi"); // 'lo' | 'hi'
  const total = useMemo(() => INVEST.reduce((s, r) => s + r[scenario], 0), [scenario]);
  const max = Math.max(...INVEST.map(r => r[scenario]));

  return (
    <section id="inversion">
      <div className="container">
        <div className="section-head">
          <div><div className="eyebrow">Modelo de ingresos · Inversión</div></div>
          <div>
            <h2>Tres flujos. <em>Ingreso desde el primer mes.</em></h2>
            <p className="lede">
              La venta de material reciclado a industrias manufactureras genera
              ingreso desde que los primeros contenedores empiezan a llenarse — no
              hace falta esperar a que la app escale para que el modelo sea viable.
            </p>
          </div>
        </div>

        <div className="revenue-grid">
          <div className="rev-card">
            <div className="pct">B2B</div>
            <h4>Servicio de recolección</h4>
            <p>Empresas privadas pagan una cuota mensual por la recolección semanal y el certificado de sostenibilidad.</p>
            <div className="stream">Ingreso recurrente</div>
          </div>
          <div className="rev-card">
            <div className="pct">5–10%</div>
            <h4>Comisión por vale canjeado</h4>
            <p>Aliados comerciales aportan una comisión sobre cada cupón canjeado por usuarios en su negocio.</p>
            <div className="stream">Ingreso transaccional</div>
          </div>
          <div className="rev-card">
            <div className="pct">Bulk</div>
            <h4>Venta de materia prima</h4>
            <p>Material consolidado (PET, aluminio, cartón) vendido como insumo a industrias manufactureras locales.</p>
            <div className="stream">Ingreso principal · Mes 1</div>
          </div>
        </div>

        <div className="invest">
          <div className="invest-head">
            <h3>Inversión estimada · Fase piloto</h3>
            <div className="invest-total">
              <div className="lbl">Total</div>
              <div className="v">USD {total.toLocaleString("es-BO")}<small> /piloto</small></div>
            </div>
          </div>

          <div className="invest-toggle">
            <span style={{color:"var(--ink-3)", marginRight: 12}}>Escenario</span>
            <button data-on={scenario === "lo"} onClick={() => setScenario("lo")}>Mínimo</button>
            <button data-on={scenario === "hi"} onClick={() => setScenario("hi")}>Máximo</button>
            <div className="gap"></div>
            <span style={{color:"var(--ink-3)"}}>USD 17.000 – 26.000</span>
          </div>

          <div className="invest-rows">
            {INVEST.map((r, i) => (
              <div className="invest-row" key={i}>
                <div className="idx mono">0{i+1}</div>
                <div>
                  <div className="nm">{r.nm}</div>
                  <div className="mono" style={{fontSize: 12, color:"var(--ink-3)", marginTop: 2}}>{r.note}</div>
                </div>
                <div className="bar"><i style={{ width: `${(r[scenario] / max) * 100}%` }}></i></div>
                <div className="amt">USD {r[scenario].toLocaleString("es-BO")}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==================== IMPACT ==================== */
function useCount(target, run) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf, start;
    const dur = 1600;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return v;
}

function Metric({ value, suffix, label, run, format = (v) => Math.round(v).toLocaleString("es-BO") }) {
  const v = useCount(value, run);
  return (
    <div className="metric">
      <div className="v">{format(v)}<small>{suffix}</small></div>
      <div className="k">{label}</div>
    </div>
  );
}

function Impact() {
  const ref = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setRun(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="impacto" className="impact" ref={ref}>
      <div className="container">
        <div className="section-head">
          <div><div className="eyebrow">Impacto medible</div></div>
          <div>
            <h2>Métricas concretas. <em>Indicadores sólidos.</em></h2>
            <p className="lede">
              Para el jurado, inversores y fondos concursables — toneladas
              recuperadas, usuarios activos, empresas afiliadas y puntos canjeados
              son métricas verificables, no narrativa.
            </p>
          </div>
        </div>

        <div className="metrics">
          <Metric value={120} suffix="+" label="Contenedores piloto" run={run} />
          <Metric value={4} suffix=" canales" label="Físicos + digitales" run={run} />
          <Metric value={98} suffix="%" label="Tasa retorno (referencia Pfand)" run={run} />
          <Metric value={26000} suffix=" USD" label="Inversión techo" run={run} />
        </div>

        <div className="differential">
          <h3>Lo que nos hace <em>diferentes.</em></h3>
          <ul className="diff-list">
            <li><span className="check">+</span><span>Único modelo en Bolivia que combina infraestructura física + app + red de alianzas comerciales en un solo ecosistema.</span></li>
            <li><span className="check">+</span><span>Incentivo económico real, no moral. La universalidad — cualquier envase, cualquier aliado — lo hace escalable sin depender de una sola marca.</span></li>
            <li><span className="check">+</span><span>Atiende dos perfiles a la vez: el universitario con smartphone y el recolector informal sin app.</span></li>
            <li><span className="check">+</span><span>Modelo de ingresos desde el primer mes — no depende de escala de la app para ser viable.</span></li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ==================== CTA / FOOTER ==================== */
function CTA() {
  return (
    <section id="contacto" className="cta">
      <div className="container">
        <h2>Sumate al primer ecosistema circular <em>de Bolivia.</em></h2>
        <p>
          Universidades, supermercados, embotelladoras, municipios y marcas de
          consumo — Verdex es una red, y crece con cada nuevo aliado.
        </p>
        <div className="cta-btns">
          <a href="app/index.html" className="btn btn-primary">Empezar a reciclar</a>
          <a href="mailto:hola@verdex.bo" className="btn btn-ghost">Quiero ser aliado</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="foot-grid">
          <div className="foot">
            <div className="foot-brand">Verdex</div>
            <p>Plataforma híbrida de reciclaje con sistema de recompensas. Santa Cruz de la Sierra, Bolivia.</p>
          </div>
          <div className="foot">
            <h5>Modelo</h5>
            <ul>
              <li><a href="#canales">Canales</a></li>
              <li><a href="#niveles">Niveles</a></li>
              <li><a href="#modelo">App</a></li>
              <li><a href="#inversion">Inversión</a></li>
            </ul>
          </div>
          <div className="foot">
            <h5>Aliados</h5>
            <ul>
              <li><a href="#">Universidades</a></li>
              <li><a href="#">Supermercados</a></li>
              <li><a href="#">Empresas</a></li>
              <li><a href="#">Municipios</a></li>
            </ul>
          </div>
          <div className="foot">
            <h5>Contacto</h5>
            <ul>
              <li><a href="mailto:hola@verdex.bo">hola@verdex.bo</a></li>
              <li><a href="#">Santa Cruz, Bolivia</a></li>
              <li><a href="#">Prensa</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-base">
          <span>© 2026 Verdex · UPSA Feria de Innovación</span>
          <span>Inspirado en el sistema Pfand alemán</span>
        </div>
      </div>
    </footer>
  );
}

/* ==================== APP ==================== */
function App() {
  // simple reveal-on-scroll
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <Problem />
      <Channels />
      <Levels />
      <AppSection />
      <Market />
      <Investment />
      <Impact />
      <CTA />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
