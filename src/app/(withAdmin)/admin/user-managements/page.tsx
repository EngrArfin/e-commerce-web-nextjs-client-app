/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Page = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);

  // Function to load bookings data
  const loadData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/admin/user-managements/api/${session?.user?.id}`
      );
      if (response.ok) {
        const data = await response.json();
        setUsers(data?.allUsers || []);
      } else {
        console.error("Failed to fetch bookings data");
      }
    } catch (error) {
      console.error("Error loading bookings:", error);
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
      <div className="text-3xl text-sky-900">Total Users: {users.length}</div>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>No</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ _id, image, name, email }, index) => (
            <tr key={_id}>
              <th>{index + 1}</th>
              <td>
                {" "}
                <img src={image} height="100" width="100" alt="" />{" "}
              </td>
              <td>{name}</td>
              <td>{email}</td>
              <td>admin</td>
              <td>
                <div className="flex items-center space-x-2">
                  {/* <Link href={`/my-bookings/update/${_id}`}>
                  </Link> */}
                  <button className="btn btn-primary">Edit</button>
                  <button
                    /*  onClick={() => handleDelete(_id)} */
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
