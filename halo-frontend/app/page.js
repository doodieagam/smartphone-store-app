'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { dispatch } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:3000/products');
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.brand.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
        <p className="mt-4 text-lg text-gray-600">Loading smartphones...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex-1 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Latest Smartphones
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the best smartphones with cutting-edge technology and stunning design
          </p>
        </div>

        <div className="flex-1 flex flex-col gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search smartphones..."
              className="w-full max-w-2xl mx-auto px-6 py-4 rounded-full border border-gray-200 shadow-lg focus:ring-4 focus:ring-indigo-500/20 focus:border-transparent transition-all duration-200 bg-white/60 backdrop-blur-sm text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 border border-white/50 hover:border-indigo-200 p-8">
              <div className="relative aspect-square bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden shadow-lg">
                <div className="text-5xl z-10 drop-shadow-2xl">📱</div>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                {product.name}
              </h3>
              <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                ${product.price}
              </p>
              <p className="text-lg font-semibold text-gray-700 mb-6">{product.brand}</p>
              <div className="space-y-1 text-sm text-gray-500 mb-6">
                <div>RAM: {product.RAM} | Storage: {product.storage}</div>
                <div>Battery: {product.battery} | Camera: {product.camera}</div>
                <div className="font-semibold text-emerald-600">✓ {product.stock} in stock</div>
              </div>
              <div className="space-y-3">
                <Link href={`/products/${product.id}`} className="block w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 rounded-xl font-bold text-center hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  View Details
                </Link>
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold text-center hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24 col-span-full">
            <div className="text-7xl mb-6 opacity-30">🔍</div>
            <h3 className="text-3xl font-bold text-gray-700 mb-4">No smartphones found</h3>
            <p className="text-xl text-gray-500 mb-8">Try adjusting your search terms</p>
            <button 
              onClick={fetchProducts}
              className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all duration-200 shadow-xl hover:shadow-2xl"
            >
              Reload Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
