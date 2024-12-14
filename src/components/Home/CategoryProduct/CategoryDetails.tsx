/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { TService } from "@/types";
import { getServices } from "@/services/getServices";
import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";

const CategoryDetails = () => {
  const [services, setServices] = useState<TService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const fetchedServices = await getServices();
        setServices(fetchedServices);
      } catch (err) {
        setError("Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 px-10 h-screen">
        <span className="text-xl text-gray-500">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-10 px-10 h-screen">
        <span className="text-xl text-red-500">{error}</span>
      </div>
    );
  }

  return (
    <section className="container mx-auto py-5 px-5">
      <h1 className="text-4xl font-medium text-center mb-5 text-gray-900 truncate">
        Feature Product
      </h1>
      <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-10">
        {services.length > 0 ? (
          services.map((service) => (
            <CategoryCard service={service} key={service._id} />
          ))
        ) : (
          <div className="col-span-full text-center py-4 text-lg text-gray-500">
            No services available at the moment.
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryDetails;
