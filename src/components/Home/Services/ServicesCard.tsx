/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const ServicesCard = ({ service }) => {
  const { name, image, price, description, _id } = service || {};
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={image || "/default-profile.jpg"} alt="" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <p>Price: ${price}</p>
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
