// src/components/ServiceDetails.tsx
import { getServicesDetails } from "@/services/getServices";
import { TServiceDetails } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface ServiceDetailsProps {
  params: { id: string };
}

const ServiceDetails = async ({ params }: ServiceDetailsProps) => {
  const details: TServiceDetails = await getServicesDetails(params.id);
  const { title, ratings, img, price, description, _id } = details;

  return (
    <div className="container mx-auto p-6">
      <hr className="mb-6" />
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Image Section */}
        <figure className="flex justify-center">
          <Image
            src={img || "/default-profile.jpg"}
            alt={title}
            className="rounded-lg shadow-lg object-cover"
            style={{ height: "400px", width: "100%", maxWidth: "500px" }}
          />
        </figure>

        {/* Details Section */}
        <div className="flex flex-col space-y-4">
          {/* Title */}
          <h2 className="text-3xl font-semibold text-gray-900">{title}</h2>
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
            <button className="px-5 py-3 bg-sky-700 text-white text-sm lg:text-lg font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition-transform duration-300 transform hover:scale-105">
              Buy Now
            </button>
            <Link
              href={`/cart/${_id}`}
              className="px-5 py-3 bg-sky-700 text-white text-sm lg:text-lg font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition-transform duration-300 transform hover:scale-105"
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
