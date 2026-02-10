from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from datetime import datetime
import logging

# Import analysis modules
from analysis.url_analyzer import URLAnalyzer
from analysis.image_analyzer import ImageAnalyzer

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"]}})

# Initialize analyzers
url_analyzer = URLAnalyzer()
image_analyzer = ImageAnalyzer()

# CONSTANTS
API_VERSION = "1.0.0"


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "service": "Phish-Sense Backend",
        "version": API_VERSION,
        "timestamp": datetime.now().isoformat()
    }), 200


@app.route('/api/analyze/url', methods=['POST'])
def analyze_url():
    """
    Analyze a URL for phishing and malware threats
    
    Expected JSON:
    {
        "url": "https://example.com"
    }
    
    Returns:
    {
        "url": str,
        "riskScore": int (0-100),
        "status": "Safe" | "Suspicious" | "Dangerous",
        "checks": {
            "domainReputation": int,
            "sslCertificate": int,
            "urlPattern": int,
            "contentAnalysis": int,
            "visualSimilarity": int
        },
        "threats": {
            "phishing": int,
            "malware": int,
            "suspicious": int,
            "safe": int
        },
        "details": str,
        "timestamp": str
    }
    """
    try:
        data = request.get_json()
        
        if not data or 'url' not in data:
            return jsonify({"error": "URL is required"}), 400
        
        url = data['url'].strip()
        
        if not url:
            return jsonify({"error": "URL cannot be empty"}), 400
        
        # Analyze the URL
        result = url_analyzer.analyze(url)
        
        return jsonify(result), 200
    
    except Exception as e:
        logger.error(f"Error analyzing URL: {str(e)}")
        return jsonify({"error": "Internal server error", "message": str(e)}), 500


@app.route('/api/analyze/image', methods=['POST'])
def analyze_image():
    """
    Analyze an image for malware and threats
    
    Expected: multipart/form-data with 'file' field
    
    Returns:
    {
        "filename": str,
        "riskScore": int (0-100),
        "threats": list,
        "details": str,
        "timestamp": str
    }
    """
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file provided"}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        
        # Check file extension
        allowed_extensions = {'png', 'jpg', 'jpeg', 'gif', 'bmp'}
        if not file.filename.lower().split('.')[-1] in allowed_extensions:
            return jsonify({"error": "Invalid file format"}), 400
        
        # Analyze the image
        result = image_analyzer.analyze(file)
        
        return jsonify(result), 200
    
    except Exception as e:
        logger.error(f"Error analyzing image: {str(e)}")
        return jsonify({"error": "Internal server error", "message": str(e)}), 500


@app.route('/api/analyze/batch', methods=['POST'])
def analyze_batch():
    """
    Analyze multiple URLs in batch
    
    Expected JSON:
    {
        "urls": ["url1", "url2", "url3"]
    }
    """
    try:
        data = request.get_json()
        
        if not data or 'urls' not in data:
            return jsonify({"error": "URLs array is required"}), 400
        
        urls = data['urls']
        
        if not isinstance(urls, list) or len(urls) == 0:
            return jsonify({"error": "URLs must be a non-empty array"}), 400
        
        if len(urls) > 10:
            return jsonify({"error": "Maximum 10 URLs allowed per batch"}), 400
        
        # Analyze each URL
        results = []
        for url in urls:
            result = url_analyzer.analyze(url.strip())
            results.append(result)
        
        return jsonify({
            "count": len(results),
            "results": results,
            "timestamp": datetime.now().isoformat()
        }), 200
    
    except Exception as e:
        logger.error(f"Error analyzing batch: {str(e)}")
        return jsonify({"error": "Internal server error", "message": str(e)}), 500


@app.route('/api/qr-scan', methods=['POST'])
def qr_scan():
    """
    Process QR code image and extract URL
    
    Expected: multipart/form-data with 'image' field
    """
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image provided"}), 400
        
        image_file = request.files['image']
        
        if image_file.filename == '':
            return jsonify({"error": "No image selected"}), 400
        
        # Extract URL from QR code
        url = image_analyzer.extract_qr_code(image_file)
        
        if not url:
            return jsonify({"error": "No QR code found in image"}), 400
        
        return jsonify({
            "url": url,
            "timestamp": datetime.now().isoformat()
        }), 200
    
    except Exception as e:
        logger.error(f"Error scanning QR code: {str(e)}")
        return jsonify({"error": "Internal server error", "message": str(e)}), 500


@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get general statistics"""
    return jsonify({
        "detectionRate": 99.9,
        "responseTime": "<1ms",
        "sitesProtected": 50000000,
        "monitoring": "24/7"
    }), 200


@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404


@app.errorhandler(500)
def server_error(error):
    return jsonify({"error": "Internal server error"}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
