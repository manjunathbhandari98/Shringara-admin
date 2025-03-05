import React, { useEffect } from "react";
import { useBooking } from "../hooks/useBooking";
import { useNavigate } from "react-router-dom";

const RecentBookings = () => {
  const { bookings, fetchBookings } =
    useBooking();

  useEffect(() => {
    fetchBookings();
  });

  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold mb-6">
          Recent Bookings
        </h2>
        <button
          onClick={() => navigate("/bookings")}
          className="cursor-pointer flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className=" text-sm text-gray-500">
              <th className="pb-4">Customer</th>
              <th className="pb-4">Service</th>
              <th className="pb-4">Date</th>
              <th className="pb-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-t border-gray-100 text-center"
              >
                <td className="py-4">
                  {booking.user?.name.length > 12
                    ? booking.user.name.slice(
                        0,
                        12
                      ) + "..."
                    : booking.user?.name}
                </td>
                <td className="py-4">
                  {booking.services?.name.length >
                  27
                    ? booking.services.name.slice(
                        0,
                        27
                      ) + "..."
                    : booking.services?.name}
                </td>
                <td className="py-4">
                  {
                    booking.eventDate?.split(
                      "T"
                    )[0]
                  }
                </td>
                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      booking.status ===
                      "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentBookings;
