/* import { useGetProductsQuery } from "../../redux/api/api";
import { TProductCardProps } from "../../type";
import ProductCard from "./ProductCard"; */

const ProductCardData = () => {
  /*   const { data, isLoading } = useGetProductsQuery(undefined);

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  const { data: products } = data;
 */
  return (
    <div className="container">
      <h1 className="text-4xl font-bold my-10">All Products</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10">
        {/* {products.map((product: TProductCardProps) => (
          <ProductCard key={product._id} product={product} />
        ))} */}
      </div>
    </div>
  );
};

export default ProductCardData;
