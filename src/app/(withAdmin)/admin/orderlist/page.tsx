"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

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
      const response = await fetch(`/admin/orderlist/api/get`);
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

  // Load data when the component mounts
  useEffect(() => {
    loadBooking();
  }, []); // No dependencies to track, just run once on mount

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5 text-sky-800">
        Order Management ({bookings.length})
      </h1>
      <table className="min-w-full bg-white shadow-md rounded mb-4">
        <thead>
          <tr className="bg-gray-100 border-b font-bold text-sky-700">
            <th className="py-2 px-4">Customer</th>
            <th className="py-2 px-4">Product</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((order) => (
            <tr key={order._id} className="border-b">
              <td className="py-2 px-4">{order.name}</td>
              <td className="py-2 px-4">{order.productName}</td>
              <td className="py-2 px-4">{order.date}</td>
              <td className="py-2 px-4 flex">
                <button className="bg-sky-900 hover:bg-sky-600 text-white font-bold py-1 px-2 rounded mx-1 flex items-center">
                  <FontAwesomeIcon icon={faCheck} className="mr-1" />
                  Accept Order
                </button>
                <button className="bg-red-900 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mx-1 flex items-center">
                  <FontAwesomeIcon icon={faTimes} className="mr-1" />
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
