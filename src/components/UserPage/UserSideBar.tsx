"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import { GoListOrdered } from "react-icons/go";
import { IoMdLogOut } from "react-icons/io";
import Image from "next/image";

const UserSideBar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <div className="h-fit md:min-h-[calc(100vh-120px)] flex-shrink-0 w-full md:w-64 bg-white border border-slate-100 rounded-2xl shadow-md overflow-hidden">
      {/* Profile Section */}
      <div className="flex flex-col items-center justify-center p-6 border-b border-slate-100 bg-slate-50/50">
        {session && (
          <>
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-3 bg-slate-100">
              <img
                alt="Profile"
                src={session.user?.image || "/default-profile.jpg"}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <p className="font-extrabold text-slate-800 text-base leading-tight">
                {session.user?.name}
              </p>
              <p className="text-xs text-slate-400 font-semibold mt-1">
                {session.user?.email}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Nav List */}
      <nav className="p-4">
        <ul className="space-y-1.5">
          <li>
            <Link
              href="/user"
              className="flex items-center gap-3 px-4 py-3 hover:bg-sky-50 rounded-xl text-sm font-semibold text-slate-600 hover:text-sky-700 transition duration-200"
            >
              <MdDashboard className="text-lg text-slate-400 group-hover:text-sky-600" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/user/my-bookings"
              className="flex items-center gap-3 px-4 py-3 hover:bg-sky-50 rounded-xl text-sm font-semibold text-slate-600 hover:text-sky-700 transition duration-200"
            >
              <GoListOrdered className="text-lg text-slate-400 group-hover:text-sky-600" />
              <span>My Booking</span>
            </Link>
          </li>

          <li>
            <Link
              href="/user/orderlist"
              className="flex items-center gap-3 px-4 py-3 hover:bg-sky-50 rounded-xl text-sm font-semibold text-slate-600 hover:text-sky-700 transition duration-200"
            >
              <GoListOrdered className="text-lg text-slate-400 group-hover:text-sky-600" />
              <span>Order Status</span>
            </Link>
          </li>

          <li className="pt-4 border-t border-slate-100 mt-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 hover:bg-rose-50 rounded-xl text-sm font-bold text-rose-600 w-full transition duration-200"
            >
              <IoMdLogOut className="text-lg text-rose-500" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserSideBar;
