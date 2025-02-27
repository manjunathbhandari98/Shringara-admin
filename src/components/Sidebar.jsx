/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ items, isOpen }) => {
  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-white border-r border-gray-200 transition-all duration-300 ease-in-out`}
    >
      <div className="p-4">
        <h1
          className={`text-2xl font-bold text-blue-600 ${
            !isOpen && "text-center"
          }`}
        >
          {isOpen ? "Shringara" : "S"}
        </h1>
      </div>

      <nav className="mt-8">
        {items.map((item, index) => (
          <Link
            key={index}
            to={item.to}
            className={`flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
              item.active
                ? "bg-blue-50 text-blue-600"
                : ""
            }`}
          >
            <item.icon className="w-5 h-5" />
            {isOpen && (
              <span className="ml-3">
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
