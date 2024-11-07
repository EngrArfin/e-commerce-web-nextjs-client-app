/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "../../UI/icon/Logo.jpg";
import { signOut, useSession } from "next-auth/react";

const NavBar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-gray-100 shadow-lg w-full">
      <nav className="navbar container mx-auto px-4">
        <div className="navbar-start flex items-center">
          <div className="dropdown lg:hidden">
            <button
              tabIndex={0}
              className="btn btn-ghost"
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
              className="menu menu-sm dropdown-content bg-gray-100 rounded-box mt-3 w-52 p-2 shadow-md"
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
            </ul>
          </div>

          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center">
              <Image alt="logo" src={Logo} className="w-12 h-12 rounded-full" />
              <span className="text-2xl font-bold">
                <span className="text-sky-500">E-Com&nbsp;</span>
                <span className="text-violet-600">Zone&nbsp;</span>
              </span>
            </Link>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-4">
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
          </ul>
        </div>

        <div className="navbar-end flex items-center space-x-4">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto bg-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>

          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-circle"
              aria-label="Shopping Cart"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-700"
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
                  8
                </span>
              </div>
            </button>
          </div>

          {session ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <Image
                    alt="Profile"
                    src={session.user?.image || "/default-profile.png"}
                    height="40"
                    width="40"
                    className="rounded-full"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-gray-100 rounded-box z-[1] mt-1 w-72 p-4 shadow-md"
              >
                <li>
                  <a>{session.user?.name}</a>
                </li>
                <li>
                  <a>{session.user?.email}</a>
                </li>
                <Link href="/admin">
                  <li>
                    <span>Admin</span>
                  </li>
                </Link>
                <li>
                  <button onClick={() => signOut()} className="text-red-600">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link href="/login" className="btn btn-outline text-green-600 px-4">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
