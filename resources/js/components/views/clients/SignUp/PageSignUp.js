import React, { useState } from "react";
import { Await, useNavigate, useParams } from "react-router-dom";
import {
    Alert,
    AutoComplete,
    Button,
    Card,
    Cascader,
    Checkbox,
    Col,
    Form,
    Input,
    InputNumber,
    Layout,
    notification,
    Row,
    Select,
    Typography,
} from "antd";
import { POST } from "../../../providers/useAxiosQuery";
import { constrainPoint } from "@fullcalendar/core/internal";
import { name } from "../../../providers/companyInfo";

const { Option } = Select;
const residences = [
    {
        value: "zhejiang",
        label: "Zhejiang",
        children: [
            {
                value: "hangzhou",
                label: "Hangzhou",
                children: [
                    {
                        value: "xihu",
                        label: "West Lake",
                    },
                ],
            },
        ],
    },
    {
        value: "jiangsu",
        label: "Jiangsu",
        children: [
            {
                value: "nanjing",
                label: "Nanjing",
                children: [
                    {
                        value: "zhonghuamen",
                        label: "Zhong Hua Men",
                    },
                ],
            },
        ],
    },
];

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export default function PageSignUp() {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const params = useParams();
    // const [user, setUser] = useState(null);

    const { mutate: mutateSignUp } = POST(`api/register`, "users_info");

    const { mutate: mutateLogin } = POST(`api/login`, "login");

    const onFinish = (values) => {
        let data = new FormData();
        data.append("id", params.id ? params.id : "");
        data.append("role", values.role);
        data.append("username", values.username);
        data.append("email", values.email);

        if (!params.id && values.password) {
            data.append("password", values.password);
        }

        data.append("firstname", values.firstname);
        data.append("middlename", values.middlename);
        data.append("lastname", values.lastname);
        data.append("gender", values.gender);

        mutateSignUp(data, {
            onSuccess: (res) => {
                if (res.success) {
                    notification.success({
                        message: "SignUp",
                        description: res.message,
                    });

                    // Prepare login data (minimal fields)
                    let loginData = new FormData();
                    loginData.append("username", values.username);
                    loginData.append("password", values.password);

                    mutateLogin(loginData, {
                        onSuccess: (login) => {
                            if (login.success) {
                                notification.success({
                                    message: "Login",
                                    description: login.message,
                                });
                                // Directly pass the login user data to navigate
                                navigate("/userHome", {
                                    state: { user: login.user },
                                });
                            }
                        },
                        onError: (err) => {
                            notificationErrors(err);
                        },
                    });
                }
            },
            onError: (err) => {
                notificationErrors(err);
            },
        });
    };

    // const mutateProfile = POST("api/profile", "users_info");

    // const mutation = POST("api/register", "users_info", async (resData) => {
    //     console.log("RestData >", resData);

    //     if (!resData || !resData.user?.email) {
    //         console.error("Registration is missing email");
    //         return;
    //     }

    //     // Step 1: Registration was successful, now initiate the login request
    //     try {
    //         // console.log("resdata.emali >", resData.email);
    //         // Assuming your login API accepts email and password
    //         const loginResponse = await axios.post("/api/login", {
    //             email: resData.user.email, // Use the email from the registration response or form
    //             password: form.getFieldValue("password"), // Get the password from the form data
    //         });

    //         // Step 2: Store the token from the login response (adjust as needed for your auth)
    //         const token = loginResponse.data.token;
    //         localStorage.setItem("authToken", token);

    //         // console.log("token >", localStorage.setItem("authToken", token));

    //         // Step 3: Reset the form and redirect to the desired page
    //         form.resetFields();

    //         const { username } = resData.user;

    //         // console.log("username >", username);
    //         navigate("/userHome", { state: { username } });
    //     } catch (error) {
    //         console.error("Automatic sign-in failed:", error);
    //         // Optionally handle the error (show a message, etc.)
    //     }
    // });

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="86">+63</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );
    const suffixSelector = (
        <Form.Item name="suffix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="USD">$</Option>
                <Option value="CNY">¥</Option>
            </Select>
        </Form.Item>
    );
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    const onWebsiteChange = (value) => {
        if (!value) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(
                [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
            );
        }
    };
    const websiteOptions = autoCompleteResult.map((website) => ({
        label: website,
        value: website,
    }));

    return (
        <Layout.Content>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh", // Full screen height
                    backgroundColor: "#f0f2f5", // Optional background color
                }}
            >
                <Card
                    style={{
                        width: "100%",
                        maxWidth: 600,
                    }}
                >
                    {/* <Row gutter={24}> */}
                    {/* {mutation.error && (
                        <Alert
                            message="Registration Failed"
                            description={
                                mutation.error.message ||
                                "An error occurred during registration."
                            }
                            type="error"
                            showIcon
                        />
                    )} */}
                    <Form
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        initialValues={{
                            // residence: ["zhejiang", "hangzhou", "xihu"],
                            prefix: "86",
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        scrollToFirstError
                    >
                        <div
                            className="logo-wrapper"
                            style={{
                                justifyContent: "center",
                                textAlign: "center",
                            }}
                        >
                            <Typography.Title level={3}>
                                J&A Car Rental
                            </Typography.Title>
                            <Typography.Title level={4}>
                                Registration Form
                            </Typography.Title>
                        </div>

                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: "email",
                                    message: "The input is not valid E-mail!",
                                },
                                {
                                    required: true,
                                    message: "Please input your E-mail!",
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "0",
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your username!",
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "0",
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password
                                style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "0",
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label="Confirm Password"
                            dependencies={["password"]}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: "Please confirm your password!",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue("password") === value
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error(
                                                "The new password that you entered do not match!"
                                            )
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "0",
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="firstname"
                            label="First Name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your First Name",
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    border: "1px solid #ccc",
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="middlename"
                            label="Middle Name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Middle Name",
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    border: "1px solid #ccc",
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="lastname"
                            label="Last Name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Last Name",
                                    whitespace: true,
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    border: "1px solid #ccc",
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="name_ext"
                            label="Extension"
                            // tooltip="What do you want others to call you?"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: "Please input your nickname!",
                            //         whitespace: true,
                            //     },
                            // ]}
                        >
                            <Input
                                style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "0",
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="residence"
                            label="Habitual Residence"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please select your habitual residence!",
                                },
                            ]}
                        >
                            <Input
                                style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "0",
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your phone number!",
                                },
                            ]}
                        >
                            <Input
                                addonBefore={prefixSelector}
                                style={{
                                    width: "100%",
                                    border: "1px solid #ccc",
                                    borderRadius: "0",
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="gender"
                            label="Gender"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select gender!",
                                },
                            ]}
                        >
                            <Select placeholder="select your gender">
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="other">Other</Option>
                            </Select>
                        </Form.Item>

                        {/* <Form.Item
                            label="Captcha"
                            extra="We must make sure that your are a human."
                        >
                            <Row gutter={8}>
                                <Col span={12}>
                                    <Form.Item
                                        name="captcha"
                                        noStyle
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input the captcha you got!",
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Button>Get captcha</Button>
                                </Col>
                            </Row>
                        </Form.Item> */}

                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value
                                            ? Promise.resolve()
                                            : Promise.reject(
                                                  new Error(
                                                      "Should accept agreement"
                                                  )
                                              ),
                                },
                            ]}
                            {...tailFormItemLayout}
                        >
                            <Checkbox>
                                I have read the <a href="">agreement</a>
                            </Checkbox>
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                // loading={mutation.isLoading}
                            >
                                Register
                            </Button>
                        </Form.Item>
                    </Form>
                    {/* </Row> */}
                </Card>
            </div>
        </Layout.Content>
    );
}
