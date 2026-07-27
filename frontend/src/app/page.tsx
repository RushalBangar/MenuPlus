'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function ApiHealth() {
  const [status, setStatus] = useState<string>('Checking...');

  useEffect(() => {
    fetch('http://localhost:8000/api/health')
      .then(res => res.json())
      .then(data => setStatus(data.status === 'ok' ? '🟢 Online' : '🔴 Offline'))
      .catch(() => setStatus('🔴 Offline'));
  }, []);

  return (
    <span className="text-xs text-gray-500">
      API: <span className="text-gray-300">{status}</span>
    </span>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute top-[-20%] left-[-15%] w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-[-20%] right-[-15%] w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px] animate-float-delayed" />
      <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] animate-float" />

      <div className="z-10 max-w-4xl text-center space-y-10 glass-card-static p-10 md:p-16 rounded-3xl animate-fade-in">
        {/* Logo / Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse-soft" />
          AI-Powered Restaurant Management
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
          Elevate Your Dining<br />
          Experience with{' '}
          <span className="text-gradient">VibeAthon</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          The ultimate intelligent restaurant management platform. Streamline operations, delight your customers, and boost your revenue with AI-powered insights.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link 
            href="/menu" 
            className="btn-primary text-lg px-10 py-4 rounded-full inline-flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
            Explore Menu
          </Link>
          <Link 
            href="/dashboard" 
            className="btn-ghost text-lg px-10 py-4 rounded-full inline-flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
            Management Dashboard
          </Link>
        </div>

        <ApiHealth />
      </div>
    </main>
  );
}
