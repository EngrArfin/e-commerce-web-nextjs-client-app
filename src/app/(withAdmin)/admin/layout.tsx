import AdminSideBar from "@/components/Admin/adminSideBar";
import NavBar from "@/components/Shared/NavBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "gardening Trip Advice",
  description: "Its For gardening",
};

export default function adminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar />
      <div className="max-h-screen my-2">
        <div className="flex justify-between">
          <div className="w-[20%]"></div>
          <AdminSideBar />
          <div className="w-[60%] bg-base-200 rounded-box ml-2">{children}</div>
          <AdminSideBar />
          <div className="w-[20%]"></div>
        </div>
      </div>
    </div>
  );
}
