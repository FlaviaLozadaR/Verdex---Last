export const MATERIALS = [
  { id: "pet", nm: "PET", sub: "Botella plástica", ptsPerUnit: 50, kgPerUnit: 0.04, ic: "PET" },
  { id: "alu", nm: "Aluminio", sub: "Lata", ptsPerUnit: 60, kgPerUnit: 0.015, ic: "AL" },
  { id: "cart", nm: "Cartón", sub: "Por kg", ptsPerUnit: 80, kgPerUnit: 1.0, ic: "CRT" },
  { id: "vid", nm: "Vidrio", sub: "Botella", ptsPerUnit: 40, kgPerUnit: 0.4, ic: "VID" },
  { id: "tetra", nm: "Tetra", sub: "Brik", ptsPerUnit: 30, kgPerUnit: 0.03, ic: "TT" },
  { id: "mix", nm: "Mixto", sub: "Por kg", ptsPerUnit: 35, kgPerUnit: 1.0, ic: "MX" },
]

export const POINTS = [
  { id: "p1", nm: "UPSA · Bloque Central", meta: "Contenedor · 24/7", dist: "120 m", x: 28, y: 38 },
  { id: "p2", nm: "UPSA · Cafetería",       meta: "Contenedor · L–V 7–22", dist: "240 m", x: 52, y: 26 },
  { id: "p3", nm: "Hipermaxi Equipetrol",   meta: "Máquina inteligente", dist: "1.4 km", x: 72, y: 56 },
  { id: "p4", nm: "Fidalga 2do Anillo",     meta: "Máquina inteligente", dist: "2.1 km", x: 35, y: 72 },
  { id: "p5", nm: "Plaza Blacutt",          meta: "Espacio público · GAMSCS", dist: "3.0 km", x: 60, y: 80 },
  { id: "p6", nm: "Edificio Torre CAINCO",  meta: "Recolección B2B semanal", dist: "4.2 km", x: 18, y: 60 },
]

export const REWARDS = [
  { id: "r1", nm: "Café americano gratis", partner: "Cafetería UPSA", cat: "Comida", pts: 150, ic: "C", color: "" },
  { id: "r2", nm: "Snack saludable 10% off", partner: "Aliado local", cat: "Comida", pts: 300, ic: "S", color: "" },
  { id: "r3", nm: "Vale Bs. 20 supermercado", partner: "Hipermaxi", cat: "Super", pts: 800, ic: "H", color: "ink" },
  { id: "r4", nm: "20% off entrada cine", partner: "MultiCine", cat: "Ocio", pts: 1500, ic: "M", color: "amber" },
  { id: "r5", nm: "Coca-Cola + envío gratis", partner: "Coca-Cola Bolivia", cat: "Bebidas", pts: 2000, ic: "K", color: "" },
  { id: "r6", nm: "Vale Bs. 100 compra total", partner: "Fidalga", cat: "Super", pts: 3500, ic: "F", color: "" },
  { id: "r7", nm: "Pack Pepsi familiar", partner: "Pepsi Bolivia", cat: "Bebidas", pts: 2400, ic: "P", color: "ink" },
  { id: "r8", nm: "Sorteo trimestral Verdex", partner: "Verdex", cat: "Sorteos", pts: 6000, ic: "V", color: "amber" },
  { id: "r9", nm: "Donación ONG ambiental", partner: "Red aliada", cat: "Impacto", pts: 1000, ic: "♥", color: "" },
]

export const REWARD_CATS = ["Todos", "Comida", "Bebidas", "Super", "Ocio", "Sorteos", "Impacto"]

export const LEVELS = [
  { id: "semilla", nm: "Semilla", min: 0, max: 500 },
  { id: "brote",   nm: "Brote",   min: 500, max: 2500 },
  { id: "arbol",   nm: "Árbol",   min: 2500, max: 10000 },
  { id: "bosque",  nm: "Bosque",  min: 10000, max: 100000 },
]

export function levelFor(pts) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (pts >= LEVELS[i].min) return { ...LEVELS[i], idx: i }
  }
  return { ...LEVELS[0], idx: 0 }
}

export const CHANNELS = [
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
]

export const LANDING_LEVELS = [
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
]

export const INVEST = [
  { nm: "Contenedores físicos Verdex", note: "80–120 unidades, fase piloto", lo: 3000, hi: 5000 },
  { nm: "Desarrollo de app y plataforma", note: "Móvil + dashboard de operación", lo: 4000, hi: 6000 },
  { nm: "Máquinas inteligentes", note: "1–2 unidades para puntos de alto volumen", lo: 4000, hi: 6000 },
  { nm: "Equipo de recolección y logística", note: "3 meses operativos", lo: 2400, hi: 3600 },
  { nm: "Desarrollo comercial y alianzas", note: "3 meses, incorporación de aliados", lo: 1600, hi: 2400 },
  { nm: "Capital de trabajo", note: "3 meses runway", lo: 2000, hi: 3000 },
]
