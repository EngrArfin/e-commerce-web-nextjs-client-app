"use client";
import Image from "next/image";
import cover1 from "../../UI/image/header1.jpg";
import cover2 from "../../UI/image/header2.jpg";
import Link from "next/link";

const Header = () => {
  return (
    <div className="w-full h-[90vh] flex flex-col lg:flex-row">
      <div className="relative w-full lg:w-1/2 h-[45vh] lg:h-full">
        <Image
          src={cover1}
          alt="E-Commerce Zone - Premium Products, Unbeatable Prices"
          fill
          style={{ objectFit: "cover" }}
          className="object-cover"
          quality={90}
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black/70 to-transparent text-center p-6 lg:p-10">
          <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            <span className="bg-sky-700 text-white px-6 py-2 rounded-md shadow-md">
              E-Commerce
            </span>
            <span className="text-yellow-400 ml-2">Zone</span>
          </h1>
          <p className="text-sm lg:text-lg text-white font-light mb-4 tracking-wide">
            Premium Products | Unbeatable Prices
          </p>
          <p className="text-xs lg:text-md text-gray-200 mb-8 max-w-xs lg:max-w-md">
            Discover exclusive deals on beauty, electronics, fashion, and more!
          </p>
        </div>
      </div>

      <div className="relative w-full lg:w-1/2 h-[45vh] lg:h-full flex items-center justify-center">
        <Image
          src={cover2}
          alt="Shop Quality Beauty Products & Electronics"
          fill
          style={{ objectFit: "cover" }}
          className="object-cover h-20 w-32"
          quality={90}
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black/70 to-transparent text-center p-6 lg:p-10">
          <h2 className="text-xl lg:text-3xl font-semibold text-white mb-4 leading-tight">
            Quality You Can Trust, Prices You’ll Love
          </h2>
          <p className="text-xs lg:text-md text-gray-200 mb-8 max-w-xs lg:max-w-md">
            Browse thousands of handpicked items from trusted brands.
          </p>
          <Link href="/services">
            <button className="px-10 py-3 bg-sky-700 text-white text-sm lg:text-lg font-semibold rounded-full shadow-lg hover:bg-purple-800 transition-transform duration-300 transform hover:scale-105">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
