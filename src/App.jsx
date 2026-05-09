import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './styles.css'

// Landing page components
import Nav from './components/landing/Nav'
import Hero from './components/landing/Hero'
import Problem from './components/landing/Problem'
import Channels from './components/landing/Channels'
import Levels from './components/landing/Levels'
import AppSection from './components/landing/AppSection'
import Market from './components/landing/Market'
import Investment from './components/landing/Investment'
import Impact from './components/landing/Impact'
import CTA from './components/landing/CTA'
import Footer from './components/landing/Footer'

import Shell from './components/app/Shell'

function LandingPage() {
  const navigate = useNavigate()
  const openApp = () => navigate('/app/home')

  return (
    <>
      <Nav onOpenApp={openApp} />
      <Hero onOpenApp={openApp} />
      <Problem />
      <Channels />
      <Levels />
      <AppSection onOpenApp={openApp} />
      <Market />
      <Investment />
      <Impact />
      <CTA onOpenApp={openApp} />
      <Footer />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/app/*" element={<Shell />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
