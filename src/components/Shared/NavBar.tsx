/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "../../UI/icon/Logo.jpg";
import { signOut, useSession } from "next-auth/react";
import { FaRegUserCircle } from "react-icons/fa";
import Image from "next/image";
import { useCart } from "../Home/Cart/CartContext";

const NavBar = () => {
  const { data: session } = useSession();
  const [isFixed, setIsFixed] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${
        isFixed ? "fixed top-0 z-50 shadow-md" : "relative"
      } w-full bg-white border-b border-slate-100 transition-all duration-300`}
    >
      <nav className="navbar container mx-auto px-4 py-3">
        <div className="navbar-start flex items-center">
          <div className="dropdown lg:hidden">
            <button
              tabIndex={0}
              className="btn btn-ghost text-slate-700"
              aria-label="Mobile Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white text-slate-800 text-2xl rounded-box mt-3 w-52 p-1 shadow-md"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/products">Products</Link>
              </li>
              <li>
                <Link href="/my-bookings">My Bookings</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center">
              <Image alt="logo" src={Logo} className="w-10 rounded-full" />
              <span className=" text-2xl font-bold text-center m-1 text-slate-800 truncate">
                E-Com Zone
              </span>
            </Link>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-2 ">
            <li>
              <Link
                href="/"
                className="text-base font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50 px-4 py-2 rounded-lg transition-all duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className="text-base font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50 px-4 py-2 rounded-lg transition-all duration-200"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/my-bookings"
                className="text-base font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50 px-4 py-2 rounded-lg transition-all duration-200"
              >
                My Bookings
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-base font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50 px-4 py-2 rounded-lg transition-all duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-base font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50 px-4 py-2 rounded-lg transition-all duration-200"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end flex items-center space-x-4">
          <div className="dropdown dropdown-end">
            <Link
              href="/cart"
              tabIndex={0}
              className="btn btn-ghost btn-circle"
              aria-label="Shopping Cart"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item bg-yellow-300">
                  {cart.length > 0 ? cart.length : 0}
                </span>
              </div>
            </Link>
          </div>

          {session ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ring-2 ring-sky-500/20">
                  <Image
                    alt="Profile"
                    src={session.user?.image || "/default-profile.png"}
                    height="40"
                    width="40"
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white text-gray-800 rounded-2xl z-[50] mt-3 w-64 p-3 shadow-xl border border-slate-100"
              >
                <li className="menu-title px-2 py-1.5 border-b border-slate-100 mb-1">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-slate-800 text-sm truncate">
                      {session.user?.name || "User"}
                    </span>
                    <span className="text-xs text-slate-500 truncate font-normal">
                      {session.user?.email}
                    </span>
                    <span className="inline-block mt-1 self-start px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-sky-100 text-sky-700">
                      {session.user?.role === "admin" ? "Admin" : "Customer"}
                    </span>
                  </div>
                </li>

                {session.user?.role === "admin" ? (
                  <>
                    <li>
                      <Link
                        href="/admin"
                        className="py-2 text-slate-700 hover:text-sky-600 font-medium"
                      >
                        Admin Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/profile"
                        className="py-2 text-slate-700 hover:text-sky-600 font-medium"
                      >
                        Admin Profile
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        href="/user"
                        className="py-2 text-slate-700 hover:text-sky-600 font-medium"
                      >
                        User Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/user/my-bookings"
                        className="py-2 text-slate-700 hover:text-sky-600 font-medium"
                      >
                        My Bookings
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/user/orderlist"
                        className="py-2 text-slate-700 hover:text-sky-600 font-medium"
                      >
                        Order Status
                      </Link>
                    </li>
                  </>
                )}

                <div className="divider my-1"></div>

                <li>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="py-2 text-red-600 hover:bg-red-50 font-medium"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link href="/login" className="btn btn-ghost">
              <FaRegUserCircle className="text-xl" />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
