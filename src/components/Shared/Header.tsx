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
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-center px-5 py-12">
        <h1 className="text-4xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-wide drop-shadow-lg">
          E-Commerce <span className="text-sky-400">Zone</span>
        </h1>
        <p className="text-lg lg:text-2xl text-white font-light mb-4 max-w-lg drop-shadow-md">
          Premium Products | Unbeatable Prices
        </p>
        <p className="text-xs lg:text-sm text-slate-200 mb-8 max-w-sm lg:max-w-md drop-shadow-md">
          Discover exclusive deals on beauty, electronics, fashion, and more!
        </p>
 
        {/* Call to Action Button */}
        <Link href="/products">
          <button className="px-8 py-3.5 bg-sky-600 text-white text-base font-semibold rounded-full shadow-lg hover:bg-sky-500 hover:shadow-sky-500/20 transition-all duration-300 transform hover:scale-105">
            Start Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
