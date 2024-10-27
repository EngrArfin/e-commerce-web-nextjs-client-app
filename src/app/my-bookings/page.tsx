"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const page = () => {
  const session = useSession();
  const [bookings, setBooking] = useState([]);
  const loadData = async () => {
    const resp = await fetch(
      `http://localhost:3000/my-bookings/api/${session?.data?.user?.email}`
    );
    const data = await resp.json();
    setBooking(data?.myBookings);
  };

  useEffect(() => {
    loadData();
  }, [session]);
  return (
    <div className="overflow-x-auto pt-8">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {bookings?.map(({ productName, _id, date, price }) => (
            <tr key={_id}>
              <th>1</th>
              <td>{productName}</td>
              <td>{price}</td>
              <td>{date}</td>
              <td>
                <div className="flex items-center space-x-2">
                  <button className="btn btn-primary">Edit</button>
                  <button className="btn btn-error">delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default page;
