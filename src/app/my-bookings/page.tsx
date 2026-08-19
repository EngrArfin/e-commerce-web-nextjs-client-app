/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CommonLoader from "@/components/Shared/CommonLoader";

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
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      // Get bookings data with the appropriate type
      const response = await axios.get<BookingResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/api/${session?.user?.email}`
      );
      if (response.status === 200) {
        setBookings(response.data.myBookings || []);
      } else {
        toast.error("Failed to fetch bookings data");
      }
    } catch (error) {
      console.error("Error loading bookings:", error);
      toast.error("Error loading bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // Delete booking and ensure proper typing for the response
      const response = await axios.delete<DeleteResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/api/booking/${id}`
      );

      if (response.status === 200 && response.data.response?.deletedCount > 0) {
        toast.success("Booking deleted successfully!");
        loadData();
      } else {
        toast.error("Failed to delete booking.");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Error deleting booking. Please try again.");
    }
  };

  useEffect(() => {
    if (session) {
      loadData();
    }
  }, [session]);

  return (
    <div className="overflow-x-auto mt-4 mb-4 m-4 ">
      <h1 className="flex items-center justify-center mb-2 text-3xl font-bold text-slate-800">
        My Booking
      </h1>
      {loading ? (
        <CommonLoader message="Loading your bookings..." subMessage="Please wait a moment" size="md" />
      ) : bookings.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-slate-400 font-semibold text-sm">No bookings found.</p>
        </div>
      ) : (
      <table className="table table-zebra">
        <thead>
          <tr className="bg-gray-100 text-sm border-b font-bold text-sky-700">
            <th className="py-2 px-4">No</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Payment</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4 flex justify-end mr-12">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(
            ({ productName, _id, date, price, paymentMethod }, index) => (
              <tr key={_id}>
                <th>{index + 1}</th>
                <td>{productName}</td>

                <td
                  className={`font-bold py-2 px-4 ${
                    paymentMethod === "Online Payment"
                      ? "text-sky-400"
                      : "text-red-800"
                  }`}
                >
                  {paymentMethod}
                </td>
                <td>{price}</td>
                <td>{date}</td>
                <td>
                  <div className="flex justify-end mr-4 space-x-2">
                    <Link href={`/my-bookings/update/${_id}`}>
                      <button className="bg-sky-900 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(_id)}
                      className="bg-red-900 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default Page;
