"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import localFont from "next/font/local";
import "./globals.css";
import AuthProviders from "@/services/AuthProviders";
import NavBar from "@/components/Shared/NavBar";

import { Toaster } from "sonner";

import { usePathname } from "next/navigation";
import { CartProvider } from "@/components/Home/Cart/CartContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-right" richColors closeButton />
        <AuthProviders>
          <CartProvider>
            {pathname !== "/" && !pathname.startsWith("/user") && !pathname.startsWith("/admin") && <NavBar />}
            {children}
          </CartProvider>
        </AuthProviders>
      </body>
    </html>
  );
}
