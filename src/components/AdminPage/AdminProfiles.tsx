"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { toast } from "sonner";

const AdminProfiles = () => {
  const { data: session } = useSession();
  
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
  });

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  useEffect(() => {
    if (session?.user) {
      setAdminData({
        name: session.user.name || "",
        email: session.user.email || "",
      });
    }
  }, [session]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProfileUpdate = async (e: FormEvent) => {
    e.preventDefault();
    toast.success("Profile information updated successfully!");
  };

  const handleChangePassword = (e: FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation password do not match");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    toast.success("Password changed successfully!");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="w-full space-y-8">
      {/* Title */}
      <div className="pb-4 border-b border-slate-100">
        <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
          Admin Profile Settings
        </h1>
        <p className="text-xs text-slate-400 font-semibold mt-0.5">
          View and update your administrator details and security credentials
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Summary */}
        <div className="flex flex-col items-center p-6 border border-slate-100 rounded-2xl bg-slate-50/50">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-100 mb-4">
            <Image
              alt="Profile"
              src={session?.user?.image || "/default-profile.png"}
              fill
              sizes="128px"
              className="object-cover"
            />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            {session?.user?.name || "Administrator"}
          </h3>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            {session?.user?.email || "admin@ecomzone.com"}
          </p>
          <span className="mt-3 px-3 py-1 bg-red-50 text-red-600 border border-red-100 text-[10px] font-bold tracking-wider uppercase rounded-full">
            System Administrator
          </span>
        </div>

        {/* Right Columns: Forms */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Form */}
          <div className="border border-slate-100 rounded-2xl p-6 bg-white space-y-4">
            <h2 className="text-base font-bold text-slate-800 pb-2 border-b border-slate-50">
              Personal Information
            </h2>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={adminData.name}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 focus:border-[#FF4E3E] outline-none rounded-xl p-3 text-sm transition"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={adminData.email}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 focus:border-[#FF4E3E] outline-none rounded-xl p-3 text-sm transition"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#FF4E3E] hover:bg-[#e03d2d] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md shadow-[#FF4E3E]/10 transition duration-200"
                >
                  Save Personal Details
                </button>
              </div>
            </form>
          </div>

          {/* Change Password Form */}
          <div className="border border-slate-100 rounded-2xl p-6 bg-white space-y-4">
            <h2 className="text-base font-bold text-slate-800 pb-2 border-b border-slate-50">
              Security & Credentials
            </h2>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border border-slate-200 focus:border-[#FF4E3E] outline-none rounded-xl p-3 text-sm transition"
                    placeholder="Enter new password"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-slate-200 focus:border-[#FF4E3E] outline-none rounded-xl p-3 text-sm transition"
                    placeholder="Confirm new password"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition duration-200"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfiles;
