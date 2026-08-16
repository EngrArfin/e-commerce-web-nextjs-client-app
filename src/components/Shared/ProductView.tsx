import Image from "next/image";
import React from "react";
import viewcart from "../../UI/image/sidephoto.jpg";
import Link from "next/link";

const FeatureSection: React.FC = () => {
  return (
    <section className=" mx-auto py-10 px-5">
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-slate-800 tracking-tight">
        Best Offers Just for You
      </h1>

      <div className="relative flex flex-col lg:flex-row items-center justify-between bg-slate-900 text-white rounded-2xl shadow-xl overflow-hidden max-w-7xl mx-auto">
        {/* Left Section - Image */}
        <div className="w-full lg:w-1/2 h-[350px] lg:h-[450px] relative">
          <Image
            src={viewcart}
            alt="Featured product showcase"
            fill
            style={{ objectFit: "cover" }}
            className="rounded-t-2xl lg:rounded-tr-none lg:rounded-l-2xl"
          />
        </div>

        {/* Right Section - Text Content */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center items-start">
          <p className="text-xs lg:text-sm text-yellow-400 font-semibold mb-3 uppercase tracking-wider">
            New Arrival - March 20, 2023
          </p>
          <h2 className="text-2xl lg:text-4xl font-bold mb-4 leading-tight text-white">
            Discover the Latest Trends in Style & Technology
          </h2>
          <p className="text-slate-300 text-sm lg:text-base mb-6 leading-relaxed">
            Elevate your experience with cutting-edge designs and unparalleled
            performance. Our latest collection is built for enthusiasts who
            demand the best. Explore our offerings now and take your style and
            functionality to the next level.
          </p>
          {/* Button Section */}
          <Link
            href="/products"
            className="bg-sky-500 text-white font-semibold text-base px-8 py-3 rounded-full hover:bg-sky-400 transition-all duration-300 ease-in-out shadow-lg hover:shadow-sky-500/20 active:scale-95"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
