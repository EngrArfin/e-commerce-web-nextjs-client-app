"use client";
import React, { useState } from "react";
import { useCart } from "@/components/Home/Cart/CartContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProductActionsProps {
  item: {
    _id: string;
    id?: number | string;
    name: string;
    description: string;
    price: number | string;
    image: string;
    ratings: number;
  };
}

export const ProductActions: React.FC<ProductActionsProps> = ({ item }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    // Cast item to any to make it match TProduct expected by CartContext
    addToCart(item as any, quantity);
    toast.success(`${item.name} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(item as any, quantity);
    router.push("/checkout");
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center space-x-4">
        <label htmlFor="quantity" className="font-semibold text-gray-700">
          Quantity:
        </label>
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white">
          <button
            type="button"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition w-10 text-center select-none"
          >
            -
          </button>
          <span className="px-5 py-2 text-gray-800 font-semibold w-12 text-center select-none">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((prev) => prev + 1)}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition w-10 text-center select-none"
          >
            +
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4 pt-2">
        <button
          onClick={handleBuyNow}
          className="px-6 py-3 bg-sky-600 text-white text-sm lg:text-lg font-semibold rounded-lg shadow-md hover:bg-sky-700 transition duration-300 transform hover:scale-105 active:scale-95"
        >
          Buy Now
        </button>
        <button
          onClick={handleAddToCart}
          className="px-6 py-3 bg-yellow-500 text-white text-sm lg:text-lg font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition duration-300 transform hover:scale-105 active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductActions;
