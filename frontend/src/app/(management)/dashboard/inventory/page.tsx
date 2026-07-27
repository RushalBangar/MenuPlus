'use client';
import { useState } from 'react';

interface InventoryItem {
  id: number;
  ingredient_name: string;
  quantity: number;
  unit: string;
  low_stock_threshold: number;
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

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [showLowOnly, setShowLowOnly] = useState(false);

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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="text-gray-400 mt-1">{inventory.length} ingredients tracked</p>
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
              showLowOnly ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {showLowOnly ? 'Show All' : 'Low Stock Only'}
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="glass-card-static rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Ingredient</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Stock Level</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Quantity</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Threshold</th>
                <th className="text-right py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map(item => {
                const level = stockLevel(item);
                const levelConfig = {
                  good: { bar: 'bg-green-500', text: 'text-green-400', width: 'w-full' },
                  medium: { bar: 'bg-yellow-500', text: 'text-yellow-400', width: 'w-2/3' },
                  low: { bar: 'bg-red-500', text: 'text-red-400', width: 'w-1/3' },
                };
                const config = levelConfig[level];

                return (
                  <tr key={item.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${config.bar}`} />
                        <span className="font-medium">{item.ingredient_name}</span>
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
                    <td className="py-4 px-6 text-gray-500">
                      {item.low_stock_threshold} {item.unit}
                    </td>
                    <td className="py-4 px-6 text-right">
                      {isLowStock(item) && (
                        <button
                          onClick={() => handleRestock(item.id)}
                          className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-lg hover:bg-primary/20 transition-colors"
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
