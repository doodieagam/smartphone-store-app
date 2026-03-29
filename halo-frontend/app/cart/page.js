'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';

export default function Cart() {
  const { cart, dispatch } = useCart();

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Shopping Cart
            </h1>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-6 opacity-50">🛒</div>
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
              <p className="text-gray-500 mb-8">Add some smartphones to get started</p>
              <Link 
                href="/" 
                className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-xl hover:shadow-2xl"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-6 mb-12">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-6 p-6 bg-gradient-to-r from-white/50 to-indigo-50/30 rounded-2xl border border-white/50 hover:shadow-xl transition-all duration-200 group">
                    <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <div className="text-3xl">📱</div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">{item.name}</h3>
                      <p className="text-indigo-600 font-semibold text-lg mb-2">${item.price}</p>
                      <p className="text-sm text-gray-500">{item.brand}</p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="font-bold text-2xl text-gray-900 mb-1">${item.price}</div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="mt-2 px-4 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors font-medium text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900">Total</h2>
                  <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    ${totalPrice.toFixed(2)}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Link 
                    href="/checkout" 
                    className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-5 rounded-2xl font-bold text-xl shadow-2xl hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 hover:shadow-3xl hover:-translate-y-1 text-center"
                  >
                    Proceed to Checkout →
                  </Link>
                  <Link 
                    href="/" 
                    className="px-8 py-5 bg-white border-2 border-gray-200 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:shadow-lg"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
