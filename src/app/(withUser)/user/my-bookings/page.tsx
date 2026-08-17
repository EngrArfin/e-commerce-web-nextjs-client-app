/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
export const dynamic = "force-dynamic";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define types
interface Booking {
  _id: string;
  productName: string;
  price: string;
  date: string;
  paymentMethod: string;
}

interface BookingResponse {
  myBookings: Booking[];
}

interface DeleteResponse {
  response: {
    deletedCount: number;
  };
}

const Page = () => {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const loadData = async () => {
    try {
      const response = await axios.get<BookingResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/api/${session?.user?.email}`
      );
      if (response.status === 200) {
        setBookings(response.data.myBookings || []);
        // Reset current page if it exceeds maximum possible pages
        const maxPages = Math.ceil((response.data.myBookings || []).length / itemsPerPage);
        if (currentPage > maxPages) {
          setCurrentPage(Math.max(1, maxPages));
        }
      } else {
        console.error("Failed to fetch bookings data");
      }
    } catch (error) {
      console.error("Error loading bookings:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete<DeleteResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/api/booking/${id}`
      );

      if (response.status === 200 && response.data.response?.deletedCount > 0) {
        loadData();
      } else {
        console.error("Failed to delete booking:", response.data);
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  useEffect(() => {
    if (session) {
      loadData();
    }
  }, [session]);

  // Pagination Math
  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">My Bookings</h1>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">Manage and track your active bookings and order history</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-2 w-fit">
          <span className="text-slate-500 font-semibold text-xs">Total Bookings:</span>
          <span className="bg-sky-600 text-white text-xs font-extrabold px-2 py-0.5 rounded-full">{bookings.length}</span>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-slate-400 font-semibold text-sm">No bookings found in your history.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold text-xs uppercase tracking-wider">
                  <th className="py-4 px-6 w-16">No</th>
                  <th className="py-4 px-6">Product / Service</th>
                  <th className="py-4 px-6">Payment Method</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600 text-sm">
                {currentBookings.map(
                  ({ productName, _id, date, price, paymentMethod }, index) => {
                    const priceStr = String(price || "");
                    const formattedPrice = priceStr.startsWith("$") ? priceStr : `$${priceStr}`;
                    return (
                      <tr key={_id} className="hover:bg-slate-50/50 transition">
                        <td className="py-4 px-6 font-semibold text-slate-400">{indexOfFirstItem + index + 1}</td>
                        <td className="py-4 px-6 font-bold text-slate-800">{productName}</td>
                        <td className="py-4 px-6">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                              paymentMethod === "Online Payment"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                : "bg-amber-50 text-amber-700 border border-amber-100"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              paymentMethod === "Online Payment" ? "bg-emerald-500" : "bg-amber-500"
                            }`} />
                            {paymentMethod}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-extrabold text-slate-700">{formattedPrice}</td>
                        <td className="py-4 px-6 font-medium text-slate-500">{date}</td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/my-bookings/update/${_id}`}>
                              <button className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-1.5 px-3 rounded-lg text-xs transition duration-200">
                                Edit
                              </button>
                            </Link>
                            <button
                              onClick={() => handleDelete(_id)}
                              className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-1.5 px-3 rounded-lg text-xs transition duration-200"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 px-6 py-4 gap-4 bg-slate-50/50">
              <span className="text-xs text-slate-500 font-semibold">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, bookings.length)} of {bookings.length} entries
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none transition duration-200 select-none"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition duration-200 active:scale-[0.97] select-none ${
                      currentPage === i + 1
                        ? "bg-sky-600 text-white shadow-sm"
                        : "border border-slate-200 text-slate-600 bg-white hover:bg-slate-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none transition duration-200 select-none"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
