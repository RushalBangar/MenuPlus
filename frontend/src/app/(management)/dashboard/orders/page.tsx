export default function OrdersPage() {
  const orders = [
    { id: 'ORD-001', items: '2x Classic Burger, 1x Truffle Fries', total: '$32.97', status: 'New', time: '2 mins ago' },
    { id: 'ORD-002', items: '1x Vegan Wrap', total: '$10.50', status: 'Preparing', time: '15 mins ago' },
    { id: 'ORD-003', items: '2x Matcha Latte', total: '$11.00', status: 'Ready', time: '22 mins ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Active Orders</h1>
        <button className="bg-primary text-white px-4 py-2 rounded-lg font-medium">New Order</button>
      </div>

      <div className="grid gap-4">
        {orders.map(order => (
          <div key={order.id} className="glass-card p-6 rounded-xl flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg">{order.id}</span>
                <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                  order.status === 'New' ? 'bg-blue-500/20 text-blue-400' :
                  order.status === 'Preparing' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-400">{order.items}</p>
            </div>
            <div className="text-right space-y-1">
              <div className="font-bold text-lg">{order.total}</div>
              <div className="text-xs text-gray-500">{order.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
