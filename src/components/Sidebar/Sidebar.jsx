import React from "react";
import { NavLink } from "react-router-dom";

// Dynamic styles for active/inactive NavLink
const navLinkStyles = ({ isActive }) =>
  isActive
    ? "flex items-center justify-between text-blue-700 font-semibold bg-blue-50 bg-opacity-70 rounded-lg px-4 py-3 transition duration-200"
    : "flex items-center justify-between text-gray-700 hover:text-blue-700 hover:bg-blue-50 hover:bg-opacity-50 rounded-lg px-4 py-3 transition duration-200";

// Navigation links array
const links = [
  {
    path: "/dashboard/products",
    name: "Products",
    icon: "🛒",
  },
  {
    path: "/dashboard/carts",
    name: "Carts",
    icon: "🛍️",
  },
  {
    path: "/dashboard/users",
    name: "Users",
    icon: "👥",
  },
  {
    path: "/dashboard/logout",
    name: "Logout",
    icon: "🔐",
  },
];

const Sidebar = () => (
  <aside className="fixed top-0 left-0 w-64 h-screen bg-white p-6 shadow-xl flex flex-col justify-between z-50">
    {/* Header */}
    <div>
      <div className="flex items-center justify-center mb-8">
        <span className="text-gray-900 text-3xl font-extrabold flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-9 w-9 inline-block mr-2 text-blue-600"
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

      {/* Navigation */}
      <nav>
        <ul className="space-y-2 mt-6">
          {links.map(({ path, name, icon }, index) => (
            <li
              key={index}
              className={
                name === "Logout" ? "pt-4 mt-4 border-t border-gray-200" : ""
              }
            >
              <NavLink to={path} className={navLinkStyles}>
                <div className="flex items-center">
                  <span className="mr-3 text-lg">{icon}</span>
                  {name}
                </div>
                {/* Right arrow icon for all except Logout */}
                {name !== "Logout" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>

    {/* Footer */}
    <div className="mt-auto text-gray-500 text-xs text-center py-4 border-t border-gray-100">
      <p>© 2025 Fake Store. All rights reserved.</p>
    </div>
  </aside>
);

export default Sidebar;
