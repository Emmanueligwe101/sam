import React, { useState } from 'react';

function UserStore({ settings, products, onPlaceOrder }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customer, setCustomer] = useState({ name: '', email: '' });

  const handleCheckout = (e) => {
    e.preventDefault();
    onPlaceOrder(customer, selectedProduct);
    setSelectedProduct(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        {settings.logo ? (
          <img src={settings.logo} alt="Logo" className="h-20 mx-auto mb-4 object-contain" />
        ) : (
          <h1 className="text-5xl font-extrabold text-white tracking-tight drop-shadow-lg">{settings.storeName}</h1>
        )}
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <p className="text-center text-white/70 text-xl">No products available right now.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col hover:transform hover:scale-105 transition-all shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-2">{product.name}</h2>
              <p className="text-gray-300 text-sm mb-4 flex-grow">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-3xl font-extrabold text-emerald-400">₦{product.price}</span>
                <button 
                  onClick={() => setSelectedProduct(product)}
                  className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg shadow-lg"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Checkout Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 p-8 rounded-2xl max-w-md w-full shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Checkout: {selectedProduct.name}</h3>
            <p className="text-emerald-400 font-bold mb-6">Total: ₦{selectedProduct.price}</p>
            
            <form onSubmit={handleCheckout} className="space-y-4">
              <input 
                type="text" required placeholder="Your Full Name"
                value={customer.name} onChange={e => setCustomer({...customer, name: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
              />
              <input 
                type="email" required placeholder="Your Email Address"
                value={customer.email} onChange={e => setCustomer({...customer, email: e.target.value})}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white"
              />
              <div className="flex gap-4 mt-6">
                <button type="button" onClick={() => setSelectedProduct(null)} className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-lg">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg">
                  Proceed to Pay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserStore;
