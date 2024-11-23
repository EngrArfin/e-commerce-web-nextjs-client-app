/* eslint-disable react-hooks/exhaustive-deps */
"use client";

/* import axios from "axios"; */
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Booking {
  date?: string;
  phone?: string;
  address?: string;
  price: number;
}

const Page = ({ params }: { params: { id: string } }) => {
  const { data } = useSession();
  const [booking, setBooking] = useState<Booking | null>(null);

  const loadBooking = async () => {
    const bookingDetail = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/api/booking/${params.id}`
    );
    const data = await bookingDetail.json();
    setBooking(data.data);
  };

  const handleUpdateBooking = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const updatedBooking = {
      date: event.currentTarget.date.value,
      phone: event.currentTarget.phone.value,
      address: event.currentTarget.address.value,
    };
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/my-bookings/api/booking/${params.id}`,
      {
        method: "PATCH",
        body: JSON.stringify(updatedBooking),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    if (resp.status === 200) {
      toast.success("Updated Successfully");
      loadBooking();
    }
  };

  useEffect(() => {
    loadBooking();
  }, [params.id]);

  return (
    <div className="checkout-container flex flex-col md:flex-row max-w-6xl mx-auto p-6 space-y-6 md:space-y-0">
      <div className="flex-1">
        <form onSubmit={handleUpdateBooking}>
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">
              Edit Info
            </h2>
            <h2 className="text-2xl font-semibold mb-4 text-red-900">
              Total Amount:{" "}
              <span className="text-green-900">{booking?.price}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                defaultValue={data?.user?.name || ""}
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
                defaultValue={booking?.date}
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
                defaultValue={data?.user?.email || ""}
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
                defaultValue={booking?.price}
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
                defaultValue={booking?.phone}
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
                defaultValue={booking?.address}
                type="text"
                name="address"
                placeholder="Your Address"
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="form-control mt-6">
            <input
              className="btn bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded-lg shadow-lg hover:shadow-inner transition-shadow duration-300 ease-in-out transform hover:scale-105"
              type="submit"
              value="Edit Done"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
