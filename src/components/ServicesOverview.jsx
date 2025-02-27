import React from "react";
import { Plus } from "lucide-react";

const ServicesOverview = () => {
  const services = [
    {
      name: "Wedding Stage Decoration",
      price: "$1,200",
      status: "active",
    },
    {
      name: "Birthday Party Setup",
      price: "$500",
      status: "active",
    },
    {
      name: "Corporate Event Decor",
      price: "$800",
      status: "active",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">
          Services Overview
        </h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </button>
      </div>

      <div className="space-y-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border border-gray-100 rounded-lg"
          >
            <div>
              <h3 className="font-medium">
                {service.name}
              </h3>
              <p className="text-sm text-gray-500">
                {service.price}
              </p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
              {service.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesOverview;
