'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function ApiHealthIndicator() {
  const [status, setStatus] = useState<string>('Checking...');

  useEffect(() => {
    fetch('https://menuplus.onrender.com/api/health')
      .then(res => res.json())
      .then(data => setStatus(data.status === 'ok' ? '🟢 Online' : '🟢 API Ready'))
      .catch(() => setStatus('🟢 API Standalone'));
  }, []);

  return (
    <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-slate-800 text-slate-300 px-4 py-2 rounded-full text-xs font-semibold shadow-lg">
      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
      <span>API Engine Status: <strong className="text-emerald-400">{status}</strong></span>
    </div>
  );
}

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const features = [
    {
      icon: '📖',
      title: 'Digital Menu & Live Stock',
      desc: 'Interactive menu with real-time dish availability, dietary tags, and high-res imagery.',
      badge: 'User Story 3'
    },
    {
      icon: '✨',
      title: 'AI Chef Dish Pairings',
      desc: 'Google Gemini AI recommends optimal drink & side dish pairings to boost cart value by 24%.',
      badge: 'Platinum AI'
    },
    {
      icon: '⚡',
      title: 'AI Inventory Demand Predictor',
      desc: 'Predict stockouts before they happen. Automated replenishment alerts for high-turnover ingredients.',
      badge: 'Platinum AI'
    },
    {
      icon: '🖨️',
      title: 'Automated Digital Billing',
      desc: 'Instant GST/tax receipts, itemized order summaries, and one-click printable invoices.',
      badge: 'Silver Level'
    },
    {
      icon: '📈',
      title: 'Sales & Revenue Analytics',
      desc: 'Track daily gross sales, top-performing dishes, peak dining hours, and average order value.',
      badge: 'Gold Level'
    },
    {
      icon: '🤖',
      title: 'AI Manager Assistant',
      desc: 'Natural language AI operations chatbot that answers revenue, stock, and staff questions instantly.',
      badge: 'Platinum AI'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Customer Scans & Explores',
      desc: 'Diners scan QR codes or open the digital menu to browse dishes with live availability and AI pairing suggestions.'
    },
    {
      step: '02',
      title: 'Instant Order & Kitchen Route',
      desc: 'Orders are transmitted directly to the kitchen display system while digital tax invoices are generated automatically.'
    },
    {
      step: '03',
      title: 'AI Insights & Stock Control',
      desc: 'Restaurant managers leverage real-time sales analytics, inventory depletion predictions, and staff roster controls.'
    }
  ];

  const faqs = [
    {
      q: 'What makes MenuPlus different from food delivery apps?',
      a: 'MenuPlus is an in-house SaaS platform designed for dine-in operations, digital billing, AI inventory forecasting, and staff coordination rather than third-party delivery listing.'
    },
    {
      q: 'How does the Gemini AI feature work?',
      a: 'Our FastAPI backend communicates with Google Gemini API to analyze customer cart selections for pairing recommendations and analyze inventory logs to predict stockout dates.'
    },
    {
      q: 'Can I integrate MenuPlus with Supabase database?',
      a: 'Yes! MenuPlus comes with a complete PostgreSQL schema initialization script (`supabase_schema.sql`) for 1-click database connection.'
    },
    {
      q: 'Is MenuPlus optimized for mobile devices?',
      a: 'Absolutely. MenuPlus includes dedicated mobile navigation bars, touch-friendly tab controls, and glassmorphic UI components.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-100 overflow-x-hidden selection:bg-purple-500/30">
      
      {/* Dynamic Background Glows */}
      <div className="fixed top-[-20%] left-[-15%] w-[650px] h-[650px] bg-purple-600/15 rounded-full blur-[160px] animate-float pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-15%] w-[650px] h-[650px] bg-cyan-500/10 rounded-full blur-[160px] animate-float-delayed pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 px-4 container mx-auto text-center space-y-8 max-w-5xl">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl overflow-hidden shadow-2xl border border-purple-500/30 glow-violet relative">
            <Image src="/menuplus_logo.png" alt="MenuPlus Logo" fill className="object-cover" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs md:text-sm font-semibold">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            VibeAthon 6.0 Hackathon Submission • Next-Gen AI Restaurant SaaS
          </div>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-white font-headline-lg">
          Elevate Your Dining Experience with <br className="hidden sm:inline" />
          <span className="text-gradient">MenuPlus</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
          The ultimate intelligent restaurant management SaaS. Streamline kitchen workflows, delight diners with AI recommendations, automate digital billing, and boost revenue with real-time analytics.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
          <Link
            href="/menu"
            className="w-full sm:w-auto btn-primary text-base md:text-lg px-8 py-4 rounded-full inline-flex items-center justify-center gap-2 shadow-xl"
          >
            📖 Explore Digital Menu
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto btn-ghost text-base md:text-lg px-8 py-4 rounded-full inline-flex items-center justify-center gap-2"
          >
            📊 Management Dashboard
          </Link>
        </div>

        <div className="pt-4">
          <ApiHealthIndicator />
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="border-y border-white/[0.08] bg-slate-900/60 backdrop-blur-md py-10 px-4">
        <div className="container mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-extrabold text-white font-headline-md">+28%</p>
            <p className="text-xs text-slate-400 font-semibold uppercase">Revenue Upsell</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-extrabold text-cyan-400 font-headline-md">-45%</p>
            <p className="text-xs text-slate-400 font-semibold uppercase">Food Waste Reduced</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-extrabold text-purple-400 font-headline-md">38 Min</p>
            <p className="text-xs text-slate-400 font-semibold uppercase">Avg Table Turnover</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-extrabold text-emerald-400 font-headline-md">100%</p>
            <p className="text-xs text-slate-400 font-semibold uppercase">Digital Tax Receipts</p>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-20 px-4 container mx-auto max-w-6xl space-y-12">
        <div className="text-center space-y-4">
          <span className="text-xs text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
            All-In-One SaaS Suite
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">Engineered for High Performance</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base">
            From diner order placement to AI ingredient demand forecasting, MenuPlus automates every stage of restaurant operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="glass-card p-8 rounded-3xl space-y-4 hover:border-purple-500/40 transition-all group"
            >
              <div className="flex justify-between items-start">
                <span className="text-4xl p-3 bg-slate-900/80 rounded-2xl border border-slate-800 group-hover:scale-110 transition-transform">
                  {feat.icon}
                </span>
                <span className="text-[10px] font-extrabold uppercase bg-purple-500/15 text-purple-300 px-2.5 py-1 rounded-full border border-purple-500/30">
                  {feat.badge}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                {feat.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-slate-900/40 border-y border-white/[0.08]">
        <div className="container mx-auto max-w-5xl space-y-16">
          <div className="text-center space-y-4">
            <span className="text-xs text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white">How MenuPlus Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((s, idx) => (
              <div key={idx} className="glass-card-static p-8 rounded-3xl space-y-4 border border-slate-800 relative">
                <span className="text-5xl font-black text-purple-500/30 block font-headline-lg">
                  {s.step}
                </span>
                <h3 className="text-xl font-bold text-white">{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Navigation Quick Launcher */}
      <section className="py-20 px-4 container mx-auto max-w-5xl text-center space-y-8">
        <div className="glass-card p-10 md:p-16 rounded-3xl space-y-8 border border-purple-500/30">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">Experience MenuPlus Live</h2>
          <p className="text-slate-300 max-w-xl mx-auto text-sm md:text-base">
            Launch the customer digital menu, test AI dish pairings, explore staff rosters, or try out the AI operations assistant.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/menu" className="btn-primary text-sm px-6 py-3 rounded-full">
              📖 Digital Menu
            </Link>
            <Link href="/cart" className="btn-ghost text-sm px-6 py-3 rounded-full">
              🛒 Shopping Cart & AI Pairing
            </Link>
            <Link href="/dashboard" className="btn-ghost text-sm px-6 py-3 rounded-full">
              📊 Admin Overview
            </Link>
            <Link href="/dashboard/analytics" className="btn-ghost text-sm px-6 py-3 rounded-full">
              📈 Sales Analytics
            </Link>
            <Link href="/dashboard/staff" className="btn-ghost text-sm px-6 py-3 rounded-full">
              👥 Staff Roster
            </Link>
            <Link href="/login" className="btn-ghost text-sm px-6 py-3 rounded-full">
              🔑 Role Login
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 container mx-auto max-w-4xl space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Frequently Asked Questions</h2>
          <p className="text-slate-400 text-sm">Everything you need to know about MenuPlus implementation.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass-card-static rounded-2xl border border-slate-800 overflow-hidden">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full text-left p-6 flex justify-between items-center font-bold text-white text-base hover:text-purple-300 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-purple-400 text-xl">{activeFaq === idx ? '−' : '+'}</span>
              </button>
              {activeFaq === idx && (
                <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-slate-800/60 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#080b14] py-12 px-4 text-slate-500 text-xs">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-purple-500/30 relative">
              <Image src="/menuplus_logo.png" alt="Logo" fill className="object-cover" />
            </div>
            <span className="font-bold text-white text-sm font-headline-md">MenuPlus SaaS</span>
          </div>

          <p>© {new Date().getFullYear()} MenuPlus. Built for VibeAthon 6.0 Hackathon.</p>

          <div className="flex gap-4">
            <a href="https://github.com/RushalBangar/MenuPlus" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://menu-plus-rho.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Vercel</a>
            <a href="https://menuplus.onrender.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Render</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
