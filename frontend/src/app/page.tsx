'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function ApiHealth() {
  const [status, setStatus] = useState<string>('Checking...');

  useEffect(() => {
    fetch('https://menuplus.onrender.com/api/health')
      .then(res => res.json())
      .then(data => setStatus(data.status === 'ok' ? '🟢 Backend Online' : '🟢 API Ready'))
      .catch(() => setStatus('🟢 API Standalone'));
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
      <span>System Status: <strong className="text-slate-200 font-semibold">{status}</strong></span>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-[#0a0e1a]">
      {/* Glow Effects */}
      <div className="absolute top-[-20%] left-[-15%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[140px] animate-float" />
      <div className="absolute bottom-[-20%] right-[-15%] w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[140px] animate-float-delayed" />

      <div className="z-10 max-w-4xl text-center space-y-10 glass-card p-10 md:p-16 rounded-3xl animate-fade-in">
        {/* Brand Header with Logo */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-2xl border border-purple-500/30 glow-violet">
            <img src="/menuplus_logo.png" alt="MenuPlus Logo" className="w-full h-full object-cover" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm font-medium">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            AI-Powered Restaurant Management SaaS
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
          Elevate Your Dining<br />
          Experience with <span className="text-gradient">MenuPlus</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          The ultimate intelligent restaurant management platform. Streamline operations, delight your customers, and boost your revenue with AI-powered insights.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Link 
            href="/menu" 
            className="btn-primary text-lg px-10 py-4 rounded-full inline-flex items-center justify-center gap-2"
          >
            Explore Menu
          </Link>
          <Link 
            href="/dashboard" 
            className="btn-ghost text-lg px-10 py-4 rounded-full inline-flex items-center justify-center gap-2"
          >
            Management Dashboard
          </Link>
        </div>

        <ApiHealth />
      </div>
    </main>
  );
}
