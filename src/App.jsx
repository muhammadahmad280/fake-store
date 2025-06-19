// src/App.jsx
import React, { useState } from 'react';
import CartsDashboard from './components/CartsDashboard';
import UsersDashboard from './components/UsersDashboard';
import AuthSection from './components/AuthSection';

function App() {
  const [activeSection, setActiveSection] = useState('carts');

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-inter">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-gray-800 dark:bg-gray-950 p-6 shadow-lg lg:min-h-screen">
          <div className="flex items-center justify-center mb-10">
            <span className="text-white text-3xl font-extrabold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 inline-block mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              Dashboard
            </span>
          </div>

          {/* Navigation Buttons */}
          <nav>
            <ul>
              <li className="mb-4">
                <button
                  onClick={() => setActiveSection('carts')}
                  className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-200 ${
                    activeSection === 'carts'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Carts
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => setActiveSection('users')}
                  className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-200 ${
                    activeSection === 'users'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  Users
                </button>
              </li>
              <li className="mb-4">
                <button
                  onClick={() => setActiveSection('auth')}
                  className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-200 ${
                    activeSection === 'auth'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                    Login (Auth)
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          {activeSection === 'carts' && <CartsDashboard />}
          {activeSection === 'users' && <UsersDashboard />}
          {activeSection === 'auth' && <AuthSection />}
        </main>
      </div>
    </div>
  );
}

export default App;
