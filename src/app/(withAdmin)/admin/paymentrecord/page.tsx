"use client";

/* import axios from "axios"; */

import { useEffect, useState } from "react";

interface Booking {
  _id: string;
  name: string;
  email: string;
  paymentMethod: string;
  date: string;
  phone: string;
  price: string;
}

const PaymentRecord = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const loadBooking = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orderlist/api/get`
      );
      if (response.ok) {
        const data = await response.json();
        setBookings(data?.bookings || []);
      } else {
        console.error("Failed to fetch bookings data");
      }
    } catch (error) {
      console.error("Error loading bookings:", error);
    }
  };

  useEffect(() => {
    loadBooking();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5  text-sky-800">
        Payment Record ({bookings.length})
      </h1>
      <table className="min-w-full bg-white shadow-md rounded mb-4">
        <thead>
          <tr className="bg-gray-100 border-b  font-bold text-sky-700">
            <th className="py-2 px-4">Name /Email</th>
            <th className="py-2 px-4">Payment</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Number</th>
            <th className="py-2 px-4">Price</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((order) => (
            <tr key={order._id} className="border-b">
              <td className="py-2 px-4">
                <span>{order.name}</span> <br />
                <span>{order.email}</span>
              </td>
              <td
                className={`font-bold py-2 px-4 ${
                  order.paymentMethod === "Online Payment"
                    ? "text-sky-400"
                    : "text-red-800"
                }`}
              >
                {order.paymentMethod}
              </td>
              <td className="py-2 px-4">{order.date}</td>
              <td className="py-2 px-4">{order.phone}</td>
              <td className="py-2 px-4">{order.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentRecord;
