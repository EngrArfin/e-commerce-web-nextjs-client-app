// page.tsx
"use client";

import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
import ServicesData from "@/components/Home/Services/ServicesData";
import ProductCardData from "@/components/Home/Product/ProductCardData";
import CheckOut from "@/components/Home/CheckOut/CheckOut";

const Page = () => {
  return (
    <div>
      <Header />
      <CheckOut />
      <ServicesData />
      <ProductCardData />
      <Footer />
    </div>
  );
};

export default Page;
