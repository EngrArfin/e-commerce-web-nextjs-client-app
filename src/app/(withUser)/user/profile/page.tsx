/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";

const ProfilePage = () => {
  const orders = [
    {
      id: "123456",
      date: "2024-12-01",
      total: "$120.00",
      status: "Delivered",
    },
    {
      id: "789012",
      date: "2024-11-15",
      total: "$85.50",
      status: "In Progress",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <DashboardCard
            title="My Orders"
            value="View Orders"
            icon="📦"
            link="/user/my-bookings"
          />
          <DashboardCard
            title="Browse Products"
            value="Start Shopping"
            icon="🛒"
            link="/products"
          />
          <DashboardCard
            title="Account Settings"
            value="Manage Profile"
            icon="⚙️"
            link="/account-settings"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <OrderHistory orders={orders} />
          <AccountSettings />
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({
  title,
  value,
  icon,
  link,
}: {
  title: string;
  value: string;
  icon: string;
  link: string;
}) => (
  <div className="bg-sky-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
    <div className="flex items-center space-x-4">
      <span className="text-3xl">{icon}</span>
      <div>
        <h4 className="text-xl font-semibold">{title}</h4>
        <p className="text-lg">{value}</p>
      </div>
    </div>
    <Link href={link} className="text-white text-xl hover:underline">
      ➡️
    </Link>
  </div>
);

// Order History Section
const OrderHistory = ({ orders }: { orders: Array<any> }) => (
  <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Order History</h3>
    {orders.length > 0 ? (
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div>
              <h4 className="text-sm font-semibold">Order ID: {order.id}</h4>
              <p className="text-sm text-gray-500">Date: {order.date}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{order.total}</p>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500">No orders found.</p>
    )}
  </div>
);

// Account Settings Section
const AccountSettings = () => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">
      Account Settings
    </h3>
    <ul className="space-y-4">
      <li>
        <Link
          href="/update-profile"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
        >
          <span>Edit Profile</span>
        </Link>
      </li>
      <li>
        <Link
          href="/change-password"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
        >
          <span>Change Password</span>
        </Link>
      </li>
      <li>
        <Link
          href="/logout"
          className="flex items-center space-x-2 text-red-600 hover:text-red-800"
        >
          <span>Logout</span>
        </Link>
      </li>
    </ul>
  </div>
);

export default ProfilePage;
