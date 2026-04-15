import requests
from datetime import datetime
import re
from urllib.parse import urlparse
import logging

logger = logging.getLogger(__name__)


class URLAnalyzer:
    """Analyze URLs for phishing threats using the XGBoost AI model (port 5001)."""

    def __init__(self):
        # AI Model API endpoint (running from ai_model_server.py)
        self.ai_api_url = "http://localhost:5001/predict"

    def analyze(self, url):
        """
        Analyze a URL and return threat analysis with real AI model data.
        """
        try:
            # Call the AI Model server
            ai_result = self._call_ai_model(url)

            if "error" not in ai_result:
                # ── Real AI model data is available ───────────────────────────
                features   = ai_result.get("features", {})
                risk_score = ai_result.get("riskScore", 0)
                label      = ai_result.get("label", "Safe")
                confidence = ai_result.get("confidence", 0)

                # Map the 16 XGBoost features into 4 chart categories (0-100 risk scale).
                # Higher value = more risky.

                # Domain Reputation: IP in URL, @ sign, DNS record, prefix/suffix hyphen
                domain_risk = (
                    features.get("Having_IP",    0) * 30 +
                    features.get("At_Sign",       0) * 25 +
                    features.get("DNS_Record",    0) * 30 +
                    features.get("Prefix_Suffix", 0) * 15
                )

                # SSL Certificate: no HTTPS = high risk; TinyURL shorteners add risk
                ssl_risk = (
                    (1 - features.get("HTTPS_Domain", 0)) * 70 +
                    features.get("TinyURL", 0) * 30
                )

                # URL Pattern: length, depth, redirection, shortener services
                url_risk = (
                    features.get("URL_Length",  0) * 20 +
                    features.get("URL_Depth",   0) * 10 +
                    features.get("Redirection", 0) * 40 +
                    features.get("TinyURL",     0) * 30
                )

                # Content Analysis: iframe injection, mouseover tricks, right-click, forwards
                content_risk = (
                    features.get("iFrame",       0) * 30 +
                    features.get("Mouse_Over",   0) * 25 +
                    features.get("Right_Click",  0) * 20 +
                    features.get("Web_Forwards", 0) * 25
                )

                checks = {
                    "domainReputation": min(int(domain_risk),  100),
                    "sslCertificate":   min(int(ssl_risk),     100),
                    "urlPattern":       min(int(url_risk),     100),
                    "contentAnalysis":  min(int(content_risk), 100),
                    "visualSimilarity": int(confidence) if label == "Phishing" else 0,
                }

            else:
                # ── Fallback: AI server is down – use lightweight heuristics ──
                logger.warning(
                    f"AI Model Server unavailable: {ai_result.get('message')}. "
                    "Falling back to heuristics."
                )
                checks = {
                    "domainReputation": self._check_domain_reputation(url),
                    "sslCertificate":   self._check_ssl_certificate(url),
                    "urlPattern":       self._check_url_pattern(url),
                    "contentAnalysis":  15,
                    "visualSimilarity": 10,
                }
                risk_score = self._calculate_risk_score(checks)
                label      = "Phishing" if risk_score >= 70 else ("Suspicious" if risk_score >= 40 else "Safe")
                confidence = risk_score

            # Determine status from risk score
            if risk_score >= 70:
                status = "Dangerous"
            elif risk_score >= 40:
                status = "Suspicious"
            else:
                status = "Safe"

            # Threat breakdown for the doughnut chart
            threats = {
                "phishing":   checks["domainReputation"],
                "malware":    checks["sslCertificate"],
                "suspicious": checks["urlPattern"],
                "safe":       max(0, 100 - int(risk_score)),
            }

            return {
                "url":             url,
                "riskScore":       int(risk_score),
                "status":          status,
                "label":           label,
                "confidence":      confidence,
                "checks":          checks,
                "threats":         threats,
                "details":         self._get_details(checks, status, ai_result),
                "timestamp":       datetime.now().isoformat(),
                "ai_model_active": "error" not in ai_result,
            }

        except Exception as e:
            logger.error(f"Error analyzing URL {url}: {str(e)}")
            return {
                "url":       url,
                "riskScore": 50,
                "status":    "Suspicious",
                "checks":    {"error": True},
                "details":   f"Error during analysis: {str(e)}",
                "timestamp": datetime.now().isoformat(),
            }

    def _call_ai_model(self, url):
        """Call the XGBoost AI API running on port 5001."""
        try:
            response = requests.post(self.ai_api_url, json={"url": url}, timeout=30)
            if response.status_code == 200:
                return response.json()
            return {"error": True, "message": f"API returned status {response.status_code}"}
        except Exception as e:
            return {"error": True, "message": str(e)}

    # ── Heuristic fallbacks (only used when AI server is unavailable) ──────────

    def _check_domain_reputation(self, url):
        try:
            domain = urlparse(url).netloc
            suspicious_keywords = ['verify', 'update', 'confirm', 'reset', 'login', 'secure', 'account']
            if any(kw in domain.lower() for kw in suspicious_keywords):
                return 65
            return 20
        except Exception:
            return 50

    def _check_ssl_certificate(self, url):
        return 70 if not url.startswith('https') else 10

    def _check_url_pattern(self, url):
        score = 0
        if re.search(r'[^a-zA-Z0-9.-]', urlparse(url).netloc):
            score += 20
        if re.match(r'https?://\d+\.\d+\.\d+\.\d+', url):
            score += 40
        if len(url) > 100:
            score += 15
        if any(s in url.lower() for s in ['bit.ly', 'tinyurl.com', 't.co']):
            score += 30
        return min(score, 100)

    def _calculate_risk_score(self, checks):
        weights = {"domainReputation": 0.3, "sslCertificate": 0.2, "urlPattern": 0.5}
        score = sum(checks.get(k, 0) * weights.get(k, 0) for k in weights)
        return min(int(score), 100)

    def _get_details(self, checks, status, ai_result):
        if "error" not in ai_result:
            label      = ai_result.get("label", "Safe")
            confidence = ai_result.get("confidence", 0)
            risk       = ai_result.get("riskScore", 0)
            return (
                f"AI Model Prediction: {label} "
                f"(Confidence: {confidence}% | Risk Score: {risk}%). "
                f"Analysis powered by XGBoost classifier."
            )
        if status == "Dangerous":
            return "Heuristic flags: High risk patterns detected in URL or domain reputation."
        return "URL appears mostly safe based on heuristic checks."
