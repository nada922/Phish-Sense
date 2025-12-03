from flask import Flask, request, jsonify
from flask_cors import CORS # Needed for React to connect to Flask
import joblib 
import pandas as pd
import numpy as np

app = Flask(__name__)
# Enable CORS to allow your React app (running on a different port) to access this API
CORS(app) 

# --- 1. Model Loading (Currently Disabled - Placeholder) ---
# When you train your model and save it (e.g., as 'phishing_model.pkl'), 
# you will uncomment and use this section.
model = None 
# try:
#     # REPLACE 'phishing_model.pkl' with your actual saved model file name
#     model = joblib.load('phishing_model.pkl') 
#     print("✅ AI Model loaded successfully.")
# except Exception as e:
#     print(f"⚠️ Warning: Model failed to load. Running with placeholder logic.")


# --- 2. Placeholder Prediction Function ---
def predict_phishing(url_to_analyze):
    """
    Placeholder logic to check if a URL is phishing.
    This will be replaced by your actual model prediction code later.
    """
    url = url_to_analyze.lower()
    
    # Simple check: if "login" or "verify" is in the URL, flag it as phishing
    if "login" in url or "verify" in url or "secure" not in url:
        return "Phishing Link", 1 # Phishing
    else:
        return "Safe Link", 0 # Safe

# --- 3. Define the API Endpoint ---
@app.route('/api/analyze', methods=['POST'])
def analyze_url():
    # Get the JSON data sent from the React application
    data = request.get_json()
    url = data.get('url', '').strip()

    if not url:
        return jsonify({"error": "No URL provided for analysis."}), 400

    # Use the prediction function
    result_status, prediction_value = predict_phishing(url)
    
    # Return the result back to the React front-end
    print(f"Flask Result for {url}: Status {result_status}, Phishing {prediction_value}")
    return jsonify({
        "url": url,
        "status": result_status,
        "is_phishing": bool(prediction_value) 
        
    })

# --- 4. Run the App ---
if __name__ == '__main__':
    # Flask will run on port 5000, separate from your React app (e.g., 5173)
    print("Starting Flask server on http://127.0.0.1:5000")
    app.run(debug=True, port=5000, host='0.0.0.0') # <-- Add host='0.0.0.0'