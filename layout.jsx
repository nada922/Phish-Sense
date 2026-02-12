import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Shield, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InteractiveBackground from '@/components/ui/InteractiveBackground';
import Logo from './Componants/Logo';

export default function Layout({ children, currentPageName }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: 'Home' },
    { name: 'Features', path: 'Features' },
    { name: 'How It Works', path: 'HowItWorks' },
    { name: 'About', path: 'About' },
    { name: 'Contact', path: 'Contact' }
  ];

  const isActive = (path) => {
    return currentPageName === path;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <InteractiveBackground />
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-indigo-500/5'
          : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={createPageUrl(item.path)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${isActive(item.path)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden md:block">
              <Button
                onClick={() => {
                  if (location.pathname !== '/' && location.pathname !== '/home') {
                    navigate('/#search-analysis');
                  } else {
                    document.getElementById('search-analysis')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-600" />
              ) : (
                <Menu className="w-6 h-6 text-slate-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 shadow-xl">
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={createPageUrl(item.path)}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all ${isActive(item.path)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-600 hover:bg-slate-50'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (location.pathname !== '/' && location.pathname !== '/home') {
                    navigate('/#search-analysis');
                  } else {
                    document.getElementById('search-analysis')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white mt-4"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-20">{children}</main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1">
              <Logo showText={true} />
              <p className="text-slate-400 text-sm mt-2">
                Advanced phishing detection powered by machine learning.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={createPageUrl(item.path)}
                      className="hover:text-white transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                {/* <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API Reference
                  </a>
                </li> */}
                {/* <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li> */}
                {/* <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li> */}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Get in Touch</h3>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li>support@phishsense.com</li>
                <li>+20 (11) 111-1111</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400 text-sm">
            <p>&copy; 2024 Phish Sense. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
