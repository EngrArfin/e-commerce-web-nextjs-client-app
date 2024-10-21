"use client";
import { Form, Input, Typography, Row, Col, Card, Button } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import backgroundRegister from "../../UI/image/backgroundRegister1.jpg";
import { CSSProperties } from "react";
import { useRegisterUserMutation } from "@/redux/api/api";

// Define the structure of the expected error response
interface ErrorResponse {
  message?: string; // Optional to handle cases where message might not exist
}

const { Title } = Typography;

const SignUp = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading, isError, error }] =
    useRegisterUserMutation();

  // Define the values type for the form
  interface RegisterValues {
    name: string;
    username: string;
    email: string;
    password: string;
    remember: boolean;
  }

  const onFinish = async (values: RegisterValues) => {
    try {
      const result = await registerUser(values).unwrap();
      console.log("Registration Successful:", result);
      navigate("/login"); // Navigate to the login page after successful registration
    } catch (err) {
      console.error("Registration Failed:", err);
    }
  };

  // Check if the error is FetchBaseQueryError and extract the message
  const getErrorMessage = () => {
    if (isError && error) {
      const fetchError = error as FetchBaseQueryError;

      // Check if fetchError.data is defined and has a message property
      const errorData = fetchError.data as ErrorResponse;
      return errorData.message || "Registration failed";
    }
    return "Registration failed";
  };

  const sectionStyle: CSSProperties = {
    padding: "50px 20px",
    backgroundImage: `url(${backgroundRegister})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    alignItems: "center",
  };

  const overlayStyle: CSSProperties = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    padding: "40px",
  };

  return (
    <div style={sectionStyle}>
      <div style={overlayStyle}>
        <Row
          justify="center"
          align="middle"
          style={{ height: "100vh", backgroundColor: "#f0f2f5" }}
        >
          <Col xs={22} sm={16} md={12} lg={8}>
            <Card
              style={{
                padding: "35px 40px",
                boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                background: "#ffffff",
              }}
            >
              <Title
                level={3}
                style={{ textAlign: "center", marginBottom: "30px" }}
              >
                Register Your Account
              </Title>

              <Form
                name="registerForm"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <Input placeholder="Enter your name" />
                </Form.Item>

                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input placeholder="Enter your username" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    {
                      type: "email",
                      message: "Please enter a valid email address!",
                    },
                  ]}
                >
                  <Input placeholder="Enter your email" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                    {
                      min: 6,
                      message: "Password must be at least 6 characters long!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Enter your password" />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={isLoading}
                  >
                    Register
                  </Button>
                </Form.Item>

                {isError && (
                  <div style={{ color: "red" }}>{getErrorMessage()}</div>
                )}

                <div style={{ textAlign: "center" }}>
                  <NavLink to="/login">Login</NavLink>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SignUp;
