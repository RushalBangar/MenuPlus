'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AIAssistantWidget from '@/components/AIAssistantWidget';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: '📊' },
  { href: '/dashboard/orders', label: 'Orders', icon: '📋' },
  { href: '/dashboard/tables', label: 'Tables', icon: '🪑' },
  { href: '/dashboard/inventory', label: 'Inventory', icon: '📦' },
  { href: '/dashboard/analytics', label: 'Analytics', icon: '📈' },
  { href: '/dashboard/staff', label: 'Staff Roster', icon: '👥' },
];

export default function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('menuplus_auth_role');
    if (role !== 'staff') {
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) {
    return <div className="min-h-screen flex items-center justify-center bg-[#0a0e1a] text-purple-400">Authenticating...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0a0e1a]">
      {/* Desktop Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-white/[0.08] bg-[#080b14] hidden md:flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-white/[0.08]">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg border border-purple-500/30">
              <img src="/menuplus_logo.png" alt="MenuPlus Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-lg font-bold text-white font-headline-md tracking-tight">MenuPlus</span>
              <p className="text-[10px] text-purple-400 font-semibold uppercase tracking-wider">AI Command Center</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1.5">
          {navItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30 font-semibold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/[0.08]">
          <button
            onClick={() => { localStorage.removeItem('menuplus_auth_role'); window.location.href = '/login'; }}
            className="w-full flex items-center justify-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-white hover:bg-red-500/20 bg-red-500/10 transition-all border border-red-500/20"
          >
            ← Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0">
        {/* Header */}
        <header className="h-16 md:h-20 border-b border-white/[0.08] bg-[#0a0e1a]/90 backdrop-blur-xl flex items-center px-4 md:px-8 justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <Link href="/" className="md:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-purple-500/30">
                <img src="/menuplus_logo.png" alt="Logo" className="w-full h-full object-cover" />
              </div>
            </Link>
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping hidden sm:inline-block"></span>
            <h2 className="text-sm md:text-base font-semibold text-slate-200 truncate">Management Hub</h2>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => { localStorage.removeItem('menuplus_auth_role'); window.location.href = '/login'; }}
              className="text-xs font-bold text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-lg border border-red-500/20 transition-all"
            >
              Sign Out
            </button>
            <span className="text-[11px] text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-full font-bold">
              Manager
            </span>
          </div>
        </header>

        {/* Mobile Horizontal Scrollable Tab Bar */}
        <div className="md:hidden bg-[#080b14] border-b border-white/10 px-3 py-2 flex gap-2 overflow-x-auto scrollbar-none sticky top-16 z-30">
          {navItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Floating AI Operations Assistant Widget */}
      <AIAssistantWidget />
    </div>
  );
}
