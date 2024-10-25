/* eslint-disable @next/next/no-async-client-component */
"use client";
import { TProductCardProps } from "@/types";
import ServicesCard from "./ServicesCard";
import { getServices } from "@/services/getServices";

const ServicesData = async () => {
  const { services } = await getServices();

  return (
    <div className="container">
      <h1 className="text-4xl font-bold my-10">All Service Data</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {services.length > 0 &&
          services?.map((service: TProductCardProps) => (
            <ServicesCard service={service} key={service._id} />
          ))}
      </div>
    </div>
  );
};

export default ServicesData;
