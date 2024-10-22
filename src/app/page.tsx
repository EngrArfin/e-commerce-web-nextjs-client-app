import Header from "@/components/Shared/Header";
import Footer from "@/components/Shared/Footer";
import ProductCard from "@/components/Home/Product/ProductCard";
import NavBar from "@/components/Shared/NavBar";

const page = () => {
  return (
    <div>
      <NavBar />
      <Header />
      <ProductCard />
      <Footer />
    </div>
  );
};

export default page;
