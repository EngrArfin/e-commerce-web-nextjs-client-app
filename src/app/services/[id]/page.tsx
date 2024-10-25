/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { getServicesDetails } from "@/services/getServices";

const ProductDetails = async ({ params }) => {
  /* product, relatedProducts, reviews, */
  const details = await getServicesDetails(params.id);
  const { name, ratings, image, price, description, _id } = details.service;

  return (
    <div className="container mx-auto p-6 grid lg:grid-cols-2 gap-8">
      {/* Left Side - Image Slider */}
      <div className="space-y-4">
        {/* Active Image Display */}
        <div className="flex justify-center">
          <img
            src={image}
            alt="Product Image"
            className="rounded-lg shadow-lg object-cover w-full max-w-md h-80"
          />
        </div>
        {/* Thumbnail Slider */}
      </div>

      {/* Right Side - Product Info */}
      <div className="space-y-6">
        {/* Product Details */}
        <div>
          <h2 className="text-3xl font-semibold">{name}</h2>
          <p className="text-gray-600">{description}</p>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500 font-semibold mr-2">
              {ratings} ★
            </span>
            <span className="text-gray-500">Rating</span>
          </div>
          <div className="text-lg">
            <span className="font-semibold text-blue-600">${price}</span>
            {price && (
              <span className="ml-2 text-gray-500 line-through">${price}</span>
            )}
          </div>
          <p
            className={`font-semibold ${
              ratings > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {ratings > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>

        {/* Quantity and Buttons */}
        <div className="flex items-center space-x-4">
          <input
            type="number"
            min="1"
            defaultValue="1"
            className="w-16 p-2 border border-gray-300 rounded-md"
          />
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700">
            Buy Now
          </button>
          <Link
            href={`/products/${_id}`}
            className="bg-gray-100 text-gray-900 px-6 py-2 rounded-md font-semibold hover:bg-gray-200"
          >
            Add to Cart
          </Link>
        </div>
      </div>
      {/* Related Product */}
      <div>
        <h3 className="text-xl font-semibold mt-6">Related Products</h3>
        <div className="flex">
          <div>
            <Link href={`/services/${_id}`} key={_id}>
              <div className="mt-4 flex items-center space-x-4 p-4 border rounded-md shadow-sm hover:bg-gray-100 cursor-pointer">
                <img
                  src={image}
                  alt={name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <p className="font-semibold text-gray-900">{name}</p>
                  <p>{description}</p>
                  <p className="text-gray-600">${price}</p>
                </div>
              </div>
            </Link>
          </div>

          <div>
            <Link href={`/services/${_id}`} key={_id}>
              <div className="mt-4 flex items-center space-x-4 p-4 border rounded-md shadow-sm hover:bg-gray-100 cursor-pointer">
                <img
                  src={image}
                  alt={name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <p className="font-semibold text-gray-900">{name}</p>
                  <p>{description}</p>
                  <p className="text-gray-600">${price}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
