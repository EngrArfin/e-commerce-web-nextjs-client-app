/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import axios from "axios";
import { getServicesDetails } from "@/services/getServices";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

// Define the type for the response data
interface PaymentResponse {
  message: string;
  // You can add other properties here as needed
}

const Payment: React.FC<CheckoutProps> = ({ params }) => {
  const { data } = useSession();
  const [service, setService] = useState<Service>({});
  const [formData, setFormData] = useState<any>({
    name: data?.user?.name || "",
    email: data?.user?.email || "",
    phone: "",
    address: "",
    date: new Date().toISOString().split("T")[0],
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // Load service details
  const loadService = async () => {
    const details = await getServicesDetails(params.id);
    setService(details.service);
  };

  const { _id, name, price } = service;

  // Handle booking submission
  const handleBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newBooking = {
      ...formData,
      productName: name,
      productID: _id,
      price: price,
      paymentMethod: "Online Payment",
    };

    try {
      const resp = await axios.post<PaymentResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/payment/api/paymenting`, // Use POST method
        newBooking, // Send the newBooking as request body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Success toast notification
      toast.success(resp.data?.message || "Payment successful!");
    } catch (error) {
      // Error handling and failure toast notification
      toast.error("Payment failed. Please try again.");
      console.error(error);
    }
  };

  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch service details when component mounts
  useEffect(() => {
    loadService();
  }, [params]);

  return (
    <div className="checkout-container flex flex-col md:flex-row max-w-6xl mx-auto p-6 space-y-6 md:space-y-0">
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Payment AMR Pay
        </h1>
        <form onSubmit={handleBooking}>
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Infor</h2>
            <h2 className="text-2xl font-semibold mb-4 text-red-900">
              Total Amount: <span className="text-green-900">{price}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                value={formData.name}
                onChange={handleChange}
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
                value={formData.date}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
                type="text"
                name="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Due Amount</span>
              </label>
              <input
                value={price}
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
                value={formData.phone}
                onChange={handleChange}
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
                value={formData.address}
                onChange={handleChange}
                type="text"
                name="address"
                placeholder="Your Address"
                className="input input-bordered"
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold mt-6 text-gray-700">
            Payment Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Card Number</span>
              </label>
              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                className="input input-bordered"
                required
                value={formData.cardNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Expiry Date</span>
              </label>
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                className="input input-bordered"
                required
                value={formData.expiryDate}
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">CVV</span>
              </label>
              <input
                type="text"
                name="cvv"
                placeholder="123"
                className="input input-bordered"
                required
                value={formData.cvv}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary btn-block" type="submit">
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
