import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "gardening Trip Advice",
  description: "Its For gardening",
};

export default function userLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="min-h-screen my-3">
        <div className="flex justify-between">
          <div className="w-[20%]"></div>
          <div className="w-[80%] bg-base-200 rounded-box ml-2">{children}</div>
        </div>
      </div>
    </div>
  );
}
