/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import freeshiping1 from "../../UI/icon/freeshiping1.jpg";
import freeshiping2 from "../../UI/icon/freeshiping2.jpg";
import freeshiping3 from "../../UI/icon/freeshiping3.jpg";
import freeshiping4 from "../../UI/icon/freeshiping4.jpg";

const services = [
  {
    title: "Free Shipping",
    description: "Enjoy free shipping on orders over $500 every day.",
    icon: freeshiping1.src,
  },
  {
    title: "Fast Delivery",
    description: "Guaranteed next-day delivery on selected products.",
    icon: freeshiping2.src,
  },
  {
    title: "24/7 Support",
    description: "We are here to help you any time of the day.",
    icon: freeshiping3.src,
  },
  {
    title: "Money-back Guarantee",
    description: "100% money-back guarantee within 30 days.",
    icon: freeshiping4.src,
  },
];

const DeveleryWay: FC = () => {
  return (
    <div className="py-10">
      <div className="divider text-lg font-semibold text-primary">
        Shipping & Delivery
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className={
              "card shadow-lg p-6 text-white rounded-lg bg-gradient-to-r from-sky-500 to-sky-700"
            }
          >
            <figure>
              <img
                src={service.icon}
                alt={service.title}
                className="h-12 w-12 mb-4 mx-auto"
              />
            </figure>
            <h2 className="card-title text-center text-xl font-bold">
              {service.title}
            </h2>
            <p className="text-center mt-2">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeveleryWay;
