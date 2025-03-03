import React from "react";
import { useBooking } from "./../hooks/useBooking";
import {
  Calendar,
  Package,
  CheckCircle,
  Clock,
} from "lucide-react";
import { useService } from "../hooks/useService";

const DashboardStats = () => {
  const { bookings } = useBooking();
  const { services } = useService();
  const stats = [
    {
      title: "Total Bookings",
      value: bookings.length,
      icon: Calendar,
      color: "bg-blue-500",
    },
    {
      title: "Active Services",
      value: services.length,
      icon: Package,
      color: "bg-green-500",
    },
    {
      title: "Completed",
      value: bookings.filter(
        (booking) =>
          booking.status === "completed"
      ).length,
      icon: CheckCircle,
      color: "bg-purple-500",
    },
    {
      title: "Pending",
      value: bookings.filter(
        (booking) => booking.status === "pending"
      ).length,
      icon: Clock,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-6 shadow-sm"
        >
          <div className="flex items-center">
            <div
              className={`${stat.color} p-3 rounded-lg`}
            >
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">
                {stat.title}
              </p>
              <p className="text-2xl font-semibold">
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
