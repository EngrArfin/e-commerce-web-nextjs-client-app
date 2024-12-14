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
    <div className="py-10 px-5 ">
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
            className="shadow-lg p-6 rounded-lg bg-sky-200 border  hover:shadow-xl transition duration-300"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1,
                  ease: "easeInOut",
                },
              },
            }}
          >
            <div className="flex flex-col items-center text-center bg-sky-100">
              <img
                src={product.image}
                alt={product.title}
                className="h-24 w-24 mb-4"
              />
              <h2 className="text-2xl font-medium text-center mb-5 text-gray-900  ">
                {product.title}
              </h2>
              <Link
                href="/products"
                className="mt-4 bg-sky-600 text-black py-2 px-4 rounded-full hover:bg-sky-300 transition duration-300"
              >
                Shop Now
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Card;
