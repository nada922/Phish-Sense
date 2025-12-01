import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './Intro.css'
import logo from '../assets/logo.png'

const Intro = ({ onNext }) => {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Show content after a brief delay
    const timer = setTimeout(() => setShowContent(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const handleGetStarted = () => {
    onNext()
  }

  return (
    <motion.div
      className="intro-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background gradient */}
      <div className="animated-bg"></div>
      
      {/* Floating particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              x: [null, Math.random() * window.innerWidth],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="intro-content">
        {showContent && (
          <>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="logo-container"
            >
              <img src={logo} alt="PhishSense Logo" className="logo-icon" />
            </motion.div>

            <motion.h1
              className="intro-title"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <span className="gradient-text">Phish</span>
              <span className="gradient-text-alt">Sense</span>
            </motion.h1>

            <motion.p
              className="intro-subtitle"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Advanced Phishing Detection System
            </motion.p>

            <motion.p
              className="intro-description"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Protect yourself from malicious phishing attempts with AI-powered analysis
            </motion.p>

            <motion.button
              className="get-started-btn"
              onClick={handleGetStarted}
              initial={{ y: 30, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get Started</span>
              <motion.span
                className="arrow"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  )
}

export default Intro

