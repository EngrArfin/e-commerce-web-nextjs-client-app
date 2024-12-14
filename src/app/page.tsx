"use client";
export const dynamic = "force-dynamic";

import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
import ServicesData from "@/components/Home/Services/ServicesData";
import DeveleryWay from "@/components/Shared/DelevaryWay";
import ProductView from "@/components/Shared/ProductView";
import CategoryDetails from "@/components/Home/CategoryProduct/CategoryDetails";
import ProductCardData from "@/components/Home/Product/ProductCardData";
import SellPercantageCard from "@/components/Shared/SellPercantageCard";
import FeatureDetails from "@/components/Home/FeatureProduct/FeatureDetails";
import NavBarTop from "@/components/Shared/NavBarTop";
import NavBar from "@/components/Shared/NavBar";
import Card from "@/components/Home/Card/Card";

const Page = () => {
  return (
    <div>
      <NavBarTop />
      <hr />
      <NavBar />
      <Header />
      <DeveleryWay />
      <FeatureDetails />
      <Card />
      <CategoryDetails />
      <ProductView />
      <ServicesData />
      <ProductCardData />
      <SellPercantageCard />
      <Footer />
    </div>
  );
};

export default Page;
