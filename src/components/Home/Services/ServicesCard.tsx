/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useState } from "react";
import { TService } from "@/types";
import { useCart } from "../Cart/CartContext";

interface ServicesCardProps {
  service: TService;
}

const ServicesCard = ({ service }: ServicesCardProps) => {
  const { _id, name, price, image, ratings } = service;
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  return (
    <div
      className="card bg-white w-full max-w-sm shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 m-1 p-1 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/services/${_id}`}>
        <figure className="relative w-full h-56 overflow-hidden">
          <img
            src={image || "/default-profile.jpg"} // Fallback to default image
            alt={name}
            className="object-cover w-full h-full rounded-t-lg"
            width={320}
            height={160}
          />
        </figure>
      </Link>

      <div className="card-body p-2">
        <h2 className="text-lg font-medium text-gray-900 truncate">{name}</h2>
        <div className="flex items-center ">
          <p className="text-sm text-gray-700 mr-2">
            Price: <span className=" text-sm text-orange-600">{price}</span>
          </p>
          {price && (
            <div className="flex flex-col items-start">
              <p className="text-sm text-gray-600 line-through">{price}</p>
            </div>
          )}
        </div>
        <div className="flex items-center">
          <span className="text-yellow-500 text-sm">
            {"⭐".repeat(ratings)}{" "}
            <span className="text-sm text-gray-500 ml-2">({ratings})</span>
          </span>
        </div>
      </div>

      {/* Add to Cart Button */}
      {isHovered && (
        <button
          onClick={() => addToCart(service)}
          className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-semibold rounded-lg text-sm px-8 py-1 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl active:scale-95"
        >
          Add Cart
        </button>
      )}

      {/* View Details Button */}
      <div
        className={`card-actions justify-center absolute bottom-4 w-full transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <Link
          href={`/services/${_id}`}
          className="bg-sky-600 text-white py-2 px-8 rounded font-semibold hover:bg-yellow-500 transition-transform duration-300 transform hover:scale-105"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ServicesCard;
