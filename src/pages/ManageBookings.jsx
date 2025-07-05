import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import EditBookingModal from "../components/EditBookingModal";
import { useBooking } from "../hooks/useBooking";

const statusColors = {
  pending: "bg-yellow-200 text-yellow-800",
  confirmed: "bg-blue-200 text-blue-800",
  completed: "bg-green-200 text-green-800",
  cancelled: "bg-red-200 text-red-800",
};

const ManageBookings = () => {
  const { bookings, setBookings, deleteBooking, updateBooking } = useBooking();

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const openEditModal = (booking) => {
    setSelectedBooking(booking);
  };

  const closeEditModal = () => setSelectedBooking(null);

  const handleDeleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;
    try {
      await deleteBooking(id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Delete error:", error.message);
      toast.error(error.message || "Failed to delete booking");
    }
  };

  const handleBookingUpdate = async (bookingId, updatedBooking) => {
    try {
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, ...updatedBooking } : b))
      );

      closeEditModal();
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error("Failed to update booking");
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    return (
      (booking.user?.name?.toLowerCase()?.includes(search.toLowerCase()) ??
        false) &&
      (filterStatus ? booking.status === filterStatus : true)
    );
  });

  return (
    <div className="relative p-6 transition">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">
        Manage Bookings
      </h1>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by customer name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded-lg focus:none"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2 border rounded-lg focus:none"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold">
                Service
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold">
                Date
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold">
                Status
              </th>
              <th className="px-6 py-3 text-left text-gray-600 font-semibold">
                Contact
              </th>
              <th className="px-6 py-3 text-center text-gray-600 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">{booking.user?.name}</td>
                <td className="px-6 py-3">{booking.subService.name}</td>
                <td className="px-6 py-3">{booking.eventDate.split("T")[0]}</td>
                <td className="px-6 py-3 font-semibold">
                  {booking.subService.price}
                </td>
                <td
                  className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                    statusColors[booking.status]
                  }`}
                >
                  {booking.status?.charAt(0).toUpperCase() +
                    booking.status.slice(1)}
                </td>
                <td className="px-6 py-3">{booking.user?.phone}</td>
                <td className="px-6 py-3 text-center flex justify-center gap-4">
                  <button
                    className="text-blue-600 hover:text-blue-800 transition"
                    onClick={() => {
                      openEditModal(booking);
                    }}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 transition"
                    onClick={() => handleDeleteBooking(booking.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedBooking && (
        <EditBookingModal
          booking={selectedBooking}
          onClose={closeEditModal}
          onUpdate={handleBookingUpdate}
        />
      )}
    </div>
  );
};

export default ManageBookings;
