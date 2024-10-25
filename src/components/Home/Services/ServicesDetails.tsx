/* eslint-disable @next/next/no-img-element */
import { getServicesDetails } from "@/services/getServices";
import Link from "next/link";

const ServiceDetails = async ({ params }) => {
  const details = await getServicesDetails(params.id);
  const { name, ratings, image, price, description, _id } = details.service;

  return (
    <div className="container mx-auto p-6">
      <hr className="mb-6" />
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <figure className="flex justify-center">
          <img
            src={image || "/default-profile.jpg"}
            alt={name || "Service Image"}
            className="rounded-lg shadow-lg object-cover"
            style={{ height: "400px", width: "100%", maxWidth: "500px" }}
          />
        </figure>

        {/* Details Section */}
        <div className="flex flex-col space-y-4">
          {/* Title */}
          <h2 className="text-3xl font-semibold text-gray-900">{name}</h2>
          <p className="text-gray-600">{description}</p>

          {/* Rating */}
          <div className="flex items-center">
            <span className="text-yellow-500 font-semibold mr-2">
              {ratings} ★
            </span>
            <span className="text-gray-500">Rating</span>
          </div>

          {/* Price */}
          <div className="text-lg text-gray-700">
            <span className="font-semibold text-blue-600">${price}</span>
            {price && (
              <span className="ml-2 text-gray-500 line-through">
                ${price + 20}
              </span>
            )}
          </div>

          {/* Stock Availability */}
          <p className="text-gray-700">
            <span
              className={`font-semibold ${
                price ? "text-green-600" : "text-red-600"
              }`}
            >
              {price ? "In Stock" : "Out of Stock"}
            </span>
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center">
            <label
              htmlFor="quantity"
              className="mr-4 font-semibold text-gray-700"
            >
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              defaultValue="1"
              className="w-16 p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
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
      </div>
    </div>
  );
};

export default ServiceDetails;
