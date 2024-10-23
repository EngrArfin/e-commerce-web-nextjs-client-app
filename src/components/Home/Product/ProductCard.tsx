import React from "react";

const ProductCard = () => {
  return (
    <div>
      <h1>Hello, ProductCard!</h1>
    </div>
  );
};

export default ProductCard;
/* "use client";
import { TProductCardProps } from "@/types";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/feature/productSlice";

const ProductCard = ({ product }: { product: TProductCardProps }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <Image
          height="200"
          width="350"
          src={product?.image}
          alt={product?.productName}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product?.productName}</h2>
        <p>Price: ${product?.price}</p>
        <p>Available: {product?.availableQuantity}</p>
        <div className="card-actions justify-center items-center text-center">
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
 */
