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
    <div className="py-12 px-6 bg-slate-50/50">
      {/* Title animation */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center mb-10 text-slate-800 tracking-tight"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Delivery & Shipping
      </motion.h1>

      {/* Card grid animation */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white border border-slate-100 hover:border-sky-100 p-6 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md flex flex-col items-center text-center group"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.6,
                  ease: "easeOut",
                },
              },
            }}
          >
            <div className="w-14 h-14 bg-sky-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <img
                src={service.icon}
                alt={service.title}
                className="h-8 w-8 object-contain"
              />
            </div>
            <h2 className="text-lg font-bold text-slate-800 mb-2">
              {service.title}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">{service.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DeveleryWay;
