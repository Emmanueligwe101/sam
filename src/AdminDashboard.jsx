import React, { useState } from 'react';

function AdminDashboard({ settings, setSettings, products, setProducts, orders }) {
  const [activeTab, setActiveTab] = useState('products');
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', redirectUrl: '' });

  // Handle Image Uploads and convert to Base64 to save locally
  const handleImageUpload = (e, settingKey) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSettings({ ...settings, [settingKey]: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    setProducts([{ ...newProduct, id: Date.now().toString() }, ...products]);
    setNewProduct({ name: '', price: '', description: '', redirectUrl: '' });
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Admin Tabs */}
        <div className="flex border-b border-gray-700 bg-gray-800/50">
          {['products', 'orders', 'settings'].map(tab => (
            <button 
              key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-lg font-bold capitalize transition-colors ${activeTab === tab ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-gray-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-8">
          {/* --- PRODUCTS TAB --- */}
          {activeTab === 'products' && (
            <div className="space-y-8">
              <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <h3 className="col-span-full text-xl font-bold text-white mb-2">Add New Product</h3>
                <input required type="text" placeholder="Product Name" className="p-3 bg-gray-900 border border-gray-600 rounded text-white" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                <input required type="number" placeholder="Price (₦)" className="p-3 bg-gray-900 border border-gray-600 rounded text-white" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
                <input required type="url" placeholder="Payment Redirect URL (e.g. Paystack link)" className="col-span-full p-3 bg-gray-900 border border-gray-600 rounded text-white" value={newProduct.redirectUrl} onChange={e => setNewProduct({...newProduct, redirectUrl: e.target.value})} />
                <textarea required placeholder="Product Description" className="col-span-full p-3 bg-gray-900 border border-gray-600 rounded text-white h-24" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                <button type="submit" className="col-span-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded shadow-lg">Publish Product</button>
              </form>

              <div className="space-y-4">
                {products.map(p => (
                  <div key={p.id} className="flex justify-between items-center p-4 bg-gray-800 border border-gray-700 rounded-lg">
                    <div>
                      <h4 className="text-white font-bold text-lg">{p.name} <span className="text-emerald-400 ml-2">₦{p.price}</span></h4>
                      <p className="text-gray-400 text-sm">Redirects to: {p.redirectUrl}</p>
                    </div>
                    <button onClick={() => handleDeleteProduct(p.id)} className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded transition">Delete</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- ORDERS TAB --- */}
          {activeTab === 'orders' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-300">
                <thead className="text-white bg-gray-800">
                  <tr>
                    <th className="p-4 rounded-tl-lg">Order ID & Date</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Product & Price</th>
                    <th className="p-4 rounded-tr-lg">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr><td colSpan="4" className="p-4 text-center text-gray-500">No orders yet.</td></tr>
                  ) : orders.map(order => (
                    <tr key={order.id} className="border-b border-gray-700 hover:bg-gray-800/50">
                      <td className="p-4"><p className="font-bold text-white">{order.id}</p><p className="text-xs text-gray-500">{order.date}</p></td>
                      <td className="p-4"><p className="font-bold">{order.customerName}</p><p className="text-sm">{order.customerEmail}</p></td>
                      <td className="p-4"><p>{order.productName}</p><p className="text-emerald-400 font-bold">₦{order.price}</p></td>
                      <td className="p-4"><span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-bold">{order.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* --- SETTINGS TAB --- */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-xl">
              <div>
                <label className="block text-white font-bold mb-2">Store Name</label>
                <input type="text" className="w-full p-3 bg-gray-800 border border-gray-600 rounded text-white" value={settings.storeName} onChange={e => setSettings({...settings, storeName: e.target.value})} />
              </div>
              <div>
                <label className="block text-white font-bold mb-2">Upload Logo (PNG/JPG)</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'logo')} className="block w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20" />
                {settings.logo && <img src={settings.logo} alt="Logo Preview" className="mt-4 h-16 object-contain" />}
              </div>
              <div>
                <label className="block text-white font-bold mb-2">Upload Background Image</label>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'background')} className="block w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
