"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaTachometerAlt,
  FaUserCog,
  FaBoxOpen,
  FaPlusSquare,
  FaListUl,
  FaFileInvoiceDollar,
  FaSignOutAlt,
} from "react-icons/fa";

const AdminSideBar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <div className="flex-shrink-0 w-64 h-full bg-base-200">
      <div className="flex flex-col items-center justify-center my-4">
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
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link href="/admin/settings">Settings</Link>
                </li>
              </ul>
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
            href="/admin"
            className="flex items-center p-4 hover:bg-base-300 rounded"
          >
            <FaTachometerAlt className="mr-2" /> Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/admin/user-managements"
            className="flex items-center p-4 hover:bg-base-300 rounded"
          >
            <FaUserCog className="mr-2" /> User Management
          </Link>
        </li>
        <li>
          <Link
            href="/admin/productmanagement"
            className="flex items-center p-4 hover:bg-base-300 rounded"
          >
            <FaBoxOpen className="mr-2" /> Product Management
          </Link>
        </li>
        <li>
          <Link
            href="/admin/addproduct"
            className="flex items-center p-4 hover:bg-base-300 rounded"
          >
            <FaPlusSquare className="mr-2" /> Add Product
          </Link>
        </li>
        <li>
          <Link
            href="/admin/orderlist"
            className="flex items-center p-4 hover:bg-base-300 rounded"
          >
            <FaListUl className="mr-2" /> Order View
          </Link>
        </li>
        <li>
          <Link
            href="/admin/paymentrecord"
            className="flex items-center p-4 hover:bg-base-300 rounded"
          >
            <FaFileInvoiceDollar className="mr-2" /> Payment Record
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center p-4 text-red-600 hover:bg-base-300 rounded"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSideBar;
