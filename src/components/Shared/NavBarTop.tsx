"use client";

import Link from "next/link";
import { FaWhatsapp, FaLanguage } from "react-icons/fa"; // Import WhatsApp and Language icons

const NavBarTop = () => {
  return (
    <header className="text-black w-full bg-gray-100">
      <nav className="navbar container mx-auto px-1  flex items-center justify-between">
        {/* Left side menu */}
        <div className="navbar-start flex items-center space-x-2">
          <ul className="hidden lg:flex space-x-3 text-sm font-medium">
            <li>
              <Link href="/about" className="hover:text-sky-800">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-sky-800">
                My Account
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="hover:text-sky-800">
                Wishlist
              </Link>
            </li>
            <li>
              <Link href="/order-tracking" className="hover:text-sky-800">
                Order Tracking
              </Link>
            </li>
          </ul>

          {/* Mobile dropdown */}
          {/* <div className="dropdown lg:hidden">
            <button
              tabIndex={0}
              className="btn btn-ghost p-1"
              aria-label="Mobile Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
              className="menu menu-sm dropdown-content bg-white text-gray-800 rounded-box w-40 p-2 shadow-md"
            >
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/login">My Account</Link>
              </li>
              <li>
                <Link href="/wishlist">Wishlist</Link>
              </li>
              <li>
                <Link href="/order-tracking">Order Tracking</Link>
              </li>
            </ul>
          </div> */}
        </div>

        {/* Right side */}
        <div className="navbar-end flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            {/* WhatsApp Icon */}
            <a
              href="https://wa.me/+8801981397907"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm"
            >
              <FaWhatsapp className="mr-1 text-green-500" />
              <span className="hidden sm:inline">+880 1981-397907</span>
            </a>

            {/* Language selection dropdown */}
            <div className="dropdown">
              <button
                tabIndex={0}
                className="btn btn-ghost p-1 text-sm flex items-center"
                aria-label="Language Menu"
              >
                <FaLanguage className="mr-1" />
                <span className="hidden sm:inline">English</span>
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white text-gray-800 rounded-box w-28 p-2 shadow-md"
              >
                <li>
                  <button className="hover:bg-sky-100">English</button>
                </li>
                <li>
                  <button className="hover:bg-sky-100">Bangla</button>
                </li>
                <li>
                  <button className="hover:bg-sky-100">Hindi</button>
                </li>
                <li>
                  <button className="hover:bg-sky-100">Urdhu</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBarTop;
