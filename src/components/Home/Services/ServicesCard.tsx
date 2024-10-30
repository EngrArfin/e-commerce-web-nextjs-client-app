/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState } from "react";

const ServicesCard = ({ service }) => {
  const { name, image, price, _id } = service || {};
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="card bg-base-100 w-56 md:w-64 shadow-lg m-3 overflow-hidden relative border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/services/${_id}`}>
        <figure
          style={{
            width: "140%",
            height: "160px",
            overflow: "hidden",
            cursor: "pointer",
            margin: "0 auto",
          }}
        >
          <img
            src={image || "/default-profile.jpg"}
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </figure>
      </Link>
      <div className="card-body p-4">
        <h2 className="card-title text-sm lg:text-md font-semibold">{name}</h2>
        <p className="text-sm text-gray-500">Price: ${price}</p>
      </div>

      {/* Add to Cart Button - Styled like photo */}
      {isHovered && (
        <Link
          href={`/cart/${_id}`}
          className="absolute top-2 left-2 bg-orange-500 text-white font-semibold py-1 px-4 rounded hover:bg-orange-600 transition-transform duration-300 transform hover:scale-105"
        >
          Add to Cart
        </Link>
      )}

      {/* View Details Button - Styled like photo */}
      <div
        className={`card-actions justify-center ${
          isHovered ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300 absolute bottom-4 w-full`}
      >
        <Link
          href={`/services/${_id}`}
          className="bg-blue-600 text-white py-2 px-5 rounded font-semibold hover:bg-yellow-500 transition-transform duration-300 transform hover:scale-105"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ServicesCard;

/* eslint-disable @next/next/no-img-element */

/* 
import Link from "next/link";

const ServicesCard = ({ service }) => {
  const { name, image, price, _id } = service || {};
  return (
    <div className="card bg-base-100 w-56 md:w-64 shadow-lg m-3 overflow-hidden">
      <Link href={`/services/${_id}`}>
        <figure
          style={{
            width: "140%",
            height: "160px", // Increased height
            overflow: "hidden",
            cursor: "pointer",
            margin: "0 auto",
          }}
        >
          <img
            src={image || "/default-profile.jpg"}
            alt={name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </figure>
      </Link>
      <div className="card-body p-4">
        <h2 className="card-title text-sm lg:text-md">{name}</h2>{" "}
        
        <p className="text-sm">Price: ${price}</p>
        <div className="card-actions justify-center text-center">
          <Link
            href={`/services/${_id}`}
            className="px-3 py-2 bg-sky-700 text-white text-sm font-semibold rounded hover:bg-yellow-600 transition-transform duration-300 transform hover:scale-105"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
 */
