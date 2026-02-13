/**
 * API Service for Phish-Sense Backend
 * Handles all communication with Flask backend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

class PhishSenseAPI {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Make HTTP request to backend
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      // Replace "Failed to fetch" with a more user-friendly message
      if (error.message === 'Failed to fetch') {
        throw new Error('Server Error, Please run the backend server');
      }
      throw error;
    }
  }

  /**
   * Health check - verify API is running
   */
  async healthCheck() {
    return this.request('/api/health', {
      method: 'GET',
    });
  }

  /**
   * Analyze a URL for phishing and malware threats
   * 
   * @param {string} url - The URL to analyze
   * @returns {Promise<Object>} Analysis result with risk score and threats
   */
  async analyzeURL(url) {
    if (!url || typeof url !== 'string') {
      throw new Error('URL must be a non-empty string');
    }

    return this.request('/api/analyze/url', {
      method: 'POST',
      body: JSON.stringify({ url: url.trim() }),
    });
  }

  /**
   * Analyze multiple URLs in batch
   * 
   * @param {string[]} urls - Array of URLs to analyze (max 10)
   * @returns {Promise<Object>} Batch analysis results
   */
  async analyzeURLBatch(urls) {
    if (!Array.isArray(urls) || urls.length === 0) {
      throw new Error('URLs must be a non-empty array');
    }

    if (urls.length > 10) {
      throw new Error('Maximum 10 URLs allowed per batch');
    }

    return this.request('/api/analyze/batch', {
      method: 'POST',
      body: JSON.stringify({ urls }),
    });
  }

  /**
   * Analyze an image file
   * 
   * @param {File} file - Image file to analyze
   * @returns {Promise<Object>} Analysis result
   */
  async analyzeImage(file) {
    if (!file || !(file instanceof File)) {
      throw new Error('File must be a valid File object');
    }

    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.baseURL}/api/analyze/image`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error [/api/analyze/image]:', error);
      throw error;
    }
  }

  /**
   * Scan QR code from image
   * 
   * @param {File} imageFile - Image containing QR code
   * @returns {Promise<Object>} Extracted URL from QR code
   */
  async scanQRCode(imageFile) {
    if (!imageFile || !(imageFile instanceof File)) {
      throw new Error('Image must be a valid File object');
    }

    const formData = new FormData();
    formData.append('image', imageFile);

    const url = `${this.baseURL}/api/qr-scan`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error [/api/qr-scan]:', error);
      throw error;
    }
  }

  /**
   * Get general statistics
   * 
   * @returns {Promise<Object>} Statistics object
   */
  async getStats() {
    return this.request('/api/stats', {
      method: 'GET',
    });
  }
}

// Export singleton instance
export default new PhishSenseAPI();

// Also export the class for custom instances
export { PhishSenseAPI };
