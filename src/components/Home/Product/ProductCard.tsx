// src/components/CardProject.tsx
/* import { useDispatch } from "react-redux"; */
/* import { addToCart } from "../../redux/features/productSlice";
import { TProductCardProps } from "../../type"; */
import Image from "next/image";
import { Button, Card, Rate, Flex } from "antd";
/* import { TProductCardProps } from "@/types";
 */
const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { name, image, price } = product || {};

  /*   const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };
 */
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
          cover={<Image style={{ height: 215 }} alt="example" src={image} />}
        >
          <Meta title={name} description="" />
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
          <p>Price: {price}</p>
          <Button
            style={{ marginTop: 6, marginLeft: 25 }}
            /*  onClick={handleAddToCart} */
          >
            Add To Cart
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ProductCard;
