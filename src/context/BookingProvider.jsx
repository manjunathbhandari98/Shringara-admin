/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { BookingContext } from "./BookingContext";
import {
  alterBooking,
  createBooking,
  getAllBookings,
  getBookingById,
  removeBooking,
} from "../services/BookingService";

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] =
    useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await getAllBookings();
      setBookings(response);
    } catch (error) {
      console.error(
        "Error fetching bookings:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchBookingById = async (bookingId) => {
    setLoading(true);
    try {
      const response = await getBookingById(
        bookingId
      );
      setSelectedBooking(response);
    } catch (error) {
      console.error(
        "Error fetching booking by ID:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const addBooking = async (bookingData) => {
    setLoading(true);
    try {
      await createBooking(bookingData);
      fetchBookings();
    } catch (error) {
      console.error(
        "Error creating booking:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const updateBooking = async (
    bookingId,
    bookingData
  ) => {
    setLoading(true);
    try {
      await alterBooking(bookingId, bookingData);
      fetchBookings();
    } catch (error) {
      console.error(
        "Error updating booking:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (bookingId) => {
    setLoading(true);
    try {
      await removeBooking(bookingId);
      fetchBookings();
    } catch (error) {
      console.error(
        "Error deleting booking:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        setBookings,
        selectedBooking,
        loading,
        fetchBookings,
        fetchBookingById,
        addBooking,
        updateBooking,
        deleteBooking,
        setLoading,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
