// Google Identity Services — solo Client ID, sin Firebase ni backend
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

function decodeJWT(token) {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const json = decodeURIComponent(
      atob(base64).split('').map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0')).join('')
    )
    return JSON.parse(json)
  } catch { return null }
}

export function signInWithGoogle() {
  return new Promise((resolve, reject) => {
    if (!CLIENT_ID) { reject(new Error('Client ID no configurado')); return }

    function init() {
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: (response) => {
          const payload = decodeJWT(response.credential)
          if (!payload) { reject(new Error('Token inválido')); return }
          resolve({
            name:  payload.name  || 'Usuario',
            email: payload.email || '',
            uid:   payload.sub,
            photo: payload.picture || null,
          })
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      })
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // One Tap no disponible → usar popup
          const btn = document.createElement('div')
          btn.style.display = 'none'
          document.body.appendChild(btn)
          window.google.accounts.id.renderButton(btn, {
            type: 'standard', theme: 'outline', size: 'large',
          })
          btn.querySelector('div[role="button"]')?.click()
          setTimeout(() => document.body.removeChild(btn), 3000)
        }
      })
    }

    if (window.google?.accounts?.id) {
      init()
    } else {
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      script.onload = init
      script.onerror = () => reject(new Error('No se pudo cargar Google Sign-In'))
      document.head.appendChild(script)
    }
  })
}
