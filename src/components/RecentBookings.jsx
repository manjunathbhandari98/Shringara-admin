import React from "react";

const RecentBookings = () => {
  const bookings = [
    {
      customer: "John Smith",
      service: "Wedding Stage",
      date: "2024-03-15",
      status: "Confirmed",
    },
    {
      customer: "Sarah Johnson",
      service: "Birthday Party",
      date: "2024-03-18",
      status: "Pending",
    },
    {
      customer: "Mike Brown",
      service: "Corporate Event",
      date: "2024-03-20",
      status: "Confirmed",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">
        Recent Bookings
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500">
              <th className="pb-4">Customer</th>
              <th className="pb-4">Service</th>
              <th className="pb-4">Date</th>
              <th className="pb-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={index}
                className="border-t border-gray-100"
              >
                <td className="py-4">
                  {booking.customer}
                </td>
                <td className="py-4">
                  {booking.service}
                </td>
                <td className="py-4">
                  {booking.date}
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
