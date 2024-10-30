/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";

const ProductCard = ({ product }) => {
  const { name, image, ratings, price, description, _id } = product || {};
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure style={{ width: "382px", height: "220px", overflow: "hidden" }}>
        <img
          src={image || "/default-profile.jpg"}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <p>Price: ${price}</p>
        <p>Rating: {ratings}</p>
        <div className="card-actions justify-center items-center text-center">
          <Link
            href={`/products/${_id}`}
            className="px-4 py-2 bg-sky-700 text-white text-sm lg:text-lg font-semibold rounded shadow-lg hover:bg-yellow-600 transition-transform duration-300 transform hover:scale-105"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
