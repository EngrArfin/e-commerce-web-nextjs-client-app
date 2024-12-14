/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import { motion } from "framer-motion";
import freeshiping1 from "../../UI/icon/freeshiping1.png";
import freeshiping2 from "../../UI/icon/freeshiping2.png";
import freeshiping3 from "../../UI/icon/freeshiping3.png";
import freeshiping4 from "../../UI/icon/freeshiping4.png";

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
    <div className="py-5 px-5">
      {/* Title animation */}
      <motion.h1
        className="text-4xl font-medium text-center mb-5 text-gray-900 truncate"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }} // Slow motion for title
      >
        Delivery Shipping
      </motion.h1>

      {/* Card grid animation */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.5, // Slower stagger for each card
            },
          },
        }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="card shadow-lg p-6 text-gray-800 rounded-lg bg-gradient-to-r bg-sky-100"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1.5, // Slow-motion entry for each card
                  ease: "easeInOut", // Smooth easing
                },
              },
            }}
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
            <p className="max-auto text-left mt-2">{service.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DeveleryWay;
