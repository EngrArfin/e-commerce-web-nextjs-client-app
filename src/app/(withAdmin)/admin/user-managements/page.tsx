"use client";

export const dynamic = "force-dynamic";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

interface User {
  _id: string;
  image: string;
  name: string;
  email: string;
}

interface UsersResponse {
  allUsers: User[];
}

const Page = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (session?.user?.email) {
      const loadData = async () => {
        try {
          const response = await axios.get<UsersResponse>(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/user-managements/api/${session.user.email}`
          );
          setUsers(response.data.allUsers || []);
        } catch (error) {
          console.error("Error loading users:", error);
        }
      };
      loadData();
    }
  }, [session]);

  return (
    <div className="w-full space-y-6">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-100">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
            User Account Management
          </h1>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            View, edit roles, and manage user accounts registered in the database
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-1.5 text-xs font-semibold text-slate-500 w-fit">
          Registered Users: <span className="text-[#FF4E3E] font-bold">{users.length}</span>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto w-full border border-slate-100 rounded-xl">
        <table className="min-w-full divide-y divide-slate-100 bg-white">
          <thead className="bg-slate-50">
            <tr>
              <th className="py-3.5 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                No
              </th>
              <th className="py-3.5 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Photo
              </th>
              <th className="py-3.5 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Name
              </th>
              <th className="py-3.5 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Email
              </th>
              <th className="py-3.5 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Role
              </th>
              <th className="py-3.5 px-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {users.length > 0 ? (
              users.map(({ _id, image, name, email }, index) => (
                <tr
                  key={_id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-3.5 px-4 text-sm font-semibold text-slate-500">
                    {index + 1}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-100 bg-slate-50 flex-shrink-0">
                      <Image
                        src={image || "/default-profile.png"}
                        alt={name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-sm font-bold text-slate-800">
                    {name}
                  </td>
                  <td className="py-3.5 px-4 text-sm text-slate-600 font-medium">
                    {email}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-red-50 text-red-600 border border-red-100 tracking-wider">
                      Admin
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-1 px-3 rounded-lg text-xs transition duration-200">
                        Edit
                      </button>
                      <button className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-1 px-3 rounded-lg text-xs transition duration-200 shadow-sm shadow-rose-500/10">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-sm font-semibold text-slate-400"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
