import UserSideBar from "@/components/UserPage/UserSideBar";
import UserHeader from "@/components/UserPage/UserHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Page",
  description: "Its For E commerce",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-screen bg-slate-50/50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 flex-shrink-0">
        <UserSideBar />
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Navbar */}
        <UserHeader />

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
