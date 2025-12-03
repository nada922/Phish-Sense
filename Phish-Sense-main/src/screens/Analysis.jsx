import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Analysis.css'

const Analysis = ({ onBack, initialUrl }) => {
  const [inputValue, setInputValue] = useState(initialUrl || '')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState(null)

  // Update input if initialUrl changes
  useEffect(() => {
    if (initialUrl) {
      setInputValue(initialUrl)
    }
  }, [initialUrl])

  const handleAnalyze = async () => {
    if (!inputValue.trim()) return

    // 1. Set state to show loading animation
    setIsAnalyzing(true)
    setResults(null) // Clear previous results

    // 2. Define the Flask API endpoint
    const apiUrl = 'http://localhost:5000/api/analyze' 

    try {
      // 3. Send the POST request to the Flask server
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Send the input URL as JSON data
        body: JSON.stringify({ url: inputValue }), 
      })

      // 4. Handle non-successful HTTP responses
      if (!response.ok) {
        throw new Error(`API returned status: ${response.status}. Check Flask logs.`)
      }

      // 5. Parse the JSON response from Flask
      const data = await response.json()
      
      // 6. Update the component state with results
      // NOTE: We map the simple 'status' from Flask to the richer 'results' structure
      setResults({
        // Flask returns 'is_phishing' (boolean)
        isPhishing: data.is_phishing, 
        // Use placeholder data for score/reputation until Flask provides it
        score: data.is_phishing ? 95 : 5, // Example score based on Flask result
        reputation: {
          url: inputValue,
          searchCount: Math.floor(Math.random() * 10000) + 1,
          severity: data.is_phishing ? 'Critical' : 'Low',
        }
      })

    } catch (error) {
      console.error("Error connecting to Flask API:", error)
      // Display a critical error message
      setResults({
        isPhishing: true, 
        score: 100,
        reputation: { 
          url: inputValue,
          searchCount: 0,
          severity: 'Critical' 
        } 
      })
      alert(`Connection Error: Could not reach the API server. Is Flask running on port 5000? Details: ${error.message}`)
      
    } finally {
      // 7. Stop the loading animation
      setIsAnalyzing(false)
    }
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
          onClick={onBack}
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
                    <span className="detail-value">{results.reputation.url}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Search Count:</span>
                    <span className="detail-value">
                      {results.reputation.searchCount.toLocaleString()} {results.reputation.searchCount === 1 ? 'person' : 'people'} searched
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Severity:</span>
                    <span className={`detail-value severity-${results.reputation.severity.toLowerCase()}`}>
                      {results.reputation.severity}
                    </span>
                  </div>
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


