import { useState } from 'react'
import { signInWithGoogle } from '../../auth'

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

export default function Onboarding({ onSubmit }) {
  const [mode, setMode]       = useState('main')
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [uni, setUni]         = useState('UPSA')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const valid = name.trim().length >= 2 && /\S+@\S+\.\S+/.test(email)

  const handleGoogle = async () => {
    setLoading(true); setError('')
    try {
      const user = await signInWithGoogle()
      onSubmit({ name: user.name, email: user.email, uni: 'UPSA', googleUid: user.uid })
    } catch {
      setError('No se pudo iniciar sesión con Google. Intentá de nuevo.')
    } finally { setLoading(false) }
  }

  const handleRegister = (e) => {
    e.preventDefault()
    if (valid) onSubmit({ name: name.trim(), email: email.trim(), uni })
  }

  return (
    <div className="login-wrap">
      {/* Left panel — illustration */}
      <div className="login-left" aria-hidden="true">
        <svg className="login-bg-trees" viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ground */}
          <ellipse cx="200" cy="590" rx="280" ry="40" fill="rgba(70,130,75,0.12)"/>
          {/* Big center tree */}
          <path d="M200 590V460" stroke="rgba(45,100,55,0.35)" strokeWidth="12" strokeLinecap="round"/>
          <ellipse cx="200" cy="420" rx="70" ry="55" fill="rgba(65,125,70,0.18)"/>
          <ellipse cx="200" cy="380" rx="56" ry="46" fill="rgba(58,118,65,0.22)"/>
          <ellipse cx="200" cy="340" rx="44" ry="38" fill="rgba(52,112,60,0.26)"/>
          <ellipse cx="200" cy="305" rx="32" ry="28" fill="rgba(48,108,56,0.28)"/>
          <ellipse cx="200" cy="278" rx="22" ry="20" fill="rgba(44,104,52,0.30)"/>
          <path d="M200 440 C180 430 162 425 148 415" stroke="rgba(45,100,55,0.25)" strokeWidth="5" strokeLinecap="round"/>
          <ellipse cx="140" cy="410" rx="30" ry="22" fill="rgba(65,125,70,0.16)"/>
          <path d="M200 420 C218 410 236 405 248 395" stroke="rgba(45,100,55,0.20)" strokeWidth="4" strokeLinecap="round"/>
          <ellipse cx="256" cy="390" rx="26" ry="20" fill="rgba(65,125,70,0.14)"/>
          {/* Left small tree */}
          <path d="M80 590V510" stroke="rgba(45,100,55,0.25)" strokeWidth="7" strokeLinecap="round"/>
          <ellipse cx="80" cy="490" rx="42" ry="32" fill="rgba(65,125,70,0.14)"/>
          <ellipse cx="80" cy="465" rx="32" ry="26" fill="rgba(58,118,65,0.16)"/>
          <ellipse cx="80" cy="443" rx="22" ry="18" fill="rgba(52,112,60,0.18)"/>
          {/* Right small tree */}
          <path d="M320 590V520" stroke="rgba(45,100,55,0.22)" strokeWidth="7" strokeLinecap="round"/>
          <ellipse cx="320" cy="500" rx="40" ry="30" fill="rgba(65,125,70,0.13)"/>
          <ellipse cx="320" cy="476" rx="30" ry="24" fill="rgba(58,118,65,0.15)"/>
          <ellipse cx="320" cy="455" rx="20" ry="17" fill="rgba(52,112,60,0.17)"/>
          {/* Floating leaves */}
          {[{x:60,y:200},{x:140,y:120},{x:280,y:150},{x:340,y:80},{x:100,y:300},{x:310,y:260}].map((l,i)=>(
            <g key={i} transform={`translate(${l.x},${l.y}) rotate(${i*35-50})`}>
              <path d="M0 0 C-6-10 6-16 10-4 C7-1 1 0 0 0Z" fill={`rgba(65,130,70,${0.12+i*0.02})`}/>
              <path d="M0 0 L5-8" stroke="rgba(50,110,58,0.2)" strokeWidth="0.6"/>
            </g>
          ))}
        </svg>
        <div className="login-left-content">
          <div className="login-brand">
            <span className="login-brand-mark"/>
            <span className="login-brand-name">Verdex</span>
          </div>
          <blockquote className="login-quote">
            "Reciclar deja<br/>de no <em>convenir.</em>"
          </blockquote>
          <p className="login-tagline">
            La primera plataforma de reciclaje con recompensas reales de Bolivia.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="login-right">
        <div className="login-form-wrap">
          {mode === 'main' && (
            <>
              <div className="login-form-title">Bienvenido</div>
              <p className="login-form-sub">Ingresá o creá tu cuenta para empezar a sumar puntos verdes.</p>

              {error && <div className="login-error">{error}</div>}

              <div className="login-actions">
                <button className="login-google-btn" onClick={handleGoogle} disabled={loading}>
                  <GoogleIcon/>
                  {loading ? 'Conectando…' : 'Continuar con Google'}
                </button>

                <div className="login-or"><span>o</span></div>

                <button className="login-email-btn" onClick={() => setMode('register')}>
                  Registrarse con email
                </button>

                <button className="login-demo-btn" onClick={() => onSubmit({ name: 'Demo Verdex', email: 'demo@verdex.bo', uni: 'UPSA', seed: true })}>
                  Explorar con demo
                </button>
              </div>
            </>
          )}

          {mode === 'register' && (
            <>
              <button className="login-back" onClick={() => setMode('main')}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M10 4L6 8l4 4"/></svg>
                Volver
              </button>
              <div className="login-form-title">Crear cuenta</div>
              <p className="login-form-sub">Completá tus datos para registrarte.</p>
              <form className="login-register-form" onSubmit={handleRegister}>
                <div className="field">
                  <label>Nombre completo</label>
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Tu nombre" autoFocus/>
                </div>
                <div className="field">
                  <label>Email</label>
                  <input value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" type="email"/>
                </div>
                <div className="field">
                  <label>Institución</label>
                  <select value={uni} onChange={e => setUni(e.target.value)}>
                    <option>UPSA</option><option>UPB</option><option>UCB</option><option>UCEBOL</option>
                    <option>Empresa privada</option><option>Particular</option>
                  </select>
                </div>
                <button className="login-submit-btn" type="submit" disabled={!valid}>
                  Crear cuenta y entrar
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
