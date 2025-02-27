import axios from "axios";

const BASE_URL = import.meta.env
  .VITE_REACT_APP_API_URL;

// Create a booking
export const bookAnEvent = async (
  bookingInfo
) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/bookings`,
      bookingInfo,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Can't book at the moment",
      }
    );
  }
};

// Get all bookings
export const getAllBookings = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/bookings`
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Can't fetch bookings",
      }
    );
  }
};

// Get booking by ID
export const getBookingById = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/bookings/${id}`
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Booking not found",
      }
    );
  }
};

// Update booking
export const updateBooking = async (
  id,
  updatedBooking
) => {
  try {
    console.log(
      "Updating booking:",
      id,
      updatedBooking
    ); // Debug log
    const response = await axios.put(
      `${BASE_URL}/bookings/${id}`,
      updatedBooking,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(
      "Update response:",
      response.data
    ); // Debug log
    return response.data;
  } catch (error) {
    console.error(
      "Update failed:",
      error.response?.data || error.message
    );
    throw (
      error.response?.data || {
        message: "Can't update booking",
      }
    );
  }
};

// Delete booking
export const deleteBooking = async (id) => {
  try {
    await axios.delete(
      `${BASE_URL}/bookings/${id}`
    );
    return {
      message: "Booking deleted successfully",
    };
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Can't delete booking",
      }
    );
  }
};
