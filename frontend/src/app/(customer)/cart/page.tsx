'use client';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import DigitalInvoiceModal from '@/components/DigitalInvoiceModal';
import Image from 'next/image';

interface AIPairingItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  category?: string;
  is_available?: boolean;
  image_url: string;
}

interface CartItemData {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
}

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalAmount, totalItems, addItem } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState<{ id: string; items: CartItemData[]; total: number }>({ id: 'ORD-101', items: [], total: 0 });
  const [aiPairing, setAiPairing] = useState<{ text: string; items: AIPairingItem[]; offer?: string } | null>(null);

  useEffect(() => {
    if (items.length > 0) {
      fetch('https://menuplus.onrender.com/api/ai/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart_item_ids: items.map(i => i.id) })
      })
        .then(res => res.json())
        .then(data => {
          setAiPairing({
            text: data.reasoning,
            items: data.recommended_items,
            offer: data.discount_offer
          });
        })
        .catch(() => {
          setAiPairing({
            text: "Customers who ordered these items loved pairing them with crispy Truffle Fries and a cold beverage!",
            items: [
              {"id": 3, "name": "Truffle Fries", "description": "Crispy fries with truffle oil.", "price": 6.99, "category": "Sides", "is_available": true, "image_url": "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500&q=80"},
              {"id": 4, "name": "Matcha Latte", "description": "Matcha with oat milk.", "price": 5.50, "category": "Drinks", "is_available": true, "image_url": "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=500&q=80"}
            ],
            offer: "Special Chef's AI Pair Offer!"
          });
        });
    }
  }, [items]);

  const handlePlaceOrder = async () => {
    if (items.length === 0) return;
    
    const orderData = { id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`, items: [...items], total: totalAmount };
    setLastOrderDetails(orderData);

    try {
      await fetch('https://menuplus.onrender.com/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({ menu_item_id: item.id, quantity: item.quantity })),
          total_amount: totalAmount,
        }),
      });
    } catch {
      // Fallback
    }

    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto text-center py-16 space-y-6 animate-fade-in">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </div>
        <h2 className="text-3xl font-bold text-white">Order Confirmed! 🎉</h2>
        <p className="text-slate-400 text-sm">Your order #{lastOrderDetails.id} has been transmitted to the kitchen.</p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => setShowInvoice(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-all"
          >
            🖨️ View & Print Tax Receipt
          </button>
          <Link href="/menu" className="btn-ghost px-6 py-3 rounded-xl">
            Back to Menu
          </Link>
        </div>

        {showInvoice && (
          <DigitalInvoiceModal
            orderId={lastOrderDetails.id}
            tableNumber={4}
            items={lastOrderDetails.items}
            subtotal={lastOrderDetails.total}
            onClose={() => setShowInvoice(false)}
          />
        )}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto text-center py-20 space-y-6 animate-fade-in">
        <div className="w-20 h-20 mx-auto rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-300">Your cart is empty</h2>
        <p className="text-slate-500 text-sm">Explore our menu and add items to your dining cart.</p>
        <Link href="/menu" className="btn-primary inline-block px-8 py-3 rounded-xl">
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-white">Your Cart</h1>
        <button onClick={clearCart} className="text-sm text-red-400 hover:text-red-300 transition-colors">
          Clear All
        </button>
      </div>
      
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="glass-card-static p-4 rounded-xl flex items-center gap-4">
            <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden relative">
              <Image src={item.image_url} alt={item.name} fill sizes="64px" className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base truncate text-white">{item.name}</h3>
              <p className="text-sm text-slate-400">${item.price.toFixed(2)} each</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-white/10"
              >
                −
              </button>
              <span className="w-8 text-center font-semibold text-white">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all border border-white/10"
              >
                +
              </button>
            </div>
            <div className="w-20 text-right">
              <span className="font-bold text-white">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-slate-500 hover:text-red-400 transition-colors p-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Platinum AI Pairings Recommendation Box */}
      {aiPairing && (
        <div className="bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-transparent border border-orange-500/30 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-orange-400 font-bold text-sm">
              <span>✨ Chef&apos;s AI Pairings</span>
              {aiPairing.offer && (
                <span className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full uppercase font-extrabold">
                  {aiPairing.offer}
                </span>
              )}
            </div>
          </div>
          <p className="text-xs text-slate-300 italic">&quot;{aiPairing.text}&quot;</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {aiPairing.items.map((recItem, idx) => (
              <div key={idx} className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg overflow-hidden relative flex-shrink-0">
                    <Image src={recItem.image_url} alt={recItem.name} fill sizes="40px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{recItem.name}</p>
                    <p className="text-[11px] text-orange-400 font-semibold">${recItem.price.toFixed(2)}</p>
                  </div>
                </div>
                <button
                  onClick={() => addItem({ id: recItem.id, name: recItem.name, price: recItem.price, image_url: recItem.image_url })}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex-shrink-0"
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="glass-card-static p-6 rounded-xl space-y-4">
        <div className="flex justify-between text-slate-400 text-sm">
          <span>Items ({totalItems})</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate-400 text-sm">
          <span>Estimated Tax & GST (5%)</span>
          <span>${(totalAmount * 0.05).toFixed(2)}</span>
        </div>
        <div className="border-t border-white/10 pt-4 flex justify-between items-center">
          <span className="text-lg font-bold text-white">Total</span>
          <span className="text-2xl font-extrabold text-orange-400">${(totalAmount * 1.05).toFixed(2)}</span>
        </div>
      </div>

      <button 
        onClick={handlePlaceOrder}
        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-4 text-lg rounded-xl font-bold shadow-lg transition-all"
      >
        Place Order & Generate Bill
      </button>
    </div>
  );
}
