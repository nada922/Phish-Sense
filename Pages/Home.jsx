import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Shield,
  Lock,
  Zap,
  CheckCircle2,
  ArrowRight,
  Globe,
  Brain,
  Users,
  Search,
  QrCode,
  Upload,
  AlertTriangle
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Home() {
  const [url, setUrl] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);

  const handleAnalyze = () => {
    if (url.trim()) {
      setIsAnalyzing(true);
      // Simulate analysis - replace with actual API call
      setTimeout(() => {
        // Mock analysis result - replace with actual API response
        const mockResult = {
          url: url,
          riskScore: Math.floor(Math.random() * 100),
          status: Math.random() > 0.6 ? 'Safe' : Math.random() > 0.3 ? 'Suspicious' : 'Dangerous',
          checks: {
            domainReputation: Math.floor(Math.random() * 100),
            sslCertificate: Math.floor(Math.random() * 100),
            urlPattern: Math.floor(Math.random() * 100),
            contentAnalysis: Math.floor(Math.random() * 100),
            visualSimilarity: Math.floor(Math.random() * 100)
          },
          threats: {
            phishing: Math.floor(Math.random() * 30),
            malware: Math.floor(Math.random() * 20),
            suspicious: Math.floor(Math.random() * 25),
            safe: Math.floor(Math.random() * 25) + 50
          }
        };
        setAnalysisResult(mockResult);
        setIsAnalyzing(false);
        
        // Scroll to results
        setTimeout(() => {
          document.getElementById('analysis-results')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }, 1500);
    }
  };

  const handleQRCodeClick = async () => {
    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera on mobile
      });
      
      // TODO: Implement QR code scanning logic
      // You can use libraries like html5-qrcode or jsQR
      console.log('Camera accessed for QR code scanning');
      
      // For now, just show an alert - you'll need to implement actual QR scanning
      alert('Camera access granted. QR code scanning functionality needs to be implemented.');
      
      // Stop the stream (you'll handle this in your QR scanner component)
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const handleImageImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Implement image analysis logic
      console.log('Image selected:', file.name);
      
      // You can read the file and extract URLs or analyze it
      const reader = new FileReader();
      reader.onload = (event) => {
        // Handle the image data
        console.log('Image loaded');
      };
      reader.readAsDataURL(file);
    }
  };

  const stats = [
    { value: '99.9%', label: 'Detection Rate' },
    { value: '<1ms', label: 'Response Time' },
    { value: '50M+', label: 'Sites Protected' },
    { value: '24/7', label: 'Monitoring' }
  ];

  const benefits = [
    {
      icon: Brain,
      title: 'AI-Powered Detection',
      description: 'Advanced machine learning algorithms analyze patterns in real-time'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get instant results with our optimized detection engine'
    },
    {
      icon: Lock,
      title: 'Complete Privacy',
      description: 'Your data is encrypted and never shared with third parties'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Protection against phishing attempts from anywhere in the world'
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            Powered by Advanced AI
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Stay Safe from
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Phishing Attacks
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Phish Sense protects you from malicious websites using cutting-edge
            machine learning to detect and block phishing attempts in real-time.
          </p>

          {/* What is Phishing */}
          <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-6 max-w-2xl mx-auto mb-12 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="bg-red-100 p-3 rounded-xl flex-shrink-0">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-slate-900 mb-2">
                  What is Phishing?
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Phishing is a cyber attack where criminals create fake websites
                  that look legitimate to steal your personal information, passwords,
                  and financial data. Phish Sense identifies these threats before they
                  harm you.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* URL Analysis Box */}
          <div className="max-w-2xl mx-auto mt-8 mb-8 px-4">
            <div className="flex gap-3 items-center">
              <div className="flex-1 flex gap-2 items-center bg-white/80 backdrop-blur-sm rounded-full border-2 border-slate-200 shadow-lg p-2 focus-within:border-blue-500 focus-within:shadow-blue-500/20 transition-all">
                <Input
                  type="url"
                  placeholder="Enter URL to analyze..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAnalyze();
                    }
                  }}
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base px-4 py-3"
                />
                <Button
                  onClick={handleAnalyze}
                  className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all px-6 py-3"
                  disabled={!url.trim() || isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Zap className="w-5 h-5 mr-2 animate-pulse" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Analyze
                    </>
                  )}
                </Button>
              </div>

              {/* QR Code Scanner Button */}
              <button
                onClick={handleQRCodeClick}
                className="p-3 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors text-blue-600 hover:text-blue-700 shadow-md hover:shadow-lg"
                title="Scan QR Code with Camera"
                type="button"
              >
                <QrCode className="w-6 h-6" />
              </button>

              {/* Image Upload Button */}
              <button
                onClick={handleImageImportClick}
                className="p-3 rounded-full bg-indigo-50 hover:bg-indigo-100 transition-colors text-indigo-600 hover:text-indigo-700 shadow-md hover:shadow-lg"
                title="Upload Image from PC"
                type="button"
              >
                <Upload className="w-6 h-6" />
              </button>
              
              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Results Section */}
      {analysisResult && (
        <section id="analysis-results" className="py-20 px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-7xl mx-auto">
            {/* Results Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Analysis Results
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Comprehensive security analysis for <span className="font-semibold text-blue-600 break-all">{analysisResult.url}</span>
              </p>
            </div>

            {/* Protection Level Card - Show Only One Based on Status */}
            <div className="max-w-4xl mx-auto mb-8">
              {analysisResult.status === 'Safe' && (
                <div className="bg-white rounded-2xl border-4 border-green-500 p-8 shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <div className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm mb-2">
                        Safe
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">Website is Safe</h3>
                      <p className="text-slate-600">Website passes all security checks</p>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="bg-green-50 rounded-xl p-4 mb-6 border border-green-200">
                    <div className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-slate-900">Allow access - Browse freely</span>
                    </div>
                  </div>

                  {/* Infographics */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Security Score Breakdown */}
                    <div className="bg-slate-50 rounded-xl p-4">
                      <h4 className="text-lg font-semibold text-slate-900 mb-3">Security Score</h4>
                      <div className="h-48">
                        <Bar
                          data={{
                            labels: ['Domain', 'SSL', 'URL', 'Content'],
                            datasets: [
                              {
                                label: 'Score',
                                data: [
                                  analysisResult.checks.domainReputation,
                                  analysisResult.checks.sslCertificate,
                                  analysisResult.checks.urlPattern,
                                  analysisResult.checks.contentAnalysis
                                ],
                                backgroundColor: [
                                  'rgba(34, 197, 94, 0.8)',
                                  'rgba(16, 185, 129, 0.8)',
                                  'rgba(5, 150, 105, 0.8)',
                                  'rgba(4, 120, 87, 0.8)'
                                ],
                                borderColor: [
                                  'rgba(34, 197, 94, 1)',
                                  'rgba(16, 185, 129, 1)',
                                  'rgba(5, 150, 105, 1)',
                                  'rgba(4, 120, 87, 1)'
                                ],
                                borderWidth: 2,
                                borderRadius: 6
                              }
                            ]
                          }}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: { display: false },
                              tooltip: {
                                callbacks: {
                                  label: function(context) {
                                    return `${context.parsed.y}% secure`;
                                  }
                                }
                              }
                            },
                            scales: {
                              y: {
                                beginAtZero: true,
                                max: 100,
                                ticks: {
                                  callback: function(value) {
                                    return value + '%';
                                  }
                                }
                              }
                            }
                          }}
                        />
                      </div>
                    </div>

                    {/* Overall Safety Score */}
                    <div className="bg-slate-50 rounded-xl p-4">
                      <h4 className="text-lg font-semibold text-slate-900 mb-3">Overall Safety</h4>
                      <div className="h-48">
                        <Doughnut
                          data={{
                            labels: ['Safe', 'Verified'],
                            datasets: [
                              {
                                data: [analysisResult.riskScore, 100 - analysisResult.riskScore],
                                backgroundColor: [
                                  'rgba(34, 197, 94, 0.8)',
                                  'rgba(226, 232, 240, 0.8)'
                                ],
                                borderColor: [
                                  'rgba(34, 197, 94, 1)',
                                  'rgba(226, 232, 240, 1)'
                                ],
                                borderWidth: 3
                              }
                            ]
                          }}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                position: 'bottom',
                                labels: { padding: 10, font: { size: 12 } }
                              },
                              tooltip: {
                                callbacks: {
                                  label: function(context) {
                                    return `${context.label}: ${context.parsed}%`;
                                  }
                                }
                              }
                            }
                          }}
                        />
                      </div>
                      <div className="text-center mt-2">
                        <span className="text-3xl font-bold text-green-600">{analysisResult.riskScore}%</span>
                        <p className="text-sm text-slate-600">Safety Score</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {analysisResult.status === 'Suspicious' && (
                <div className="bg-white rounded-2xl border-4 border-yellow-500 p-8 shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 shadow-lg">
                      <AlertTriangle className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <div className="inline-block px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-sm mb-2">
                        Suspicious
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">Warning: Some Red Flags Detected</h3>
                      <p className="text-slate-600">Proceed with caution - some security concerns found</p>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="bg-yellow-50 rounded-xl p-4 mb-6 border border-yellow-200">
                    <div className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-yellow-600" />
                      <span className="font-semibold text-slate-900">Warning displayed - Proceed with caution</span>
                    </div>
                  </div>

                  {/* Infographics */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Risk Factors */}
                    <div className="bg-slate-50 rounded-xl p-4">
                      <h4 className="text-lg font-semibold text-slate-900 mb-3">Risk Factors</h4>
                      <div className="h-48">
                        <Bar
                          data={{
                            labels: ['Domain', 'SSL', 'URL', 'Content'],
                            datasets: [
                              {
                                label: 'Risk Level',
                                data: [
                                  analysisResult.checks.domainReputation,
                                  analysisResult.checks.sslCertificate,
                                  analysisResult.checks.urlPattern,
                                  analysisResult.checks.contentAnalysis
                                ],
                                backgroundColor: [
                                  'rgba(251, 146, 60, 0.8)',
                                  'rgba(249, 115, 22, 0.8)',
                                  'rgba(234, 88, 12, 0.8)',
                                  'rgba(194, 65, 12, 0.8)'
                                ],
                                borderColor: [
                                  'rgba(251, 146, 60, 1)',
                                  'rgba(249, 115, 22, 1)',
                                  'rgba(234, 88, 12, 1)',
                                  'rgba(194, 65, 12, 1)'
                                ],
                                borderWidth: 2,
                                borderRadius: 6
                              }
                            ]
                          }}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: { display: false },
                              tooltip: {
                                callbacks: {
                                  label: function(context) {
                                    return `${context.parsed.y}% - ${context.parsed.y < 70 ? 'Needs attention' : 'Moderate risk'}`;
                                  }
                                }
                              }
                            },
                            scales: {
                              y: {
                                beginAtZero: true,
                                max: 100,
                                ticks: {
                                  callback: function(value) {
                                    return value + '%';
                                  }
                                }
                              }
                            }
                          }}
                        />
                      </div>
                    </div>

                    {/* Risk Distribution */}
                    <div className="bg-slate-50 rounded-xl p-4">
                      <h4 className="text-lg font-semibold text-slate-900 mb-3">Risk Assessment</h4>
                      <div className="h-48">
                        <Doughnut
                          data={{
                            labels: ['Safe', 'Suspicious', 'Risky'],
                            datasets: [
                              {
                                data: [
                                  analysisResult.threats.safe,
                                  analysisResult.threats.suspicious,
                                  analysisResult.threats.phishing
                                ],
                                backgroundColor: [
                                  'rgba(34, 197, 94, 0.8)',
                                  'rgba(251, 146, 60, 0.8)',
                                  'rgba(239, 68, 68, 0.8)'
                                ],
                                borderColor: [
                                  'rgba(34, 197, 94, 1)',
                                  'rgba(251, 146, 60, 1)',
                                  'rgba(239, 68, 68, 1)'
                                ],
                                borderWidth: 3
                              }
                            ]
                          }}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                position: 'bottom',
                                labels: { padding: 10, font: { size: 12 } }
                              },
                              tooltip: {
                                callbacks: {
                                  label: function(context) {
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = ((context.parsed / total) * 100).toFixed(1);
                                    return `${context.label}: ${percentage}%`;
                                  }
                                }
                              }
                            }
                          }}
                        />
                      </div>
                      <div className="text-center mt-2">
                        <span className="text-3xl font-bold text-yellow-600">{analysisResult.riskScore}%</span>
                        <p className="text-sm text-slate-600">Risk Score</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {analysisResult.status === 'Dangerous' && (
                <div className="bg-white rounded-2xl border-4 border-red-500 p-8 shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 shadow-lg">
                      <Shield className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <div className="inline-block px-4 py-2 rounded-full bg-red-100 text-red-700 font-semibold text-sm mb-2">
                        Dangerous
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">Phishing Threat Detected!</h3>
                      <p className="text-slate-600">Confirmed phishing attempt - Access blocked</p>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-200">
                    <div className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-red-600" />
                      <span className="font-semibold text-slate-900">Block access - Keep you safe</span>
                    </div>
                  </div>

                  {/* Infographics */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Threat Breakdown */}
                    <div className="bg-slate-50 rounded-xl p-4">
                      <h4 className="text-lg font-semibold text-slate-900 mb-3">Threat Indicators</h4>
                      <div className="h-48">
                        <Bar
                          data={{
                            labels: ['Domain', 'SSL', 'URL', 'Content'],
                            datasets: [
                              {
                                label: 'Threat Level',
                                data: [
                                  analysisResult.checks.domainReputation,
                                  analysisResult.checks.sslCertificate,
                                  analysisResult.checks.urlPattern,
                                  analysisResult.checks.contentAnalysis
                                ],
                                backgroundColor: [
                                  'rgba(239, 68, 68, 0.8)',
                                  'rgba(220, 38, 38, 0.8)',
                                  'rgba(185, 28, 28, 0.8)',
                                  'rgba(153, 27, 27, 0.8)'
                                ],
                                borderColor: [
                                  'rgba(239, 68, 68, 1)',
                                  'rgba(220, 38, 38, 1)',
                                  'rgba(185, 28, 28, 1)',
                                  'rgba(153, 27, 27, 1)'
                                ],
                                borderWidth: 2,
                                borderRadius: 6
                              }
                            ]
                          }}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: { display: false },
                              tooltip: {
                                callbacks: {
                                  label: function(context) {
                                    return `${context.parsed.y}% - High risk detected`;
                                  }
                                }
                              }
                            },
                            scales: {
                              y: {
                                beginAtZero: true,
                                max: 100,
                                ticks: {
                                  callback: function(value) {
                                    return value + '%';
                                  }
                                }
                              }
                            }
                          }}
                        />
                      </div>
                    </div>

                    {/* Threat Distribution */}
                    <div className="bg-slate-50 rounded-xl p-4">
                      <h4 className="text-lg font-semibold text-slate-900 mb-3">Threat Analysis</h4>
                      <div className="h-48">
                        <Doughnut
                          data={{
                            labels: ['Phishing', 'Malware', 'Suspicious', 'Safe'],
                            datasets: [
                              {
                                data: [
                                  analysisResult.threats.phishing,
                                  analysisResult.threats.malware,
                                  analysisResult.threats.suspicious,
                                  analysisResult.threats.safe
                                ],
                                backgroundColor: [
                                  'rgba(239, 68, 68, 0.8)',
                                  'rgba(220, 38, 38, 0.8)',
                                  'rgba(251, 146, 60, 0.8)',
                                  'rgba(34, 197, 94, 0.8)'
                                ],
                                borderColor: [
                                  'rgba(239, 68, 68, 1)',
                                  'rgba(220, 38, 38, 1)',
                                  'rgba(251, 146, 60, 1)',
                                  'rgba(34, 197, 94, 1)'
                                ],
                                borderWidth: 3
                              }
                            ]
                          }}
                          options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                              legend: {
                                position: 'bottom',
                                labels: { padding: 10, font: { size: 12 } }
                              },
                              tooltip: {
                                callbacks: {
                                  label: function(context) {
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = ((context.parsed / total) * 100).toFixed(1);
                                    return `${context.label}: ${percentage}%`;
                                  }
                                }
                              }
                            }
                          }}
                        />
                      </div>
                      <div className="text-center mt-2">
                        <span className="text-3xl font-bold text-red-600">{analysisResult.riskScore}%</span>
                        <p className="text-sm text-slate-600">Threat Level</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      <section className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Why Choose Phish Sense?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Enterprise-grade security made simple for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-slate-200 hover:border-blue-500 bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-6">
                  <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:from-blue-600 group-hover:to-indigo-600 transition-all">
                    <benefit.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-8">
            <CheckCircle2 className="w-4 h-4" />
            Trusted by Thousands
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Security You Can Trust
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12">
            Join thousands of users who protect themselves daily with Phish Sense's
            advanced detection technology
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <div className="text-3xl font-bold mb-2">1M+</div>
              <div className="text-slate-300">Active Users</div>
            </div>
            <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Shield className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <div className="text-3xl font-bold mb-2">100M+</div>
              <div className="text-slate-300">Threats Blocked</div>
            </div>
            <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Globe className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <div className="text-3xl font-bold mb-2">150+</div>
              <div className="text-slate-300">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Ready to Get Protected?
          </h2>
          <p className="text-xl text-slate-600 mb-10">
            Download Phish Sense now and start browsing with confidence
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all text-lg px-10 py-6 group"
          >
            Get Started for Free
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
    </div>
  );
}
