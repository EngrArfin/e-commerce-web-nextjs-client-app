/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-async-client-component */
"use client";

import { getServicesDetails } from "@/services/getServices";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState, FormEvent } from "react";
import { toast } from "react-toastify";

// Define the types
interface Service {
  name?: string;
  image?: string;
  price?: number;
  _id?: string;
}

interface AddToCartProps {
  params: {
    id: string;
  };
}

const AddToCart = ({ params }: AddToCartProps) => {
  const { data } = useSession();
  const [service, setService] = useState<Service>({});
  const [total, setTotal] = useState<number>(0);

  // Function to load service details
  const loadService = async () => {
    const details = await getServicesDetails(params.id);
    setService(details.service);

    // Calculate total amount
    const totalAmount = calculateTotal(details.service.price || 0);
    setTotal(totalAmount);
  };

  const vatRate = 0.1; // 10% VAT
  const shippingCharge = 50;

  // Calculate total price
  const calculateTotal = (price: number): number => {
    const vatAmount = price * vatRate;
    return price + vatAmount + shippingCharge;
  };

  const { name, image, price = 0, _id } = service;

  // Function to handle booking form submission
  const handleBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement & {
      address: { value: string };
      phone: { value: string };
      date: { value: string };
    };

    const newBooking = {
      email: data?.user?.email,
      name: data?.user?.name,
      address: form.address.value,
      phone: form.phone.value,
      date: form.date.value,
      productName: name,
      ProductID: _id,
      price,
    };

    const resp = await fetch("http://localhost:3000/checkout/api/new-booking", {
      method: "POST",
      body: JSON.stringify(newBooking),
      headers: {
        "content-type": "application/json",
      },
    });

    const response = await resp.json();
    toast.success(response.message);
    form.reset(); // This works because `form` is explicitly typed as an HTMLFormElement
  };

  useEffect(() => {
    loadService();
  }, [params]);

  return (
    <div className="checkout-container flex flex-col md:flex-row max-w-6xl mx-auto p-6 space-y-6 md:space-y-0">
      {/* Checkout Form */}
      <div className="flex flex-col space-y-4 md:w-2/3">
        <div className="bg-white rounded-lg shadow-lg p-6 flex items-center space-x-6 hover:shadow-2xl transition-shadow duration-300">
          <img
            src={image || ""}
            alt={name || "Service Image"}
            className="w-24 h-24 rounded-lg object-cover border border-gray-200"
          />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
            <p className="text-gray-500 text-sm">Available: In stock</p>
            <h3 className="text-lg text-blue-600 font-semibold mt-2">
              ${price}
            </h3>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 bg-gray-200 rounded-full text-gray-800 hover:bg-gray-300 transition duration-200">
              -
            </button>
            <span className="text-lg font-semibold">1</span>
            <button className="p-2 bg-gray-200 rounded-full text-gray-800 hover:bg-gray-300 transition duration-200">
              +
            </button>
            <button className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition duration-200">
              🗑️
            </button>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="w-full md:w-80 bg-white shadow-lg rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Order Summary
        </h2>
        <div className="space-y-2">
          {data?.user?.name}
          {data?.user?.email}
          <hr />
          <p>
            Product Amount - <span className="font-bold">${price}</span>
          </p>
          <p>
            VAT (10%) - <span className="font-bold">${price * vatRate}</span>
          </p>
          <p>
            Shipping - <span className="font-bold">${shippingCharge}</span>
          </p>
          <p className="font-bold text-lg">
            Total Amount: <span className="text-blue-600">${total}</span>
          </p>
        </div>
        <Link
          href={`/checkout/${_id}`}
          className="w-full p-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Place Order
        </Link>
      </div>
    </div>
  );
};

export default AddToCart;
