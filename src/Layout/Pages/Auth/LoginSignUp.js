import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Tabs, Form, Input, Button, Checkbox } from "antd";
import { AppleOutlined, AndroidOutlined } from "@ant-design/icons";
import Loading from "../../../components/Loading/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../../actions/userActions";
import { useAlert } from "react-alert";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const { TabPane } = Tabs;
const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const onLoginFinish = (values) => {
    const { email, password } = values;
    dispatch(login(email, password));
  };

  const onSignUpFinish = (values) => {
    const { email, password, name } = values;
    dispatch(register({ email, password, name }));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (error) {
      alert.error(error);
    }

    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, navigate, isAuthenticated, redirect]);

  const googleLoginSuccess = (response) => {
    const responsePayload = jwt_decode(response.credential);
    dispatch(
      register({
        email: responsePayload.email,
        type: "passwordless",
        name: responsePayload.name,
        dp: { url: responsePayload.picture },
      })
    );
  };

  const googleLoginFail = () => {
    alert.error("Something went wrong!");
  };

  return (
    <div className="loginSignUpArea">
      <Container>
        <Row>
          <Col
            lg={{ span: 6, offset: 3 }}
            md={{ span: 8, offset: 2 }}
            sm={{ span: 10, offset: 1 }}
            xs={{ span: 10, offset: 1 }}
          >
            <div className="loginSignUpSection">
              <Tabs defaultActiveKey="1">
                <TabPane
                  tab={
                    <span>
                      <AppleOutlined />
                      Login
                    </span>
                  }
                  key="1"
                >
                  <GoogleLogin
                    onSuccess={googleLoginSuccess}
                    onError={googleLoginFail}
                  />
                  <hr />
                  <Form
                    name="basic"
                    labelCol={{
                      span: 5,
                    }}
                    wrapperCol={{
                      span: 16,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onLoginFinish}
                    autoComplete="off"
                    className="loginForm"
                  >
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your Email!",
                          type: "email",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your password!",
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item
                      wrapperCol={{
                        offset: 8,
                        span: 16,
                      }}
                    >
                      <Button type="primary" htmlType="submit">
                        Login
                      </Button>
                    </Form.Item>
                  </Form>
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <AndroidOutlined />
                      Sign Up
                    </span>
                  }
                  key="2"
                >
                  <GoogleLogin
                    onSuccess={googleLoginSuccess}
                    onError={googleLoginFail}
                  />
                  <hr />
                  <Form
                    name="basic"
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 16,
                    }}
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onSignUpFinish}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="Full Name"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your Name!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your Email!",
                          type: "email",
                        },
                      ]}
                    >
                      <Input />
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
                      <Input.Password />
                    </Form.Item>

                    <Form.Item
                      wrapperCol={{
                        offset: 8,
                        span: 16,
                      }}
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={loading}
                      >
                        Sign Up
                      </Button>
                    </Form.Item>
                  </Form>
                </TabPane>
              </Tabs>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
