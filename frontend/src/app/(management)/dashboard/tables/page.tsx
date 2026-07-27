'use client';
import { useState } from 'react';

interface Table {
  id: number;
  table_number: number;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
}

const INITIAL_TABLES: Table[] = [
  { id: 1, table_number: 1, capacity: 2, status: 'available' },
  { id: 2, table_number: 2, capacity: 4, status: 'occupied' },
  { id: 3, table_number: 3, capacity: 6, status: 'reserved' },
  { id: 4, table_number: 4, capacity: 2, status: 'available' },
  { id: 5, table_number: 5, capacity: 8, status: 'occupied' },
  { id: 6, table_number: 6, capacity: 4, status: 'available' },
  { id: 7, table_number: 7, capacity: 2, status: 'occupied' },
  { id: 8, table_number: 8, capacity: 6, status: 'available' },
  { id: 9, table_number: 9, capacity: 4, status: 'reserved' },
  { id: 10, table_number: 10, capacity: 2, status: 'available' },
  { id: 11, table_number: 11, capacity: 8, status: 'occupied' },
  { id: 12, table_number: 12, capacity: 4, status: 'available' },
];

const statusConfig = {
  available: { label: 'Available', color: 'bg-green-500/20 text-green-400 border-green-500/30', dot: 'bg-green-400' },
  occupied: { label: 'Occupied', color: 'bg-red-500/20 text-red-400 border-red-500/30', dot: 'bg-red-400' },
  reserved: { label: 'Reserved', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', dot: 'bg-yellow-400' },
};

export default function TablesPage() {
  const [tables, setTables] = useState<Table[]>(INITIAL_TABLES);
  const [filter, setFilter] = useState<'all' | 'available' | 'occupied' | 'reserved'>('all');

  const cycleStatus = (id: number) => {
    setTables(prev =>
      prev.map(t => {
        if (t.id !== id) return t;
        const order: Table['status'][] = ['available', 'occupied', 'reserved'];
        const nextIdx = (order.indexOf(t.status) + 1) % order.length;
        return { ...t, status: order[nextIdx] };
      })
    );
  };

  const filteredTables = filter === 'all' ? tables : tables.filter(t => t.status === filter);

  const counts = {
    available: tables.filter(t => t.status === 'available').length,
    occupied: tables.filter(t => t.status === 'occupied').length,
    reserved: tables.filter(t => t.status === 'reserved').length,
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Table Management</h1>
          <p className="text-gray-400 mt-1">Click on any table to change its status</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card-static p-4 rounded-xl text-center glow-green">
          <div className="text-3xl font-bold text-green-400">{counts.available}</div>
          <div className="text-sm text-gray-400">Available</div>
        </div>
        <div className="glass-card-static p-4 rounded-xl text-center" style={{ boxShadow: '0 0 20px rgba(239, 68, 68, 0.15)' }}>
          <div className="text-3xl font-bold text-red-400">{counts.occupied}</div>
          <div className="text-sm text-gray-400">Occupied</div>
        </div>
        <div className="glass-card-static p-4 rounded-xl text-center" style={{ boxShadow: '0 0 20px rgba(234, 179, 8, 0.15)' }}>
          <div className="text-3xl font-bold text-yellow-400">{counts.reserved}</div>
          <div className="text-sm text-gray-400">Reserved</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(['all', 'available', 'occupied', 'reserved'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              filter === f ? 'bg-primary text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTables.map(table => {
          const config = statusConfig[table.status];
          return (
            <button
              key={table.id}
              onClick={() => cycleStatus(table.id)}
              className={`glass-card-static p-6 rounded-2xl text-center space-y-3 border transition-all hover:scale-[1.02] active:scale-95 ${config.color}`}
            >
              <div className="text-4xl font-extrabold">{table.table_number}</div>
              <div className="flex items-center justify-center gap-2">
                <span className={`w-2 h-2 rounded-full ${config.dot}`} />
                <span className="text-sm font-medium">{config.label}</span>
              </div>
              <div className="text-xs text-gray-500">{table.capacity} seats</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
