import React from "react";

const LoaderAnimation = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative">
        {/* Outer Rotating Ring */}
        <div className="w-16 h-16 border-4 border-gray-300 rounded-full absolute"></div>
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default LoaderAnimation;
