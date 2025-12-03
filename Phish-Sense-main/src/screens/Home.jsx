import { motion } from 'framer-motion'
import './Home.css'

const Home = ({ onAnalyze, onBack, onQRCheck }) => {
  const handleAnalyze = () => {
    onAnalyze()
  }

  const handleQRCheck = () => {
    if (onQRCheck) {
      onQRCheck()
    }
  }

  const features = [
    {
      icon: '🔍',
      title: 'URL Analysis',
      description: 'Deep scan URLs for suspicious patterns',
      color: '#00ffff'
    },
    {
      icon: '📱',
      title: 'QR Checks',
      description: 'Scan QR codes before they load dangerous sites',
      color: '#cc0066'
    },
    {
      icon: '⭐',
      title: 'Reputation Scores',
      description: 'See search frequency and threat severity ratings',
      color: '#00ffff'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <motion.div
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="home-background"></div>
      
      <motion.button
        className="back-btn-home"
        onClick={onBack}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        ←
      </motion.button>
      
      <div className="home-content">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="home-header"
        >
          <motion.h1 variants={itemVariants} className="home-title">
            Welcome to <span className="highlight">PhishSense</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="home-subtitle">
            Your intelligent shield against phishing attacks
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="features-grid"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="feature-card"
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
              onClick={
                feature.title === 'URL Analysis' 
                  ? handleAnalyze 
                  : feature.title === 'QR Checks' 
                  ? handleQRCheck 
                  : undefined
              }
              style={{ 
                '--card-color': feature.color,
                cursor: (feature.title === 'URL Analysis' || feature.title === 'QR Checks') ? 'pointer' : 'default'
              }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Home

