/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import { motion } from "framer-motion";
import freeshiping1 from "../../../UI/icon/card1.png";
import freeshiping2 from "../../../UI/icon/card2.png";
import freeshiping3 from "../../../UI/icon/card3.png";
import Link from "next/link";

const products = [
  {
    title: "Fresh Camera & Clean with Our Products",
    description: "Shop Now",
    image: freeshiping1.src, // Replace with the actual image path
  },
  {
    title: "Make Your Breakfast Healthy and Easy Products",
    description: "Shop Now",
    image: freeshiping2.src,
  },
  {
    title: "The best Organic Products Online Products",
    description: "Shop Now",
    image: freeshiping3.src, // Replace with the actual image path
  },
];

const Card: FC = () => {
  return (
    <div className="py-5 px-5 ">
      {/* Card grid animation */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 "
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
      >
        {products.map((product, index) => (
          <motion.div
            key={index}
            className="relative bg-gradient-to-br from-sky-50 to-blue-50/50 border border-sky-100/50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between items-center text-center min-h-[300px] group"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: "easeOut",
                },
              },
            }}
          >
            <div className="w-24 h-24 mb-6 transform group-hover:scale-110 transition-transform duration-500 ease-out flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h2 className="text-xl font-bold text-slate-800 leading-snug mb-6 flex-grow flex items-center justify-center">
              {product.title}
            </h2>
            <Link
              href="/products"
              className="bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm py-2.5 px-6 rounded-full shadow-sm hover:shadow active:scale-95 transition-all duration-200"
            >
              Shop Now
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Card;
