import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Html5Qrcode } from 'html5-qrcode'
import './QRCheck.css'

const QRCheck = ({ onBack, onAnalyzeUrl }) => {
  const [scanMode, setScanMode] = useState(null) // 'camera' or 'upload'
  const [decodedUrl, setDecodedUrl] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const qrCodeScannerRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    return () => {
      // Cleanup: stop scanner when component unmounts
      if (qrCodeScannerRef.current) {
        qrCodeScannerRef.current.stop().catch(() => {})
      }
    }
  }, [])

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
        },
        (errorMessage) => {
          // Ignore scanning errors, just keep scanning
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
    } catch (err) {
      setError('Could not decode QR code. Please try another image.')
      setIsScanning(false)
      setUploadedImage(null)
    }
  }

  const handleQRSuccess = (url) => {
    setDecodedUrl(url)
    setError(null)
  }

  const handleAnalyze = () => {
    if (decodedUrl && onAnalyzeUrl) {
      onAnalyzeUrl(decodedUrl)
    }
  }

  const handleReset = () => {
    setDecodedUrl(null)
    setError(null)
    setUploadedImage(null)
    setScanMode(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    stopCameraScan()
  }

  return (
    <motion.div
      className="qrcheck-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="qrcheck-background"></div>
      
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

      <div className="qrcheck-content">
        <motion.div
          className="qrcheck-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="qrcheck-title">
            <span className="title-icon">📱</span>
            QR Code Check
          </h1>
          <p className="qrcheck-subtitle">
            Scan or upload a QR code to check for phishing threats
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!decodedUrl && !scanMode && (
            <motion.div
              key="options"
              className="scan-options"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                className="scan-option-btn camera-btn"
                onClick={startCameraScan}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="option-icon">📷</span>
                <span>Use Camera</span>
              </motion.button>

              <motion.button
                className="scan-option-btn upload-btn"
                onClick={() => fileInputRef.current?.click()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="option-icon">📁</span>
                <span>Upload Image</span>
              </motion.button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            </motion.div>
          )}

          {scanMode === 'camera' && !decodedUrl && (
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
                onClick={stopCameraScan}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Stop Scanning
              </motion.button>
            </motion.div>
          )}

          {scanMode === 'upload' && !decodedUrl && (
            <motion.div
              key="upload"
              className="upload-section"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              {uploadedImage && (
                <div className="uploaded-image-container">
                  <img src={uploadedImage} alt="Uploaded QR code" className="uploaded-image" />
                  <div id="qr-reader-upload" style={{ display: 'none' }}></div>
                </div>
              )}
              {isScanning && (
                <div className="scanning-indicator">
                  <div className="loading-spinner"></div>
                  <p>Decoding QR code...</p>
                </div>
              )}
              <motion.button
                className="reset-btn"
                onClick={handleReset}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Another Image
              </motion.button>
            </motion.div>
          )}

          {decodedUrl && (
            <motion.div
              key="result"
              className="result-section"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
            >
              <div className="decoded-url-card">
                <div className="success-icon">✅</div>
                <h3 className="decoded-title">QR Code Decoded</h3>
                <div className="decoded-url">
                  <span className="url-label">URL:</span>
                  <span className="url-value">{decodedUrl}</span>
                </div>
                <div className="action-buttons">
                  <motion.button
                    className="analyze-btn"
                    onClick={handleAnalyze}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Analyze URL
                  </motion.button>
                  <motion.button
                    className="reset-btn"
                    onClick={handleReset}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Scan Another
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
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
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default QRCheck

