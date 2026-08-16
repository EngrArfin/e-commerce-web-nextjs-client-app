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

  return (
    <Link href={`/services/${_id}`} className="block">
      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col justify-between h-[230px] mx-1">
        <div className="relative w-full h-32 overflow-hidden bg-slate-50">
          <img
            src={image || "/default-profile.jpg"}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </div>

        <div className="p-3 text-center flex-grow flex flex-col justify-between">
          <h3 className="text-xs sm:text-sm font-semibold text-slate-700 group-hover:text-sky-600 transition-colors duration-200 line-clamp-2 h-10 flex items-center justify-center leading-snug">
            {name}
          </h3>
          {price && (
            <p className="text-xs sm:text-sm font-bold text-orange-600 mt-1">
              {price}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default FeatureCard;
