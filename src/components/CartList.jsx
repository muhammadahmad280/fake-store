// src/components/CartList.jsx
import React from 'react';

function CartList({ carts }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Your Carts</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {carts.map((cart) => (
          <div
            key={cart.id}
            className="border border-gray-200 dark:border-gray-600 rounded-xl p-6 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center justify-between">
              <span>Cart #{cart.id}</span>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                User ID: {cart.userId}
              </span>
            </h2>

            <hr className="border-gray-200 dark:border-gray-700 mb-4" />

            <ul className="space-y-4">
              {cart.products.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title || 'Product Image'}
                      className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                    />
                  )}
                  <div className="flex-grow">
                    <span className="text-base font-medium text-gray-800 dark:text-white block">
                      {item.title}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Quantity: <span className="font-semibold">{item.quantity}</span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartList;
