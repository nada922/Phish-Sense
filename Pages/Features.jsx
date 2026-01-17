import React from 'react';
import {
  Shield,
  Zap,
  Brain,
  Lock,
  Eye,
  Bell,
  Database,
  CheckCircle2,
  Smartphone,
  Cloud,
  RefreshCw,
  Award
} from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Brain,
      title: 'Machine Learning Analysis',
      description:
        'Our advanced AI algorithms continuously learn from new phishing patterns, staying ahead of emerging threats with 99.9% accuracy.',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Zap,
      title: 'Real-Time Detection',
      description:
        'Instant analysis of websites as you browse. Get immediate alerts within milliseconds before any harm is done.',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Shield,
      title: 'Multi-Layer Protection',
      description:
        'Comprehensive security with URL analysis, SSL verification, domain reputation checks, and content inspection.',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      icon: Eye,
      title: 'Visual Similarity Detection',
      description:
        'Identifies fake websites that visually mimic legitimate ones, protecting you from sophisticated cloning attacks.',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description:
        'Receive instant alerts about potential threats with detailed risk scores and recommended actions.',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description:
        'All analysis happens locally on your device. Your browsing data is never stored or shared with anyone.',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      icon: Database,
      title: 'Global Threat Database',
      description:
        'Access to our constantly updated database of known phishing sites, malware domains, and suspicious patterns.',
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      icon: Smartphone,
      title: 'Cross-Platform Support',
      description:
        'Seamless protection across all your devices - desktop, mobile, and tablet with synchronized settings.',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      icon: Cloud,
      title: 'Cloud-Based Updates',
      description:
        'Automatic updates ensure you always have the latest protection without manual intervention.',
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      icon: RefreshCw,
      title: 'Continuous Learning',
      description:
        'Our system improves daily by analyzing millions of websites, adapting to new phishing techniques.',
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      icon: CheckCircle2,
      title: 'User-Friendly Interface',
      description:
        'Clean, intuitive design that works seamlessly in the background. Security without complexity.',
      gradient: 'from-teal-500 to-cyan-600'
    },
    {
      icon: Award,
      title: 'Industry Leading',
      description:
        'Award-winning technology recognized by cybersecurity experts and trusted by enterprises worldwide.',
      gradient: 'from-rose-500 to-pink-600'
    }
  ];

  const keyFeatures = [
    'Real-time URL scanning',
    'SSL certificate validation',
    'Domain age verification',
    'Content analysis',
    'Behavioral pattern detection',
    'Email protection',
    'Browser extension',
    'Mobile app support'
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8">
            <Shield className="w-4 h-4" />
            Advanced Security Features
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Powerful Features for
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Complete Protection
            </span>
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Phish Sense combines cutting-edge technology with user-friendly design
            to provide comprehensive protection against all types of phishing attacks
          </p>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl border border-slate-200 hover:border-transparent bg-white hover:shadow-2xl transition-all duration-300"
              >
                {/* Gradient Border on Hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br p-[2px] -z-10">
                  <div
                    className={`absolute inset-[2px] bg-white rounded-2xl bg-gradient-to-br ${feature.gradient}`}
                    style={{ opacity: 0.1 }}
                  />
                </div>

                {/* Icon */}
                <div className="mb-6">
                  <div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Built on Advanced Technology
              </h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Our platform leverages state-of-the-art machine learning models
                and cybersecurity best practices to deliver unmatched protection.
              </p>

              <div className="space-y-4">
                {keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg text-slate-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="text-4xl font-bold mb-2 text-green-400">
                  99.9%
                </div>
                <div className="text-slate-300">Detection Accuracy</div>
              </div>
              <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="text-4xl font-bold mb-2 text-blue-400">
                  &lt;1ms
                </div>
                <div className="text-slate-300">Analysis Time</div>
              </div>
              <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="text-4xl font-bold mb-2 text-purple-400">
                  24/7
                </div>
                <div className="text-slate-300">Active Monitoring</div>
              </div>
              <div className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <div className="text-4xl font-bold mb-2 text-orange-400">
                  100M+
                </div>
                <div className="text-slate-300">Sites Analyzed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Experience All Features Today
          </h2>
          <p className="text-xl text-slate-600 mb-10">
            Get started with Phish Sense and enjoy enterprise-grade security for free
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all">
            Download Phish Sense
          </button>
        </div>
      </section>
    </div>
  );
}
