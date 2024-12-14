"use client";

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
  tax: number;
  totalAmount: number;
}

const CartSummary = ({
  totalItems,
  totalPrice,
  tax,
  totalAmount,
}: CartSummaryProps) => {
  return (
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
          <span>Tax (10%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-medium">
          <span>Total Amount:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full mt-6 hover:bg-blue-700 transition-colors">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
