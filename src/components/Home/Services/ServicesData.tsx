/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { TService } from "@/types";
import { getServices } from "@/services/getServices";
import { useEffect, useState } from "react";
import CommonLoader from "@/components/Shared/CommonLoader";
import ServicesCard from "./ServicesCard";

const ServicesData = () => {
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
      <section className="py-12 px-6 mx-auto max-w-7xl">
        <CommonLoader message="Loading Products..." size="lg" />
      </section>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <span className="text-xl text-red-500">{error}</span>
      </div>
    );
  }

  return (
    <section className="py-12 px-6 mx-auto max-w-7xl relative">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-slate-800 tracking-tight">
        Our Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {services.length > 0 ? (
          services.map((service) => (
            <ServicesCard service={service} key={service._id} />
          ))
        ) : (
          <div className="col-span-full text-center py-4 text-lg text-gray-500">
            No services available.
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesData;
