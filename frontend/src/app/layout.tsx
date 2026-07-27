import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "VibeAthon | Smart Restaurant Management",
  description: "The ultimate intelligent restaurant management platform. Streamline operations, delight your customers, and boost revenue with AI-powered insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-[#0a0e1a] text-slate-50 antialiased">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
