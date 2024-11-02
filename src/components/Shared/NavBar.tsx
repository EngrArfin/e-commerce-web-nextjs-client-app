/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "../../UI/icon/Logo.jpg";
import { signOut, useSession } from "next-auth/react";

const NavBar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <header className="bg-base-100 shadow-md w-full">
      <nav className="navbar container mx-auto">
        {/* Navbar Start */}
        <div className="navbar-start flex items-center">
          {/* Mobile Menu Button */}
          <div className="dropdown">
            <button
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
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
            {/* Mobile Menu Dropdown */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/products">Products</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image alt="logo" src={Logo} className="w-10 h-10" />
              <span className="text-xl font-bold">
                <span style={{ color: "sky" }}>E-Com&nbsp;</span>
                <span style={{ color: "violet" }}>Zone&nbsp;</span>
              </span>
            </Link>
          </div>
        </div>

        {/* Navbar Center for larger screens */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4">
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

        {/* Navbar End - Cart, Profile, Login */}
        <div className="navbar-end flex items-center space-x-4">
          {/* Search Bar */}
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto bg-violet-200"
            />
          </div>

          {/* Cart Icon */}
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-circle bg-violet-200"
              aria-label="Shopping Cart"
            >
              <div className="indicator">
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item bg-yellow-300">
                  8
                </span>
              </div>
            </button>
          </div>

          {/* Profile / Login */}
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
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    {session.user?.name}
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>{session.user?.email}</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
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
