/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import axios from "axios";
import { getServicesDetails } from "@/services/getServices"; // Assuming getServicesDetails is defined in this file
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Define the Service type
interface Service {
  name?: string;
  ratings?: number;
  image?: string;
  price?: number;
  description?: string;
  _id?: string;
}

// Define the ServiceDetailsResponse interface to specify the structure of the response
interface ServiceDetailsResponse {
  service: Service;
}

// Define the BookingResponse interface to specify the structure of the response
interface BookingResponse {
  message: string;
  status: string; // Adjust based on your actual API response
}

interface CheckoutProps {
  params: {
    id: string;
  };
}

const Checkout: React.FC<CheckoutProps> = ({ params }) => {
  const { data } = useSession();
  const [service, setService] = useState<Service>({});
  const [isCashOnDelivery, setIsCashOnDelivery] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({
    name: data?.user?.name || "",
    email: data?.user?.email || "",
    phone: "",
    address: "",
    date: new Date().toISOString().split("T")[0], // Default to today's date
  });

  // Load service details by id
  const loadService = async (id: string) => {
    try {
      // Fetch service details
      const response = await getServicesDetails(id);

      // Ensure you're safely casting the response to the expected type
      const details = response as ServiceDetailsResponse;

      // Now you can confidently set the state
      setService(details.service);
    } catch (error) {
      console.error("Failed to load service details:", error);
      toast.error("Something went wrong! Could not load service details.");
    }
  };

  const { _id, name, price } = service;

  // Handle booking form submission
  const handleBooking = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newBooking = {
      ...formData,
      productName: name,
      ProductID: _id,
      price: price,
      paymentMethod: isCashOnDelivery ? "Cash on Delivery" : "Online Payment",
    };

    try {
      // Making the POST request to the backend to create a new booking
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout/api/new-booking`,
        newBooking,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Ensure the response is typed as BookingResponse
      const response = resp.data as BookingResponse;

      // Show success message using toast
      toast.success(response?.message);
    } catch (error: any) {
      // Handle error and display error message
      console.error(error);
      toast.error("Booking failed. Please try again.");
    }
  };

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Fetch service details on component mount or when params change
  useEffect(() => {
    const fetchService = async () => {
      if (params) {
        await loadService(params.id);
      }
    };
    fetchService();
  }, [params]);

  return (
    <div className="checkout-container flex flex-col md:flex-row max-w-6xl mx-auto p-6 space-y-6 md:space-y-0">
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Checkout</h1>
        <div className="flex items-center mb-4">
          <label className="cursor-pointer">
            <span className="mr-2">Online Payment</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={isCashOnDelivery}
              onChange={() => setIsCashOnDelivery(!isCashOnDelivery)}
            />
            <span className="ml-2"> Cash on Delivery</span>
          </label>
        </div>

        <form onSubmit={handleBooking}>
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Shipping Information
            </h2>
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
          <div className="form-control mt-6">
            <div className="form-control mt-6">
              {isCashOnDelivery ? (
                <button type="submit" className="btn btn-secondary btn-block">
                  Confirm Order
                </button>
              ) : (
                <Link href={`/payment/${_id}`}>
                  <button className="btn btn-primary btn-block">
                    Proceed to Payment
                  </button>
                </Link>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
