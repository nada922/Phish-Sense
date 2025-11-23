import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Analysis.css'

const Analysis = ({ onBack }) => {
  const [inputValue, setInputValue] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState(null)

  const handleAnalyze = async () => {
    if (!inputValue.trim()) return

    setIsAnalyzing(true)
    
    // Simulate analysis (replace with actual API call)
    setTimeout(() => {
      const isPhishing = Math.random() > 0.5
      setResults({
        isPhishing,
        score: Math.floor(Math.random() * 100),
        details: {
          url: inputValue,
          domainAge: '2 years',
          suspiciousKeywords: isPhishing ? ['urgent', 'verify', 'click'] : [],
          sslValid: !isPhishing,
          reputation: isPhishing ? 'Low' : 'High'
        }
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <motion.div
      className="analysis-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="analysis-background"></div>
      
      <div className="analysis-content">
        <motion.button
          className="back-btn"
          onClick={handleBack}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          ← Back
        </motion.button>

        <motion.div
          className="analysis-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="analysis-title">
            <span className="title-icon">🔬</span>
            Phishing Analysis
          </h1>
          <p className="analysis-subtitle">
            Enter a URL or email to analyze for phishing threats
          </p>
        </motion.div>

        <motion.div
          className="input-section"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="input-wrapper">
            <input
              type="text"
              className="analysis-input"
              placeholder="Enter URL or email address..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
            />
            <motion.button
              className="analyze-button"
              onClick={handleAnalyze}
              disabled={!inputValue.trim() || isAnalyzing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAnalyzing ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  ⚙️
                </motion.span>
              ) : (
                'Analyze'
              )}
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {isAnalyzing && (
            <motion.div
              className="loading-section"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="loading-spinner"></div>
              <p className="loading-text">Analyzing threat level...</p>
            </motion.div>
          )}

          {results && !isAnalyzing && (
            <motion.div
              className="results-section"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`result-card ${results.isPhishing ? 'danger' : 'safe'}`}>
                <div className="result-header">
                  <div className="result-icon">
                    {results.isPhishing ? '⚠️' : '✅'}
                  </div>
                  <div>
                    <h2 className="result-title">
                      {results.isPhishing ? 'Phishing Detected!' : 'Safe to Use'}
                    </h2>
                    <p className="result-score">
                      Threat Score: <span>{results.score}%</span>
                    </p>
                  </div>
                </div>

                <div className="result-details">
                  <div className="detail-item">
                    <span className="detail-label">URL:</span>
                    <span className="detail-value">{results.details.url}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Domain Age:</span>
                    <span className="detail-value">{results.details.domainAge}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">SSL Valid:</span>
                    <span className={`detail-value ${results.details.sslValid ? 'valid' : 'invalid'}`}>
                      {results.details.sslValid ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Reputation:</span>
                    <span className={`detail-value ${results.details.reputation === 'High' ? 'valid' : 'invalid'}`}>
                      {results.details.reputation}
                    </span>
                  </div>
                  {results.details.suspiciousKeywords.length > 0 && (
                    <div className="detail-item">
                      <span className="detail-label">Suspicious Keywords:</span>
                      <span className="detail-value">
                        {results.details.suspiciousKeywords.join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default Analysis

