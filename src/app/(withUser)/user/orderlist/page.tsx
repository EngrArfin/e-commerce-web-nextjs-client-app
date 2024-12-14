"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

interface Booking {
  _id: string;
  name: string;
  productName: string;
  date: string;
  status: string;
}

interface BookingsResponse {
  bookings: Booking[];
}

const OrderList = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const loadBooking = async () => {
    try {
      const response = await axios.get<BookingsResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orderlist/api/get`
      );
      setBookings(response.data.bookings || []);
    } catch (error) {
      console.error("Error loading bookings:", error);
    }
  };

  useEffect(() => {
    loadBooking();
  }, []);

  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = bookings.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6 text-sky-800 text-center">
          Order Status
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 border-b text-left font-bold text-sky-700">
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.map((order, idx) => (
                <tr key={order._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{startIndex + idx + 1}</td>
                  <td className="py-3 px-4">{order.name}</td>
                  <td className="py-3 px-4">{order.productName}</td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4 flex gap-2">
                    {/* <button className="bg-sky-900 hover:bg-sky-600 text-white font-bold py-1 px-3 rounded flex items-center">
                      <FontAwesomeIcon icon={faCheck} className="mr-1" />
                      Accept
                    </button>
                    <button className="bg-red-900 hover:bg-red-700 text-white font-bold py-1 px-3 rounded flex items-center">
                      <FontAwesomeIcon icon={faTimes} className="mr-1" />
                      Cancel
                    </button> */}
                    <button className="bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-1 px-3 rounded flex items-center">
                      <FontAwesomeIcon icon={faClock} className="mr-1" />
                      Pending
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center mt-6">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`mx-1 px-4 py-2 rounded ${
                  currentPage === page
                    ? "bg-sky-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
