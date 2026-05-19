import { useState, useEffect, useRef } from 'react'
import L from 'leaflet'

// Fix default Leaflet icon paths for Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL('leaflet/dist/images/marker-icon-2x.png', import.meta.url).href,
  iconUrl:       new URL('leaflet/dist/images/marker-icon.png',   import.meta.url).href,
  shadowUrl:     new URL('leaflet/dist/images/marker-shadow.png', import.meta.url).href,
})

const POINTS = [
  { id: 'p1', nm: 'UPSA · Bloque Central',  meta: 'Contenedor · 24/7',            type: 'contenedor', dist: '120 m',  addr: 'Campus UPSA, cerca del Bloque Central · Av. Paraguá y 4to Anillo', capacity: 45, lat: -17.7536, lng: -63.1963 },
  { id: 'p2', nm: 'UPSA · Cafetería',        meta: 'Contenedor · L–V 7:00–22:00',  type: 'contenedor', dist: '240 m',  addr: 'Campus UPSA, cerca del Aula Magna',                                capacity: 60, lat: -17.7542, lng: -63.1958 },
  { id: 'p3', nm: 'Hipermaxi Equipetrol',     meta: 'Máquina inteligente',           type: 'maquina',    dist: '1.4 km', addr: 'Zona Equipetrol · Sucursal Hipermaxi Equipetrol',                  capacity: 80, lat: -17.7706, lng: -63.1965 },
  { id: 'p4', nm: 'Fidalga 2do Anillo',       meta: 'Máquina inteligente',           type: 'maquina',    dist: '2.1 km', addr: 'Zona 2do Anillo · Sucursal Fidalga',                               capacity: 30, lat: -17.7876, lng: -63.1697 },
  { id: 'p5', nm: 'Plaza Blacutt',            meta: 'Espacio público · GAMSCS',      type: 'contenedor', dist: '3.0 km', addr: 'Plaza Blacutt · Espacio público habilitado',                       capacity: 70, lat: -17.7836, lng: -63.1820 },
  { id: 'p6', nm: 'Torre CAINCO',             meta: 'Recolección B2B semanal',       type: 'maquina',    dist: '4.2 km', addr: 'Torre CAINCO · Zona empresarial',                                  capacity: 55, lat: -17.8033, lng: -63.1593 },
]

const FILTERS = ['Todos', 'Contenedores', 'Máquinas']

const IcContenedor = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 5h14l-1.5 10H4.5L3 5z"/><path d="M2 5h16"/><path d="M8 5V3h4v2"/>
  </svg>
)
const IcMaquina = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="12" height="16" rx="2"/><rect x="6" y="5" width="8" height="4" rx="1"/><circle cx="10" cy="14" r="2"/>
  </svg>
)

const MAT_ICONS = [
  <svg key="a" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"><rect x="5" y="1" width="6" height="3" rx="1"/><path d="M3 4h10v8a3 3 0 01-3 3H6a3 3 0 01-3-3V4z"/></svg>,
  <svg key="b" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"><path d="M4 4h8v8a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/><path d="M3 4h10"/></svg>,
  <svg key="c" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4l6-2 6 2v8l-6 2-6-2V4z"/><path d="M2 4l6 2 6-2M8 6v10"/></svg>,
  <svg key="d" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"><circle cx="5" cy="8" r="1.2"/><circle cx="8" cy="8" r="1.2"/><circle cx="11" cy="8" r="1.2"/></svg>,
]

function makePin(num, active) {
  return L.divIcon({
    html: `<div class="mp-pin${active ? ' active' : ''}">${num}</div>`,
    className: '', iconSize: [32, 32], iconAnchor: [16, 16],
  })
}
function makeUserPin() {
  return L.divIcon({
    html: `<div class="mp-user-pin"><div class="mp-user-pulse"></div></div>`,
    className: '', iconSize: [20, 20], iconAnchor: [10, 10],
  })
}

export default function MapPage() {
  const mapRef     = useRef(null)
  const mapEl      = useRef(null)
  const markersRef = useRef({})
  const routeRef   = useRef(null)
  const userRef    = useRef(null)
  const userLatLng = useRef(null)

  const [active,    setActive]    = useState('p2')
  const [filter,    setFilter]    = useState('Todos')
  const [routing,   setRouting]   = useState(false)
  const [routeInfo, setRouteInfo] = useState(null)
  const [geoErr,    setGeoErr]    = useState(null)
  const [realDists, setRealDists] = useState({}) // id → formatted string

  // Haversine distance in meters
  function haversine(lat1, lng1, lat2, lng2) {
    const R = 6371000
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLng/2)**2
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  }

  function fmtDist(m) {
    if (m < 1000) return `${Math.round(m)} m`
    return `${(m / 1000).toFixed(1)} km`
  }

  function updateDistances(lat, lng) {
    const d = {}
    POINTS.forEach(p => { d[p.id] = fmtDist(haversine(lat, lng, p.lat, p.lng)) })
    setRealDists(d)
  }

  // Points with real distances if available, sorted by actual distance
  const pointsWithDist = POINTS.map(p => ({
    ...p,
    dist: realDists[p.id] || p.dist,
    distM: userLatLng.current
      ? haversine(userLatLng.current[0], userLatLng.current[1], p.lat, p.lng)
      : null,
  })).sort((a, b) => a.distM !== null && b.distM !== null ? a.distM - b.distM : 0)

  const filtered = pointsWithDist.filter(p =>
    filter === 'Todos' ||
    (filter === 'Contenedores' && p.type === 'contenedor') ||
    (filter === 'Máquinas' && p.type === 'maquina')
  )
  const sel = pointsWithDist.find(p => p.id === active)
  const idx = p => POINTS.indexOf(POINTS.find(x => x.id === p.id)) + 1

  // Init map once
  useEffect(() => {
    if (mapRef.current) return
    const map = L.map(mapEl.current, { zoomControl: false }).setView([-17.7536, -63.1963], 16)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 19,
    }).addTo(map)
    L.control.zoom({ position: 'bottomright' }).addTo(map)
    mapRef.current = map

    // Add point markers
    POINTS.forEach((p, i) => {
      const m = L.marker([p.lat, p.lng], { icon: makePin(i + 1, false) })
        .addTo(map)
        .on('click', () => setActive(p.id))
      markersRef.current[p.id] = m
    })

    // Get user location
    let watchId = null
    if (navigator.geolocation) {
      // Get once immediately
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude: lat, longitude: lng } = pos.coords
          userLatLng.current = [lat, lng]
          if (userRef.current) userRef.current.remove()
          userRef.current = L.marker([lat, lng], { icon: makeUserPin() }).addTo(map)
          updateDistances(lat, lng)
        },
        (err) => {
          if (err.code === 1) setGeoErr('Permiso de ubicación denegado. Activalo en tu navegador para ver rutas y distancias reales.')
          else setGeoErr('No se pudo obtener tu ubicación. Podés usar el mapa igual.')
        },
        { enableHighAccuracy: true, timeout: 8000 }
      )
      // Watch for movement updates
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude: lat, longitude: lng } = pos.coords
          userLatLng.current = [lat, lng]
          if (userRef.current) userRef.current.setLatLng([lat, lng])
          else userRef.current = L.marker([lat, lng], { icon: makeUserPin() }).addTo(map)
          updateDistances(lat, lng)
        },
        () => {},
        { enableHighAccuracy: true }
      )
    } else {
      setGeoErr('Tu navegador no soporta geolocalización.')
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId)
      map.remove(); mapRef.current = null
    }
  }, [])

  // Update active marker style
  useEffect(() => {
    POINTS.forEach((p, i) => {
      const m = markersRef.current[p.id]
      if (m) m.setIcon(makePin(i + 1, p.id === active))
    })
    if (sel && mapRef.current) mapRef.current.flyTo([sel.lat, sel.lng], 16, { duration: 0.8 })
    // Clear route when changing point
    if (routeRef.current) { routeRef.current.remove(); routeRef.current = null; setRouteInfo(null) }
  }, [active])

  // Fetch route from OSRM
  const getRoute = async () => {
    if (!userLatLng.current) { setGeoErr('Necesitamos tu ubicación para calcular la ruta.'); return }
    if (!sel) return
    setRouting(true)
    setRouteInfo(null)
    try {
      const [uLat, uLng] = userLatLng.current
      const url = `https://router.project-osrm.org/route/v1/driving/${uLng},${uLat};${sel.lng},${sel.lat}?overview=full&geometries=geojson`
      const res = await fetch(url)
      const data = await res.json()
      if (data.routes?.length) {
        const route = data.routes[0]
        const coords = route.geometry.coordinates.map(([lng, lat]) => [lat, lng])
        if (routeRef.current) routeRef.current.remove()
        routeRef.current = L.polyline(coords, {
          color: '#2d7042', weight: 5, opacity: 0.85, lineCap: 'round',
          dashArray: null,
        }).addTo(mapRef.current)
        mapRef.current.fitBounds(routeRef.current.getBounds(), { padding: [40, 40] })
        const dist = (route.distance / 1000).toFixed(1)
        const mins = Math.round(route.duration / 60)
        setRouteInfo({ dist, mins })
      }
    } catch {
      setGeoErr('No se pudo calcular la ruta.')
    } finally {
      setRouting(false)
    }
  }

  const clearRoute = () => {
    if (routeRef.current) { routeRef.current.remove(); routeRef.current = null }
    setRouteInfo(null)
  }

  return (
    <div className="mp-page">
      <div className="mp-header">
        <div>
          <h1 className="mp-title">Puntos cerca 🌿</h1>
          <p className="mp-sub">Contenedores Verdex, máquinas inteligentes.</p>
        </div>
        <div className="mp-filters">
          {FILTERS.map(f => (
            <button key={f} className={'mp-filter' + (filter === f ? ' active' : '')} onClick={() => setFilter(f)}>
              {f === 'Todos' && <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="5" height="5" rx="1"/><rect x="9" y="2" width="5" height="5" rx="1"/><rect x="2" y="9" width="5" height="5" rx="1"/><rect x="9" y="9" width="5" height="5" rx="1"/></svg>}
              {f === 'Contenedores' && <IcContenedor/>}
              {f === 'Máquinas' && <IcMaquina/>}
              <span>{f}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Real Leaflet map */}
      <div className="mp-map" ref={mapEl}/>

      {geoErr && <div className="mp-geo-err">{geoErr} <button onClick={() => setGeoErr(null)}>×</button></div>}

      <div className="mp-bottom">
        <div className="mp-cards">
          {filtered.map(p => (
            <button key={p.id} className={'mp-card' + (active === p.id ? ' active' : '')} onClick={() => setActive(p.id)}>
              <div className="mp-card-badge">{idx(p)}</div>
              <div className="mp-card-ic">{p.type === 'contenedor' ? <IcContenedor/> : <IcMaquina/>}</div>
              <div className="mp-card-info">
                <div className="mp-card-nm">{p.nm}</div>
                <div className="mp-card-meta">{p.meta}</div>
                <div className="mp-card-addr">{p.addr}</div>
                <div className="mp-card-dist">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 1a2.5 2.5 0 012.5 2.5C7.5 6 5 9 5 9S2.5 6 2.5 3.5A2.5 2.5 0 015 1z"/></svg>
                  {p.dist}
                </div>
              </div>
            </button>
          ))}
        </div>

        {sel && (
          <div className="mp-detail">
            <div className="mp-detail-head">
              <div className="mp-detail-ic">{sel.type === 'contenedor' ? <IcContenedor/> : <IcMaquina/>}</div>
              <div className="mp-detail-info">
                <div className="mp-detail-nm">{sel.nm}</div>
                <div className="mp-detail-meta">{sel.meta}</div>
                <div className="mp-detail-addr">{sel.addr}</div>
              </div>
              <button className="mp-detail-close" onClick={() => { setActive(null); clearRoute() }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M1 1l10 10M11 1L1 11"/></svg>
              </button>
            </div>

            {routeInfo && (
              <div className="mp-route-info">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="var(--green)" strokeWidth="1.5" strokeLinecap="round"><path d="M2 8h12M9 4l4 4-4 4"/></svg>
                <span><strong>{routeInfo.dist} km</strong> · aprox. {routeInfo.mins} min en auto</span>
                <button className="mp-clear-route" onClick={clearRoute}>Limpiar</button>
              </div>
            )}

            <div className="mp-detail-status">
              <div className="mp-detail-avail"><span className="mp-dot"/>Disponible</div>
              <div className="mp-detail-mats">
                <span>Reciclables aceptados</span>
                <div className="mp-mat-icons">{MAT_ICONS}</div>
              </div>
            </div>
            <div className="mp-detail-cap">
              <div className="mp-cap-label">Capacidad: {sel.capacity}%</div>
              <div className="mp-cap-bar">
                <div className="mp-cap-fill" style={{ width: `${sel.capacity}%`, background: sel.capacity > 70 ? 'var(--amber)' : 'var(--green)' }}/>
              </div>
            </div>
            <div className="mp-detail-btns">
              <button className="mp-btn-ghost" onClick={clearRoute}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="7" cy="7" r="5.5"/><path d="M7 4.5V7l1.5 1.5"/></svg>
                Ver detalles
              </button>
              <button className="mp-btn-primary" onClick={getRoute} disabled={routing}>
                {routing ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="1.5"><circle cx="7" cy="7" r="5" strokeDasharray="20" strokeDashoffset="5" style={{animation:'spin .8s linear infinite'}}/></svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
                )}
                {routing ? 'Calculando…' : 'Ir ahora'}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mp-footer">
        <span>🌿 Los puntos se actualizan en tiempo real</span>
        <span>Acercarte a un punto Verdex, es acercarte a un planeta mejor. 🤍</span>
      </div>
    </div>
  )
}
