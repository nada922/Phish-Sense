import React from 'react';
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  TrendingUp,
  Shield,
  Globe
} from 'lucide-react';

export default function About() {
  const team = [
    {
      name: 'Sarah Chen',
      role: 'Chief Executive Officer',
      bio: 'Former cybersecurity researcher with 15+ years fighting online fraud',
      initial: 'SC'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Chief Technology Officer',
      bio: 'AI/ML expert specializing in pattern recognition and threat detection',
      initial: 'MR'
    },
    {
      name: 'Emily Watson',
      role: 'Head of Security',
      bio: 'Ethical hacker and security consultant for Fortune 500 companies',
      initial: 'EW'
    },
    {
      name: 'David Kim',
      role: 'Lead Product Designer',
      bio: 'Award-winning designer focused on security UX and accessibility',
      initial: 'DK'
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description:
        'We believe everyone deserves protection from online threats, regardless of technical expertise.'
    },
    {
      icon: Heart,
      title: 'User Focused',
      description:
        'Every decision we make prioritizes user safety, privacy, and experience above all else.'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Innovation',
      description:
        'We stay ahead of evolving threats through constant research and technology advancement.'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description:
        'Our mission is to make the internet safer for everyone, everywhere in the world.'
    }
  ];

  const milestones = [
    { year: '2020', event: 'Company Founded', desc: 'Started with a vision' },
    { year: '2021', event: '100K Users', desc: 'Growing community' },
    { year: '2022', event: 'Series A Funding', desc: '$10M raised' },
    { year: '2023', event: '1M+ Users', desc: 'Major milestone' },
    { year: '2024', event: 'Global Expansion', desc: '150+ countries' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8">
            <Users className="w-4 h-4" />
            About Phish Sense
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Making the Internet
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Safer for Everyone
            </span>
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Founded by cybersecurity experts who believe that advanced protection
            should be accessible to everyone, not just enterprises.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="p-10 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                To provide world-class phishing protection that's simple enough for
                anyone to use, yet powerful enough to stop sophisticated attacks. We're
                committed to making cybersecurity accessible and effective for all.
              </p>
            </div>

            {/* Vision */}
            <div className="p-10 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Our Vision
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                A world where phishing attacks are a thing of the past. Where everyone
                can browse the internet with confidence, knowing they're protected by
                intelligent, proactive security that works invisibly in the background.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-xl transition-all"
              >
                <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 mb-6">
                  <value.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Passionate experts dedicated to protecting you online
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="text-center group"
              >
                {/* Avatar */}
                <div className="relative mb-6 inline-block">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">
                      {member.initial}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Key milestones in our mission to make the internet safer
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-white/20 hidden lg:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className="flex-1 text-center lg:text-left">
                    <div className="inline-block px-4 py-2 rounded-full bg-blue-600 text-white font-semibold mb-3">
                      {milestone.year}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">
                      {milestone.event}
                    </h3>
                    <p className="text-slate-300">{milestone.desc}</p>
                  </div>

                  {/* Center Icon */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border-4 border-white/20 flex items-center justify-center">
                    <Award className="w-8 h-8 text-blue-400" />
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 hidden lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Making a real difference in cybersecurity
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { value: '1M+', label: 'Active Users', icon: Users },
              { value: '100M+', label: 'Threats Blocked', icon: Shield },
              { value: '150+', label: 'Countries', icon: Globe },
              { value: '99.9%', label: 'Detection Rate', icon: Target }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-slate-600 mb-10">
            Be part of making the internet a safer place for everyone
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/40 transition-all">
            Get Started with Phish Sense
          </button>
        </div>
      </section>
    </div>
  );
}
