"use client";
import { useEffect, useState } from "react";

// Define the Booking type
interface Booking {
  _id: string;
  name: string;
  productName: string;
  date: string;
  status: string; // Optional: if you want to track status in the booking
}

const OrderList = () => {
  const [bookings, setBookings] = useState<Booking[]>([]); // Use the Booking type

  // Function to load booking data
  const loadBooking = async () => {
    try {
      const response = await fetch(`http://localhost:3000/my-bookings/api/get`);
      if (response.ok) {
        const data = await response.json();
        setBookings(data?.bookings || []); // Ensure 'bookings' is accessed correctly
      } else {
        console.error("Failed to fetch bookings data");
      }
    } catch (error) {
      console.error("Error loading bookings:", error);
    }
  };

  // Function to update order status
  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/my-bookings/api/update/${id}`,
        {
          method: "PUT", // Use PUT method for update
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }), // Send the new status
        }
      );

      if (response.ok) {
        const updatedBooking = await response.json();
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === id
              ? { ...booking, status: updatedBooking.status }
              : booking
          )
        );
      } else {
        console.error("Failed to update booking status");
      }
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  // Load data when the component mounts
  useEffect(() => {
    loadBooking();
  }, []); // No dependencies to track, just run once on mount

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">
        Order Management ({bookings.length})
      </h1>
      <table className="min-w-full bg-white shadow-md rounded mb-4">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4">Customer</th>
            <th className="py-2 px-4">Product</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((order) => (
            <tr key={order._id} className="border-b">
              <td className="py-2 px-4">{order.name}</td>
              <td className="py-2 px-4">{order.productName}</td>
              <td className="py-2 px-4">{order.date}</td>
              <td className="py-2 px-4">{order.price}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleUpdateStatus(order._id, "Completed")}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mx-1"
                >
                  Mark as Completed
                </button>
                <button
                  onClick={() => handleUpdateStatus(order._id, "Cancelled")}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mx-1"
                >
                  Cancel Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
