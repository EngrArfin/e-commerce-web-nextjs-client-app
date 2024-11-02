/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define User type for better type safety
interface User {
  _id: string;
  image: string;
  name: string;
  email: string;
}

const Page = () => {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [bookings, setBookings] = useState([]);

  // Function to load user data
  const loadData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/admin/user-managements/api/${session?.user?.id}`
      );
      if (response.ok) {
        const data = await response.json();
        setUsers(data?.allUsers || []);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  // Function to load booking data
  const loadBooking = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/my-bookings/api/${session?.user?.email}`
      );
      if (response.ok) {
        const data = await response.json();
        setBookings(data?.myBookings || []);
      } else {
        console.error("Failed to fetch bookings data");
      }
    } catch (error) {
      console.error("Error loading bookings:", error);
    }
  };

  // Load data when component mounts or session changes
  useEffect(() => {
    if (session) {
      loadData();
      loadBooking();
    }
  }, [session]);

  // Chart data using fetched data
  const salesData = {
    labels: ["Total Users", "Total Orders", "Total Sales"],
    datasets: [
      {
        label: "Statistics",
        data: [users.length, bookings.length, 10], // Update with real-time data if available
        backgroundColor: ["#4F46E5", "#10B981", "#F59E0B"],
      },
    ],
  };

  const salesOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div className="overflow-x-auto pt-2">
      <div>
        <h2 className="text-2xl font-semibold text-center mb-4">
          E-commerce Sell Details with Chart
        </h2>
      </div>
      {/* Display metric cards and chart */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-2">
        {/* Total Users Card */}
        <div className="p-6 bg-sky-100 rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-sky-600">Total Users</h3>
          <p className="text-3xl font-bold">{users.length}</p>
        </div>

        {/* Total Orders Card */}
        <div className="p-6 bg-sky-100 rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-sky-600">Total Orders</h3>
          <p className="text-3xl font-bold">{bookings.length}</p>
        </div>

        {/* Total Sales Card */}
        <div className="p-6 bg-sky-100 rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-sky-600">Total Sales</h3>
          <p className="text-3xl font-bold">50</p>{" "}
          {/* Replace with dynamic data if available */}
        </div>
      </div>

      {/* Sales Chart */}
      <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-1"></h2>
        <Bar data={salesData} options={salesOptions} />
      </div>
    </div>
  );
};

export default Page;
