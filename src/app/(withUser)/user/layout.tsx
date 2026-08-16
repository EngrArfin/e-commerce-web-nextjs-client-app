import UserSideBar from "@/components/UserPage/UserSideBar";
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
    <div className="w-full min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <UserSideBar />
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-md p-6 md:p-8 min-h-[calc(100vh-160px)]">
          {children}
        </div>
      </div>
    </div>
  );
}
