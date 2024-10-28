"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Page = () => {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);

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

  // Function to handle delete booking
  const handleDelete = async (id) => {
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
          loadData(); // Reload bookings data if delete was successful
        }
      } else {
        console.error("Failed to delete booking:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  // Load data when component mounts or session changes
  useEffect(() => {
    if (session) {
      loadData();
    }
  }, [session]);

  return (
    <div className="overflow-x-auto pt-8">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Price</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(({ productName, _id, date, price }, index) => (
            <tr key={_id}>
              <th>{index + 1}</th>
              <td>{productName}</td>
              <td>{price}</td>
              <td>{date}</td>
              <td>
                <div className="flex items-center space-x-2">
                  <Link href={`/my-bookings/update/${_id}`}>
                    <button className="btn btn-primary">Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(_id)}
                    className="btn btn-error"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
