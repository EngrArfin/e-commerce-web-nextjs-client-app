// src/components/ServicesData.tsx

import { TService } from "@/types";
import ServicesCard from "./ServicesCard";
import { getServices } from "@/services/getServices";

const ServicesData = async () => {
  const services: TService[] = await getServices(); // Ensure the correct type is used

  return (
    <div className="container">
      <h1 className="text-4xl font-bold my-10">All Service Data</h1>
      <div className="grid lg:grid-cols-6 md:grid-cols-2 grid-cols-1 gap-10">
        {services.length > 0 &&
          services.map((service) => (
            <ServicesCard service={service} key={service._id} />
          ))}
      </div>
    </div>
  );
};

export default ServicesData;
