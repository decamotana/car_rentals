import React, { useState } from "react";
import { Layout, Typography, Card, Alert, Form, Button } from "antd";
import { logo } from "../../../providers/companyInfo";
import { encrypt } from "../../../providers/companyInfo";
import { useNavigate } from "react-router-dom";
import { date, description } from "../../../providers/companyInfo";

import FloatInput from "../../../providers/FloatInput";
import FloatInputPassword from "../../../providers/FloatInputPassword";
import validateRules from "../../../providers/validateRules";

import { POST } from "../../../providers/useAxiosQuery";

export default function PageLogin() {
    const [errorMessageLogin, setErrorMessageLogin] = useState({
        type: "",
        message: "",
    });
    const navigate = useNavigate();

    const { mutate: mutateLogin, isLoading: isLoadingButtonLogin } = POST(
        "api/login",
        "login"
    );

    const onFinishLogin = (values) => {
        console.log("onFinishLogin", values);

        mutateLogin(values, {
            onSuccess: (res) => {
                console.log("response >", res.data);
                if (res.data) {
                    localStorage.userdata = encrypt(JSON.stringify(res.data));
                    localStorage.token = res.token;

                    // const { username } = res.data;
                    // const { role } = res.data;
                    // console.log("role >", role);

                    if (res.data.role === "Super Admin") {
                        navigate("/dashboard", {
                            state: { username: res.data.username },
                        });
                    } else {
                        navigate("/userDashboard", {
                            state: { username: res.data.username },
                        });
                    }

                    // console.log("username >", username);
                    // navigate("/userHome", { state: { username } });

                    // setTimeout(() => {
                    //     window.location.reload();
                    //     // console.log("username >", username);
                    // }, 500);
                } else {
                    setErrorMessageLogin({
                        type: "error",
                        message: res.message,
                    });
                }
            },
            onError: (err) => {
                setErrorMessageLogin({
                    type: "error",
                    message: (
                        <>
                            Unrecognized username or password.
                            <b>Forgot your password?</b>
                        </>
                    ),
                });
            },
        });
    };

    return (
        <Layout.Content>
            <div />

            <Card>
                <div className="logo-wrapper">
                    {/* <img src={logo} /> */}
                    <Typography.Title level={3}>
                        J&A Car Rental
                    </Typography.Title>
                </div>
                <Typography.Title level={4}>Account Login</Typography.Title>

                <Form
                    layout="vertical"
                    className="login-form"
                    onFinish={onFinishLogin}
                    autoComplete="off"
                >
                    <Form.Item name="email" rules={[validateRules.required()]}>
                        <FloatInput
                            label="Username / E-mail"
                            placeholder="Username / E-mail"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[validateRules.required()]}
                    >
                        <FloatInputPassword
                            label="Password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoadingButtonLogin}
                        className="mt-10 mb-10 btn-log-in"
                        block
                    >
                        Log In
                    </Button>

                    <Typography.Link href="login" target="_blank" italic>
                        Forgot Password?
                    </Typography.Link>

                    {errorMessageLogin.message && (
                        <Alert
                            className="mt-10"
                            type={errorMessageLogin.type}
                            message={errorMessageLogin.message}
                        />
                    )}
                </Form>
            </Card>

            <Layout.Footer>
                <Typography.Text>
                    {`© ${date.getFullYear()} ${description}. All Rights
                        Reserved.`}
                </Typography.Text>
            </Layout.Footer>
        </Layout.Content>
    );
}
