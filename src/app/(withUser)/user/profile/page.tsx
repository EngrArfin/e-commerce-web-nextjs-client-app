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
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-sky-600 to-indigo-700 rounded-2xl p-6 md:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 text-9xl font-bold select-none">
          E-COM
        </div>
        <div className="relative z-10 space-y-2">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Welcome Back!
          </h2>
          <p className="text-sky-100 text-sm md:text-base max-w-xl font-medium">
            Manage your bookings, browse latest product collections, and keep your shipping information up to date.
          </p>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="My Orders"
          value="View Booking History"
          icon="📦"
          link="/user/my-bookings"
          gradient="from-indigo-500 to-indigo-600"
        />
        <DashboardCard
          title="Browse Products"
          value="Go to Shopping Zone"
          icon="🛒"
          link="/"
          gradient="from-sky-500 to-sky-600"
        />
        <DashboardCard
          title="Account Settings"
          value="Manage Profile & Pwd"
          icon="⚙️"
          link="/user/profile"
          gradient="from-emerald-500 to-emerald-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <OrderHistory orders={orders} />
        <AccountSettings />
      </div>
    </div>
  );
};

const DashboardCard = ({
  title,
  value,
  icon,
  link,
  gradient,
}: {
  title: string;
  value: string;
  icon: string;
  link: string;
  gradient: string;
}) => (
  <div className={`bg-gradient-to-br ${gradient} text-white p-6 rounded-2xl shadow-md flex items-center justify-between hover:shadow-lg transitionduration-300 group`}>
    <div className="flex items-center space-x-4">
      <span className="text-4xl bg-white/20 p-3 rounded-xl select-none">{icon}</span>
      <div>
        <h4 className="text-lg font-bold tracking-tight">{title}</h4>
        <p className="text-xs text-sky-100 font-semibold mt-0.5">{value}</p>
      </div>
    </div>
    <Link href={link} className="bg-white/20 hover:bg-white/30 text-white p-2.5 rounded-xl transition duration-200 active:scale-90 select-none">
      <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  </div>
);

// Order History Section
const OrderHistory = ({ orders }: { orders: Array<any> }) => (
  <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
    <h3 className="text-lg font-bold text-slate-800 mb-4 tracking-tight">Recent Order History</h3>
    {orders.length > 0 ? (
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0"
          >
            <div>
              <h4 className="text-sm font-bold text-slate-800">Order ID: #{order.id}</h4>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Placed on {order.date}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-extrabold text-slate-800">{order.total}</p>
              <span
                className={`inline-block text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 mt-1 rounded ${
                  order.status === "Delivered"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : "bg-amber-50 text-amber-700 border border-amber-100"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-slate-400 font-semibold text-sm">No orders found.</p>
    )}
  </div>
);

// Account Settings Section
const AccountSettings = () => (
  <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
    <h3 className="text-lg font-bold text-slate-800 mb-4 tracking-tight">
      Quick Links
    </h3>
    <ul className="space-y-3">
      <li>
        <Link
          href="/user"
          className="flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 transition"
        >
          <span>👤 Edit Profile Info</span>
        </Link>
      </li>
      <li>
        <Link
          href="/user"
          className="flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 transition"
        >
          <span>🔒 Change Password</span>
        </Link>
      </li>
      <li>
        <Link
          href="/user/my-bookings"
          className="flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 transition"
        >
          <span>📋 View Bookings</span>
        </Link>
      </li>
    </ul>
  </div>
);

export default ProfilePage;
