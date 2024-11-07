/* eslint-disable @next/next/no-async-client-component */
"use client";

import { TProductCardProps } from "@/types";
import ProductCard from "./ProductCard";
import { getProducts } from "@/services/getServices";

const ProductCardData = async () => {
  const { products } = await getProducts();

  return (
    <div className="container">
      <h1 className="text-4xl font-bold my-10">All Product </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10">
        {products.length > 0 &&
          products?.map((product: TProductCardProps) => (
            <ProductCard product={product} key={product._id} />
          ))}
      </div>
    </div>
  );
};

export default ProductCardData;
