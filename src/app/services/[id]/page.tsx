/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { getServicesDetails } from "@/services/getServices";
import CategoryDetails from "@/components/Home/CategoryProduct/CategoryDetails";

interface Service {
  name: string;
  ratings: number;
  image: string;
  price: number;
  description: string;
  _id: string;
}

interface ServiceDetailsResponse {
  service?: Service;
}

type Params = {
  id: string;
};

const ProductDetails = async ({ params }: { params: Params }) => {
  const details = (await getServicesDetails(
    params.id
  )) as unknown as ServiceDetailsResponse;

  if (!details?.service) {
    return (
      <div className="container mx-auto p-6 ">
        <h2 className="text-2xl font-semibold">Service not found</h2>
        <p className="text-gray-600">
          The requested service details could not be found.
        </p>
      </div>
    );
  }

  const { name, ratings, image, price, description, _id } = details.service;

  return (
    <div>
      <div className="container mx-auto p-6 mt-20 bg-white shadow-lg rounded-lg">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Image Section */}
          <div className="flex justify-center items-center">
            <img
              src={image || "/default-profile.jpg"}
              alt={name}
              className="rounded-lg shadow-lg object-cover w-full max-w-md h-96"
            />
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            <h2 className="text-4xl font-medium  text-gray-900 truncate">
              {name}
            </h2>
            <p className="text-lg text-gray-700">{description}</p>

            <div className="flex items-center space-x-4">
              {/* Rating */}
              <div className="flex items-center text-yellow-500">
                <span className="text-xl font-semibold">{ratings} ★</span>
                <span className="text-gray-600">
                  ({ratings > 0 ? "Excellent" : "No Reviews"})
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Price */}
              <div className="text-sm text-orange-600">${price}</div>
              {price && (
                <span className="text-lg text-gray-500 line-through">
                  ${price}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <p
              className={`font-semibold text-lg ${
                ratings > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {ratings > 0 ? "In Stock" : "Out of Stock"}
            </p>

            <div className="flex items-center space-x-4">
              {/* Quantity Input */}
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="w-20 p-3 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />

              {/* Buttons */}
              <Link
                href={`/checkout/${_id}`}
                className="px-6 py-3 bg-sky-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-sky-700 transition duration-300 transform hover:scale-105"
              >
                Buy Now
              </Link>
              <Link
                href={`/cart/${_id}`}
                className="px-6 py-3 bg-yellow-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-yellow-700 transition duration-300 transform hover:scale-105"
              >
                Add to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Category Details Section */}
      <div className="container mx-auto mt-16">
        <CategoryDetails />
      </div>
    </div>
  );
};

export default ProductDetails;
