/* eslint-disable @next/next/no-async-client-component */
"use client";

import { useCart } from "@/components/Home/Cart/CartContext";
import { getServicesDetails } from "@/services/getServices";
import { TServiceDetails } from "@/types";
import Image from "next/image";

interface ServiceDetailsProps {
  params: { id: string };
}

const ServiceDetails = async ({ params }: ServiceDetailsProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { addToCart } = useCart();
  const details: TServiceDetails = await getServicesDetails(params.id);
  const { title, ratings, img, price, description, _id } = details;

  const handleAddToCart = () => {
    const cartItem = {
      id: _id,
      name: title,
      image: img,
      price: price,
      quantity: 1, // You can dynamically change this if needed
    };
    addToCart(cartItem as any);
  };

  return (
    <div className="container mx-auto p-6">
      <hr className="mb-6" />
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <figure className="flex justify-center">
          <Image
            src={img || "/default-profile.jpg"}
            alt={title}
            className="rounded-lg shadow-lg object-cover"
            style={{ height: "400px", width: "100%", maxWidth: "500px" }}
          />
        </figure>

        <div className="flex flex-col space-y-4">
          <h2 className="text-3xl font-semibold text-gray-900">{title}</h2>
          <p className="text-gray-600">{description}</p>

          <div className="flex items-center">
            <span className="text-yellow-500 font-semibold mr-2">
              {ratings} ★
            </span>
            <span className="text-gray-500">Rating</span>
          </div>

          <div className="text-lg text-gray-700">
            <span className="font-semibold text-blue-600">${price}</span>
          </div>

          <p className="text-gray-700">
            <span
              className={`font-semibold ${
                price ? "text-green-600" : "text-red-600"
              }`}
            >
              {price ? "In Stock" : "Out of Stock"}
            </span>
          </p>

          <div className="flex space-x-4 pt-4">
            <button
              onClick={handleAddToCart}
              className="px-5 py-3 bg-sky-700 text-white text-sm lg:text-lg font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition-transform duration-300 transform hover:scale-105"
            >
              Add to Car
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
