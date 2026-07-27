'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AIAssistantWidget from '@/components/AIAssistantWidget';

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

  return (
    <div className="min-h-screen flex bg-[#0a0e1a]">
      {/* Sidebar */}
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
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          >
            ← Exit to Customer App
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b border-white/[0.08] bg-[#0a0e1a]/80 backdrop-blur-xl flex items-center px-6 md:px-8 justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
            <h2 className="text-base font-semibold text-slate-200">Management Operations Hub</h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full font-bold">
              Restaurant Manager
            </span>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Platinum AI Operations Assistant Widget */}
      <AIAssistantWidget />
    </div>
  );
}
