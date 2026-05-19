const DEFS = {
  r1: { grad: ['#7B4F2E','#C4853A'], icon: <g fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 20h20l-3 16H17L14 20z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.9)"/><path d="M34 24h4a4 4 0 010 8h-4" stroke="rgba(255,255,255,0.85)" strokeWidth="2"/><path d="M20 8 Q21 5 20 2" strokeWidth="1.5" stroke="rgba(255,255,255,0.5)"/><path d="M26 8 Q27 5 26 2" strokeWidth="1.5" stroke="rgba(255,255,255,0.5)"/><path d="M32 8 Q33 5 32 2" strokeWidth="1.5" stroke="rgba(255,255,255,0.5)"/></g> },
  r2: { grad: ['#2A6640','#4AAE6A'], icon: <g fill="none" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="24" cy="28" rx="14" ry="8" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.9)" strokeWidth="2"/><path d="M24 20 C24 20 18 14 20 8 C22 4 28 6 26 12" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.85)" strokeWidth="1.8"/><path d="M24 20 C24 20 30 12 34 14 C37 16 35 22 30 22" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.75)" strokeWidth="1.8"/><path d="M14 28 Q16 36 24 38 Q32 36 34 28" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.8"/></g> },
  r3: { grad: ['#1B3F72','#2E6CB8'], icon: <g fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 12h4l6 18h12l4-12H18" fill="rgba(255,255,255,0.12)"/><circle cx="22" cy="34" r="2.5" fill="rgba(255,255,255,0.9)" stroke="none"/><circle cx="32" cy="34" r="2.5" fill="rgba(255,255,255,0.9)" stroke="none"/><path d="M14 12l-2-6H8" stroke="rgba(255,255,255,0.7)"/></g> },
  r4: { grad: ['#4A2880','#8855CC'], icon: <g fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round"><rect x="8" y="14" width="32" height="22" rx="3" fill="rgba(255,255,255,0.12)"/><polygon points="20,18 20,32 32,25" fill="rgba(255,255,255,0.85)" stroke="none"/></g> },
  r5: { grad: ['#8B1A1A','#CC3333'], icon: <g fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round"><rect x="18" y="4" width="12" height="6" rx="2" fill="rgba(255,255,255,0.3)"/><path d="M14 10h20v26a6 6 0 01-6 6h-8a6 6 0 01-6-6V10z" fill="rgba(255,255,255,0.12)"/><path d="M14 18h20" stroke="rgba(255,255,255,0.5)"/><path d="M19 10v28" stroke="rgba(255,255,255,0.2)"/></g> },
  r6: { grad: ['#7A3010','#C05A28'], icon: <g fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 14h28l-4 22H14L10 14z" fill="rgba(255,255,255,0.12)"/><path d="M18 14 C18 8 30 8 30 14" /><path d="M20 22 L28 22 M20 28 L26 28" stroke="rgba(255,255,255,0.6)"/></g> },
  r7: { grad: ['#0D2B6B','#1A52BB'], icon: <g fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round"><rect x="18" y="4" width="12" height="6" rx="2" fill="rgba(255,255,255,0.3)"/><path d="M14 10h20v26a6 6 0 01-6 6h-8a6 6 0 01-6-6V10z" fill="rgba(255,255,255,0.12)"/><ellipse cx="24" cy="24" rx="5" ry="8" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/><path d="M14 22h20M14 28h20" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/></g> },
  r8: { grad: ['#1A5C30','#2E9E54'], icon: <g fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 18h32v20a4 4 0 01-4 4H12a4 4 0 01-4-4V18z" fill="rgba(255,255,255,0.12)"/><path d="M6 12h36v6H6z" fill="rgba(255,255,255,0.2)"/><path d="M24 12v30" stroke="rgba(255,255,255,0.5)"/><path d="M16 12 C16 6 24 4 24 12" /><path d="M32 12 C32 6 24 4 24 12" /></g> },
  r9: { grad: ['#1A5040','#2A8868'], icon: <g fill="none" strokeLinecap="round"><path d="M24 36 C24 36 8 26 8 16 A8 8 0 0124 12 A8 8 0 0140 16 C40 26 24 36 24 36z" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.9)" strokeWidth="2"/><path d="M16 16 C18 12 22 12 24 16" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5"/></g> },
}

export default function RewardImg({ id, size = 48 }) {
  const d = DEFS[id] || DEFS.r1
  const gid = `ri-${id}`
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" width={size} height={size} style={{ display: 'block', borderRadius: 14, flexShrink: 0 }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={d.grad[0]}/>
          <stop offset="100%" stopColor={d.grad[1]}/>
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill={`url(#${gid})`}/>
      {d.icon}
    </svg>
  )
}
