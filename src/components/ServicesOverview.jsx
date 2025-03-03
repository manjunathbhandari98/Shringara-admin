import React, {
  useEffect,
  useState,
} from "react";
import { Plus } from "lucide-react";
import { useService } from "./../hooks/useService";
import { useNavigate } from "react-router-dom";

const ServicesOverview = () => {
  const { services } = useService();
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">
          Services Overview
        </h2>
        <button
          onClick={() => navigate("/services")}
          className="cursor-pointer flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          View All
        </button>
      </div>

      <div className="space-y-4">
        {services
          .slice(0, 4)
          .map((service, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-gray-100 rounded-lg"
            >
              <div>
                <h3 className="font-medium">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-500">
                  ₹
                  {service.subServices?.length > 0
                    ? Math.min(
                        ...service.subServices.map(
                          (sub) => sub.price
                        )
                      )
                    : "15000"}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ServicesOverview;
