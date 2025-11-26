import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Intro from './screens/Intro'
import Home from './screens/Home'
import Analysis from './screens/Analysis'
import QRCheck from './screens/QRCheck'
import './App.css'

function App() {
  const screenOrder = useMemo(() => ['intro', 'home', 'analysis', 'qrcheck'], [])
  const [currentScreen, setCurrentScreen] = useState('intro')
  const [direction, setDirection] = useState(1)
  const [pulseId, setPulseId] = useState(0)
  const [urlToAnalyze, setUrlToAnalyze] = useState(null)

  const sharedEase = [0.83, 0, 0.17, 1]

  const screenVariants = {
    initial: (dir) => ({
      opacity: 0,
      scale: 0.85,
      x: dir >= 0 ? 260 : -260,
      y: dir >= 0 ? 90 : -90,
      rotateX: dir >= 0 ? 25 : -25,
      rotateY: dir >= 0 ? 20 : -20,
      skewY: dir >= 0 ? 4 : -4,
      filter: 'blur(25px)',
    }),
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
      skewY: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.85,
        ease: sharedEase,
      },
    },
    exit: (dir) => ({
      opacity: 0,
      scale: 0.9,
      x: dir >= 0 ? -220 : 220,
      y: dir >= 0 ? -60 : 60,
      rotateX: dir >= 0 ? -20 : 20,
      rotateY: dir >= 0 ? 25 : -25,
      skewY: dir >= 0 ? -3 : 3,
      filter: 'blur(20px)',
      transition: {
        duration: 0.75,
        ease: sharedEase,
      },
    }),
  }

  const handleNavigate = (target) => {
    if (target === currentScreen) return
    const currentIndex = screenOrder.indexOf(currentScreen)
    const targetIndex = screenOrder.indexOf(target)
    const travelDirection = targetIndex > currentIndex ? 1 : -1
    setDirection(travelDirection)
    setPulseId((prev) => prev + 1)
    setCurrentScreen(target)
  }

  return (
    <div className="app-container">
      <AnimatePresence>
        <motion.div
          key={pulseId}
          className="transition-layer"
          initial={{
            scaleX: 0,
            opacity: 0.4,
            skewX: direction >= 0 ? 25 : -25,
          }}
          animate={{
            scaleX: 1.4,
            opacity: 0,
            skewX: 0,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: sharedEase }}
          style={{ transformOrigin: direction >= 0 ? 'left center' : 'right center' }}
        />
      </AnimatePresence>
      <AnimatePresence mode="wait" custom={direction}>
        {currentScreen === 'intro' && (
          <motion.div
            key="intro"
            className="screen-wrapper"
            variants={screenVariants}
            custom={direction}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Intro onNext={() => handleNavigate('home')} />
          </motion.div>
        )}

        {currentScreen === 'home' && (
          <motion.div
            key="home"
            className="screen-wrapper"
            variants={screenVariants}
            custom={direction}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Home 
              onAnalyze={() => {
                setUrlToAnalyze(null)
                handleNavigate('analysis')
              }}
              onBack={() => handleNavigate('intro')}
              onQRCheck={() => {
                setUrlToAnalyze(null)
                handleNavigate('qrcheck')
              }}
            />
          </motion.div>
        )}

        {currentScreen === 'analysis' && (
          <motion.div
            key="analysis"
            className="screen-wrapper"
            variants={screenVariants}
            custom={direction}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Analysis 
              onBack={() => {
                setUrlToAnalyze(null)
                handleNavigate('home')
              }} 
              initialUrl={urlToAnalyze}
            />
          </motion.div>
        )}

        {currentScreen === 'qrcheck' && (
          <motion.div
            key="qrcheck"
            className="screen-wrapper"
            variants={screenVariants}
            custom={direction}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <QRCheck 
              onBack={() => {
                setUrlToAnalyze(null)
                handleNavigate('home')
              }}
              onAnalyzeUrl={(url) => {
                setUrlToAnalyze(url)
                handleNavigate('analysis')
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App

