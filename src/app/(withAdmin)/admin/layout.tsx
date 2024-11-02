import AdminNavbar from "@/components/AdminPage/AdminNavbar";
import AdminSideBar from "@/components/AdminPage/AdminSideBar";
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
      <div className="w-full min-h-screen my-2">
        <div className="flex ">
          <div className="w-[10%] "></div>
          <AdminSideBar />
          <div className="w-[80%] bg-base-200 rounded-box ml-2">{children}</div>
          <div className="w-[10%]"></div>
        </div>
      </div>
    </div>
  );
}
