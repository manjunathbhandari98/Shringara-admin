/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { updateBooking } from "../services/BookingService";

const EditBookingModal = ({
  booking,
  onClose,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    ...booking,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedBookingData = {
      userId: booking.userId || null,
      location: booking.location || "N/A",
      eventDate: booking.date,
      serviceId: booking.serviceId || null,
      subServiceId: booking.subServiceId || null,
      status: booking.status,
    };

    try {
      await updateBooking(
        booking.id,
        updatedBookingData
      );
      console.log(
        "updated data: ",
        updatedBookingData
      );

      //   onUpdate(updatedBookingData);
      onClose();
    } catch (error) {
      console.error(
        "Error updating booking:",
        error
      );
      alert("Failed to update booking");
    }
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 transform transition-all">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Edit Booking
        </h2>
        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Customer Name"
          />
          <input
            type="text"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Service"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Contact"
          />
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Price"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="pending">
              Pending
            </option>
            <option value="confirmed">
              Confirmed
            </option>
            <option value="completed">
              Completed
            </option>
            <option value="cancelled">
              Cancelled
            </option>
          </select>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
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
