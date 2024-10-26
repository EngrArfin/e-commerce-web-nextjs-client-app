/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Typography,
} from "antd";
/* import { CountryDropdown } from "react-country-region-selector";
 */
const { Title, Text } = Typography;

const CheckoutPage: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <Row gutter={24} style={{ padding: "24px" }}>
      {/* Shipping Information */}
      <Col xs={24} md={14}>
        <Card title="Shipping Information" bordered={false}>
          <Form
            form={form}
            layout="vertical"
            initialValues={{ shippingMethod: "delivery" }}
            onFinish={(values) => console.log("Form Values:", values)}
          >
            {/* Delivery or Pickup */}
            <Form.Item name="shippingMethod">
              <Radio.Group>
                <Radio.Button value="delivery">Delivery</Radio.Button>
                <Radio.Button value="pickup">Pick Up</Radio.Button>
              </Radio.Group>
            </Form.Item>

            {/* Full Name */}
            <Form.Item
              label="Full name"
              name="fullName"
              rules={[
                { required: true, message: "Please enter your full name" },
              ]}
            >
              <Input placeholder="Enter full name" />
            </Form.Item>

            {/* Email Address */}
            <Form.Item
              label="Email address"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
            >
              <Input placeholder="Enter email address" />
            </Form.Item>

            {/* Phone Number */}
            <Form.Item
              label="Phone number"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <Input
                placeholder="Enter phone number"
                prefix={<span>🇺🇸</span>}
              />
            </Form.Item>

            {/* Country Dropdown */}
            <Form.Item
              label="Country"
              name="country"
              rules={[
                { required: true, message: "Please select your country" },
              ]}
            >
              {/* <CountryDropdown
                  valueType="short"
                  value=""
                  onChange={(value: any) =>
                    form.setFieldsValue({ country: value })
                  }
                  style={{ width: "100%", padding: "4px" }}
                /> */}
            </Form.Item>

            {/* Address Fields */}
            <Row gutter={16}>
              <Col span={8}>
                <Form.Item
                  label="City"
                  name="city"
                  rules={[
                    { required: true, message: "Please enter your city" },
                  ]}
                >
                  <Input placeholder="Enter city" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="State"
                  name="state"
                  rules={[
                    { required: true, message: "Please enter your state" },
                  ]}
                >
                  <Input placeholder="Enter state" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="ZIP Code"
                  name="zipCode"
                  rules={[{ required: true, message: "Please enter ZIP code" }]}
                >
                  <Input placeholder="Enter ZIP code" />
                </Form.Item>
              </Col>
            </Row>

            {/* Terms and Conditions */}
            <Form.Item
              name="terms"
              valuePropName="checked"
              rules={[{ required: true }]}
            >
              <Radio> I agree to the Terms and Conditions.</Radio>
            </Form.Item>
          </Form>
        </Card>
      </Col>

      {/* Cart Summary */}
      <Col xs={24} md={10}>
        <Card title="Review your cart" bordered={false}>
          {/* Cart Items */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <Text>DuoComfort Sofa Premium</Text>
            <Text>$20.00</Text>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <Text>IronOne Desk</Text>
            <Text>$25.00</Text>
          </div>
          <Divider />
          {/* Discount Code */}
          <Form.Item name="discountCode">
            <Input
              placeholder="Discount code"
              suffix={<Button type="link">Apply</Button>}
            />
          </Form.Item>

          {/* Price Summary */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>Subtotal</Text>
            <Text>$45.00</Text>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>Shipping</Text>
            <Text>$5.00</Text>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>Discount</Text>
            <Text>-$10.00</Text>
          </div>
          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
            }}
          >
            <Text>Total</Text>
            <Text>$40.00</Text>
          </div>

          {/* Pay Now Button */}
          <Button
            type="primary"
            size="large"
            style={{ width: "100%", marginTop: "16px" }}
            onClick={() => form.submit()}
          >
            Pay Now
          </Button>

          {/* SSL Secure Notice */}
          <div
            style={{ marginTop: "16px", textAlign: "center", color: "gray" }}
          >
            <Text>🔒 Secure Checkout - SSL Encrypted</Text>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default CheckoutPage;
