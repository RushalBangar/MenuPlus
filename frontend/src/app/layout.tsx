import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MenuPlus | AI-Powered Smart Restaurant Management SaaS",
  description: "The ultimate intelligent restaurant management platform. Streamline operations, delight customers, and boost revenue with AI-powered insights.",
  icons: {
    icon: "/menuplus_logo.png",
    shortcut: "/menuplus_logo.png",
    apple: "/menuplus_logo.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} h-full dark`}>
      <body className="min-h-full flex flex-col bg-[#0a0e1a] text-slate-50 antialiased font-sans">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
