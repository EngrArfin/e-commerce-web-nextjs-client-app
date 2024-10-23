"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import React from "react";

// Mock Data (You can replace this with real API data)
const salesData = [
  { name: "Jan", sales: 300 },
  { name: "Feb", sales: 600 },
  { name: "Mar", sales: 900 },
  { name: "Apr", sales: 1200 },
  { name: "May", sales: 800 },
  { name: "Jun", sales: 1100 },
];

const userGrowthData = [
  { name: "Jan", users: 50 },
  { name: "Feb", users: 80 },
  { name: "Mar", users: 130 },
  { name: "Apr", users: 200 },
  { name: "May", users: 250 },
  { name: "Jun", users: 300 },
];

const AdminDashboard = () => {
  const totalOrders = 120; // Fetch this from server
  const totalSales = 5000; // Fetch this from server
  const totalUsers = 80; // Fetch this from server

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-2xl font-bold">Total Orders</h2>
          <p className="text-xl">{totalOrders}</p>
        </div>
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-2xl font-bold">Total Sales</h2>
          <p className="text-xl">${totalSales}</p>
        </div>
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-2xl font-bold">Total Users</h2>
          <p className="text-xl">{totalUsers}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-2 gap-4">
        {/* Sales Line Chart */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Sales Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth Bar Chart */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-2xl font-bold mb-4">User Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
