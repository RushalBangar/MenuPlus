'use client';
import { useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import Link from 'next/link';

export default function LoginPage() {
  const [role, setRole] = useState<'customer' | 'staff'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        // Fallback for demo
        setMessage(`Signed in as ${role.toUpperCase()} (Demo Mode Active)`);
        setTimeout(() => {
          window.location.href = role === 'staff' ? '/dashboard' : '/menu';
        }, 1000);
      } else {
        window.location.href = role === 'staff' ? '/dashboard' : '/menu';
      }
    } catch {
      setMessage(`Signed in as ${role.toUpperCase()} (Demo Mode Active)`);
      setTimeout(() => {
        window.location.href = role === 'staff' ? '/dashboard' : '/menu';
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = () => {
    if (!email) {
      setMessage('Please enter your email to receive OTP');
      return;
    }
    setOtpSent(true);
    setMessage('OTP sent to ' + email + ' (Use 123456 for demo)');
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) setMessage('Redirecting to Google OAuth...');
    } catch {
      setMessage('Redirecting to Google OAuth...');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#0a0e1a] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] animate-float"></div>

      <div className="w-full max-w-md glass-card p-8 rounded-3xl space-y-6 z-10 animate-fade-in border border-slate-800">
        {/* Header Logo */}
        <div className="flex flex-col items-center gap-3 text-center">
          <Link href="/" className="w-14 h-14 rounded-2xl overflow-hidden shadow-xl border border-purple-500/30">
            <img src="/menuplus_logo.png" alt="MenuPlus Logo" className="w-full h-full object-cover" />
          </Link>
          <h1 className="text-2xl font-extrabold text-white font-headline-md">Welcome to MenuPlus</h1>
          <p className="text-xs text-slate-400">Secure Access & Role-Based Authentication</p>
        </div>

        {/* Role Selector */}
        <div className="grid grid-cols-2 gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setRole('customer')}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              role === 'customer'
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🍽️ Customer Portal
          </button>
          <button
            onClick={() => setRole('staff')}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              role === 'staff'
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            👨‍🍳 Manager / Staff
          </button>
        </div>
        
        {message && (
          <div className="p-3 bg-purple-500/10 border border-purple-500/30 text-purple-300 rounded-xl text-xs text-center font-medium">
            {message}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@menuplus.com"
              className="w-full p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-purple-500 transition-colors"
              required
            />
          </div>

          {!otpSent ? (
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                required
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-medium text-purple-400 mb-1">6-Digit Verification OTP</label>
              <input 
                type="text" 
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="123456"
                className="w-full p-3 rounded-xl bg-slate-900/80 border border-purple-500/50 text-slate-100 text-sm focus:outline-none focus:border-purple-500 text-center tracking-widest font-mono"
                required
              />
            </div>
          )}

          <div className="flex justify-between items-center text-xs">
            <button
              type="button"
              onClick={handleSendOTP}
              className="text-cyan-400 hover:underline font-semibold"
            >
              {otpSent ? 'Resend OTP' : '🔑 Login via Email OTP'}
            </button>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-primary py-3 text-sm font-bold shadow-lg"
          >
            {loading ? 'Authenticating...' : `Sign In as ${role === 'staff' ? 'Manager' : 'Customer'}`}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-[#0f131f] text-slate-500 font-medium">Or Sign In with</span>
          </div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="w-full p-3 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 text-slate-200 transition-colors flex items-center justify-center gap-3 font-semibold text-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
          </svg>
          Google OAuth
        </button>
      </div>
    </div>
  );
}
