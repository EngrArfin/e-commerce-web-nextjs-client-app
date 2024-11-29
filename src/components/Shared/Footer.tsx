"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../UI/icon/Logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
        {/* Company Info */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center space-x-4">
            <div className="rounded-full overflow-hidden w-16 h-16 bg-gray-100">
              <Image
                src={logo}
                alt="E-Commerce Zone Logo"
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <Link href="/">
              <p className="text-2xl font-bold">
                <span className="text-sky-500">E-Com</span>
                <span className="text-violet-600">Zone</span>
              </p>
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-400 text-center md:text-left">
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
                <p className="text-gray-400 hover:text-sky-400 transition">
                  Branding Solutions
                </p>
              </Link>
            </li>
            <li>
              <Link href="/services/electronics">
                <p className="text-gray-400 hover:text-sky-400 transition">
                  Electronics
                </p>
              </Link>
            </li>
            <li>
              <Link href="/services/fashion">
                <p className="text-gray-400 hover:text-sky-400 transition">
                  Fashion Advice
                </p>
              </Link>
            </li>
            <li>
              <Link href="/services/beauty">
                <p className="text-gray-400 hover:text-sky-400 transition">
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
                <p className="text-gray-400 hover:text-sky-400 transition">
                  Who We Are
                </p>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <p className="text-gray-400 hover:text-sky-400 transition">
                  Contact Us
                </p>
              </Link>
            </li>
            <li>
              <Link href="/terms">
                <p className="text-gray-400 hover:text-sky-400 transition">
                  Terms of Service
                </p>
              </Link>
            </li>
            <li>
              <Link href="/privacy">
                <p className="text-gray-400 hover:text-sky-400 transition">
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
                <p className="text-gray-400 hover:text-sky-400 transition">
                  Shop All Products
                </p>
              </Link>
            </li>
            <li>
              <Link href="/products/sale">
                <p className="text-gray-400 hover:text-sky-400 transition">
                  Top Deals
                </p>
              </Link>
            </li>
            <li>
              <Link href="/help">
                <p className="text-gray-400 hover:text-sky-400 transition">
                  Help Center
                </p>
              </Link>
            </li>
            <li>
              <Link href="/faq">
                <p className="text-gray-400 hover:text-sky-400 transition">
                  FAQs
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
        <p>
          &copy; {new Date().getFullYear()} E-Com Zone. All rights reserved.
        </p>
        <p className="mt-2">
          Made with ❤️ by{" "}
          <Link href="/" className="text-sky-400 hover:underline">
            E-Com Team
          </Link>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
