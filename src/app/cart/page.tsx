/* eslint-disable @next/next/no-img-element */
"use client";

import { useCart, parsePrice } from "@/components/Home/Cart/CartContext";
import Link from "next/link";

const CartPage = () => {
  const { cart, removeFromCart, clearCart, updateCartQuantity } = useCart();

  // Calculate total price and total items
  const totalPrice = cart.reduce(
    (acc, item) => acc + parsePrice(item.price) * item.quantity,
    0
  );

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const deliveryCharge = 69; // Delivery charge 69 Taka
  const totalAmount = totalPrice + deliveryCharge;

  const handleIncreaseQuantity = (id: string) => {
    updateCartQuantity(id, "increase");
  };

  const handleDecreaseQuantity = (id: string) => {
    updateCartQuantity(id, "decrease");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg text-center">
          Your cart is empty. Add items to start shopping!
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
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
                      ${parsePrice(item.price).toFixed(2)}
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

          {/* Cart Summary */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Cart Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between text-lg font-medium">
                <span>Total Items:</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between text-lg font-medium">
                <span>Total Price:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-medium">
                <span>Delivery Charge:</span>
                <span>${deliveryCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-medium">
                <span>Total Amount:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>

              <Link href="/checkout" className="block text-center bg-blue-600 text-white px-6 py-3 rounded-lg w-full mt-6 hover:bg-blue-700 transition-colors">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
