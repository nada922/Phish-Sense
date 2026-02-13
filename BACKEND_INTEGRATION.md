# Phish-Sense: React Frontend & Flask Backend Integration

This guide walks you through integrating the React frontend with the Flask backend API.

## Project Structure

```
Phish-Sense/
├── api/                          # Flask Backend
│   ├── app.py                    # Main Flask application
│   ├── requirements.txt          # Python dependencies
│   ├── analysis/
│   │   ├── __init__.py
│   │   ├── url_analyzer.py       # URL analysis logic
│   │   └── image_analyzer.py     # Image/QR code analysis
│   └── .env                      # Backend configuration
│
├── src/                          # React Frontend
│   ├── services/
│   │   └── apiService.js         # API client for backend communication
│   └── ...
│
├── .env                          # Frontend environment variables
└── package.json
```

## Setup Instructions

### 1. Backend Setup (Flask)

#### Prerequisites
- Python 3.8+
- pip (Python package manager)

#### Installation Steps

1. **Navigate to the api directory:**
   ```bash
   cd "e:\PhishSense Graduation Project\Phish-Sense\api"
   ```

2. **Create a virtual environment (optional but recommended):**
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Flask server:**
   ```bash
   python app.py
   ```

   The server will start on `http://localhost:5000`

   Expected output:
   ```
   * Serving Flask app 'app'
   * Debug mode: on
   * Running on http://0.0.0.0:5000
   ```

### 2. Frontend Setup (React)

#### Prerequisites
- Node.js 16+ (includes npm)

#### Installation Steps

1. **Navigate to the project root:**
   ```bash
   cd "e:\PhishSense Graduation Project\Phish-Sense"
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Run the React development server:**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173` (or the port shown in terminal)

## API Endpoints

The Flask backend provides the following endpoints:

### Health Check
- **GET** `/api/health`
- Check if the API is running
- Response: `{ "status": "healthy", "service": "Phish-Sense Backend", "version": "1.0.0" }`

### URL Analysis
- **POST** `/api/analyze/url`
- Analyze a single URL for phishing threats
- Request: `{ "url": "https://example.com" }`
- Response: Analysis result with risk score, status, checks, and threats

### Batch URL Analysis
- **POST** `/api/analyze/batch`
- Analyze multiple URLs (max 10 per request)
- Request: `{ "urls": ["url1", "url2", ...] }`
- Response: Array of analysis results

### Image Analysis
- **POST** `/api/analyze/image`
- Analyze image file for threats
- Request: multipart/form-data with 'file' field
- Response: Image analysis result with risk score

### QR Code Scanning
- **POST** `/api/qr-scan`
- Extract URL from QR code image
- Request: multipart/form-data with 'image' field
- Response: `{ "url": "extracted_url" }`

### Get Statistics
- **GET** `/api/stats`
- Get general statistics
- Response: Statistics object with detection rate, response time, etc.

## Using the API Service

The frontend includes `src/services/apiService.js` which provides a convenient wrapper for all API calls:

```javascript
import apiService from '@/services/apiService';

// Analyze a URL
try {
  const result = await apiService.analyzeURL('https://example.com');
  console.log(result);
} catch (error) {
  console.error('Error:', error);
}

// Batch analyze URLs
const results = await apiService.analyzeURLBatch([
  'https://url1.com',
  'https://url2.com'
]);

// Analyze image
const imageResult = await apiService.analyzeImage(fileObject);

// Health check
const health = await apiService.healthCheck();
```

## Environment Configuration

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000
```

Update this URL in `.env` file for production:
- Local: `http://localhost:5000`
- Production: `https://your-backend-api.com`

### Backend (api/.env)
Create a `.env` file in the `api/` directory for backend configuration:
```env
FLASK_ENV=development
FLASK_DEBUG=true
```

## Running Both Services

### Option 1: Separate Terminals

**Terminal 1 - Backend:**
```bash
cd "e:\PhishSense Graduation Project\Phish-Sense\api"
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd "e:\PhishSense Graduation Project\Phish-Sense"
npm run dev
```

### Option 2: Using npm Scripts (requires setup)

Add to `package.json`:
```json
"scripts": {
  "dev": "vite",
  "dev:backend": "cd api && python app.py",
  "dev:all": "npm run dev:backend & npm run dev"
}
```

Then run: `npm run dev:all`

## Testing the Integration

1. **Start both servers** (Flask on port 5000, React on port 5173)
2. **Open browser** to `http://localhost:5173`
3. **Enter a URL** in the analysis box and click "Analyze"
4. **Verify** the API response appears with analysis results

### Debugging Tips

- **Check API is running**: Visit `http://localhost:5000/api/health` in browser
- **Check browser console**: (F12) for client-side errors
- **Check Flask terminal**: for server-side errors
- **Check network tab**: (F12 > Network) to see API requests

## CORS Configuration

The Flask backend is configured with CORS to accept requests from any origin:
```python
CORS(app, resources={r"/api/*": {"origins": "*", "methods": ["GET", "POST", "OPTIONS"]}})
```

For production, update the CORS configuration to restrict to your frontend domain:
```python
CORS(app, resources={
    r"/api/*": {
        "origins": ["https://yourdomain.com"],
        "methods": ["GET", "POST", "OPTIONS"]
    }
})
```

## Deployment

### Backend Deployment (Heroku Example)
1. Create a `Procfile` in `api/` directory:
   ```
   web: python app.py
   ```

2. Deploy to Heroku:
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

### Frontend Deployment (Vercel Example)
1. Update `.env` with production API URL
2. Deploy:
   ```bash
   npm run build
   vercel --prod
   ```

## Extending the Backend

To add new analysis features:

1. **Create new analyzer module** in `api/analysis/`
2. **Add new endpoint** in `app.py`
3. **Update apiService.js** with new method in frontend
4. **Call from React components**

Example:
```python
# api/analysis/custom_analyzer.py
class CustomAnalyzer:
    def analyze(self, data):
        # Your analysis logic
        return results

# app.py
from analysis.custom_analyzer import CustomAnalyzer

@app.route('/api/analyze/custom', methods=['POST'])
def analyze_custom():
    data = request.get_json()
    analyzer = CustomAnalyzer()
    result = analyzer.analyze(data)
    return jsonify(result), 200
```

## Troubleshooting

### "Cannot connect to backend"
- Ensure Flask server is running on port 5000
- Check `.env` file has correct `VITE_API_BASE_URL`
- Check firewall/antivirus isn't blocking connections

### CORS errors
- Flask CORS is configured, but verify the actual error
- Check browser console for exact CORS error message

### API returning 404
- Verify endpoint URL in apiService.js matches Flask routes
- Check Flask server and look for routing errors in terminal

### Port already in use
```bash
# Change Flask port in app.py
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)  # Change port here
```

Then update `.env`:
```env
VITE_API_BASE_URL=http://localhost:5001
```

## Next Steps

1. **Implement actual threat analysis** in `url_analyzer.py` and `image_analyzer.py`
2. **Integrate threat intelligence APIs** (VirusTotal, URLhaus, etc.)
3. **Add database** to store analysis history
4. **Implement user authentication**
5. **Add rate limiting** to prevent API abuse
6. **Setup logging** for monitoring

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Flask error logs in terminal
3. Check React console errors (F12)
4. Verify both services are running correctly
