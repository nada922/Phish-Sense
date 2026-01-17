import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import {
  Shield,
  Lock,
  Zap,
  CheckCircle2,
  ArrowRight,
  Globe,
  Brain,
  Users
} from 'lucide-react';

export default function Home() {
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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all text-lg px-8 py-6 group"
            >
              Download Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Link to={createPageUrl('Features')}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-slate-300 hover:border-blue-600 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-lg px-8 py-6"
              >
                Learn More
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
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
        </div>
      </section>

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
