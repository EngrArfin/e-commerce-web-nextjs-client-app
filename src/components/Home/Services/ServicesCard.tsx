/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useState } from "react";
import { TService } from "@/types";

interface ServicesCardProps {
  service: TService;
}

const ServicesCard = ({ service }: ServicesCardProps) => {
  const { _id, name, description, price, image, ratings } = service;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="card bg-base-100 w-56 md:w-64 shadow-lg m-3 overflow-hidden relative border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/services/${_id}`}>
        <figure
          style={{
            width: "140%",
            height: "160px",
            overflow: "hidden",
            cursor: "pointer",
            margin: "0 auto",
          }}
        >
          <img
            src={image || "/default-profile.jpg"} // Fallback to default image
            alt={name}
            className="object-cover w-full h-full"
            width={300}
            height={200}
          />
        </figure>
      </Link>

      <div className="card-body p-4">
        <h2 className="card-title text-sm lg:text-md font-semibold">{name}</h2>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-sm text-gray-700">Price: ${price}</p>
        <div className="flex items-center">
          <span className="text-yellow-500">{"⭐".repeat(ratings)}</span>
        </div>
      </div>

      {isHovered && (
        <Link
          href={`/cart/${_id}`}
          className="absolute top-2 left-2 bg-orange-500 text-white font-semibold py-1 px-4 rounded hover:bg-orange-600 transition-transform duration-300 transform hover:scale-105"
        >
          Add to Cart
        </Link>
      )}

      <div
        className={`card-actions justify-center ${
          isHovered ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300 absolute bottom-4 w-full`}
      >
        <Link
          href={`/services/${_id}`}
          className="bg-blue-600 text-white py-2 px-5 rounded font-semibold hover:bg-yellow-500 transition-transform duration-300 transform hover:scale-105"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ServicesCard;
