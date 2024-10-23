import React from "react";

const ProductCardData = () => {
  return (
    <div>
      <h1>Hello, ProductCardData!</h1>
    </div>
  );
};

export default ProductCardData;
/* "use client";

import { TProductCardProps } from "@/types";
import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "@/redux/api/api";

const ProductCardData = () => {
  const { data, isLoading, error } = useGetProductsQuery(undefined);

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Failed to load products</p>;

  return (
    <div className="container">
      <h1 className="text-4xl font-bold my-10">All Products</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {data.map((product: TProductCardProps) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCardData;
 */
