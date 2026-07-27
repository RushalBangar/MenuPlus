'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { totalItems } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e1a]">
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#0a0e1a]/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg border border-purple-500/30">
              <img src="/menuplus_logo.png" alt="MenuPlus Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-bold text-white font-headline-md tracking-tight">MenuPlus</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Link href="/menu" className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
              Menu
            </Link>
            <Link href="/cart" className="relative px-4 py-2 text-sm font-medium text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all flex items-center gap-1.5">
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="w-5 h-5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-[10px] font-bold text-white flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link href="/dashboard" className="px-4 py-2 text-sm font-medium text-purple-400 hover:text-purple-300 rounded-lg hover:bg-purple-500/10 transition-all hidden sm:inline-block">
              Dashboard
            </Link>
            <Link href="/login" className="ml-2 btn-primary text-sm px-5 py-2.5 rounded-full">
              Sign In
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4 md:p-8">
        {children}
      </main>
      <footer className="border-t border-white/[0.08] py-8 text-center text-sm text-slate-500">
        <div className="container mx-auto px-4 space-y-2">
          <p>© {new Date().getFullYear()} MenuPlus SaaS. AI-Powered Smart Restaurant Operations.</p>
          <p className="text-xs text-slate-600">Built for VibeAthon 6.0 Hackathon</p>
        </div>
      </footer>
    </div>
  );
}
