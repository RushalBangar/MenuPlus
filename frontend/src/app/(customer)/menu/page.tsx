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

const MOCK_MENU_ITEMS: MenuItem[] = [
  {"id": 1, "name": "Pan-Seared Scallops", "description": "Diver scallops, sunchoke purée, pickled shimeji mushrooms, herb emulsion.", "price": 28.00, "category": "Appetizers", "is_available": true, "image_url": "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80"},
  {"id": 2, "name": "Crispy Calamari", "description": "Lightly battered squid rings, roasted garlic aioli, lemon zest.", "price": 14.50, "category": "Appetizers", "is_available": true, "image_url": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=500&q=80"},
  {"id": 3, "name": "Classic Burger", "description": "Juicy beef patty, cheddar, lettuce, tomato, special sauce.", "price": 12.99, "category": "Mains", "is_available": true, "image_url": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80"},
  {"id": 4, "name": "A5 Wagyu Striploin", "description": "Charcoal grilled Wagyu steak, black garlic tare, smoked sea salt.", "price": 85.00, "category": "Mains", "is_available": true, "image_url": "https://images.unsplash.com/photo-1558030006-450675393462?w=500&q=80"},
  {"id": 5, "name": "Miso Glazed Cod", "description": "Sustainably sourced black cod, baby bok choy, dashi broth, chili oil.", "price": 42.00, "category": "Mains", "is_available": true, "image_url": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&q=80"},
  {"id": 6, "name": "Vegan Wrap", "description": "Grilled Mediterranean vegetables, organic hummus, baby spinach.", "price": 10.50, "category": "Mains", "is_available": true, "image_url": "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=80"},
  {"id": 7, "name": "Artisanal Pizza", "description": "Wood-fired sourdough crust, San Marzano tomato sauce, fresh mozzarella.", "price": 15.99, "category": "Mains", "is_available": true, "image_url": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80"},
  {"id": 8, "name": "Maitake Mushroom Forest", "description": "Roasted hen-of-the-woods, pea purée, truffle snow.", "price": 34.00, "category": "Mains", "is_available": true, "image_url": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&q=80"},
  {"id": 9, "name": "Truffle Fries", "description": "Hand-cut crispy fries with black truffle oil and parmesan.", "price": 6.99, "category": "Sides", "is_available": true, "image_url": "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500&q=80"},
  {"id": 10, "name": "The Nebula Sour", "description": "Empress gin, clarified lemon, yuzu foam, interactive smoke bubble presentation.", "price": 22.00, "category": "Drinks", "is_available": true, "image_url": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&q=80"},
  {"id": 11, "name": "Matcha Latte", "description": "Ceremonial grade Japanese matcha with oat milk.", "price": 5.50, "category": "Drinks", "is_available": true, "image_url": "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=500&q=80"},
  {"id": 12, "name": "Tiramisu Delight", "description": "Traditional Italian coffee-flavored layer cake.", "price": 7.50, "category": "Desserts", "is_available": true, "image_url": "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&q=80"}
];

export default function MenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>(MOCK_MENU_ITEMS);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [addedItems, setAddedItems] = useState<Set<number>>(new Set());
  const { addItem } = useCart();

  useEffect(() => {
    fetch('https://menuplus.onrender.com/api/menu')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch menu');
        return res.json();
      })
      .then(data => {
        if (data && data.length > 0) setMenu(data);
        setLoading(false);
      })
      .catch(() => {
        setMenu(MOCK_MENU_ITEMS);
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
        <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
        <p className="text-slate-400 font-medium">Loading MenuPlus Digital Menu...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          Our <span className="text-gradient">Digital Menu</span>
        </h1>
        <p className="text-slate-400 text-lg">Curated fine dining selections powered by intelligent insights</p>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 justify-center flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/20 font-bold'
                : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-white'
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
            className="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div>
              <div className="relative h-56 w-full overflow-hidden">
                <img 
                  src={item.image_url} 
                  alt={item.name}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-transparent" />
                
                {/* Category badge */}
                <span className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md text-purple-300 text-xs font-semibold rounded-full border border-purple-500/30">
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
                <div className="absolute bottom-3 right-3 bg-purple-600/90 backdrop-blur-md text-white font-extrabold px-3.5 py-1 rounded-xl text-lg shadow-lg">
                  ${item.price.toFixed(2)}
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-xl font-bold text-white">{item.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button 
                onClick={() => handleAddToCart(item)}
                disabled={!item.is_available}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                  addedItems.has(item.id)
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : item.is_available
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-md hover:brightness-110'
                    : 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700'
                }`}
              >
                {addedItems.has(item.id) ? '✓ Added to Cart' : item.is_available ? '+ Add to Order' : 'Currently Unavailable'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
