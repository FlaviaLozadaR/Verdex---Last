import { useState } from 'react'
import { REWARDS, REWARD_CATS } from '../../data/constants'
import RewardImg from './RewardImg'

const CAT_ICONS = {
  Todos:    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="7" cy="7" r="5.5"/><path d="M7 4v3l2 2"/></svg>,
  Comida:   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M2 2v4a3 3 0 006 0V2M5 2v4M9 2c0 3 3 3 3 3v7"/></svg>,
  Bebidas:  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="2" width="8" height="3" rx="1"/><path d="M4 5l1 7h4l1-7"/></svg>,
  Super:    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 2h2l2.5 7h5.5l2-5H4"/><circle cx="6" cy="12" r="1"/><circle cx="10" cy="12" r="1"/></svg>,
  Ocio:     <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="1" y="3" width="12" height="9" rx="1.5"/><polygon points="5,5.5 5,9.5 9.5,7.5" fill="currentColor" stroke="none"/></svg>,
  Sorteos:  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 5h10v7a1 1 0 01-1 1H3a1 1 0 01-1-1V5z"/><path d="M1 3h12v2H1z"/><path d="M7 3V2a2 2 0 00-4 0v1M7 3V2a2 2 0 014 0v1"/></svg>,
  Impacto:  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M7 12 C7 12 2 8 2 5a3 3 0 016 0 3 3 0 016 0c0 3-5 7-5 7z" fill="none"/></svg>,
}

const DESCRIPTIONS = {
  r1: 'Disfrutá tu café favorito.',
  r2: 'Comé sano, viví mejor.',
  r3: 'Tus compras, más convenientes.',
  r4: 'Viví grandes historias.',
  r5: 'Refrescá tu día.',
  r6: 'Tu compra, mejor precio.',
  r7: 'Compartí más momentos.',
  r8: 'Tu próxima gran ganancia.',
  r9: 'Sumá tu impacto positivo.',
}

export default function Rewards({ state, onRedeem }) {
  const [cat, setCat] = useState('Todos')
  const [confirm, setConfirm] = useState(null)
  const [success, setSuccess] = useState(null)

  const list = REWARDS
    .filter((r) => cat === 'Todos' || r.cat === cat)
    .sort((a, b) => a.pts - b.pts)

  const doRedeem = (r) => {
    const code = 'VDX-' + Math.random().toString(36).slice(2,6).toUpperCase() + '-' + Math.random().toString(36).slice(2,6).toUpperCase()
    const red = { id: 'rd_' + Date.now(), rewardId: r.id, name: r.nm, partner: r.partner, pts: r.pts, ts: Date.now(), code, ic: r.ic }
    onRedeem(red)
    setConfirm(null)
    setSuccess(red)
  }

  return (
    <div className="rw-page">
      <div className="rw-header">
        <div>
          <h1 className="rw-title">Recompensas</h1>
          <p className="rw-sub">Canjeá tus puntos por beneficios reales.</p>
        </div>
        <div className="rw-balance">
          <div className="rw-balance-v">{state.points.toLocaleString('es-BO')}</div>
          <div className="rw-balance-k">pts disponibles</div>
        </div>
      </div>

      <div className="rw-filters">
        {REWARD_CATS.map((c) => (
          <button key={c} className={'rw-pill' + (cat === c ? ' active' : '')} onClick={() => setCat(c)}>
            {CAT_ICONS[c]}
            <span>{c}</span>
          </button>
        ))}
      </div>

      <div className="rw-list">
        {list.map((r) => {
          const can = state.points >= r.pts
          return (
            <div key={r.id} className={'rw-card' + (can ? '' : ' locked')}>
              <RewardImg id={r.id} size={80} />
              <div className="rw-info">
                <div className="rw-nm">{r.nm}</div>
                <div className="rw-partner">{r.partner} · {r.cat}</div>
                <div className="rw-desc">{DESCRIPTIONS[r.id]}</div>
              </div>
              <div className="rw-action">
                <div className={'rw-pts' + (can ? '' : ' locked')}>{r.pts.toLocaleString('es-BO')} <span>pts</span></div>
                <button className={'rw-btn' + (can ? '' : ' locked')} disabled={!can} onClick={() => setConfirm(r)}>
                  {can ? 'Canjear' : `Faltan ${(r.pts - state.points).toLocaleString('es-BO')}`}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {confirm && (
        <div className="modal-veil" onClick={() => setConfirm(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <RewardImg id={confirm.id} size={56} />
            <h3 style={{ marginTop: 16 }}>Confirmar canje</h3>
            <p>{confirm.nm} · {confirm.partner}</p>
            <div className="pts-pop" style={{ color: 'var(--amber-deep)' }}>−{confirm.pts.toLocaleString('es-BO')}<small>pts</small></div>
            <p>Saldo después: {(state.points - confirm.pts).toLocaleString('es-BO')} pts</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
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
            <div style={{ margin: '16px 0', padding: 16, border: '1px dashed var(--green)', borderRadius: 12, background: 'var(--green-soft)', fontFamily: 'var(--mono)', fontSize: 18, letterSpacing: '0.06em', color: 'var(--green-deep)' }}>
              {success.code}
            </div>
            <p>Mostrá este código en {success.partner}.</p>
            <button className="btn btn-primary btn-block" onClick={() => setSuccess(null)}>Listo</button>
          </div>
        </div>
      )}
    </div>
  )
}
