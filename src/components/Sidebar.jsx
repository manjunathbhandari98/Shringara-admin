/* eslint-disable react/prop-types */
import React from "react";
import {
  Link,
  useLocation,
} from "react-router-dom";

const Sidebar = ({ items, isOpen }) => {
  const location = useLocation(); // Get the current route

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-white border-r border-gray-200 transition-all duration-300 ease-in-out`}
    >
      {/* Sidebar Header */}
      <div className="p-4">
        <h1
          className={`text-2xl font-bold text-blue-600 ${
            !isOpen && "text-center"
          }`}
        >
          {isOpen ? "Shringara" : "S"}
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className="mt-8">
        {items.map((item, index) => {
          // Check if the current route matches the item's route
          const isActive =
            location.pathname === item.to;

          return (
            <Link
              key={index}
              to={item.to}
              className={`flex items-center px-4 py-3 
              ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-700"
              } 
              hover:bg-blue-50 hover:text-blue-600 transition-colors`}
            >
              {/* Icon for the Sidebar Item */}
              <item.icon className="w-5 h-5" />

              {/* Show text label only if sidebar is open */}
              {isOpen && (
                <span className="ml-3">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
