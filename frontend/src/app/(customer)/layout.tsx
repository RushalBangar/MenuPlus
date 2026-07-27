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
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.06] bg-[#0a0e1a]/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-white font-bold text-sm group-hover:shadow-lg group-hover:shadow-orange-500/20 transition-shadow">
              V
            </div>
            <span className="text-lg font-bold text-gradient">VibeAthon</span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link href="/menu" className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
              Menu
            </Link>
            <Link href="/cart" className="relative px-4 py-2 text-sm font-medium text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all">
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full text-[10px] font-bold text-white flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link href="/login" className="ml-2 btn-primary text-sm px-5 py-2 rounded-lg">
              Sign In
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto p-4 md:p-8">
        {children}
      </main>
      <footer className="border-t border-white/[0.06] py-8 text-center text-sm text-gray-600">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} VibeAthon Smart Restaurant. Built with ❤️ for VibeAthon 6.0</p>
        </div>
      </footer>
    </div>
  );
}
