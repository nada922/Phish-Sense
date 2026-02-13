import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Linkedin,
  Github,
  MessageSquare
} from 'lucide-react';

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'support@phishsense.com',
      link: 'mailto:support@phishsense.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+20 111 111 1111',
      link: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      title: 'Office',
      content: 'Modern Academy',
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      link: 'https://github.com/nada922/Phish-Sense',
      color: 'from-slate-600 to-slate-800'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/',
      color: 'from-blue-600 to-blue-800'
    },
    {
      icon: MessageSquare,
      name: 'Discord',
      link: 'https://discord.gg/4sU7zBVV',
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8">
            <Mail className="w-4 h-4" />
            Get in Touch
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            We'd Love to
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Hear From You
            </span>
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Have questions, feedback, or need support? Our team is here to help you
            stay safe online.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-3xl border-2 border-slate-200 p-8 lg:p-10 shadow-xl">
                <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
                  Send us a Message
                </h2>

                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="inline-flex p-4 rounded-full bg-green-100 mb-4">
                      <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-slate-600">
                      Thank you for contacting us. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Your Name
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Subject
                      </label>
                      <Input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="How can we help?"
                        required
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Message
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your inquiry..."
                        required
                        rows={6}
                        className="w-full"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all group"
                    >
                      <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Info & Social */}
            <div className="space-y-8">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover:shadow-lg transition-all"
                    >
                      <div className="flex-shrink-0">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600">
                          <info.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">
                          {info.title}
                        </h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-slate-600 hover:text-blue-600 transition-colors"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-slate-600">{info.content}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Follow Us
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      className="group p-6 rounded-2xl bg-white border-2 border-slate-200 hover:border-transparent hover:shadow-xl transition-all text-center"
                    >
                      <div className="relative inline-block mb-3">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${social.color} rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity`}
                        />
                        <div
                          className={`relative p-3 rounded-xl bg-gradient-to-br ${social.color}`}
                        >
                          <social.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <p className="font-semibold text-slate-900">
                        {social.name}
                      </p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Office Hours */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-900 text-white">
                <h3 className="text-2xl font-bold mb-4">Support Hours</h3>
                <div className="space-y-2 text-slate-300">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM PST</p>
                  <p>Saturday: 10:00 AM - 4:00 PM PST</p>
                  <p>Sunday: Closed</p>
                </div>
                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-sm text-slate-400">
                    For urgent security issues, please contact our 24/7 emergency line
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Looking for Quick Answers?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Check out our comprehensive FAQ section or documentation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              className="border-2 border-slate-300 hover:border-blue-600 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-lg px-8 py-6"
            >
              View FAQ
            </Button>
            <Button
              onClick={() => navigate('/how-it-works')}
              variant="outline"
              className="border-2 border-slate-300 hover:border-blue-600 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-lg px-8 py-6"
            >
              Documentation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
