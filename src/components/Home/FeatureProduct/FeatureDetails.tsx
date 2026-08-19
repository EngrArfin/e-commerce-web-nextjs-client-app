/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { TService } from "@/types";
import { getServices } from "@/services/getServices";
import { useEffect, useState } from "react";
import FeatureCard from "./FeatureCard";
import Slider from "react-slick"; // Import Slider
import CommonLoader from "@/components/Shared/CommonLoader";

const FeatureDetails = () => {
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
        <CommonLoader

          size="lg"
        />
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

  // Carousel settings for displaying 10 product cards
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6, // Show 5 cards on larger screens
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Tablet view
        settings: {
          slidesToShow: 3, // Show 3 cards on tablets
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Mobile view
        settings: {
          slidesToShow: 2, // Show 2 cards on mobile devices
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Small mobile view
        settings: {
          slidesToShow: 1, // Show 1 card on small mobile devices
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="py-12 px-6 mx-auto max-w-7xl relative">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-slate-800 tracking-tight">
        Category Products
      </h1>
      {/* Slider displaying services */}
      <Slider {...settings}>
        {services.length > 0 ? (
          services.slice(0, 7).map(
            (
              service // Limit to first 10 products
            ) => <FeatureCard service={service} key={service._id} />
          )
        ) : (
          <div className="col-span-full text-center py-4 text-lg text-gray-500">
            No services available at the moment.
          </div>
        )}
      </Slider>
    </section>
  );
};

export default FeatureDetails;
