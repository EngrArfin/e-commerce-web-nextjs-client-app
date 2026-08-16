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
      className="bg-white w-full max-w-sm shadow-sm hover:shadow-md rounded-xl overflow-hidden border border-slate-100 hover:border-sky-100 transition-all duration-300 m-1 p-3 relative flex flex-col justify-between h-[350px] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <Link href={`/services/${_id}`}>
          <figure className="relative w-full h-44 overflow-hidden rounded-lg cursor-pointer">
            <img
              src={image || "/default-profile.jpg"}
              alt={name}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          </figure>
        </Link>

        <div className="mt-3">
          <h2 className="text-base font-semibold text-slate-800 truncate">{name}</h2>
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm font-bold text-orange-600">
              {price}
            </p>
            <div className="flex items-center text-yellow-500 text-xs">
              {"⭐".repeat(ratings || 5)}{" "}
              <span className="text-slate-400 ml-1">({ratings || 5})</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => addToCart(service)}
          className="flex-1 text-center bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg text-xs py-2 px-3 transition-colors duration-200 shadow-sm active:scale-95"
        >
          Add to Cart
        </button>
        <Link
          href={`/services/${_id}`}
          className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs py-2 px-3 transition-colors duration-200 active:scale-95"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default ServicesCard;
