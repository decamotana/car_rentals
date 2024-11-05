import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

    const onFinish = (values) => {
        // console.log("Values of form to send in database: ", values);
        mutation.mutate(values);
    };

    const mutation = POST("api/register", "register", (resData) => {
        // console.log("Registration Success...", resData);

        form.resetFields();

        const { username } = resData.user;

        // console.log("username >", username);
        navigate("/userHome", { state: { username } });
    });

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
                    {mutation.error && (
                        <Alert
                            message="Registration Failed"
                            description={
                                mutation.error.message ||
                                "An error occurred during registration."
                            }
                            type="error"
                            showIcon
                        />
                    )}
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
                                loading={mutation.isLoading}
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
