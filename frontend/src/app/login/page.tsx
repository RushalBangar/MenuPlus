'use client';
import { useState } from 'react';
import { supabase } from '@/utils/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Logged in successfully (placeholder)');
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) setMessage(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-card p-8 rounded-2xl space-y-6">
        <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
        
        {message && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded text-sm text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:border-primary transition-colors"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full p-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Log in with Email'}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[#0f172a] text-gray-400">Or continue with</span>
          </div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="w-full p-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors flex items-center justify-center gap-2 font-medium"
        >
          Google
        </button>
      </div>
    </div>
  );
}
