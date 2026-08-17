"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  MdCategory,
  MdDashboard,
  MdManageAccounts,
  MdMessage,
  MdOutlineAddShoppingCart,
  MdPayments,
} from "react-icons/md";
import { GoListOrdered } from "react-icons/go";
import { CgProfile as CgProfileIcon } from "react-icons/cg";
import { IoIosListBox, IoMdLogOut } from "react-icons/io";
import Image from "next/image";
import Logo from "../../UI/icon/Logo.jpg";

const AdminSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: MdDashboard,
    },
    {
      name: "Profile",
      href: "/admin/profile",
      icon: CgProfileIcon,
    },
    {
      name: "Products List",
      href: "/admin/productmanagement",
      icon: IoIosListBox,
    },
    {
      name: "Category",
      href: "/admin/productmanagement", // note: points to productmanagement in original code
      icon: MdCategory,
    },
    {
      name: "Add Product",
      href: "/admin/addproduct",
      icon: MdOutlineAddShoppingCart,
    },
    {
      name: "User Account",
      href: "/admin/user-managements",
      icon: MdManageAccounts,
    },
    {
      name: "Order View",
      href: "/admin/orderlist",
      icon: GoListOrdered,
    },
    {
      name: "Payment Record",
      href: "/admin/paymentrecord",
      icon: MdPayments,
    },
    {
      name: "Message",
      href: "/admin/usermessage",
      icon: MdMessage,
    },
  ];

  return (
    <div className="w-full md:w-64 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100 flex-shrink-0">
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
            E-Com Admin
          </span>
        </Link>
      </div>

      {/* Nav List */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <div key={item.name + item.href} className="relative group">
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive
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
      <div className="p-4 border-t border-slate-100 flex-shrink-0">
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

export default AdminSideBar;
