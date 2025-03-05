/* eslint-disable react/prop-types */
import React from "react";
import { Menu, Bell, User } from "lucide-react";
import { useAdmin } from "../hooks/useAdmin";

const TopNav = ({ onMenuClick }) => {
  const { admin } = useAdmin();
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 py-3 flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-gray-100 rounded-lg sm:order-1 hidden sm:block"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-4 sm:order-3">
          <button className="p-2 hover:bg-gray-100 rounded-lg relative hidden sm:block">
            {" "}
            {/* Hidden on small screens */}
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium">
                {admin?.name?.toUpperCase()}
              </p>
              <p className="text-xs text-gray-500">
                {admin.email}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hidden sm:flex">
              {" "}
              {/* Hidden on small screens */}
              <User className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="sm:order-2 hidden sm:block">
          {" "}
          {/* Hidden on small screens */}
          {/* Optional: Add a title or logo in the center */}
          {/* You can add a title or logo here, centered on larger screens */}
        </div>
      </div>
    </header>
  );
};

export default TopNav;
