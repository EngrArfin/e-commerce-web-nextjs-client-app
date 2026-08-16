"use client";

import React, { useState, useEffect } from "react";
import { useCart, parsePrice } from "@/components/Home/Cart/CartContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

const CheckOutPage = () => {
  const { cart, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isCashOnDelivery, setIsCashOnDelivery] = useState<boolean>(true);
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    phone: "",
    address: "",
    date: new Date().toISOString().split("T")[0],
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // Autofill session details when they load
  useEffect(() => {
    if (session?.user) {
      setFormData((prev: any) => ({
        ...prev,
        name: session.user.name || prev.name,
        email: session.user.email || prev.email,
      }));
    }
  }, [session]);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto p-8 text-center mt-20">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-6">Add products to your cart to proceed with checkout.</p>
        <Link href="/" className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition">
          Return to Shop
        </Link>
      </div>
    );
  }

  // Calculations
  const subtotal = cart.reduce(
    (acc, item) => acc + parsePrice(item.price) * item.quantity,
    0
  );
  const deliveryCharge = 69;
  const totalAmount = subtotal + deliveryCharge;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast.error("Please fill in all required shipping fields.");
      return;
    }

    if (!isCashOnDelivery && (!formData.cardNumber || !formData.expiryDate || !formData.cvv)) {
      toast.error("Please fill in all card details for Online Payment.");
      return;
    }

    setIsProcessing(true);

    try {
      // Loop through all cart items and create a booking for each
      for (const item of cart) {
        const newBooking = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          date: formData.date,
          productName: item.name,
          ProductID: item._id,
          price: (parsePrice(item.price) * item.quantity).toString(),
          paymentMethod: isCashOnDelivery ? "Cash on Delivery" : "Online Payment",
        };

        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/checkout/api/new-booking`,
          newBooking,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      toast.success(isCashOnDelivery ? "Order Placed Successfully!" : "Payment & Order Successful!");
      clearCart();
      router.push("/my-bookings");
    } catch (error: any) {
      console.error("Booking error:", error);
      toast.error("Order processing failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-16">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Shipping Form & Payment Section */}
        <div className="lg:col-span-7 bg-white shadow-lg rounded-xl border border-slate-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-slate-800 border-b pb-2">
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Name</span>
                  </label>
                  <input
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    name="name"
                    required
                    className="input input-bordered w-full"
                    placeholder="Your Full Name"
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>
                  <input
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    name="email"
                    required
                    className="input input-bordered w-full"
                    placeholder="Your Email Address"
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Phone</span>
                  </label>
                  <input
                    value={formData.phone}
                    onChange={handleChange}
                    type="text"
                    name="phone"
                    required
                    className="input input-bordered w-full"
                    placeholder="Your Phone Number"
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-medium">Shipping Date</span>
                  </label>
                  <input
                    value={formData.date}
                    onChange={handleChange}
                    type="date"
                    name="date"
                    required
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div className="form-control w-full mt-4">
                <label className="label">
                  <span className="label-text font-medium">Present Address</span>
                </label>
                <textarea
                  value={formData.address}
                  onChange={handleChange}
                  name="address"
                  required
                  rows={3}
                  className="textarea textarea-bordered w-full"
                  placeholder="Your Full Address"
                />
              </div>
            </div>

            {/* Payment Options */}
            <div className="pt-4">
              <h2 className="text-2xl font-semibold mb-4 text-slate-800 border-b pb-2">
                Payment Method
              </h2>
              <div className="flex gap-6 mb-6">
                <label className="flex items-center gap-2 cursor-pointer border rounded-lg p-3 flex-1 hover:bg-slate-50 transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    className="radio radio-primary"
                    checked={isCashOnDelivery}
                    onChange={() => setIsCashOnDelivery(true)}
                  />
                  <div>
                    <span className="font-semibold block text-slate-800">Cash on Delivery</span>
                    <span className="text-xs text-slate-500">Pay when order arrives</span>
                  </div>
                </label>

                <label className="flex items-center gap-2 cursor-pointer border rounded-lg p-3 flex-1 hover:bg-slate-50 transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    className="radio radio-primary"
                    checked={!isCashOnDelivery}
                    onChange={() => setIsCashOnDelivery(false)}
                  />
                  <div>
                    <span className="font-semibold block text-slate-800">Online Payment</span>
                    <span className="text-xs text-slate-500">Secure credit card checkout</span>
                  </div>
                </label>
              </div>

              {/* Online Payment Card Form */}
              {!isCashOnDelivery && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4 animate-fade-in">
                  <h3 className="font-semibold text-slate-700">Card details</h3>
                  <div className="form-control w-full">
                    <label className="label py-1">
                      <span className="label-text text-xs font-semibold">Card Number</span>
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="input input-bordered w-full"
                      value={formData.cardNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label py-1">
                        <span className="label-text text-xs font-semibold">Expiry Date</span>
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        className="input input-bordered"
                        value={formData.expiryDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-control">
                      <label className="label py-1">
                        <span className="label-text text-xs font-semibold">CVV</span>
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        placeholder="123"
                        className="input input-bordered"
                        value={formData.cvv}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-4 text-white font-bold rounded-lg transition duration-200 shadow-md ${
                isProcessing
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-sky-600 hover:bg-sky-700 active:scale-[0.99]"
              }`}
            >
              {isProcessing
                ? "Processing..."
                : isCashOnDelivery
                ? "Confirm Order"
                : `Pay Now ($${totalAmount.toFixed(2)})`}
            </button>
          </form>
        </div>

        {/* Order Summary Side panel */}
        <div className="lg:col-span-5 bg-slate-50 rounded-xl border border-slate-200 p-6 h-fit">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Order Summary</h2>
          <div className="divide-y divide-slate-200">
            {cart.map((item) => (
              <div key={item._id} className="py-4 flex gap-4 items-center">
                <img
                  src={item.image || "/default-profile.jpg"}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg border bg-white"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-800 truncate text-sm">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Qty: {item.quantity} × ${parsePrice(item.price).toFixed(2)}
                  </p>
                </div>
                <div className="font-semibold text-slate-800 text-sm">
                  ${(parsePrice(item.price) * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 mt-4 pt-4 space-y-2">
            <div className="flex justify-between text-slate-600 text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-slate-600 text-sm">
              <span>Delivery Charge</span>
              <span>${deliveryCharge.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-800 font-bold text-lg pt-2 border-t border-dashed">
              <span>Total Amount</span>
              <span className="text-sky-600">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
