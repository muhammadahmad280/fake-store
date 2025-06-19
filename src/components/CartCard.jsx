// src/components/CartCard.jsx
import React from 'react';

function CartCard({ cart, onDelete, onEdit }) {
  const totalAmount = cart.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.products.reduce((sum, item) => sum + item.quantity, 0);
  const cartDate = cart.date
    ? new Date(cart.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : 'N/A';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 border border-gray-200 dark:border-gray-700 relative transform transition duration-300 hover:scale-105 overflow-hidden">
      
      <div className="relative z-10 flex flex-col h-full">
        <h2 className="text-2xl font-bold mb-2 text-blue-800 dark:text-blue-300 flex justify-between items-center">
          Cart #{cart.id}
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">User ID: {cart.userId}</span>
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Date: {cartDate}</p>
        <hr className="border-gray-200 dark:border-gray-700 mb-4" />

        <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-2">
          Products ({totalItems} items):
        </h3>

        <ul className="space-y-3 mb-4 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          {cart.products.length > 0 ? (
            cart.products.map((item, index) => (
              <li
                key={item.productId || index}
                className="flex items-center space-x-3 p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title || 'Product Image'}
                    className="w-12 h-12 object-cover rounded-md flex-shrink-0 border border-gray-200 dark:border-gray-600"
                  />
                )}
                <div className="flex-grow">
                  <span className="text-base font-medium text-gray-800 dark:text-white block">
                    {item.title}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Qty: <span className="font-semibold">{item.quantity}</span> | Price:{" "}
                    <span className="font-semibold">
                      ${item.price ? item.price.toFixed(2) : "0.00"}
                    </span>
                  </span>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No products in this cart.</p>
          )}
        </ul>

        <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <span className="text-lg font-bold text-green-700 dark:text-green-400">
            Total: ${totalAmount.toFixed(2)}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(cart)}
              className="px-4 py-1.5 bg-yellow-600 text-white text-sm font-medium rounded hover:bg-yellow-700 transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(cart.id)}
              className="px-4 py-1.5 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
