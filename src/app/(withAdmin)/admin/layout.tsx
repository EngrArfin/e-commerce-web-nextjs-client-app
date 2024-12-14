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
      <div className="w-full min-h-screen ">
        <div className="flex ">
          <div className="w-[18%] ml-6 ">
            <AdminSideBar />
          </div>

          <div className=" w-[78%] bg-base-200 rounded-box mb-10 ml-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
