/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-async-client-component */
"use client";

import { getServicesDetails } from "@/services/getServices";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const AddToCart = ({ params }) => {
  const { data } = useSession();
  const [service, setService] = useState({});
  const [total, setTotal] = useState(0);

  const loadService = async () => {
    const details = await getServicesDetails(params.id);
    setService(details.service);

    // Calculate total amount
    const totalAmount = calculateTotal(details.service.price);
    setTotal(totalAmount);
  };

  const vatRate = 0.1; // 10% VAT
  const shippingCharge = 50;

  const calculateTotal = (price) => {
    const vatAmount = price * vatRate;
    const total = price + vatAmount + shippingCharge;
    return total.toFixed(2);
  };

  const { name, ratings, image, price, description, _id } = service;

  const handleBooking = async (event) => {
    event.preventDefault();
    // Add order placement logic here
  };

  useEffect(() => {
    loadService();
  }, [params]);

  return (
    <div className="checkout-container flex flex-col md:flex-row max-w-6xl mx-auto p-6 space-y-6 md:space-y-0">
      {/* Checkout Form */}
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Checkout</h1>
        <form onSubmit={handleBooking} className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Shipping Information
          </h2>

          <label className="block">
            Name:
            <input
              type="text"
              name="name"
              defaultValue={data?.user?.name}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              Email:
              <input
                type="email"
                name="email"
                defaultValue={data?.user?.email}
                required
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              />
            </label>
            <label className="block">
              Phone:
              <input
                type="tel"
                name="phone"
                required
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              />
            </label>
          </div>

          <label className="block">
            Address:
            <input
              type="text"
              name="address"
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </label>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <label className="block">
              City:
              <input
                type="text"
                name="city"
                required
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              />
            </label>
            <label className="block">
              Postal Code:
              <input
                type="text"
                name="postalCode"
                required
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              />
            </label>
            <label className="block">
              Country:
              <select
                name="country"
                required
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
              >
                <option value="" disabled>
                  Select country
                </option>
                <option value="bangladesh">Bangladesh</option>
                <option value="india">India</option>
                <option value="pakistan">Pakistan</option>
                <option value="usa">United States</option>
              </select>
            </label>
          </div>

          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Payment Method
          </h2>
          <label className="block">
            <select
              name="paymentMethod"
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="amrpay">AmrPay</option>
              <option value="bank-transfer">Bank Transfer</option>
            </select>
          </label>
        </form>
      </div>

      {/* Order Summary */}
      <div className="w-full md:w-80 bg-white shadow-lg rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Order Summary
        </h2>
        <div className="space-y-2">
          {description}
          <p>
            Product Amount - <span className="font-bold">${price}</span>
          </p>
          <p>
            VAT (10%) -{" "}
            <span className="font-bold">${(price * vatRate).toFixed(2)}</span>
          </p>
          <p>
            Shipping - <span className="font-bold">${shippingCharge}</span>
          </p>
          <p className="font-bold text-lg">
            Total Amount:{" "}
            <span className="text-blue-600">${total.toFixed(2)}</span>
          </p>
        </div>
        <button
          type="submit"
          className="w-full p-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
