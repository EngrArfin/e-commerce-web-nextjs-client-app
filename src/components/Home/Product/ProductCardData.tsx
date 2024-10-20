import { Divider, Row, Col } from "antd";
import { products } from "@/types/product";
import ProductCard from "./ProductCard";

const ProductData = () => {
  console.log(products);

  return (
    <div style={{ padding: "0 20px" }}>
      <Divider style={{ borderColor: "#7cb305" }}>Featured Products</Divider>
      <Row gutter={[16, 16]} justify="center">
        {products.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={4}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductData;
