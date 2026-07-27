'use client';

interface InvoiceItem {
  name: string;
  price: number;
  quantity: number;
}

interface DigitalInvoiceProps {
  orderId: string;
  tableNumber?: number;
  items: InvoiceItem[];
  subtotal: number;
  onClose: () => void;
}

export default function DigitalInvoiceModal({ orderId, tableNumber, items, subtotal, onClose }: DigitalInvoiceProps) {
  const tax = subtotal * 0.05; // 5% GST/Tax
  const serviceCharge = subtotal * 0.05; // 5% Service Charge
  const total = subtotal + tax + serviceCharge;
  const dateStr = new Date().toLocaleString();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 text-slate-100 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl p-6 space-y-6 animate-fade-in print:bg-white print:text-black print:p-0 print:border-none print:shadow-none print:w-full">
        {/* Header */}
        <div className="text-center space-y-1 border-b border-slate-800 pb-4 print:border-black">
          <div className="inline-flex items-center gap-2 font-bold text-xl text-orange-400 print:text-black">
            <span>🍽️ VibeAthon Smart Restaurant</span>
          </div>
          <p className="text-xs text-slate-400 print:text-gray-600">Official Tax Invoice / Receipt</p>
          <div className="flex justify-between text-xs text-slate-400 pt-2 print:text-gray-700">
            <span>Order #{orderId}</span>
            <span>Table #{tableNumber || 'N/A'}</span>
          </div>
          <p className="text-[10px] text-slate-500 text-right print:text-gray-500">{dateStr}</p>
        </div>

        {/* Itemized List */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-semibold text-slate-400 border-b border-slate-800 pb-1 print:border-gray-300 print:text-black">
            <span>Item</span>
            <div className="flex gap-6">
              <span>Qty</span>
              <span>Amount</span>
            </div>
          </div>
          {items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm text-slate-200 print:text-black">
              <span className="font-medium">{item.name}</span>
              <div className="flex gap-8 text-slate-400 print:text-black">
                <span>x{item.quantity}</span>
                <span className="font-semibold text-slate-100 print:text-black">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Calculations */}
        <div className="border-t border-slate-800 pt-4 space-y-2 text-xs text-slate-400 print:border-gray-300 print:text-black">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>GST / Tax (5%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Service Charge (5%)</span>
            <span>${serviceCharge.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-bold text-orange-400 pt-2 border-t border-slate-800 print:border-black print:text-black">
            <span>Total Payable</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2 print:hidden">
          <button
            onClick={handlePrint}
            className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-all"
          >
            🖨️ Print Receipt
          </button>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-4 py-2.5 rounded-xl text-sm transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
