'use client';
import { useEffect, useState } from 'react';

interface Order {
  id: string;
  items: string;
  total_amount: number;
  status: string;
  created_at: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch('https://menuplus.onrender.com/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // 5s polling as requested
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      await fetch(`https://menuplus.onrender.com/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      fetchOrders();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-white">Active Orders</h1>
        <button className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg">
          New Walk-in Order
        </button>
      </div>

      <div className="grid gap-4">
        {loading && orders.length === 0 ? (
          <div className="text-center text-slate-400 py-10">Loading active orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-slate-400 py-10">No active orders right now.</div>
        ) : (
          orders.map(order => (
            <div key={order.id} className="glass-card-static p-5 md:p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/10">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-extrabold text-xl text-white">{order.id}</span>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    order.status === 'New' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                    order.status === 'Preparing' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    'bg-green-500/20 text-green-400 border border-green-500/30'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-slate-300 font-medium">Items: {order.items ? order.items : "Custom Order"}</p>
                <div className="text-xs text-slate-500">Ordered: {order.created_at}</div>
              </div>
              
              <div className="flex flex-col md:items-end gap-3">
                <div className="font-extrabold text-xl text-orange-400">
                  ${order.total_amount ? order.total_amount.toFixed(2) : "0.00"}
                </div>
                
                <div className="flex gap-2">
                  {order.status === 'New' && (
                    <button 
                      onClick={() => updateStatus(order.id, 'Preparing')}
                      className="text-xs font-bold px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-300 rounded-lg transition-colors border border-yellow-500/30"
                    >
                      Start Preparing
                    </button>
                  )}
                  {order.status === 'Preparing' && (
                    <button 
                      onClick={() => updateStatus(order.id, 'Ready')}
                      className="text-xs font-bold px-4 py-2 bg-green-500/20 hover:bg-green-500/40 text-green-300 rounded-lg transition-colors border border-green-500/30"
                    >
                      Mark Ready
                    </button>
                  )}
                  {order.status === 'Ready' && (
                    <button 
                      onClick={() => updateStatus(order.id, 'Completed')}
                      className="text-xs font-bold px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                    >
                      Archive Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
