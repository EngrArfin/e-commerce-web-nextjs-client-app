/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { TService } from "@/types";
import { getServices } from "@/services/getServices";
import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import CommonLoader from "@/components/Shared/CommonLoader";

const CategoryDetails = () => {
  const [services, setServices] = useState<TService[]>([]); // Holds all fetched services
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string>(""); // Error state
  const [visibleCount, setVisibleCount] = useState<number>(10); // Start with 10 products

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const fetchedServices = await getServices();
        setServices(fetchedServices); // Store fetched services
      } catch (err) {
        setError("Failed to fetch services"); // Set error message if fetch fails
      } finally {
        setLoading(false); // Stop loading regardless of the outcome
      }
    };

    fetchServices();
  }, []);

  // Handle the "See All" button click to load all products
  const handleSeeAll = () => {
    setVisibleCount(services.length); // Show all products
  };

  if (loading) {
    return (
      <section className="py-12 px-6 mx-auto max-w-7xl">
        <CommonLoader message="Loading Featured Products..." size="lg" />
      </section>
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
    <section className="py-12 px-6 mx-auto max-w-7xl relative">
      {/* Header Section */}
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
          Featured Products
        </h1>
        {visibleCount < services.length && (
          <button
            onClick={handleSeeAll}
            className="px-5 py-2 bg-gradient-to-r from-blue-500 to-sky-500 text-white rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-offset-2 focus:ring-blue-300"
          >
            All Products
          </button>
        )}
      </div>
      {/* Product Grid Section */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {services.length > 0 ? (
          // Display only visibleCount products
          services
            .slice(0, visibleCount)
            .map((service) => (
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
