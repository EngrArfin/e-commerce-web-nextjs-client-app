"use client";
import Image from "next/image";
import cover1 from "../../UI/image/banner.png";
import Link from "next/link";

const Header = () => {
  return (
    <div className="relative w-full h-screen">
      <Image
        src={cover1}
        alt="E-Commerce Zone - Premium Products, Unbeatable Prices"
        fill
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
        className="absolute inset-0"
        quality={90}
        priority
      />

      {/* Overlay with Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-center px-5 py-12">
        <h1 className="text-3xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-wide drop-shadow-lg">
          <span className="bg-sky-100 text-4xl font-medium text-center mb-5 text-gray-900 truncate">
            E-Commerce
          </span>
          <span className=" text-4xl font-medium text-center mb-5 text-yellow-400 truncate">
            Zone
          </span>
        </h1>
        <p className="text-lg lg:text-xl text-white font-light mb-6 max-w-lg drop-shadow-md">
          Premium Products | Unbeatable Prices
        </p>
        <p className="text-sm lg:text-md text-gray-300 mb-8 max-w-sm lg:max-w-md drop-shadow-md">
          Discover exclusive deals on beauty, electronics, fashion, and more!
        </p>

        {/* Call to Action Button */}
        <Link href="/products">
          <button className="px-6 py-4 bg-sky-700 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-purple-800 transition-all duration-300 transform hover:scale-105">
            Start Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
