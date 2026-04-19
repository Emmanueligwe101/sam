import React, { useState, useEffect } from 'react';
import UserStore from './UserStore';
import AdminDashboard from './AdminDashboard';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Simulated Backend State
  const [settings, setSettings] = useState(() => JSON.parse(localStorage.getItem('storeSettings')) || {
    storeName: 'Premium Store',
    logo: '',
    background: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1920&q=80'
  });
  
  const [products, setProducts] = useState(() => JSON.parse(localStorage.getItem('storeProducts')) || []);
  const [orders, setOrders] = useState(() => JSON.parse(localStorage.getItem('storeOrders')) || []);

  // Save to LocalStorage whenever state changes
  useEffect(() => localStorage.setItem('storeSettings', JSON.stringify(settings)), [settings]);
  useEffect(() => localStorage.setItem('storeProducts', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('storeOrders', JSON.stringify(orders)), [orders]);

  const handlePlaceOrder = (customerData, product) => {
    const newOrder = {
      id: 'ORD-' + Math.floor(Math.random() * 1000000),
      date: new Date().toLocaleString(),
      customerName: customerData.name,
      customerEmail: customerData.email,
      productName: product.name,
      price: product.price,
      status: 'Payment Pending'
    };
    setOrders([newOrder, ...orders]);
    
    // Redirect user to the admin's custom payment link
    window.location.href = product.redirectUrl;
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed transition-all duration-500"
      style={{ backgroundImage: `url(${settings.background})` }}
    >
      <div className="min-h-screen bg-black/40 backdrop-blur-sm">
        {/* Navigation Toggle */}
        <nav className="p-4 flex justify-end">
          <button 
            onClick={() => setIsAdmin(!isAdmin)}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur-md border border-white/30 transition-all"
          >
            {isAdmin ? 'View Storefront' : 'Admin Login'}
          </button>
        </nav>

        {/* Render View */}
        {isAdmin ? (
          <AdminDashboard 
            settings={settings} setSettings={setSettings}
            products={products} setProducts={setProducts}
            orders={orders}
          />
        ) : (
          <UserStore 
            settings={settings} 
            products={products} 
            onPlaceOrder={handlePlaceOrder} 
          />
        )}
      </div>
    </div>
  );
}

export default App;
