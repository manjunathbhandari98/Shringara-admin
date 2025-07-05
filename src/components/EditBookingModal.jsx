/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";
import { useBooking } from "../hooks/useBooking";
import { useService } from "./../hooks/useService";

const EditBookingModal = ({ booking, onClose, onUpdate }) => {
  const { updateBooking } = useBooking();
  const [formData, setFormData] = useState({
    ...booking,
  });

  const { services } = useService();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "serviceId" || name === "subServiceId" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBookingData = {
      userId: formData.user?.id || null,
      location: formData.location || "N/A",
      eventDate: formData.eventDate?.split("T")[0] || "",
      serviceId: formData.services.id || booking.serviceId,
      subServiceId: formData.subServiceId ?? booking.subService.id,
      status: formData.status,
    };

    try {
      await updateBooking(booking.id, updatedBookingData);

      // Ensure UI updates

      onUpdate(updatedBookingData);
      console.log(updatedBookingData);

      onClose();
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error("Failed to update booking");
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-96 transform transition-all">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Edit Booking</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <select
            name="subServiceId"
            value={formData.subService.id || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select a Service</option>
            {services.map((service) => (
              <optgroup key={service.id} label={service.name}>
                {service.subServices?.map((subService) => (
                  <option key={subService.id} value={subService.id}>
                    {subService.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <input
            type="date"
            name="date"
            value={formData.eventDate.split("T")[0]}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            name="contact"
            value={formData.user.phone}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Contact"
            disabled
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              className="cursor-pointer px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookingModal;
