'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { totalItems } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('menuplus_auth_role');
    if (!role) {
      router.push('/login');
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) {
    return <div className="min-h-screen flex items-center justify-center bg-[#0a0e1a] text-purple-400">Authenticating...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e1a]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#0a0e1a]/90 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl overflow-hidden shadow-lg border border-purple-500/30 relative">
              <Image src="/menuplus_logo.png" alt="MenuPlus Logo" fill className="object-cover" />
            </div>
            <span className="text-lg md:text-xl font-bold text-white font-headline-md tracking-tight">MenuPlus</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2">
            <Link href="/menu" className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${pathname === '/menu' ? 'text-white bg-purple-500/15 border border-purple-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              Menu
            </Link>
            <Link href="/cart" className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1.5 ${pathname === '/cart' ? 'text-white bg-purple-500/15 border border-purple-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="w-5 h-5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link href="/dashboard" className="px-4 py-2 text-sm font-medium text-purple-400 hover:text-purple-300 rounded-lg hover:bg-purple-500/10 transition-all">
              Dashboard
            </Link>
            <button 
              onClick={() => { localStorage.removeItem('menuplus_auth_role'); window.location.href = '/login'; }}
              className="ml-2 px-5 py-2.5 text-sm font-bold rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all"
            >
              Sign Out
            </button>
          </nav>
        </div>
      </header>

      {/* Main Body Content */}
      <main className="flex-1 container mx-auto p-4 md:p-8 pb-24 md:pb-8">
        {children}
      </main>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#080b14]/95 backdrop-blur-2xl border-t border-white/10 px-4 py-2 flex justify-around items-center shadow-2xl">
        <Link href="/" className={`flex flex-col items-center gap-1 text-[11px] font-semibold py-1 px-3 rounded-xl ${pathname === '/' ? 'text-purple-400 bg-purple-500/10' : 'text-slate-400'}`}>
          <span className="text-lg">🏠</span>
          <span>Home</span>
        </Link>
        <Link href="/menu" className={`flex flex-col items-center gap-1 text-[11px] font-semibold py-1 px-3 rounded-xl ${pathname === '/menu' ? 'text-purple-400 bg-purple-500/10' : 'text-slate-400'}`}>
          <span className="text-lg">📖</span>
          <span>Menu</span>
        </Link>
        <Link href="/cart" className={`relative flex flex-col items-center gap-1 text-[11px] font-semibold py-1 px-3 rounded-xl ${pathname === '/cart' ? 'text-purple-400 bg-purple-500/10' : 'text-slate-400'}`}>
          <span className="text-lg">🛒</span>
          <span>Cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-1 right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
        <Link href="/dashboard" className={`flex flex-col items-center gap-1 text-[11px] font-semibold py-1 px-3 rounded-xl ${pathname.startsWith('/dashboard') ? 'text-purple-400 bg-purple-500/10' : 'text-slate-400'}`}>
          <span className="text-lg">📊</span>
          <span>Admin</span>
        </Link>
        <button 
          onClick={() => { localStorage.removeItem('menuplus_auth_role'); window.location.href = '/login'; }}
          className="flex flex-col items-center gap-1 text-[11px] font-semibold py-1 px-3 rounded-xl text-red-400"
        >
          <span className="text-lg">🚪</span>
          <span>Logout</span>
        </button>
      </nav>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-8 text-center text-sm text-slate-500 hidden md:block">
        <div className="container mx-auto px-4 space-y-2">
          <p>© {new Date().getFullYear()} MenuPlus SaaS. AI-Powered Smart Restaurant Operations.</p>
          <p className="text-xs text-slate-600">Built for VibeAthon 6.0 Hackathon</p>
        </div>
      </footer>
    </div>
  );
}
