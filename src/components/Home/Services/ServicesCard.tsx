/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const ServicesCard = ({ service }) => {
  const { name, image, price, description, _id } = service || {};
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

        <p>Price: ${price}</p>
        <div className="card-actions justify-center items-center text-center">
          <Link href={`/services/${_id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;

/* 

 */
