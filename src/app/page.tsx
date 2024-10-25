// page.tsx
"use client";

import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
import ServicesData from "@/components/Home/Services/ServicesData";
import ProductCardData from "@/components/Home/Product/ProductCardData";

const Page = () => {
  return (
    <div>
      <Header />
      <ServicesData />
      <ProductCardData />
      <Footer />
    </div>
  );
};

export default Page;
