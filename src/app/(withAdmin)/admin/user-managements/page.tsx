/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

/* import axios from "axios"; */
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  image: string;
  name: string;
  email: string;
}

const Page = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);

  // Function to load user data
  const loadData = async () => {
    if (!session?.user?.email) {
      // Ensure you're using `email` from the session
      console.error("User email is missing");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/user-managements/api/${session.user.email}` // Use `email` instead of `id`
      );
      if (response.ok) {
        const data = await response.json();
        setUsers(data?.allUsers || []);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error loading users:", error);
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
      <div className="text-3xl text-sky-900 mb-4">
        Total Users: {users.length}
      </div>
      <table className="table table-zebra w-full mb-8">
        <thead>
          <tr className="bg-gray-100 border-b font-bold text-sky-700">
            <th className="py-2 px-4">No</th>
            <th className="py-2 px-4">Photo</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ _id, image, name, email }, index) => (
            <tr key={_id}>
              <th>{index + 1}</th>
              <td>
                <img
                  src={image}
                  height="50"
                  width="50"
                  alt={name}
                  className="rounded-full"
                />
              </td>
              <td>{name}</td>
              <td>{email}</td>
              <td>Admin</td>
              <td>
                <div className="flex items-center space-x-2">
                  <button className="bg-sky-400 hover:bg-sky-500 text-white font-bold py-2 px-4 rounded">
                    Edit
                  </button>

                  <button
                    /* onClick={() => handleDelete(_id)} */
                    className="bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
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
