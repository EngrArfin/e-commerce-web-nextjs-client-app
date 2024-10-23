"use client";

import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
import NavBar from "@/components/Shared/NavBar";
import ProductCardData from "@/components/Home/Product/ProductCardData";

const page = () => {
  return (
    <div>
      <NavBar />
      <Header />
      <ProductCardData />
      <Footer />
    </div>
  );
};

export default page;
