"use client";
export const dynamic = "force-dynamic";

import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
import ServicesData from "@/components/Home/Services/ServicesData";
import DeveleryWay from "@/components/Shared/DelevaryWay";
import ProductView from "@/components/Shared/ProductView";

const Page = () => {
  return (
    <div>
      <Header />
      <DeveleryWay />
      <ProductView />
      <ServicesData />
      <Footer />
    </div>
  );
};

export default Page;
