import Card from "./Card";

/* import { useGetProductsQuery } from "../../redux/api/api";
import CardProject from "./CardProject";
import { TProductCardProps } from "../../type";
*/
export type TProductCardProps = {
  _id: string;
  productId: string;
  productName: string;
  rating: number;
  brand: string;
  availableQuantity: number;
  price: number;
  image: string;
  quantity: number;
  name: string; // Add this line if needed
  description: string; // Add this line if needed
};

import { Divider, Row, Col } from "antd";
const CardData = () => {
  /*  const { data, isLoading } = useGetProductsQuery(undefined);

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  const { data: products } = data;
 */
  return (
    <div style={{ padding: "0 20px" }}>
      <Divider style={{ borderColor: "#7cb305" }}>Featured Products</Divider>
      <Row gutter={[16, 16]} justify="center">
        {products.map((product: TProductCardProps) => (
          <Col key={product?._id} xs={24} sm={12} md={8} lg={6} xl={4}>
            <Card product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CardData;
