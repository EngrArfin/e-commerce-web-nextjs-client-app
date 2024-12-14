"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../UI/icon/Logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-sky-700 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        {/* Company Info */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center space-x-4">
            <div className="rounded-full overflow-hidden ">
              <Image
                src={logo}
                alt="E-Commerce Zone Logo"
                width={54} // Smaller logo width
                height={54} // Smaller logo height
                className="object-cover "
              />
            </div>

            <Link href="/">
              <p className="text-2xl font-bold">
                <span className="text-white">E-Com</span>
                <span className="text-white">Zone</span>
              </p>
            </Link>
          </div>
          <p className="mt-4 text-sm text-white  text-center md:text-left">
            Your one-stop shop for premium products. Delivering trust and
            quality since January 2024.
          </p>
        </div>

        {/* Services */}
        <div>
          <h6 className="text-lg font-semibold mb-4">Our Services</h6>
          <ul className="space-y-2">
            <li>
              <Link href="/services/branding">
                <p className="text-white  hover:text-gray-800 transition">
                  Branding Solutions
                </p>
              </Link>
            </li>
            <li>
              <Link href="/services/electronics">
                <p className="text-white  hover:text-gray-800  transition">
                  Electronics
                </p>
              </Link>
            </li>
            <li>
              <Link href="/services/fashion">
                <p className="text-white  hover:text-gray-800  transition">
                  Fashion Advice
                </p>
              </Link>
            </li>
            <li>
              <Link href="/services/beauty">
                <p className="text-white  hover:text-gray-800  transition">
                  Beauty Products
                </p>
              </Link>
            </li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h6 className="text-lg font-semibold mb-4">About Us</h6>
          <ul className="space-y-2">
            <li>
              <Link href="/about">
                <p className="text-white  hover:text-gray-800  transition">
                  Who We Are
                </p>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <p className="text-white  hover:text-gray-800  transition">
                  Contact Us
                </p>
              </Link>
            </li>
            <li>
              <Link href="/terms">
                <p className="text-white  hover:text-gray-800  transition">
                  Terms of Service
                </p>
              </Link>
            </li>
            <li>
              <Link href="/privacy">
                <p className="text-white  hover:text-gray-800  transition">
                  Privacy Policy
                </p>
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h6 className="text-lg font-semibold mb-4">Quick Links</h6>
          <ul className="space-y-2">
            <li>
              <Link href="/products">
                <p className="text-white  hover:text-gray-800 transition">
                  Shop All Products
                </p>
              </Link>
            </li>
            <li>
              <Link href="/products/sale">
                <p className="text-white  hover:text-gray-800 transition">
                  Top Deals
                </p>
              </Link>
            </li>
            <li>
              <Link href="/help">
                <p className="text-white  hover:text-gray-800 transition">
                  Help Center
                </p>
              </Link>
            </li>
            <li>
              <Link href="/faq">
                <p className="text-white  hover:text-gray-800 transition">
                  FAQs
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-950 mt-8 pt-6 text-center text-sm text-gray-950">
        <p>
          &copy; {new Date().getFullYear()} E-Com Zone. All rights reserved.
        </p>
        <p className="mt-2">
          Made with ❤️ by{" "}
          <Link href="/" className="text-white hover:underline">
            E-Com Team
          </Link>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
