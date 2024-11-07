"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../UI/icon/Logo.jpg";

const Footer = () => {
  return (
    <div>
      <footer className="footer bg-base-200 text-base-content p-10">
        <div>
          <div className="flex align-item-center items-center justify-center space-x-2">
            <div className="overflow-hidden rounded-full w-20 h-10 bg-gray-200 flex items-center justify-center">
              <Image
                src={logo}
                alt="Logo"
                width={100}
                height={60}
                className="object-cover"
              />
            </div>

            <div className="mt-8">
              <Link
                href="/"
                className="text-xl font-semibold text-gray-800 hover:text-gray-600 transition duration-200"
              >
                <span className="text-red-500 text-center">E-com Zone </span>
              </Link>
            </div>
          </div>
          <p>Providing reliable tech since 1992</p>
          <p>Providing reliable tech since 1992</p>
        </div>

        <nav>
          <h6 className="footer-title">Trip Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Gardening</a>
          <a className="link link-hover">Advising</a>
        </nav>
        <nav>
          <h6 className="footer-title">Gardening</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Advice</a>
          <a className="link link-hover">Trip Gardening</a>
        </nav>
        <nav>
          <h6 className="footer-title">Top Sell Product </h6>
          <a className="link link-hover">Product sell</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Business policy</a>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
