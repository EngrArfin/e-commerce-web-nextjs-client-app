"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FiBell } from "react-icons/fi";

const AdminHeader = () => {
  const { data: session } = useSession();

  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 md:px-8 sticky top-0 z-30 flex-shrink-0">
      {/* Left side: Greeting */}
      <div>
        <h1 className="text-base md:text-lg font-bold text-slate-800">
          Admin Portal
        </h1>
        <p className="text-xs text-slate-400 font-medium hidden sm:block">
          System Overview & Store Management
        </p>
      </div>

      {/* Right side: Notifications, Profile */}
      <div className="flex items-center gap-4">
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
              <p className="text-xs text-slate-400 font-semibold mt-0.5 animate-pulse text-[#FF4E3E]">
                Admin
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

export default AdminHeader;
