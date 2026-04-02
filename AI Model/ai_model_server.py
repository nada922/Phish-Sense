"""
PhishSense – XGBoost AI Model API Server
Runs on: http://localhost:5001

Endpoints:
  POST /predict  – { "url": "..." }  → { url, label, confidence, riskScore, timestamp }
  GET  /health   – { status, model, xgboost_version }
"""

import pickle
import numpy as np
import ipaddress
import re
import requests as req
import urllib.parse
import whois
import logging
import os
from urllib.parse import urlparse
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
import xgboost as xgb

# ── Logging ───────────────────────────────────────────────────────────────────
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("phishsense-ai")

logger.info(f"XGBoost version: {xgb.__version__}")

# ── Model Path Configuration ──────────────────────────────────────────────────
# We prefer the JSON-format model (rescued from the old pickle),
# but fall back to the raw rescue.bin if JSON is absent.
_BASE = os.path.dirname(os.path.abspath(__file__))
_JSON_MODEL  = os.path.join(_BASE, "rescued_model.json")
_BIN_MODEL   = os.path.join(_BASE, "temp_rescue.bin")
_PICKLE_MODEL = os.path.join(_BASE, "XGBoostClassifier.pickle.dat")

def load_model():
    """Try every known format until one works."""
    
    # 1. JSON format (saved by fix_model.py / previous rescue) – most reliable
    if os.path.exists(_JSON_MODEL):
        try:
            m = xgb.XGBClassifier()
            m.load_model(_JSON_MODEL)
            logger.info(f"✅ Model loaded from JSON: {_JSON_MODEL}")
            return m
        except Exception as e:
            logger.warning(f"JSON load failed: {e}")

    # 2. Raw binary rescue file
    if os.path.exists(_BIN_MODEL):
        try:
            m = xgb.XGBClassifier()
            m.load_model(_BIN_MODEL)
            logger.info(f"✅ Model loaded from rescue.bin")
            return m
        except Exception as e:
            logger.warning(f"rescue.bin load failed: {e}")

    # 3. Standard pickle (may fail on Python 3.14 with old xgboost)
    if os.path.exists(_PICKLE_MODEL):
        try:
            with open(_PICKLE_MODEL, "rb") as f:
                m = pickle.load(f)
            logger.info(f"✅ Model loaded from pickle")
            return m
        except Exception as e:
            logger.warning(f"Pickle load failed: {e}")

    return None


model = load_model()

if model is None:
    logger.error("❌ CRITICAL: Could not load the model. Exiting.")
    import sys
    sys.exit(1)

# n_features_in_ is a read-only property in XGBoost 3.x; just log it if available
_n_feat = getattr(model, 'n_features_in_', 16)
logger.info(f"✅ Model ready — features expected: {_n_feat}")


# ═══════════════════════════════════════════════════════════════════════════════
# Feature Extraction  (16 features, same order as training)
# ═══════════════════════════════════════════════════════════════════════════════

def havingIP(url):
    try:
        ipaddress.ip_address(urlparse(url).netloc)
        return 1
    except:
        return 0

def haveAtSign(url):   return 1 if "@" in url else 0
def getLength(url):    return 0 if len(url) < 54 else 1
def getDepth(url):     return sum(1 for s in urlparse(url).path.split('/') if s)
def redirection(url):  return 1 if url.rfind('//') > 7 else 0
def httpDomain(url):   return 1 if 'https' in urlparse(url).netloc else 0
def tinyURL(url):      return 1 if re.search(r"bit\.ly|goo\.gl|shorte\.st|tinyurl|ow\.ly|t\.co", url) else 0
def prefixSuffix(url): return 1 if '-' in urlparse(url).netloc else 0

def domainAge(domain_name):
    try:
        creation_date   = domain_name.creation_date
        expiration_date = domain_name.expiration_date
        if isinstance(creation_date,   list): creation_date   = creation_date[0]
        if isinstance(expiration_date, list): expiration_date = expiration_date[0]
        age_days = abs((expiration_date - creation_date).days)
        return 1 if (age_days / 30) < 6 else 0
    except:
        return 1

def domainEnd(domain_name):
    try:
        expiration_date = domain_name.expiration_date
        if isinstance(expiration_date, list): expiration_date = expiration_date[0]
        end = abs((expiration_date.replace(tzinfo=None) - datetime.now()).days)
        return 1 if (end / 30) < 6 else 0
    except:
        return 1


def extract_features(url):
    # Fetch page HTML (best-effort)
    html = ""
    try:
        r = req.get(url, timeout=5, headers={'User-Agent': 'Mozilla/5.0'})
        html = r.text
    except Exception:
        pass

    # WHOIS lookup (best-effort)
    dns = 0
    domain_name = None
    try:
        domain_name = whois.whois(urlparse(url).netloc)
    except Exception:
        dns = 1

    features = [
        havingIP(url),                                    # 0  Having_IP_Address
        haveAtSign(url),                                  # 1  Having_At_Symbol
        getLength(url),                                   # 2  URL_Length
        getDepth(url),                                    # 3  URL_Depth
        redirection(url),                                 # 4  Redirection
        httpDomain(url),                                  # 5  HTTPS_in_Domain
        tinyURL(url),                                     # 6  TinyURL
        prefixSuffix(url),                                # 7  Prefix/Suffix
        dns,                                              # 8  DNS_Record
        1,                                                # 9  Web_Traffic (placeholder)
        1 if dns == 1 else domainAge(domain_name),        # 10 Domain_Age
        1 if dns == 1 else domainEnd(domain_name),        # 11 Domain_End
        1 if "<iframe"        in html.lower() else 0,     # 12 iFrame
        1 if "onmouseover"    in html.lower() else 0,     # 13 Mouse_Over
        1 if "event.button==2" in html.lower() else 0,   # 14 Right_Click
        1 if "window.location" in html.lower() else 0,   # 15 Web_Forwards
    ]
    return features


def predict(url):
    feat = extract_features(url)
    X = np.array(feat, dtype=float).reshape(1, -1)

    if hasattr(model, 'predict_proba'):
        prob       = model.predict_proba(X)[0]
        prediction = int(np.argmax(prob))
    else:
        # Raw Booster fallback
        dm       = xgb.DMatrix(X)
        prob_val = model.predict(dm)[0]
        if isinstance(prob_val, (float, np.floating)):
            prediction = 1 if prob_val > 0.5 else 0
            prob = [1 - float(prob_val), float(prob_val)]
        else:
            prediction = int(np.argmax(prob_val))
            prob = prob_val

    confidence = round(float(prob[prediction]) * 100, 2)
    features_dict = {
        "Having_IP": feat[0], "At_Sign": feat[1], "URL_Length": feat[2],
        "URL_Depth": feat[3], "Redirection": feat[4], "HTTPS_Domain": feat[5],
        "TinyURL": feat[6], "Prefix_Suffix": feat[7], "DNS_Record": feat[8],
        "Web_Traffic": feat[9], "Domain_Age": feat[10], "Domain_End": feat[11],
        "iFrame": feat[12], "Mouse_Over": feat[13], "Right_Click": feat[14],
        "Web_Forwards": feat[15],
    }
    return {
        "url":        url,
        "label":      "Phishing" if prediction == 1 else "Safe",
        "confidence": confidence,
        "riskScore":  round(float(prob[1]) * 100, 2),
        "features":   features_dict,
        "timestamp":  datetime.now().isoformat(),
    }


# ═══════════════════════════════════════════════════════════════════════════════
# Flask API
# ═══════════════════════════════════════════════════════════════════════════════

app = Flask(__name__)
CORS(app)


@app.route('/predict', methods=['POST'])
def api_predict():
    data = request.get_json()
    if not data or 'url' not in data:
        return jsonify({"error": "URL missing in request body"}), 400
    try:
        result = predict(data['url'])
        return jsonify(result), 200
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        return jsonify({"error": str(e)}), 500


@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "status":          "ready",
        "model":           str(type(model).__name__),
        "xgboost_version": xgb.__version__,
        "features":        getattr(model, 'n_features_in_', 16),
    }), 200


if __name__ == '__main__':
    logger.info("🚀 PhishSense AI Server starting on http://0.0.0.0:5001")
    app.run(host='0.0.0.0', port=5001, debug=False)
