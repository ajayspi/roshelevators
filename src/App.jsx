import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import { PageTransition } from './components/atoms.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import About from './pages/About.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import Services from './pages/Services.jsx'
import Studio from './pages/Studio.jsx'
import Contact from './pages/Contact.jsx'
import Proposal from './proposal/Proposal.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
        <Route path="/products/:slug" element={<PageTransition><ProductDetail /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><GalleryPage /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/configurator" element={<PageTransition><Studio /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/proposal" element={<div className="proposal-theme"><Proposal /></div>} />
        <Route path="*" element={<PageTransition><Home /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const { pathname } = useLocation()
  const isProposal = pathname === '/proposal'
  return (
    <div className="noise min-h-dvh">
      <ScrollToTop />
      {!isProposal && <Nav />}
      <main>{<AnimatedRoutes />}</main>
      {!isProposal && <Footer />}
    </div>
  )
}