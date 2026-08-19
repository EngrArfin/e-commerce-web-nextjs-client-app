"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CommonLoader from "@/components/Shared/CommonLoader";

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
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const loadBooking = async () => {
    try {
      setLoading(true);
      const response = await axios.get<{ bookings: Booking[] }>(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/orderlist/api/get`,
      );
      setBookings(response.data.bookings || []);
    } catch (error) {
      console.error("Error loading bookings:", error);
      toast.error("Failed to load payment records");
    } finally {
      setLoading(false);
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
      {/* Title block left-aligned */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
            Payment Records
          </h1>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            Audit store transaction logs, payment methods, and buyer detail
            records
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-1.5 text-xs font-semibold text-slate-500 w-fit">
          Transactions:{" "}
          <span className="text-[#FF4E3E] font-bold">{bookings.length}</span>
        </div>
      </div>

      {/* Responsive & Formal Table */}
      <div className="overflow-x-auto w-full border border-slate-100 rounded-xl bg-white">
        {loading ? (
          <CommonLoader message="Loading transactions..." size="table" />
        ) : (
          <table className="min-w-full divide-y divide-slate-100 bg-white">
            <thead className="bg-slate-50">
              <tr>
                <th className="py-3.5 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Name / Email
                </th>
                <th className="py-3.5 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="py-3.5 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="py-3.5 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="py-3.5 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {currentBookings.length > 0 ? (
                currentBookings.map((order) => {
                  const isOnline =
                    order.paymentMethod === "Online Payment" ||
                    order.paymentMethod?.toLowerCase().includes("online");
                  return (
                    <tr
                      key={order._id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <p className="text-sm font-bold text-slate-800 leading-tight">
                          {order.name}
                        </p>
                        <p className="text-xs text-slate-400 font-semibold mt-0.5">
                          {order.email}
                        </p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border shadow-sm ${
                            isOnline
                              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                              : "bg-amber-50 text-amber-700 border-amber-100"
                          }`}
                        >
                          {order.paymentMethod}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-sm text-slate-500 font-medium">
                        {order.date}
                      </td>
                      <td className="py-3.5 px-4 text-sm text-slate-600 font-semibold">
                        {order.phone || "N/A"}
                      </td>
                      <td className="py-3.5 px-4 text-sm font-bold text-slate-800">
                        {order.price}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-sm font-semibold text-slate-400"
                  >
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
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
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentRecord;
