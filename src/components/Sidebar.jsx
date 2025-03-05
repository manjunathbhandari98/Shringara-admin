/* eslint-disable react/prop-types */
import React, {
  useEffect,
  useState,
} from "react";
import {
  Link,
  useLocation,
} from "react-router-dom";
import { fetchSettings } from "../services/settingsService";

const Sidebar = ({
  items,
  isOpen,
  toggleSidebar,
}) => {
  const location = useLocation(); // Get the current route
  const [logoUrl, setLogoUrl] = useState();

  const fetchLogo = async () => {
    const response = await fetchSettings();
    setLogoUrl(response.logoUrl);
  };

  useEffect(() => {
    fetchLogo();
  });

  return (
    <aside
      className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      } ${isOpen ? "block" : "hidden"} sm:block`} // Add responsive visibility
    >
      {/* Sidebar Header */}
      <div className="px-4">
        <img
          src={logoUrl}
          width={100}
          height={80}
        />
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
              className={`flex items-center px-4 py-3 ${
                isActive
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-700"
              } hover:bg-blue-50 hover:text-blue-600 transition-colors`}
            >
              {/* Icon for the Sidebar Item */}
              <item.icon className="w-5 h-5" />

              {/* Show text label only if sidebar is open and on larger screens */}
              {isOpen && (
                <span
                  className={`hidden sm:inline ${
                    isOpen ? "ml-3" : ""
                  }`}
                >
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      {/* Mobile Toggle Button */}
      <div className="sm:hidden absolute top-4 right-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-600"
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
