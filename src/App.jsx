import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from '../layout'
import Home from '../Pages/Home'
import Features from '../Pages/Features'
import About from '../Pages/About'
import Contact from '../Pages/Contact'
import HowItWorks from '../Pages/HowItWorks'

function App() {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  // Extract page name from path
  const getPageName = () => {
    const path = location.pathname
    if (path === '/' || path === '/home') return 'Home'
    if (path === '/features') return 'Features'
    if (path === '/how-it-works' || path === '/howitworks') return 'HowItWorks'
    if (path === '/about') return 'About'
    if (path === '/contact') return 'Contact'
    return 'Home'
  }

  return (
    <Layout currentPageName={getPageName()}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/howitworks" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  )
}

export default App
