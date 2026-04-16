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
            normalized_url = self._normalize_url(url)
            baseline_risk, baseline_reasons = self._apply_baseline_rules(normalized_url)

            # Call the AI Model server
            ai_result = self._call_ai_model(normalized_url)

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
                    "domainReputation": self._check_domain_reputation(normalized_url),
                    "sslCertificate":   self._check_ssl_certificate(normalized_url),
                    "urlPattern":       self._check_url_pattern(normalized_url),
                    "contentAnalysis":  15,
                    "visualSimilarity": 10,
                }
                risk_score = self._calculate_risk_score(checks)
                label      = "Phishing" if risk_score >= 70 else ("Suspicious" if risk_score >= 40 else "Safe")
                confidence = risk_score

            # Enforce baseline heuristic floor for clearly suspicious/malformed URLs.
            if baseline_risk > risk_score:
                risk_score = baseline_risk
                checks["urlPattern"] = max(checks.get("urlPattern", 0), min(100, baseline_risk))
                if baseline_risk >= 70:
                    label = "Phishing"

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
                "details":         self._get_details(checks, status, ai_result, baseline_reasons),
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
            parsed = urlparse(url)
            domain = (parsed.hostname or "").lower()
            if not domain:
                return 80

            score = 10
            suspicious_keywords = [
                'verify', 'update', 'confirm', 'reset', 'login', 'secure', 'account',
                'wallet', 'recover', 'password', 'signin', 'auth'
            ]

            if any(kw in domain for kw in suspicious_keywords):
                score += 45
            if domain.startswith("xn--"):
                score += 30
            if domain.count('-') >= 3:
                score += 20
            if len(domain.split('.')) > 4:
                score += 20

            return min(score, 100)
        except Exception:
            return 50

    def _check_ssl_certificate(self, url):
        return 70 if not url.startswith('https') else 10

    def _check_url_pattern(self, url):
        score = 0
        parsed = urlparse(url)
        netloc = parsed.netloc
        path_and_query = f"{parsed.path}?{parsed.query}".lower()

        if re.search(r'[^a-zA-Z0-9.-]', netloc):
            score += 20
        if re.match(r'https?://\d+\.\d+\.\d+\.\d+', url):
            score += 40
        if len(url) > 100:
            score += 15
        if any(s in url.lower() for s in ['bit.ly', 'tinyurl.com', 't.co']):
            score += 30
        if "@" in url:
            score += 30
        if url.count("//") > 1:
            score += 20
        if re.search(r'(login|verify|secure|update|confirm|password|signin)', path_and_query):
            score += 20
        if parsed.query.count('=') > 4:
            score += 10
        return min(score, 100)

    def _calculate_risk_score(self, checks):
        weights = {"domainReputation": 0.3, "sslCertificate": 0.2, "urlPattern": 0.5}
        score = sum(checks.get(k, 0) * weights.get(k, 0) for k in weights)
        return min(int(score), 100)

    def _normalize_url(self, url):
        """Ensure URL has a scheme so parsing is consistent."""
        normalized = (url or "").strip()
        if normalized and not re.match(r'^https?://', normalized, flags=re.IGNORECASE):
            normalized = f"http://{normalized}"
        return normalized

    def _apply_baseline_rules(self, url):
        """
        Return minimum risk and reasons for malformed/obviously suspicious URLs.
        This prevents clear phishing patterns from being marked Safe.
        """
        reasons = []
        try:
            parsed = urlparse(url)
            hostname = (parsed.hostname or "").lower()

            if parsed.scheme not in ("http", "https"):
                reasons.append("Unsupported URL scheme")
            if not hostname:
                reasons.append("Missing hostname")
            if ' ' in url:
                reasons.append("URL contains spaces")
            if "@" in url:
                reasons.append("Contains @ redirection pattern")
            if hostname and '.' not in hostname and hostname != "localhost":
                reasons.append("Hostname is not fully qualified")
            if hostname and re.search(r'(paypa[l1]|g00gle|micr0soft|amaz0n|faceb00k)', hostname):
                reasons.append("Possible typosquatting domain")
            if re.search(r'(login|verify|secure|update|confirm|reset|password)', url.lower()):
                reasons.append("Credential-themed URL pattern detected")

            if not reasons:
                return 0, []

            if "Missing hostname" in reasons or "Unsupported URL scheme" in reasons:
                return 85, reasons
            if "Possible typosquatting domain" in reasons:
                return 80, reasons
            if "Contains @ redirection pattern" in reasons:
                return 75, reasons
            return 55, reasons
        except Exception:
            return 70, ["URL parsing failed"]

    def _get_details(self, checks, status, ai_result, baseline_reasons=None):
        baseline_reasons = baseline_reasons or []
        if "error" not in ai_result:
            label      = ai_result.get("label", "Safe")
            confidence = ai_result.get("confidence", 0)
            risk       = ai_result.get("riskScore", 0)
            detail = (
                f"AI Model Prediction: {label} "
                f"(Confidence: {confidence}% | Risk Score: {risk}%). "
                f"Analysis powered by XGBoost classifier."
            )
            if baseline_reasons:
                detail += " Rule-based safeguards triggered: " + "; ".join(baseline_reasons) + "."
            return detail
        if status == "Dangerous":
            detail = "Heuristic flags: High risk patterns detected in URL or domain reputation."
        else:
            detail = "URL appears mostly safe based on heuristic checks."
        if baseline_reasons:
            detail += " Rule-based safeguards triggered: " + "; ".join(baseline_reasons) + "."
        return detail
