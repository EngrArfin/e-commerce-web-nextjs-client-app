import AdminSideBar from "@/components/AdminPage/AdminSideBar";
import AdminHeader from "@/components/AdminPage/AdminHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E Com Zone Admin",
  description: "Its For e-commerce",
};

export default function adminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0">
        <AdminSideBar />
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Navbar */}
        <AdminHeader />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-slate-100 shadow-sm p-6 md:p-8 min-h-[calc(100vh-140px)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
