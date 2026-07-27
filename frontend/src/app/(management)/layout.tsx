'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: '📊' },
  { href: '/dashboard/orders', label: 'Orders', icon: '📋' },
  { href: '/dashboard/tables', label: 'Tables', icon: '🪑' },
  { href: '/dashboard/inventory', label: 'Inventory', icon: '📦' },
  { href: '/dashboard/ai', label: 'AI Assistant', icon: '✨' },
];

export default function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-white/[0.06] bg-[#080b14] hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/[0.06]">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-white font-bold text-sm">
              V
            </div>
            <span className="text-lg font-bold text-gradient">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/[0.06]">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-white hover:bg-white/5 transition-all"
          >
            ← Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-white/[0.06] bg-[#0a0e1a]/80 backdrop-blur-xl flex items-center px-6 md:px-8 justify-between">
          <h2 className="text-lg font-semibold text-gray-200">Management Portal</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Admin</span>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
