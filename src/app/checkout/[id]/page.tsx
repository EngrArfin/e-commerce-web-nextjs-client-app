/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { getServicesDetails, getProductsDetails } from "@/services/getServices"; // Assuming getServicesDetails is defined in this file
import { useSession } from "next-auth/react";
import { useEffect, useState, use } from "react";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

interface Service {
  name?: string;
  ratings?: number;
  image?: string;
  price?: number;
  description?: string;
  _id?: string;
}

interface ServiceDetailsResponse {
  service: Service;
}

interface BookingResponse {
  message: string;
  status: string;
}

interface CheckoutProps {
  params: Promise<{
    id: string;
  }>;
}

const Checkout: React.FC<CheckoutProps> = ({ params }) => {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const { data } = useSession();
  const stripe = useStripe();
  const elements = useElements();
  const [service, setService] = useState<Service>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCashOnDelivery, setIsCashOnDelivery] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({
    name: data?.user?.name || "",
    email: data?.user?.email || "",
    phone: "",
    address: "",
    date: new Date().toISOString().split("T")[0],
  });

  const loadService = async (id: string) => {
    try {
      const response = await getServicesDetails(id);
      const details = response as unknown as ServiceDetailsResponse;
      if (details && details.service) {
        setService(details.service);
      } else {
        // Fallback to product details if service not found
        const productResponse = await getProductsDetails(id);
        const productDetails = productResponse as any;
        if (productDetails && productDetails.product) {
          setService(productDetails.product);
        } else {
          toast.error("Item not found!");
        }
      }
    } catch (error) {
      console.error("Failed to load item details:", error);
      // Try fetching as product anyway in case getServicesDetails threw error
      try {
        const productResponse = await getProductsDetails(id);
        const productDetails = productResponse as any;
        if (productDetails && productDetails.product) {
          setService(productDetails.product);
          return;
        }
      } catch (innerError) {
        console.error("Failed fallback to product details:", innerError);
      }
      toast.error("Something went wrong! Could not load details.");
    }
  };

  const { _id, name, price } = service || {};

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
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout/api/new-booking`,
        newBooking,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const response = resp.data as BookingResponse;
      toast.success(response?.message);
    } catch (error: any) {
      console.error(error);
      toast.error("Booking failed. Please try again.");
    }
  };

  const handlePayment = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe is not properly initialized.");
      return;
    }

    setIsProcessing(true);

    try {
      const paymentResponse = await axios.post("/api/create-payment-intent", {
        amount: price,
      });

      const clientSecret = (paymentResponse.data as any).clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (result.error) {
        toast.error(result.error.message || "Payment failed.");
      } else if (result.paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");
      }
    } catch (error: any) {
      console.error("Payment failed:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchService = async () => {
      if (id) {
        await loadService(id);
      }
    };
    fetchService();
  }, [id]);

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

        <form onSubmit={isCashOnDelivery ? handleBooking : handlePayment}>
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Shipping Information
            </h2>
            <h2 className="text-2xl font-semibold mb-4 text-red-900">
              Total Amount: <span className="text-green-900">${price}</span>
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
                <span className="label-text">Address</span>
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
          {!isCashOnDelivery && (
            <div className="my-4">
              <CardElement />
            </div>
          )}
          <button
            type="submit"
            className={`btn ${
              isProcessing ? "btn-disabled" : "btn-primary"
            } w-full`}
          >
            {isProcessing
              ? "Processing..."
              : isCashOnDelivery
              ? "Confirm Order"
              : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

const StripeWrapper: React.FC<CheckoutProps> = ({ params }) => (
  <Elements stripe={stripePromise}>
    <Checkout params={params} />
  </Elements>
);

export default StripeWrapper;

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

/* 
"use client";
import axios from "axios";
import { getServicesDetails } from "@/services/getServices"; // Assuming getServicesDetails is defined in this file
import { useSession } from "next-auth/react";
import Link from "next/link";
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

interface ServiceDetailsResponse {
  service: Service;
}

interface BookingResponse {
  message: string;
  status: string;
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
    date: new Date().toISOString().split("T")[0],
  });

  const loadService = async (id: string) => {
    try {
      const response = await getServicesDetails(id);

      const details = response as unknown as ServiceDetailsResponse;

      setService(details.service);
    } catch (error) {
      console.error("Failed to load service details:", error);
      toast.error("Something went wrong! Could not load service details.");
    }
  };

  const { _id, name, price } = service || {};

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
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout/api/new-booking`,
        newBooking,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const response = resp.data as BookingResponse;

      toast.success(response?.message);
    } catch (error: any) {
      console.error(error);
      toast.error("Booking failed. Please try again.");
    }
  };

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
 */
