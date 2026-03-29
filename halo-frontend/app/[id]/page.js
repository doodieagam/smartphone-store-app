'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';

export default function ProductDetail() {
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useCart();

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:3000/products/${id}`);
      if (!res.ok) {
        throw new Error('Product not found');
      }
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
    if (product) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center p-12 bg-white rounded-3xl shadow-2xl">
          <div className="text-6xl mb-8 opacity-50">❓</div>
          <h2 className="text-3xl font-bold text-gray-700 mb-6">Product Not Found</h2>
          <Link href="/" className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all duration-200 shadow-xl hover:shadow-2xl">
            Back to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold mb-12 transition-colors text-lg"
        >
          ← Back to Store
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Product Image */}
          <div className="aspect-[4/3] lg:aspect-square bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 rounded-3xl p-12 flex items-center justify-center shadow-2xl group hover:scale-[1.02] transition-transform duration-300">
            <div className="text-8xl lg:text-9xl drop-shadow-2xl group-hover:rotate-3 transition-transform duration-500">📱</div>
          </div>

          {/* Product Info */}
          <div className="space-y-8 lg:space-y-10">
            <div>
              <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-black bg-clip-text text-transparent mb-6 leading-tight">
                {product.name}
              </h1>
              <p className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-700 bg-clip-text text-transparent mb-4">
                ${product.price}
              </p>
              <p className="text-2xl font-bold text-gray-800">{product.brand}</p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: 'RAM', value: product.RAM, icon: '💾' },
                { label: 'Storage', value: product.storage, icon: '🗄️' },
                { label: 'Battery', value: product.battery, icon: '🔋' },
                { label: 'Camera', value: product.camera, icon: '📸' }
              ].map((spec, index) => (
                <div key={index} className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 hover:border-indigo-200 hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-2xl">{spec.icon}</div>
                    <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                      {spec.label}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{spec.value}</div>
                </div>
              ))}
            </div>

            {/* Stock Status */}
            <div className={`p-6 rounded-2xl ${product.stock > 0 ? 'bg-emerald-50 border-2 border-emerald-200' : 'bg-red-50 border-2 border-red-200'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${product.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                <div className="font-bold text-xl">
                  {product.stock > 0 
                    ? `${product.stock} units in stock` 
                    : 'Out of Stock'
                  }
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <button
                onClick={addToCart}
                disabled={product.stock === 0}
                className={`py-5 px-8 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-200 hover:-translate-y-1 text-center ${
                  product.stock > 0
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {product.stock > 0 ? '🛒 Add to Cart' : 'Out of Stock'}
              </button>
              <button className="py-5 px-8 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 rounded-3xl font-bold text-xl border-2 border-gray-200 hover:bg-white hover:shadow-xl hover:border-gray-300 transition-all duration-200 hover:-translate-y-1">
                💝 Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
