/* eslint-disable @next/next/no-img-element */
// src/components/ProductCard.tsx

import { useCart } from "../Cart/CartContext";
import { TProduct } from "@/types"; // Ensure TProduct is imported correctly

interface ProductCardProps {
  product: TProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-52 overflow-hidden">
        <img
          src={product.image || "/default-profile.jpg"}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-medium text-gray-900 truncate">
          {product.name}
        </h2>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {product.description || "No description available."}{" "}
          {/* Fallback if description is undefined */}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm text-gray-700 mr-2">
            <span className=" text-sm text-orange-600">{product.price}</span>
          </p>
          <span className="flex items-center text-yellow-500">
            {"⭐".repeat(product.ratings || 0)} {/* Handle undefined ratings */}
          </span>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="block mt-4 text-center text-white bg-yellow-500 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-600 font-medium rounded-lg text-sm px-4 py-2 transition-colors duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
