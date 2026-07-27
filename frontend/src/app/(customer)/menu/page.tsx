'use client';
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  is_available: boolean;
  image_url: string;
}

export default function MenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [addedItems, setAddedItems] = useState<Set<number>>(new Set());
  const { addItem } = useCart();

  useEffect(() => {
    fetch('http://localhost:8000/api/menu')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch menu');
        return res.json();
      })
      .then(data => {
        setMenu(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image_url: item.image_url,
    });
    setAddedItems(prev => new Set(prev).add(item.id));
    setTimeout(() => {
      setAddedItems(prev => {
        const next = new Set(prev);
        next.delete(item.id);
        return next;
      });
    }, 1500);
  };

  const categories = ['All', ...Array.from(new Set(menu.map(item => item.category)))];
  const filteredMenu = activeCategory === 'All' ? menu : menu.filter(item => item.category === activeCategory);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-gray-400 font-medium">Loading menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="glass-card-static inline-block p-8 rounded-2xl">
          <p className="text-red-400 font-medium">⚠️ {error}</p>
          <p className="text-gray-500 text-sm mt-2">Make sure the backend server is running on port 8000.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Our <span className="text-gradient">Menu</span>
        </h1>
        <p className="text-gray-400 text-lg">Discover our handcrafted dishes made with love</p>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 justify-center flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? 'bg-primary text-white shadow-lg shadow-orange-500/20'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      
      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMenu.map((item, index) => (
          <div
            key={item.id}
            className="glass-card rounded-2xl overflow-hidden group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative h-52 w-full overflow-hidden">
              <img 
                src={item.image_url} 
                alt={item.name}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Category badge */}
              <span className="absolute top-3 left-3 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/10">
                {item.category}
              </span>
              
              {!item.is_available && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-[2px]">
                  <span className="text-white font-bold px-4 py-2 border border-white/30 rounded-full bg-black/50 text-sm">
                    Sold Out
                  </span>
                </div>
              )}
              
              {/* Price overlay */}
              <div className="absolute bottom-3 right-3 bg-primary/90 backdrop-blur-sm text-white font-bold px-3 py-1 rounded-lg text-lg">
                ${item.price.toFixed(2)}
              </div>
            </div>
            <div className="p-5 space-y-3">
              <h3 className="text-xl font-bold">{item.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                {item.description}
              </p>
              <button 
                onClick={() => handleAddToCart(item)}
                disabled={!item.is_available}
                className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                  addedItems.has(item.id)
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : item.is_available
                    ? 'bg-white/5 hover:bg-primary hover:text-white border border-white/10 hover:border-primary'
                    : 'bg-white/5 text-gray-600 cursor-not-allowed border border-white/5'
                }`}
              >
                {addedItems.has(item.id) ? '✓ Added to Cart' : item.is_available ? 'Add to Cart' : 'Currently Unavailable'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
