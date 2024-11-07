/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<any[]>([]);

  // Function to load bookings data
  const loadData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/my-bookings/api/${session?.user?.email}`
      );
      if (response.ok) {
        const data = await response.json();
        setBookings(data?.myBookings || []);
      } else {
        console.error("Failed to fetch bookings data");
      }
    } catch (error) {
      console.error("Error loading bookings:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/my-bookings/api/booking/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result?.response?.deletedCount > 0) {
          loadData();
        }
      } else {
        console.error("Failed to delete booking:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  /* Load data  */
  useEffect(() => {
    if (session) {
      loadData();
    }
  }, [session]);

  return (
    <div className="overflow-x-auto pt-8">
      <table className="table table-zebra">
        <thead>
          <tr className="bg-gray-100 border-b font-bold text-sky-700">
            <th className="py-2 px-4">No</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Payment</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Actions</th>
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
                  <div className="flex items-center space-x-2">
                    <Link href={`/my-bookings/update/${_id}`}>
                      <button className="bg-sky-900 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(_id)} // _id should be a string
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
    </div>
  );
};

export default Page;
