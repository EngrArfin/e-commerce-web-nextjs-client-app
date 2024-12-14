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
    <div>
      <div className="w-full ">
        {" "}
        {/* my-2 mt-20 */}
        <div className="flex ">
          <div className="w-[18%] ml-6 ">
            <UserSideBar />
          </div>

          <div className=" w-[78%] bg-base-200 rounded-box mb-10 ml-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
