// components/FeatureSection.tsx
import Image from "next/image";
import React from "react";
import viewcart from "../../UI/image/sidephoto.jpg";

const ProductView: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold my-10">-All Service Data</h1>

      <div className="relative flex items-center justify-between bg-gray-900 text-white h-[500px] p-8">
        {/* Image Section */}
        <div className="w-1/2 h-full relative overflow-hidden">
          <Image
            src={viewcart}
            alt="Delicious appetizers on a tray"
            layout="fill" // Fills the container area
            objectFit="cover" // Ensures image covers the entire area without stretching
            className="rounded-md shadow-lg"
          />
        </div>

        {/* Text Section */}
        <div className="w-1/2 pl-8">
          <p className="text-gray-400 text-sm mb-2">March 20, 2023</p>
          <h2 className="text-2xl font-semibold mb-4">WHERE CAN I GET SOME?</h2>
          <p className="text-gray-300 mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            voluptate facere, deserunt dolores maiores quod nobis quas quasi.
            Eaque repellat recusandae ad laudantium tempore consequatur
            consequuntur omnis ullam maxime tenetur.
          </p>
          <button className="px-6 py-2 bg-transparent border border-white text-white hover:bg-white hover:text-gray-900 transition duration-300">
            READ MORE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
