// Topbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Topbar() {
  return (
    <div>
      <header className="bg-white shadow dark:bg-gray-800 m-0">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Fake Store Dashboard
            </h1>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link
                    to="/dashboard/products"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/carts"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    Carts
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/users"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  >
                    Users
                  </Link>
                </li>
              
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
}
