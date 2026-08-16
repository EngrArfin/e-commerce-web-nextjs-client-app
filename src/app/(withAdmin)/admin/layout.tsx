import AdminSideBar from "@/components/AdminPage/AdminSideBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E Com Zone",
  description: "Its For e-commerce",
};

export default function adminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-1/5 p-4 lg:p-6 bg-gray-100 shadow-md">
          <AdminSideBar />
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full p-4 lg:p-6 bg-base-200 rounded-box mb-10">
          {children}
        </div>
      </div>
    </div>
  );
}
