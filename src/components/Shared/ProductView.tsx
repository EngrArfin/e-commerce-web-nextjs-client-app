// components/FeatureSection.tsx
import Image from "next/image";
import React from "react";
import viewcart from "../../UI/image/sidephoto.jpg";

const FeatureSection: React.FC = () => {
  return (
    <section className="container mx-auto my-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">
        Our Featured Product
      </h1>

      <div className="relative flex flex-col lg:flex-row items-center justify-between bg-gray-900 text-white h-auto lg:h-[500px] p-8 rounded-lg shadow-md">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 h-64 lg:h-full relative overflow-hidden rounded-md shadow-lg">
          <Image
            src={viewcart}
            alt="Featured product showcase"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>

        {/* Text Section */}
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:pl-8">
          <p className="text-gray-400 text-sm mb-2">
            New Arrival - March 20, 2023
          </p>
          <h2 className="text-3xl font-semibold mb-4">
            Discover the Latest in Style & Technology
          </h2>
          <p className="text-gray-300 mb-6">
            Upgrade your collection with our latest featured product. Combining
            state-of-the-art design and performance, this piece is crafted to
            deliver the ultimate user experience. Perfect for anyone who values
            quality, durability, and style in their shopping cart.
          </p>
          <button className="px-6 py-2 bg-transparent border border-white text-white hover:bg-white hover:text-gray-900 transition duration-300">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
