import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

// ─────────────────────────────────────────────────────────────────────────────
// TODO: Reemplazá estos valores con los de tu proyecto Firebase.
// Cómo obtenerlos:
//  1. Ir a https://console.firebase.google.com
//  2. Crear proyecto (o abrir uno existente)
//  3. Agregar app web → copiar el firebaseConfig
//  4. En Authentication → Sign-in method → activar Google
// ─────────────────────────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            || '',
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        || '',
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         || '',
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             || '',
}

const isConfigured = firebaseConfig.apiKey !== ''

let app, auth, provider

if (isConfigured) {
  app      = initializeApp(firebaseConfig)
  auth     = getAuth(app)
  provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })
}

export { auth, provider, isConfigured }

export async function signInWithGoogle() {
  if (!isConfigured) throw new Error('Firebase no está configurado.')
  const result = await signInWithPopup(auth, provider)
  return {
    name:  result.user.displayName || 'Usuario',
    email: result.user.email       || '',
    uid:   result.user.uid,
    photo: result.user.photoURL    || null,
  }
}

export async function logOut() {
  if (auth) await signOut(auth)
}
