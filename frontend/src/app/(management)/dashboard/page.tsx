'use client';


export default function DashboardPage() {
  const stats = [
    { label: 'Total Revenue', value: '$12,450', trend: '+14%', icon: '💰', glow: 'glow-green' },
    { label: 'Active Orders', value: '24', trend: '+5', icon: '📋', glow: 'glow-orange' },
    { label: 'Customers Today', value: '142', trend: '+12%', icon: '👥', glow: 'glow-blue' },
    { label: 'Tables Occupied', value: '8/12', trend: '66%', icon: '🪑', glow: '' },
  ];

  const recentOrders = [
    { id: 'ORD-041', items: '2x Classic Burger, 1x Matcha Latte', total: '$31.48', status: 'Preparing', time: '3m ago' },
    { id: 'ORD-040', items: '1x Vegan Wrap, 1x Truffle Fries', total: '$17.49', status: 'Ready', time: '12m ago' },
    { id: 'ORD-039', items: '3x Matcha Latte', total: '$16.50', status: 'Served', time: '28m ago' },
  ];

  const statusColors: Record<string, string> = {
    'New': 'bg-blue-500/20 text-blue-400',
    'Preparing': 'bg-yellow-500/20 text-yellow-400',
    'Ready': 'bg-green-500/20 text-green-400',
    'Served': 'bg-gray-500/20 text-gray-400',
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back! Here&apos;s today&apos;s overview.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className={`glass-card-static p-6 rounded-xl space-y-3 ${stat.glow}`}>
            <div className="flex items-center justify-between">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-xs font-semibold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">{stat.trend}</span>
            </div>
            <div>
              <div className="text-3xl font-extrabold">{stat.value}</div>
              <div className="text-sm text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-3 glass-card-static p-6 rounded-2xl space-y-4">
          <h3 className="font-semibold text-lg">Recent Orders</h3>
          <div className="space-y-3">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-bold">{order.id}</span>
                    <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{order.items}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold">{order.total}</div>
                  <div className="text-xs text-gray-600">{order.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* AI Insights */}
        <div className="lg:col-span-2 glass-card-static p-6 rounded-2xl space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <h3 className="font-semibold text-lg">AI Insights</h3>
          </div>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 space-y-2">
              <div className="flex items-center gap-2 text-orange-400 font-semibold text-sm">
                <span>📈</span> Demand Forecast
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Expect a 20% surge in orders between 6–8 PM. Consider preparing extra burger patties and buns.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 space-y-2">
              <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
                <span>⚠️</span> Inventory Alert
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Truffle Oil and Tomatoes are running low. Restock recommended before the evening rush.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 space-y-2">
              <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm">
                <span>💡</span> Recommendation
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Classic Burger + Matcha Latte is a trending combo today. Feature it as a deal!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
