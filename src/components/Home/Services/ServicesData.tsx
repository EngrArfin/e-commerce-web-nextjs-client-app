/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { TService } from "@/types";
import ServicesCard from "./ServicesCard";
import { getServices } from "@/services/getServices";
import { useEffect, useState } from "react";

const ServicesData = () => {
  const [services, setServices] = useState<TService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const fetchedServices = await getServices();
        setServices(fetchedServices); // Set fetched services to state
      } catch (err) {
        setError("Failed to fetch services");
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading services...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container px-4 py-10">
      <h1 className="text-4xl font-bold text-center my-10">All Services</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
        {services.length > 0 ? (
          services.map((service) => (
            <ServicesCard service={service} key={service._id} />
          ))
        ) : (
          <div className="text-center py-4">No services available</div>
        )}
      </div>
    </div>
  );
};

export default ServicesData;
