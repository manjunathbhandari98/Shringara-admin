import React from "react";
import { Upload } from "lucide-react";

const PortfolioSection = () => {
  const portfolioItems = [
    {
      image:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
      title: "Luxury Wedding Setup",
    },
    {
      image:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3",
      title: "Corporate Event",
    },
    {
      image:
        "https://images.unsplash.com/photo-1478146896981-b80fe463b330",
      title: "Birthday Decoration",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">
          Recent Portfolio
        </h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Upload className="w-4 h-4 mr-2" />
          Upload New
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {portfolioItems.map((item, index) => (
          <div
            key={index}
            className="relative group"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-24 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg">
              <p className="text-white text-xs p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioSection;
