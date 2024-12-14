/* eslint-disable @next/next/no-img-element */
"use client";

import { useCart } from "@/components/Home/Cart/CartContext";

const CartItems = () => {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useCart();

  // Handle increasing quantity
  const handleIncreaseQuantity = (id: string) => {
    updateCartQuantity(id, "increase");
  };

  // Handle decreasing quantity
  const handleDecreaseQuantity = (id: string) => {
    updateCartQuantity(id, "decrease");
  };

  return (
    <div className="lg:col-span-2">
      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex items-center border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
          >
            {/* Product Image */}
            <img
              src={item.image || "/default-profile.jpg"}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />

            {/* Product Details */}
            <div className="ml-4 flex-1">
              <h2 className="text-lg font-semibold text-gray-800 truncate">
                {item.name}
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                ${parseFloat(item.price.toString()).toFixed(2)}
              </p>

              {/* Quantity Controls */}
              <div className="flex items-center mt-2 space-x-2">
                <button
                  onClick={() => handleDecreaseQuantity(item._id)}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition"
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="px-3 py-1 border border-gray-300 rounded text-gray-800">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleIncreaseQuantity(item._id)}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition"
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-600 text-sm hover:underline mt-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Clear Cart Button */}
      <button
        onClick={clearCart}
        className="bg-red-600 text-white px-6 py-3 mt-8 rounded-lg hover:bg-red-700 transition-colors w-full"
      >
        Clear Cart
      </button>
    </div>
  );
};

export default CartItems;
