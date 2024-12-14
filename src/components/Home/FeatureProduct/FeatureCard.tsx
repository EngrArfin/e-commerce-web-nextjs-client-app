/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import { TService } from "@/types";
import Link from "next/link";
import { useState } from "react";

interface ServicesCardProps {
  service: TService;
}

const FeatureCard = ({ service }: ServicesCardProps) => {
  const { name, image, price, _id } = service;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative card bg-white w-44 md:w-48 lg:w-52 shadow-md m-3 overflow-hidden rounded-lg transition-transform duration-300 transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/services/${_id}`}>
        <figure className="relative w-full h-32 cursor-pointer overflow-hidden">
          <img
            src={image || "/default-profile.jpg"}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
          />
        </figure>
      </Link>

      <div className="card-body p-3 text-center">
        <h2 className="text-lg font-medium text-gray-900 truncate">{name}</h2>
        {/* <p className="text-md font-semibold text-gray-600">{`$${price}`}</p> */}
      </div>

      {/*  {isHovered && (
        <Link
          href={`/cart/${_id}`}
          className="absolute top-2 left-2 bg-orange-500 text-white text-sm font-semibold py-1 px-4 rounded-full hover:bg-orange-600 transition-transform duration-300 transform hover:scale-105"
        >
          Add to Cart
        </Link>
      )} */}

      {/*  <div
        className={`card-actions justify-center absolute bottom-4 w-full transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <Link
          href={`/services/${_id}`}
          className="bg-sky-600 text-white text-sm py-2 px-5 rounded-full font-semibold hover:bg-yellow-500 transition-transform duration-300 transform hover:scale-105"
        >
          View Details
        </Link>
      </div> */}
    </div>
  );
};

export default FeatureCard;
