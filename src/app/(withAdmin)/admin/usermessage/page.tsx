"use client";

export const dynamic = "force-dynamic";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CommonLoader from "@/components/Shared/CommonLoader";

interface Booking {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  phone: string;
}

const UserMessage = () => {
  const [contacts, setContacts] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const loadBooking = async () => {
    try {
      setLoading(true);
      const response = await axios.get<{ contacts: Booking[] }>(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/usermessage/api/get`,
      );
      setContacts(response.data.contacts || []);
    } catch (error) {
      console.error("Error loading contacts:", error);
      toast.error("Failed to load customer messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooking();
  }, []);

  const totalPages = Math.ceil(contacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = contacts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full space-y-6">
      {/* Title block left-aligned */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
            Customer Messages
          </h1>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            View feedback, inquiries, and messages sent by users from the
            contact form
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-1.5 text-xs font-semibold text-slate-500 w-fit">
          Total Messages:{" "}
          <span className="text-[#FF4E3E] font-bold">{contacts.length}</span>
        </div>
      </div>

      {/* Responsive & Formal Table */}
      <div className="overflow-x-auto w-full border border-slate-100 rounded-xl bg-white">
        {loading ? (
          <CommonLoader message="Loading messages..." size="table" />
        ) : (
          <table className="min-w-full divide-y divide-slate-100 bg-white">
            <thead className="bg-slate-50">
              <tr>
                <th className="py-3.5 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Sender Details
                </th>
                <th className="py-3.5 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Message Content
                </th>
                <th className="py-3.5 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="py-3.5 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Phone Number
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {currentBookings.length > 0 ? (
                currentBookings.map((contact) => (
                  <tr
                    key={contact._id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <p className="text-sm font-bold text-slate-800 leading-tight">
                        {contact.name}
                      </p>
                      <p className="text-xs text-slate-400 font-semibold mt-0.5">
                        {contact.email}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 text-sm text-slate-600 font-medium max-w-xs md:max-w-md truncate">
                      {contact.message}
                    </td>
                    <td className="py-3.5 px-4 text-sm text-slate-500 font-medium">
                      {contact.createdAt || "N/A"}
                    </td>
                    <td className="py-3.5 px-4 text-sm text-slate-600 font-semibold">
                      {contact.phone || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="py-12 text-center text-sm font-semibold text-slate-400"
                  >
                    No messages found.
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

export default UserMessage;
