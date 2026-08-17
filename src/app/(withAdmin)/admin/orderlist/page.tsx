"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

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
    <div className="w-full space-y-6">
      {/* Title block outside the table card, left-aligned */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
            Order Management
          </h1>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            Accept or cancel customer orders and track booking details
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-1.5 text-xs font-semibold text-slate-500 w-fit">
          Total Orders: <span className="text-[#FF4E3E] font-bold">{bookings.length}</span>
        </div>
      </div>

      {/* Responsive & Formal Table */}
      <div className="overflow-x-auto w-full border border-slate-100 rounded-xl">
        <table className="min-w-full divide-y divide-slate-100 bg-white">
          <thead className="bg-slate-50">
            <tr>
              <th className="py-3.5 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                ID
              </th>
              <th className="py-3.5 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="py-3.5 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Product
              </th>
              <th className="py-3.5 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Date
              </th>
              <th className="py-3.5 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {currentBookings.length > 0 ? (
              currentBookings.map((order, idx) => (
                <tr
                  key={order._id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-3.5 px-4 text-sm font-semibold text-slate-500">
                    {startIndex + idx + 1}
                  </td>
                  <td className="py-3.5 px-4 text-sm font-bold text-slate-800">
                    {order.name}
                  </td>
                  <td className="py-3.5 px-4 text-sm text-slate-600 font-medium">
                    {order.productName}
                  </td>
                  <td className="py-3.5 px-4 text-sm text-slate-500 font-medium">
                    {order.date}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-1 px-3 rounded-lg text-xs flex items-center transition duration-200 shadow-sm shadow-emerald-500/10">
                        <FontAwesomeIcon icon={faCheck} className="mr-1" />
                        Accept
                      </button>
                      <button className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-1 px-3 rounded-lg text-xs flex items-center transition duration-200 shadow-sm shadow-rose-500/10">
                        <FontAwesomeIcon icon={faTimes} className="mr-1" />
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-sm font-semibold text-slate-400"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1.5 pt-4">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition duration-200 ${
                  currentPage === page
                    ? "bg-[#FF4E3E] text-white shadow-md shadow-[#FF4E3E]/20"
                    : "bg-slate-50 text-slate-600 border border-slate-100 hover:bg-slate-100"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default OrderList;
