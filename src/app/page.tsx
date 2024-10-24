"use client";

import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
import ProductCardData from "@/components/Home/Product/ProductCardData";

const page = () => {
  return (
    <div>
      <Header />
      <ProductCardData />
      <Footer />
    </div>
  );
};

export default page;
