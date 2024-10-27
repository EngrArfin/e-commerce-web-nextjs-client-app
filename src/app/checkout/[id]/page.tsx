/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-async-client-component */
"use client";

import { getServicesDetails } from "@/services/getServices";
import { useSession } from "next-auth/react";
import { headers } from "next/headers";
import { useEffect, useState } from "react";

interface Service {
  name?: string;
  ratings?: number;
  image?: string;
  price?: number;
  description?: string;
  _id?: string;
}

interface CheckoutProps {
  params: {
    id: string;
  };
}

const Checkout: React.FC<CheckoutProps> = ({ params }) => {
  const { data } = useSession();
  const [service, setService] = useState<Service>({});

  const loadService = async () => {
    const details = await getServicesDetails(params.id);
    setService(details.service);
  };
  const { _id, name, description, image, price } = service;

  const handleBooking = async (event: React.FormEvent) => {
    event.preventDefault();
    const newBooking = {
      email: data?.user?.email,
      name: data?.user?.name,
      address: event.target.address.value,
      phone: event.target.phone.value,
      date: event.target.date.value,
      productName: name,
      ProductID: _id,
      price: price,
    };
    const resp = await fetch("http://localhost:3000/checkout/api/new-booking", {
      method: "POST",
      body: JSON.stringify(newBooking),
      headers: {
        "content-type": "application/json",
      },
    });
    console.log(resp);
  };

  useEffect(() => {
    loadService();
  }, [params]);

  return (
    <div className="checkout-container flex flex-col md:flex-row max-w-6xl mx-auto p-6 space-y-6 md:space-y-0">
      {/* Checkout Form */}
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Checkout</h1>
        <form onSubmit={handleBooking}>
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Shipping Information
            </h2>
            <h2 className="text-2xl font-semibold mb-4 text-red-900">
              Total Amount:{" "}
              <span className="text-green-900">{service.price}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                defaultValue={data?.user?.name}
                type="text"
                name="name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Date</span>
              </label>
              <input
                defaultValue={new Date().getDate()}
                type="date"
                name="date"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                defaultValue={data?.user?.email}
                type="text"
                name="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Due amount</span>
              </label>
              <input
                defaultValue={price}
                readOnly
                type="text"
                name="price"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                required
                type="text"
                name="phone"
                placeholder="Your Phone"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Present Address</span>
              </label>
              <input
                type="text"
                name="address"
                placeholder="Your Address"
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="form-control mt-6">
            <input
              className="btn btn-primary btn-block"
              type="submit"
              value="Order Confirm"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-async-client-component */
/* "use client";

import { getServicesDetails } from "@/services/getServices";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Checkout = ({ params }) => {
  const { data } = useSession();
  const [service, setService] = useState({});

  const loadService = async () => {
    const currentDateTime = new Date();
    const details = await getServicesDetails(params.id);
    setService(details.service);
  };
  const { name, ratings, image, price, description, _id } = service;

  const handleBooking = async (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    loadService();
  }, [params]);

  return (
    <div className="checkout-container flex flex-col md:flex-row max-w-6xl mx-auto p-6 space-y-6 md:space-y-0">
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Checkout</h1>
        <form onSubmit={handleBooking} className="space-y-6">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Shipping Information
            </h2>
            <h2 className="text-2xl font-semibold mb-4 text-red-900">
              Total Amount: <span className="text-green-900">{price}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div style={{ fontFamily: "Arial" }}>
              <h1>Select a Date</h1>

              <label className="block border border-gray-300 rounded-md shadow-sm p-3 flex items-center max-w-xs">
                <span className="text-gray-700">
                  Date: {new Date().toLocaleDateString()}
                </span>
                <span className="ml-2 text-xl cursor-pointer">📅</span>
              </label>
            </div>
          </div>

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
          <label className="block">
            Address:
            <input
              type="text"
              name="address"
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </label>

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
          <button
            type="submit"
            className="w-full p-4 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
 */
