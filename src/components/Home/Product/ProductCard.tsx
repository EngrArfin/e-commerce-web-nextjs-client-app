import Image from "next/image";
import React from "react";

const ProductCard = () => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure>
        <Image
          height="200"
          width="350"
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          Shoes!
          <div className="badge badge-secondary">Rating: </div>
        </h2>
        <p>Price: </p>
        <p>Avaiablity: </p>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-center items-center text-center">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

/* "use server";
import { addToCart } from "../../redux/features/productSlice";
import { useDispatch } from "react-redux";
import { TProductCardProps } from "../../type";
import { Button, Card, Rate, Flex } from "antd";
import Image from "next/image";
import { TProductCardProps } from "@/types";
const { Meta } = Card;

export async function ProductCard({ product }: { product: TProductCardProps }) {
   const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Card
          hoverable
          style={{
            height: 420,
            width: 240,
            margin: 10,
            borderRadius: "8px",
            background:
              "linear-gradient(70deg, #2e004f, #00bfae, #2e004f, #00bfae)",
            color: "#ffffff",
            boxShadow: "0px 4px 15px rgba(0.3, 1, 0, 0.3)",
          }}
          cover={
            <Image style={{ height: 215 }} alt="example" src={product?.image} />
          }
        >
          <Meta title={product?.productName} description="" />
          <div style={{ display: "flex", margin: 5 }}>
            <div style={{ display: "flex" }}>
              <div>Rating:</div>
              <Flex gap="small">
                <Rate defaultValue={product?.rating} />
              </Flex>
            </div>
          </div>
          <p>Brand {product?.brand}</p>
          <p>Available Quantity {product?.availableQuantity}</p>
          <p>Price: {product?.price}</p>
          <Button
            style={{ marginTop: 6, marginLeft: 25 }}
            onClick={handleAddToCart}
          >
            Details View
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default ProductCard;
 */
