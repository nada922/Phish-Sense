import requests
from datetime import datetime
import re
from urllib.parse import urlparse
import logging

logger = logging.getLogger(__name__)


class URLAnalyzer:
    """Analyze URLs for phishing and malware threats"""
    
    def __init__(self):
        # You can integrate real threat intelligence APIs here
        # Examples: VirusTotal, URLhaus, PhishTank, etc.
        pass
    
    def analyze(self, url):
        """
        Analyze a URL and return threat analysis
        """
        try:
            # Validate URL format
            if not self._is_valid_url(url):
                return {
                    "url": url,
                    "riskScore": 95,
                    "status": "Dangerous",
                    "checks": {
                        "domainReputation": 10,
                        "sslCertificate": 15,
                        "urlPattern": 90,
                        "contentAnalysis": 0,
                        "visualSimilarity": 0
                    },
                    "threats": {
                        "phishing": 0,
                        "malware": 0,
                        "suspicious": 100,
                        "safe": 0
                    },
                    "details": "Invalid URL format",
                    "timestamp": datetime.now().isoformat()
                }
            
            # Run multiple checks
            checks = {
                "domainReputation": self._check_domain_reputation(url),
                "sslCertificate": self._check_ssl_certificate(url),
                "urlPattern": self._check_url_pattern(url),
                "contentAnalysis": self._check_content_analysis(url),
                "visualSimilarity": self._check_visual_similarity(url)
            }
            
            # Calculate risk score
            risk_score = self._calculate_risk_score(checks)
            
            # Categorize threats
            threats = self._categorize_threats(checks, risk_score)
            
            # Determine status
            if risk_score >= 70:
                status = "Dangerous"
            elif risk_score >= 40:
                status = "Suspicious"
            else:
                status = "Safe"
            
            return {
                "url": url,
                "riskScore": risk_score,
                "status": status,
                "checks": checks,
                "threats": threats,
                "details": self._get_details(checks, status),
                "timestamp": datetime.now().isoformat()
            }
        
        except Exception as e:
            logger.error(f"Error analyzing URL {url}: {str(e)}")
            return {
                "url": url,
                "riskScore": 50,
                "status": "Suspicious",
                "checks": {
                    "domainReputation": 50,
                    "sslCertificate": 50,
                    "urlPattern": 50,
                    "contentAnalysis": 50,
                    "visualSimilarity": 50
                },
                "threats": {
                    "phishing": 25,
                    "malware": 25,
                    "suspicious": 25,
                    "safe": 25
                },
                "details": "Error during analysis",
                "timestamp": datetime.now().isoformat()
            }
    
    def _is_valid_url(self, url):
        """Check if URL has valid format"""
        try:
            result = urlparse(url)
            return all([result.scheme, result.netloc])
        except:
            return False
    
    def _check_domain_reputation(self, url):
        """Check domain reputation (0-100, higher = riskier)"""
        try:
            # TODO: Integrate with threat intelligence APIs
            # For now, return a simulated score
            domain = urlparse(url).netloc
            
            # Check for suspicious patterns
            suspicious_keywords = ['verify', 'update', 'confirm', 'reset', 'login', 'secure', 'account']
            if any(keyword in domain.lower() for keyword in suspicious_keywords):
                return 65
            
            return 20
        except:
            return 50
    
    def _check_ssl_certificate(self, url):
        """Check SSL certificate validity (0-100, higher = riskier)"""
        try:
            if not url.startswith('https'):
                return 70  # High risk if no HTTPS
            
            # TODO: Validate SSL certificate
            return 10
        except:
            return 50
    
    def _check_url_pattern(self, url):
        """Check for suspicious URL patterns (0-100, higher = riskier)"""
        score = 0
        
        # Check for unusual characters
        if re.search(r'[^a-zA-Z0-9.-]', urlparse(url).netloc):
            score += 20
        
        # Check for IP address instead of domain
        if re.match(r'https?://\d+\.\d+\.\d+\.\d+', url):
            score += 40
        
        # Check for long URL
        if len(url) > 100:
            score += 15
        
        # Check for URL shortener
        shorteners = ['bit.ly', 'tinyurl.com', 'short.link', 'goo.gl']
        if any(shortener in url.lower() for shortener in shorteners):
            score += 30
        
        # Check for suspicious special characters in path
        if '%' in url or '@' in url:
            score += 25
        
        return min(score, 100)
    
    def _check_content_analysis(self, url):
        """Analyze page content (0-100, higher = riskier)"""
        try:
            # TODO: Fetch and analyze page content
            # Check for phishing forms, malicious scripts, etc.
            return 15
        except:
            return 50
    
    def _check_visual_similarity(self, url):
        """Check visual similarity to known phishing sites (0-100)"""
        try:
            # TODO: Use screenshot comparison or ML models
            return 10
        except:
            return 0
    
    def _calculate_risk_score(self, checks):
        """Calculate overall risk score from checks"""
        weights = {
            "domainReputation": 0.25,
            "sslCertificate": 0.20,
            "urlPattern": 0.25,
            "contentAnalysis": 0.20,
            "visualSimilarity": 0.10
        }
        
        score = sum(checks[key] * weights[key] for key in checks)
        return min(int(score), 100)
    
    def _categorize_threats(self, checks, risk_score):
        """Categorize threats based on checks"""
        phishing_score = (checks["domainReputation"] + checks["urlPattern"] + checks["visualSimilarity"]) // 3
        malware_score = (checks["contentAnalysis"] + checks["sslCertificate"]) // 2
        suspicious_score = max(0, min(50, risk_score // 2))
        safe_score = max(0, 100 - risk_score)
        
        total = phishing_score + malware_score + suspicious_score + safe_score
        
        return {
            "phishing": int((phishing_score / total) * 100) if total > 0 else 0,
            "malware": int((malware_score / total) * 100) if total > 0 else 0,
            "suspicious": int((suspicious_score / total) * 100) if total > 0 else 0,
            "safe": int((safe_score / total) * 100) if total > 0 else 0
        }
    
    def _get_details(self, checks, status):
        """Generate detailed analysis summary"""
        if status == "Dangerous":
            return "This URL shows multiple signs of phishing or malware. Do not visit."
        elif status == "Suspicious":
            return "This URL has some suspicious characteristics. Proceed with caution."
        else:
            return "This URL appears to be safe based on our analysis."
