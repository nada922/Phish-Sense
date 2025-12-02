import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Intro from './screens/Intro'
import Analysis from './screens/Analysis'  // Import only Analysis
import './App.css'  // Remove Home and QRCheck imports

function App() {
  // Remove 'home' and 'qrcheck' from screenOrder
  const screenOrder = useMemo(() => ['intro', 'analysis'], [])
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
        {/* Only Intro and Analysis screens remain */}
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
            {/* Go directly to Analysis from Intro */}
            <Intro onNext={() => handleNavigate('analysis')} />
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
            {/* Go back to Intro, not Home */}
            <Analysis 
              onBack={() => {
                setUrlToAnalyze(null)
                handleNavigate('intro')
              }} 
              initialUrl={urlToAnalyze}
            />
          </motion.div>
        )}
        
        {/* Remove Home and QRCheck sections entirely */}
      </AnimatePresence>
    </div>
  )
}

export default App