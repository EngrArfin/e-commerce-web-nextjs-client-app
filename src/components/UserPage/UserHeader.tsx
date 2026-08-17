"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../Home/Cart/CartContext";
import { FiBell, FiShoppingCart } from "react-icons/fi";

const UserHeader = () => {
  const { data: session } = useSession();
  const { cart } = useCart();

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 md:px-8 sticky top-0 z-30">
      {/* Left side: Greeting */}
      <div>
        <h1 className="text-base md:text-lg font-bold text-slate-800">
          {session?.user?.name ? `Welcome back, ${session.user.name.split(" ")[0]}!` : "Welcome Back!"}
        </h1>
        <p className="text-xs text-slate-400 font-medium hidden sm:block">
          Manage your orders and check status
        </p>
      </div>

      {/* Right side: Cart, Notification, Profile */}
      <div className="flex items-center gap-4">
        {/* Cart Icon */}
        <Link
          href="/cart"
          className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition duration-200"
          aria-label="Shopping Cart"
        >
          <FiShoppingCart className="text-xl" />
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF4E3E] text-[10px] font-bold text-white shadow-sm">
            {cart.length}
          </span>
        </Link>

        {/* Notification Icon */}
        <button
          className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition duration-200"
          aria-label="Notifications"
        >
          <FiBell className="text-xl" />
          <span className="absolute top-2.5 right-2.5 flex h-2 w-2 rounded-full bg-[#FF4E3E]" />
        </button>

        {/* Divider */}
        <div className="w-[1px] h-6 bg-slate-200 hidden sm:block" />

        {/* Profile Card */}
        {session?.user && (
          <div className="flex items-center gap-3 pl-1">
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-slate-800 leading-tight">
                {session.user.name}
              </p>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">
                Buyer
              </p>
            </div>
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-100 bg-slate-50 flex-shrink-0">
              <Image
                alt="Profile"
                src={session.user.image || "/default-profile.png"}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default UserHeader;
