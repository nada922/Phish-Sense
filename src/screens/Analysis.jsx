import { useState, useEffect, useRef } from 'react'  // Add useRef
import { motion, AnimatePresence } from 'framer-motion'
import { Html5Qrcode } from 'html5-qrcode'  // Add QR code library
import './Analysis.css'

const Analysis = ({ onBack, initialUrl }) => {
  const [inputValue, setInputValue] = useState(initialUrl || '')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState(null)
  
  // QR Code scanning states
  const [scanMode, setScanMode] = useState(null) // 'camera' or 'upload'
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const qrCodeScannerRef = useRef(null)
  const fileInputRef = useRef(null)

  // Update input if initialUrl changes
  useEffect(() => {
    if (initialUrl) {
      setInputValue(initialUrl)
    }
  }, [initialUrl])

  // Cleanup QR scanner
  useEffect(() => {
    return () => {
      if (qrCodeScannerRef.current) {
        qrCodeScannerRef.current.stop().catch(() => {})
      }
    }
  }, [])

  const handleAnalyze = async () => {
    if (!inputValue.trim()) return

    setIsAnalyzing(true)
    
    // Simulate multi-feature AI analysis
    setTimeout(() => {
      // Simulated multi-feature analysis for graduation project
      const features = [
        { name: 'URL Structure', score: Math.floor(Math.random() * 100), severity: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)] },
        { name: 'SSL Certificate', score: Math.floor(Math.random() * 100), severity: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)] },
        { name: 'Domain Age', score: Math.floor(Math.random() * 100), severity: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)] },
        { name: 'Content Analysis', score: Math.floor(Math.random() * 100), severity: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)] },
        { name: 'Blacklist Status', score: Math.floor(Math.random() * 100), severity: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)] },
        { name: 'Behavioral Patterns', score: Math.floor(Math.random() * 100), severity: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)] }
      ]
      
      const overallScore = Math.floor(features.reduce((sum, f) => sum + f.score, 0) / features.length)
      const isPhishing = overallScore > 60
      
      setResults({
        isPhishing,
        overallScore,
        features,
        reputation: {
          url: inputValue,
          searchCount: Math.floor(Math.random() * 10000) + 1,
          lastScanned: new Date().toLocaleDateString(),
          domainAge: `${Math.floor(Math.random() * 365) + 1} days`,
          sslValid: Math.random() > 0.5,
          redirects: Math.floor(Math.random() * 5)
        }
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  // QR Code scanning functions
  const startCameraScan = async () => {
    try {
      setError(null)
      setIsScanning(true)
      setScanMode('camera')

      const scanner = new Html5Qrcode('qr-reader')
      qrCodeScannerRef.current = scanner

      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
          handleQRSuccess(decodedText)
          scanner.stop()
          setIsScanning(false)
          setScanMode(null)
        },
        (errorMessage) => {
          // Ignore scanning errors
        }
      )
    } catch (err) {
      setError('Failed to access camera. Please check permissions.')
      setIsScanning(false)
      setScanMode(null)
    }
  }

  const stopCameraScan = async () => {
    if (qrCodeScannerRef.current) {
      try {
        await qrCodeScannerRef.current.stop()
        qrCodeScannerRef.current.clear()
      } catch (err) {
        console.error('Error stopping scanner:', err)
      }
      qrCodeScannerRef.current = null
    }
    setIsScanning(false)
    setScanMode(null)
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setError(null)
    setScanMode('upload')
    setUploadedImage(URL.createObjectURL(file))
    setIsScanning(true)

    try {
      const scanner = new Html5Qrcode('qr-reader-upload')
      const decodedText = await scanner.scanFile(file, false)
      handleQRSuccess(decodedText)
      setIsScanning(false)
      setUploadedImage(null)
      setScanMode(null)
    } catch (err) {
      setError('Could not decode QR code. Please try another image.')
      setIsScanning(false)
      setUploadedImage(null)
      setScanMode(null)
    }
  }

  const handleQRSuccess = (url) => {
    setInputValue(url)
    setError(null)
  }

  const handleResetQR = () => {
    setScanMode(null)
    setUploadedImage(null)
    setError(null)
    stopCameraScan()
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
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
          ← Back to Intro
        </motion.button>

        <motion.div
          className="analysis-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="analysis-title">
            <span className="title-icon">🔬</span>
            Phishing Analysis Dashboard
          </h1>
          <p className="analysis-subtitle">
            Enter URL directly or scan QR code for analysis
          </p>
        </motion.div>

        {/* Main Input Section */}
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
              placeholder="Enter URL or scan QR code..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
            />
            
            {/* QR Icon Button - Added Here */}
            <motion.button
              className="qr-icon-btn"
              onClick={startCameraScan}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Scan QR Code"
            >
              <span className="qr-icon">📱</span>
            </motion.button>
            
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

        {/* QR Scanner Display */}
        <AnimatePresence>
          {scanMode === 'camera' && (
            <motion.div
              key="camera"
              className="scanner-section"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div id="qr-reader" className="qr-reader"></div>
              <motion.button
                className="stop-scan-btn"
                onClick={handleResetQR}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel Scanning
              </motion.button>
            </motion.div>
          )}

          {scanMode === 'upload' && uploadedImage && (
            <motion.div
              key="upload"
              className="upload-section"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="uploaded-image-container">
                <img src={uploadedImage} alt="Uploaded QR code" className="uploaded-image" />
                <div id="qr-reader-upload" style={{ display: 'none' }}></div>
              </div>
              <motion.button
                className="reset-btn"
                onClick={handleResetQR}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Another Image
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Messages */}
        {error && (
          <motion.div
            className="error-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
            <motion.button
              className="error-close-btn"
              onClick={() => setError(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </motion.button>
          </motion.div>
        )}

        {/* Loading State */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              className="loading-section"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="loading-spinner"></div>
              <p className="loading-text">Analyzing with AI models...</p>
              <p className="loading-subtext">Checking multiple security features</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Display */}
        <AnimatePresence>
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
                      {results.isPhishing ? 'PHISHING DETECTED!' : 'SAFE TO USE'}
                    </h2>
                    <p className="result-score">
                      Overall Threat Score: <span>{results.overallScore}%</span>
                    </p>
                    <p className="reputation-score">
                      Reputation: <span>{results.reputation.searchCount.toLocaleString()} searches</span>
                    </p>
                  </div>
                </div>

                {/* Feature Breakdown */}
                <div className="features-breakdown">
                  <h3 className="features-title">AI Feature Analysis Breakdown</h3>
                  <div className="features-grid">
                    {results.features.map((feature, index) => (
                      <div key={index} className="feature-item">
                        <div className="feature-header">
                          <span className="feature-name">{feature.name}</span>
                          <span className={`feature-score ${feature.severity.toLowerCase()}`}>
                            {feature.score}%
                          </span>
                        </div>
                        <div className="feature-severity">
                          Severity: <span className={`severity-${feature.severity.toLowerCase()}`}>
                            {feature.severity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reputation Details */}
                <div className="reputation-details">
                  <h3 className="details-title">Detailed Reputation Analysis</h3>
                  <div className="details-grid">
                    <div className="detail-item url">
                      <span className="detail-label">URL Analyzed:</span>
                      <span className="detail-value url">{results.reputation.url}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Search Frequency:</span>
                      <span className="detail-value">{results.reputation.searchCount.toLocaleString()} searches</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Domain Age:</span>
                      <span className={`detail-value ${results.reputation.domainAge.includes('day') && parseInt(results.reputation.domainAge) < 30 ? 'invalid' : 'valid'}`}>
                        {results.reputation.domainAge}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">SSL Certificate:</span>
                      <span className={`detail-value ${results.reputation.sslValid ? 'valid' : 'invalid'}`}>
                        {results.reputation.sslValid ? 'Valid ✓' : 'Invalid ✗'}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Redirects Found:</span>
                      <span className={`detail-value ${results.reputation.redirects > 2 ? 'invalid' : 'valid'}`}>
                        {results.reputation.redirects}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Last Scanned:</span>
                      <span className="detail-value">{results.reputation.lastScanned}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* QR Check Options Section - NOW AFTER RESULTS */}
        {!scanMode && !isScanning && !results && !isAnalyzing && (
          <motion.div
            className="qr-options-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="qr-options">
              <motion.button
                className="qr-option-btn camera-btn"
                onClick={startCameraScan}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="option-icon">📷</span>
                <span>Scan QR Code with Camera</span>
              </motion.button>

              <motion.button
                className="qr-option-btn upload-btn"
                onClick={() => fileInputRef.current?.click()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="option-icon">📁</span>
                <span>Upload QR Code Image</span>
              </motion.button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </div>
          </motion.div>
        )}

      </div>
    </motion.div>
  )
}

export default Analysis