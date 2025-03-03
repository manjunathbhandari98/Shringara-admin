import React, {
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import { getBookingById } from "../services/BookingService";
import {
  Calendar,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeftSquare,
} from "lucide-react";

const BookingDetails = () => {
  const { id } = useParams(); // Get booking ID from URL
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingById = async () => {
      try {
        const response = await getBookingById(id);
        setBooking(response);
      } catch (error) {
        console.error(
          "Error fetching booking:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookingById();
  }, [id]);

  if (loading)
    return (
      <p className="text-center text-gray-500">
        Loading...
      </p>
    );
  if (!booking)
    return (
      <p className="text-center text-red-500">
        Booking not found.
      </p>
    );

  // Status badge styles
  const statusStyles = {
    Confirmed:
      "bg-green-100 text-green-700 border-green-300",
    Pending:
      "bg-yellow-100 text-yellow-700 border-yellow-300",
    Cancelled:
      "bg-red-100 text-red-700 border-red-300",
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Booking Details
        </h2>
        <XCircle
          className="cursor-pointer"
          size={24}
          onClick={() => window.history.back()}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="flex items-center space-x-3">
          <CheckCircle
            className="text-blue-500"
            size={20}
          />
          <p className="text-lg font-medium">
            {booking.user?.name}
          </p>
        </div>

        {/* Phone */}
        <div className="flex items-center space-x-3">
          <Phone
            className="text-green-500"
            size={20}
          />
          <p className="text-lg text-gray-700">
            {booking.user?.phone}
          </p>
        </div>

        {/* Email */}
        <div className="flex items-center space-x-3">
          <Mail
            className="text-purple-500"
            size={20}
          />
          <p className="text-lg text-gray-700">
            {booking.user?.email}
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-3">
          <MapPin
            className="text-red-500"
            size={20}
          />
          <p className="text-lg text-gray-700">
            {booking.location}
          </p>
        </div>

        {/* Event Date */}
        <div className="flex items-center space-x-3">
          <Calendar
            className="text-indigo-500"
            size={20}
          />
          <p className="text-lg text-gray-700">
            {new Date(
              booking.eventDate
            ).toLocaleDateString()}
          </p>
        </div>

        {/* Service */}
        <div className="flex items-center space-x-3">
          <Clock
            className="text-orange-500"
            size={20}
          />
          <p className="text-lg text-gray-700">
            {booking.services?.name} -{" "}
            {booking.subService?.name}
          </p>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-3">
          <p className="text-lg font-semibold text-gray-800">
            Price:
          </p>
          <p className="text-lg text-gray-700">
            ₹{booking.subService?.price}
          </p>
        </div>

        {/* Status */}
        <div
          className={`px-3 py-2 rounded-lg border text-lg font-semibold ${
            statusStyles[booking.status]
          }`}
        >
          {booking.status}
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
