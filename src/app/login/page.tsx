import { Form, Input, Button, Typography, Row, Col, Card } from "antd";
/* import { NavLink, useNavigate } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useAppDispatch } from "../../redux/hooks";
import { useLoginUserMutation } from "../../redux/api/api";
import { setUser } from "../../redux/features/authSlice"; */
import { CSSProperties, useEffect, useState } from "react";
import backgroundImage from "../../assets/images/backgroundAbout1.jpg";
import backgroundImage1 from "../../assets/images/backgroundLogin1.jpg";

interface ErrorResponse {
  message?: string;
}

interface LoginValues {
  email: string;
  password: string;
  remember: boolean;
}

const { Title } = Typography;

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isMediumOrSmallDevice, setIsMediumOrSmallDevice] = useState(false);

  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();

  useEffect(() => {
    const handleResize = () => {
      setIsMediumOrSmallDevice(window.innerWidth <= 1024); // Set breakpoint at 1024px (medium and small devices)
    };

    handleResize(); // Check size on component mount
    window.addEventListener("resize", handleResize); // Adjust size on window resize

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onFinish = async (values: LoginValues) => {
    try {
      const result = await loginUser(values).unwrap();
      console.log("Login Successful:", result);

      localStorage.setItem("token", result.token);
      const userResponse = await fetchUserData(result.token);
      if (userResponse) {
        dispatch(setUser({ user: userResponse, token: result.token }));
      }

      navigate("/"); /* /user/dashboard */
    } catch (err) {
      console.error("Login Failed:", err);
    }
  };

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch("http://localhost:5000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  };

  const sectionStyle: CSSProperties = {
    padding: "50px 20px",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
  };

  const sectionStyle1: CSSProperties = {
    padding: "10px 20px",
    backgroundImage: !isMediumOrSmallDevice
      ? `url(${backgroundImage1})`
      : "none", // Hide background for medium and small devices
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: !isMediumOrSmallDevice ? "48vh" : "auto", // Full height only for large devices
    width: !isMediumOrSmallDevice ? "80vh" : "100%", // Full width only for large devices
    display: "flex",
    alignItems: "center",
  };

  const overlayStyle: CSSProperties = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    padding: "40px",
  };

  return (
    <div>
      <div style={sectionStyle}>
        <div style={overlayStyle}>
          <Row
            justify="center"
            align="middle"
            style={{ height: "70vh", backgroundColor: "#f0f2f5" }}
          >
            <div style={sectionStyle1}>
              <Title
                level={3}
                style={{
                  textAlign: "center",
                  marginBottom: "30px",
                  color: "red",
                  fontSize: "60px",
                }}
              >
                Login Account
              </Title>
            </div>

            <Col xs={22} sm={16} md={12} lg={8}>
              <Card
                style={{
                  padding: "40px 50px",
                  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                  background: "#ffffff",
                }}
              >
                <Form
                  name="loginForm"
                  layout="vertical"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                    ]}
                  >
                    <Input type="email" placeholder="Enter your email" />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
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
                      Login
                    </Button>
                  </Form.Item>

                  {isError && (
                    <div style={{ color: "red" }}>
                      {error && "data" in error
                        ? (error as FetchBaseQueryError).data // Type assertion
                          ? (error.data as ErrorResponse).message ||
                            "Login failed"
                          : "Login failed"
                        : "Login failed"}
                    </div>
                  )}

                  <div style={{ textAlign: "center" }}>
                    <NavLink to="/register">Register Now</NavLink>
                  </div>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Login;
