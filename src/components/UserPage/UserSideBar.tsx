"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import { GoListOrdered } from "react-icons/go";
import { IoMdLogOut } from "react-icons/io";
import Image from "next/image";
import Logo from "../../UI/icon/Logo.jpg";

const UserSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const menuItems = [
    {
      name: "Dashboard",
      href: "/user",
      icon: MdDashboard,
    },
    {
      name: "My Booking",
      href: "/user/my-bookings",
      icon: GoListOrdered,
    },
    {
      name: "Order Status",
      href: "/user/orderlist",
      icon: GoListOrdered,
    },
  ];

  return (
    <div className="w-full md:w-64 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-slate-50 border border-slate-100">
            <Image
              alt="logo"
              src={Logo}
              fill
              sizes="32px"
              className="object-cover"
            />
          </div>
          <span className="text-lg font-bold text-slate-800 tracking-tight">
            E-Com Zone
          </span>
        </Link>
      </div>

      {/* Nav List */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <div key={item.href} className="relative group">
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "text-[#FF4E3E] bg-[#FF4E3E]/5"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                <Icon className={`text-lg ${isActive ? "text-[#FF4E3E]" : "text-slate-400 group-hover:text-slate-600"}`} />
                <span>{item.name}</span>
              </Link>
              {/* Active indicator line */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#FF4E3E] rounded-r-md" />
              )}
            </div>
          );
        })}
      </nav>

      {/* Bottom Action Area */}
      <div className="p-4 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 hover:bg-rose-50 rounded-xl text-sm font-bold text-rose-600 w-full transition-all duration-200 group"
        >
          <IoMdLogOut className="text-lg text-rose-500 group-hover:scale-110 transition-transform" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default UserSideBar;
