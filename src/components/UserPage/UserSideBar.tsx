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
    <div className="min-h-screen flex-shrink-0 w-74 h-full bg-base-300">
      <div className="flex flex-col items-center justify-center">
        {session && (
          <>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-40 rounded-full">
                  <Image
                    alt="Profile"
                    src={session.user?.image || "/default-profile.png"}
                    height="100"
                    width="100"
                  />
                </div>
              </div>
            </div>
            <div className="text-center mt-2">
              <p className="font-semibold">{session.user?.name}</p>
              <p className="text-sm text-gray-600">{session.user?.email}</p>
            </div>
          </>
        )}
      </div>

      <ul className="menu max-h-screen overflow-y-auto">
        <li>
          <Link
            href="/user"
            className="flex items-center p-4 hover:bg-base-300 rounded text-lg font-medium text-gray-700 hover:text-sky-800 transition duration-300"
          >
            <MdDashboard className="mr-2 text-2xl text-sky-800" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/user/my-bookings"
            className="flex items-center p-4 hover:bg-base-300 rounded text-lg font-medium text-gray-700 hover:text-sky-800 transition duration-300"
          >
            <GoListOrdered className="mr-2 text-2xl text-sky-800" />
            My Booking
          </Link>
        </li>

        <li>
          <Link
            href="/user/orderlist"
            className="flex items-center p-4 hover:bg-base-300 rounded text-lg font-medium text-gray-700 hover:text-sky-800 transition duration-300"
          >
            <GoListOrdered className="mr-2 text-2xl text-sky-800" />
            Order Status
          </Link>
        </li>

        <li>
          <button
            onClick={handleLogout}
            className="flex items-center p-4 hover:bg-base-300 rounded text-lg font-medium text-red-700 hover:text-red-800 transition duration-300"
          >
            <IoMdLogOut className="mr-2 text-2xl text-red-500" /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserSideBar;
