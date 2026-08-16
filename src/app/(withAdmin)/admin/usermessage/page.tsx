"use client";

import axios from "axios";
import { useEffect, useState } from "react";

// Define the Booking interface
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch bookings
  const loadBooking = async () => {
    try {
      const response = await axios.get<{ contacts: Booking[] }>(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/usermessage/api/get`
      );
      setContacts(response.data.contacts || []);
    } catch (error) {
      console.error("Error loading contacts:", error);
    }
  };

  useEffect(() => {
    loadBooking();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(contacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = contacts.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-6xl px-4">
        <h1 className="text-2xl md:text-3xl font-medium text-center mb-5 text-gray-900 truncate">
          Total Message ({contacts.length})
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-lg rounded-lg text-sm md:text-base">
            <thead>
              <tr className="bg-gray-100 border-b font-bold text-sky-700">
                <th className="py-2 md:py-3 px-2 md:px-4">Name / Email</th>
                <th className="py-2 md:py-3 px-2 md:px-4">Message</th>
                <th className="py-2 md:py-3 px-2 md:px-4">Date/Time</th>
                <th className="py-2 md:py-3 px-2 md:px-4">Number</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.map((contact) => (
                <tr
                  key={contact._id}
                  className="border-b hover:bg-gray-100 text-sm"
                >
                  <td className="py-2 md:py-3 px-2 md:px-4">
                    <span>{contact.name}</span>
                    <br />
                    <span className="text-xs md:text-sm text-gray-500">
                      {contact.email}
                    </span>
                  </td>
                  <td
                    className={`py-2 md:py-3 px-2 md:px-4 ${
                      contact.message === "Online Payment"
                        ? "text-sky-400"
                        : "text-gray-800"
                    }`}
                  >
                    {contact.message}
                  </td>
                  <td className="py-2 md:py-3 px-2 md:px-4">
                    {contact.createdAt}
                  </td>
                  <td className="py-2 md:py-3 px-2 md:px-4">{contact.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className="flex flex-wrap justify-center items-center mt-8">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`mx-1 px-3 md:px-4 py-1 md:py-2 rounded ${
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

export default UserMessage;
