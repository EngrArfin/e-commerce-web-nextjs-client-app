/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { getProducts } from "@/services/getServices";
import { useEffect, useState } from "react";
import { TProduct } from "@/types";
import { ProductCard } from "./ProductCard";

const ProductCardData = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        setError("Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <span className="text-xl text-gray-500">Loading services...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <span className="text-xl text-red-500">{error}</span>
      </div>
    );
  }

  return (
    <section className="py-12 px-6 mx-auto max-w-7xl relative">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-slate-800 tracking-tight">
        All Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))
        ) : (
          <div className="col-span-full text-center py-4 text-lg text-gray-500">
            No services available at the moment.
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCardData;
