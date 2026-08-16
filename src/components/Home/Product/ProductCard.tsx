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
        <h2 className="text-lg font-semibold text-slate-800 truncate">
          {product.name}
        </h2>
        <p className="text-slate-500 text-sm mt-1 line-clamp-2">
          {product.description || "No description available."}
        </p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-orange-600">
            {product.price}
          </p>
          <span className="flex items-center text-yellow-500 text-sm">
            {"⭐".repeat(product.ratings || 0)}
          </span>
        </div>
        <div className="mt-4">
          <button
            onClick={() => addToCart(product)}
            className="w-full text-center bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg text-sm py-2 px-4 transition-all duration-300 active:scale-95 shadow-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
