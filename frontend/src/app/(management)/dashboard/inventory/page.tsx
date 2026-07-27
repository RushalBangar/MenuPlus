'use client';
import { useState, useEffect } from 'react';

interface InventoryItem {
  id: number;
  ingredient_name: string;
  quantity: number;
  unit: string;
  low_stock_threshold: number;
}

interface ForecastItem {
  ingredient_name: string;
  current_stock: number;
  unit: string;
  predicted_depletion_days: number;
  restock_recommended: boolean;
  urgency: string;
}

const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 1, ingredient_name: 'Beef Patties', quantity: 45, unit: 'pcs', low_stock_threshold: 20 },
  { id: 2, ingredient_name: 'Burger Buns', quantity: 60, unit: 'pcs', low_stock_threshold: 25 },
  { id: 3, ingredient_name: 'Lettuce', quantity: 8, unit: 'kg', low_stock_threshold: 5 },
  { id: 4, ingredient_name: 'Tomatoes', quantity: 3, unit: 'kg', low_stock_threshold: 5 },
  { id: 5, ingredient_name: 'Cheddar Cheese', quantity: 4, unit: 'kg', low_stock_threshold: 3 },
  { id: 6, ingredient_name: 'Truffle Oil', quantity: 0.5, unit: 'L', low_stock_threshold: 1 },
  { id: 7, ingredient_name: 'Fries (Frozen)', quantity: 25, unit: 'kg', low_stock_threshold: 10 },
  { id: 8, ingredient_name: 'Matcha Powder', quantity: 2, unit: 'kg', low_stock_threshold: 1 },
  { id: 9, ingredient_name: 'Oat Milk', quantity: 12, unit: 'L', low_stock_threshold: 5 },
  { id: 10, ingredient_name: 'Hummus', quantity: 1.5, unit: 'kg', low_stock_threshold: 2 },
  { id: 11, ingredient_name: 'Tortilla Wraps', quantity: 30, unit: 'pcs', low_stock_threshold: 15 },
  { id: 12, ingredient_name: 'Parmesan', quantity: 1, unit: 'kg', low_stock_threshold: 2 },
];

const DEFAULT_FORECASTS: ForecastItem[] = [
  { ingredient_name: 'Truffle Oil', current_stock: 1.5, unit: 'Liters', predicted_depletion_days: 2, restock_recommended: true, urgency: 'high' },
  { ingredient_name: 'Beef Patties', current_stock: 14, unit: 'Kg', predicted_depletion_days: 3, restock_recommended: true, urgency: 'medium' },
  { ingredient_name: 'Matcha Powder', current_stock: 0.8, unit: 'Kg', predicted_depletion_days: 4, restock_recommended: true, urgency: 'medium' }
];

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [showLowOnly, setShowLowOnly] = useState(false);
  const [forecasts, setForecasts] = useState<ForecastItem[]>(DEFAULT_FORECASTS);

  useEffect(() => {
    fetch('https://menuplus.onrender.com/api/ai/inventory-forecast')
      .then(res => {
        if (!res.ok) throw new Error('API offline');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setForecasts(data);
      })
      .catch(() => {
        setForecasts(DEFAULT_FORECASTS);
      });
  }, []);

  const isLowStock = (item: InventoryItem) => item.quantity <= item.low_stock_threshold;
  const stockLevel = (item: InventoryItem) => {
    const ratio = item.quantity / (item.low_stock_threshold * 3);
    if (ratio > 0.6) return 'good';
    if (ratio > 0.3) return 'medium';
    return 'low';
  };

  const handleRestock = (id: number) => {
    setInventory(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.low_stock_threshold * 3 } : item
      )
    );
  };

  const displayed = showLowOnly ? inventory.filter(isLowStock) : inventory;
  const lowStockCount = inventory.filter(isLowStock).length;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Inventory & Stock Control</h1>
          <p className="text-slate-400 mt-1">{inventory.length} ingredients tracked</p>
        </div>
        <div className="flex items-center gap-3">
          {lowStockCount > 0 && (
            <span className="px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium rounded-lg">
              ⚠️ {lowStockCount} low stock
            </span>
          )}
          <button
            onClick={() => setShowLowOnly(!showLowOnly)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              showLowOnly ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            {showLowOnly ? 'Show All' : 'Low Stock Only'}
          </button>
        </div>
      </div>

      {/* Platinum AI Demand Forecasting Banner */}
      <div className="bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-slate-900 border border-orange-500/30 p-6 rounded-2xl space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <h2 className="text-lg font-bold text-white">AI Demand & Restock Predictor</h2>
          </div>
          <span className="bg-orange-500/20 text-orange-400 text-xs px-3 py-1 rounded-full font-semibold border border-orange-500/30">
            Gemini Predictive Engine
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {forecasts.map((f, idx) => (
            <div key={idx} className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-200 text-sm">{f.ingredient_name}</span>
                <span className={`text-[10px] uppercase px-2 py-0.5 rounded font-extrabold ${
                  f.urgency === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {f.urgency} urgency
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Depletes in <span className="text-orange-400 font-bold">{f.predicted_depletion_days} days</span>
              </p>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className={`h-full ${f.urgency === 'high' ? 'bg-red-500' : 'bg-amber-500'} w-3/4 animate-pulse`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="glass-card-static rounded-2xl overflow-hidden border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-slate-200">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider">Ingredient</th>
                <th className="text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider">Stock Level</th>
                <th className="text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider">Quantity</th>
                <th className="text-left py-4 px-6 text-xs font-semibold uppercase tracking-wider">Threshold</th>
                <th className="text-right py-4 px-6 text-xs font-semibold uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map(item => {
                const level = stockLevel(item);
                const levelConfig = {
                  good: { bar: 'bg-emerald-500', text: 'text-emerald-400', width: 'w-full' },
                  medium: { bar: 'bg-amber-500', text: 'text-amber-400', width: 'w-2/3' },
                  low: { bar: 'bg-red-500', text: 'text-red-400', width: 'w-1/3' },
                };
                const config = levelConfig[level];

                return (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${config.bar}`} />
                        <span className="font-medium text-white">{item.ingredient_name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="w-24 h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${config.bar} ${config.width} transition-all`} />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`font-semibold ${config.text}`}>{item.quantity} {item.unit}</span>
                    </td>
                    <td className="py-4 px-6 text-slate-400">
                      {item.low_stock_threshold} {item.unit}
                    </td>
                    <td className="py-4 px-6 text-right">
                      {isLowStock(item) && (
                        <button
                          onClick={() => handleRestock(item.id)}
                          className="px-3 py-1.5 bg-orange-500/20 text-orange-400 text-xs font-semibold rounded-lg hover:bg-orange-500/30 transition-colors"
                        >
                          Restock
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
