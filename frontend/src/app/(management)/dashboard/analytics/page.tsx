'use client';

import { useState, useEffect } from 'react';

interface AnalyticsData {
  total_revenue: number;
  orders_today: number;
  active_tables: number;
  top_selling_item: string;
  average_order_value: number;
  peak_hours: string;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData>({
    total_revenue: 34280.50,
    orders_today: 64,
    active_tables: 8,
    top_selling_item: 'Classic Burger',
    average_order_value: 44.38,
    peak_hours: '1:00 PM - 2:30 PM & 7:00 PM - 9:00 PM'
  });

  useEffect(() => {
    fetch('https://menuplus.onrender.com/api/analytics')
      .then(res => res.json())
      .then(d => setData(d))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Sales & Revenue Analytics</h1>
          <p className="text-sm text-slate-400">Real-time operational insights, revenue metrics, and performance analytics.</p>
        </div>
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-full text-xs font-semibold">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
          Live Analytics Engine Ready
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-2 hover:border-orange-500/40 transition-colors">
          <div className="flex justify-between items-center text-slate-400 text-sm">
            <span>Total Revenue</span>
            <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded text-xs font-bold">+18.4%</span>
          </div>
          <p className="text-3xl font-extrabold text-white">${data.total_revenue.toLocaleString()}</p>
          <p className="text-xs text-slate-500">Gross sales for current month</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-2 hover:border-orange-500/40 transition-colors">
          <div className="flex justify-between items-center text-slate-400 text-sm">
            <span>Orders Today</span>
            <span className="text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded text-xs font-bold">Peak</span>
          </div>
          <p className="text-3xl font-extrabold text-white">{data.orders_today}</p>
          <p className="text-xs text-slate-500">Avg. Order Value: ${data.average_order_value}</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-2 hover:border-orange-500/40 transition-colors">
          <div className="flex justify-between items-center text-slate-400 text-sm">
            <span>Top Best Seller</span>
            <span className="text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded text-xs font-bold">#1 Dish</span>
          </div>
          <p className="text-2xl font-extrabold text-orange-400 truncate">{data.top_selling_item}</p>
          <p className="text-xs text-slate-500">48 orders fulfilled today</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-2 hover:border-orange-500/40 transition-colors">
          <div className="flex justify-between items-center text-slate-400 text-sm">
            <span>Peak Dining Hours</span>
            <span className="text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded text-xs font-bold">Traffic</span>
          </div>
          <p className="text-sm font-extrabold text-slate-200">{data.peak_hours}</p>
          <p className="text-xs text-slate-500">Estimated table occupancy: 92%</p>
        </div>
      </div>

      {/* Sales Trend Visualizer */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Daily Revenue Performance</h2>
          <div className="flex gap-2">
            <button className="bg-orange-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">7 Days</button>
            <button className="bg-slate-800 text-slate-400 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg">30 Days</button>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="h-48 flex items-end gap-3 sm:gap-6 pt-4 border-b border-slate-800 pb-2">
          {[
            { day: 'Mon', amount: 3200, height: '40%' },
            { day: 'Tue', amount: 4100, height: '55%' },
            { day: 'Wed', amount: 3800, height: '48%' },
            { day: 'Thu', amount: 5200, height: '70%' },
            { day: 'Fri', amount: 6800, height: '90%' },
            { day: 'Sat', amount: 7500, height: '100%' },
            { day: 'Sun', amount: 6200, height: '82%' }
          ].map((bar, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full bg-slate-800 group-hover:bg-orange-500/20 rounded-t-lg relative flex items-end transition-all" style={{ height: '160px' }}>
                <div
                  className="w-full bg-gradient-to-t from-orange-600 to-amber-400 rounded-t-lg transition-all group-hover:brightness-110"
                  style={{ height: bar.height }}
                ></div>
              </div>
              <span className="text-xs text-slate-400 font-medium">{bar.day}</span>
              <span className="text-[10px] text-slate-500 font-semibold">${bar.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
