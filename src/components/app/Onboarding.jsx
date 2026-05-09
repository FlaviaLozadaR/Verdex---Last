import { useState } from 'react'

export default function Onboarding({ onSubmit }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [uni, setUni] = useState("UPSA")
  const valid = name.trim().length >= 2 && /\S+@\S+\.\S+/.test(email)
  return (
    <div className="onb">
      <div className="onb-mark"></div>
      <div className="eyebrow">Verdex · App</div>
      <h1>Reciclá. Sumá. <em>Canjeá.</em></h1>
      <p>Crea tu cuenta para empezar a sumar puntos verdes.</p>

      <form className="onb-form" onSubmit={(e) => { e.preventDefault(); if (valid) onSubmit({ name: name.trim(), email: email.trim(), uni }) }}>
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
  )
}
