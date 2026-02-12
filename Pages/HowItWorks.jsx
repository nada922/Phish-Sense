import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Globe,
  Search,
  Brain,
  Shield,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Lock,
  Zap
} from 'lucide-react';

export default function HowItWorks() {
  const navigate = useNavigate();

  const steps = [
    {
      number: '01',
      icon: Globe,
      title: 'You Visit a Website',
      description:
        'When you click a link or enter a URL, Phish Sense immediately springs into action in the background.',
      details: [
        'Automatic activation on page load',
        'No manual intervention needed',
        'Works seamlessly across all browsers'
      ]
    },
    {
      number: '02',
      icon: Search,
      title: 'Instant URL Analysis',
      description:
        'The URL is analyzed against our comprehensive database and multiple security parameters.',
      details: [
        'Domain reputation check',
        'SSL certificate validation',
        'URL pattern recognition',
        'Blacklist comparison'
      ]
    },
    {
      number: '03',
      icon: Brain,
      title: 'AI-Powered Inspection',
      description:
        'Advanced machine learning models examine the website content, structure, and behavior patterns.',
      details: [
        'Visual similarity detection',
        'Content authenticity analysis',
        'Behavioral pattern matching',
        'Real-time threat scoring'
      ]
    },
    {
      number: '04',
      icon: Shield,
      title: 'Protection Decision',
      description:
        'Based on comprehensive analysis, Phish Sense determines the safety level and takes appropriate action.',
      details: [
        'Risk score calculation',
        'Threat categorization',
        'Instant blocking if dangerous',
        'User notification with details'
      ]
    }
  ];

  const protectionLevels = [
    {
      level: 'Safe',
      icon: CheckCircle2,
      color: 'green',
      description: 'Website passes all security checks',
      action: 'Allow access - Browse freely'
    },
    {
      level: 'Suspicious',
      icon: AlertTriangle,
      color: 'yellow',
      description: 'Some red flags detected',
      action: 'Warning displayed - Proceed with caution'
    },
    {
      level: 'Dangerous',
      icon: Shield,
      color: 'red',
      description: 'Confirmed phishing attempt',
      action: 'Block access - Keep you safe'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-8">
            <Zap className="w-4 h-4" />
            Simple Yet Powerful
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            How Phish Sense
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Protects You
            </span>
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Understanding our advanced security process - from detection to protection
            in milliseconds
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-24">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-12 items-center`}
              >
                {/* Icon Side */}
                <div className="flex-1 flex justify-center">
                  <div className="relative">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl blur-3xl opacity-20" />

                    {/* Icon Container */}
                    <div className="relative bg-gradient-to-br from-blue-600 to-indigo-600 p-12 rounded-3xl shadow-2xl">
                      <step.icon className="w-24 h-24 text-white" />
                    </div>

                    {/* Step Number */}
                    <div className="absolute -top-6 -right-6 w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center border-4 border-blue-100">
                      <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {step.number}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="space-y-3">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-slate-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Process Flow Arrow */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-semibold text-slate-700">
                All in under 1 millisecond
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Protection Levels */}
      <section className="py-20 px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Three Levels of Protection
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Phish Sense categorizes websites based on comprehensive risk analysis
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {protectionLevels.map((level, index) => {
              const colorClasses = {
                green: {
                  bg: 'from-green-500 to-emerald-600',
                  icon: 'text-green-600',
                  border: 'border-green-200',
                  badge: 'bg-green-100 text-green-700'
                },
                yellow: {
                  bg: 'from-yellow-500 to-orange-600',
                  icon: 'text-yellow-600',
                  border: 'border-yellow-200',
                  badge: 'bg-yellow-100 text-yellow-700'
                },
                red: {
                  bg: 'from-red-500 to-rose-600',
                  icon: 'text-red-600',
                  border: 'border-red-200',
                  badge: 'bg-red-100 text-red-700'
                }
              };

              const colors = colorClasses[level.color];

              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl border-2 ${colors.border} p-8 hover:shadow-2xl transition-all`}
                >
                  {/* Icon */}
                  <div className="mb-6">
                    <div
                      className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${colors.bg} shadow-lg`}
                    >
                      <level.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Level Badge */}
                  <div
                    className={`inline-block px-4 py-2 rounded-full ${colors.badge} font-semibold text-sm mb-4`}
                  >
                    {level.level}
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {level.description}
                  </p>

                  {/* Action */}
                  <div className="pt-6 border-t border-slate-200">
                    <div className="flex items-center gap-2">
                      <Lock className={`w-5 h-5 ${colors.icon}`} />
                      <span className="font-semibold text-slate-900">
                        {level.action}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Powered by Advanced Technology
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Multiple layers of security working together seamlessly
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Brain, label: 'Machine Learning', desc: 'AI-powered analysis' },
              { icon: Search, label: 'Deep Scanning', desc: 'Multi-parameter checks' },
              { icon: Zap, label: 'Lightning Fast', desc: 'Sub-millisecond response' },
              { icon: Shield, label: 'Always Protected', desc: '24/7 monitoring' }
            ].map((tech, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-center hover:bg-white/15 transition-all"
              >
                <tech.icon className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <h3 className="text-xl font-semibold mb-2">{tech.label}</h3>
                <p className="text-slate-300">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Ready to Stay Protected?
          </h2>
          <p className="text-xl text-slate-600 mb-10">
            Join millions of users who trust Phish Sense for their online security
          </p>
          <button
            onClick={() => navigate('/#search-analysis')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all"
          >
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
}
