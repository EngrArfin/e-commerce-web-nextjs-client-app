"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../UI/icon/Logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 px-6 max-w-7xl">
        {/* Company Info */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center space-x-4">
            <div className="rounded-full overflow-hidden border-2 border-slate-800">
              <Image
                src={logo}
                alt="E-Commerce Zone Logo"
                width={50}
                height={50}
                className="object-cover"
              />
            </div>

            <Link href="/">
              <p className="text-2xl font-bold tracking-tight text-white">
                E-Com <span className="text-sky-400">Zone</span>
              </p>
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-400 text-center md:text-left leading-relaxed">
            Your one-stop shop for premium products. Delivering trust and
            quality since January 2024.
          </p>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Our Services</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/services/branding" className="hover:text-white transition-colors duration-200">
                Branding Solutions
              </Link>
            </li>
            <li>
              <Link href="/services/electronics" className="hover:text-white transition-colors duration-200">
                Electronics
              </Link>
            </li>
            <li>
              <Link href="/services/fashion" className="hover:text-white transition-colors duration-200">
                Fashion Advice
              </Link>
            </li>
            <li>
              <Link href="/services/beauty" className="hover:text-white transition-colors duration-200">
                Beauty Products
              </Link>
            </li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">About Us</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/about" className="hover:text-white transition-colors duration-200">
                Who We Are
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition-colors duration-200">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/products" className="hover:text-white transition-colors duration-200">
                Shop All Products
              </Link>
            </li>
            <li>
              <Link href="/products/sale" className="hover:text-white transition-colors duration-200">
                Top Deals
              </Link>
            </li>
            <li>
              <Link href="/help" className="hover:text-white transition-colors duration-200">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white transition-colors duration-200">
                FAQs
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 mt-12 pt-8 text-center text-xs text-slate-500">
        <p>
          &copy; {new Date().getFullYear()} E-Com Zone. All rights reserved.
        </p>
        <p className="mt-2">
          Made with ❤️ by{" "}
          <Link href="/" className="text-sky-400 hover:text-sky-300 hover:underline">
            E-Com Team
          </Link>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
