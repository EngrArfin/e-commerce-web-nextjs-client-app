/* eslint-disable @next/next/no-async-client-component */
"use client";
import { TProductCardProps } from "@/types";
import { getServices } from "@/services/getServices";
import CategoryCard from "./CategoryCard";

const CategoryDetails = async () => {
  const { services } = await getServices();

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-10">Categories</h1>
      <div className="grid lg:grid-cols-6 md:grid-cols-2 grid-cols-1 gap-10">
        {services.length > 0 ? (
          services.map((service: TProductCardProps) => (
            <CategoryCard service={service} key={service._id} />
          ))
        ) : (
          <p className="text-center col-span-full">No services found.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryDetails;
