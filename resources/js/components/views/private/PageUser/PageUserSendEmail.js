import { Button, Col, Collapse, Form, notification, Row } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GET, POST } from "../../../providers/useAxiosQuery";
import { Value } from "sass";
import { values } from "lodash";
import notificationErrors from "../../../providers/notificationErrors";
import { role, userData } from "../../../providers/companyInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FloatInput from "../../../providers/FloatInput";
import {
    faAngleDown,
    faAngleUp,
    faArrowLeft,
    faCamera,
} from "@fortawesome/pro-solid-svg-icons";
import FloatTextArea from "../../../providers/FloatTextArea";
import validateRules from "../../../providers/validateRules";
import FloatDatePicker from "../../../providers/FloatDatePicker";

export default function PageUserSendEmailForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const [form] = Form.useForm();
    const [formDisabled, setFormDisabled] = useState(true);
    const [userId, setUserId] = useState(null);

    const { mutate: mutateSendEmail } = POST(
        `api/sendEmail`,
        "user_send_email"
    );

    GET(
        `api/users/${params.id}`,
        ["users_info", "check_user_permission"],
        (res) => {
            if (res.data) {
                // console.log("resdataselected", res.data);

                let data = res.data;
                let email = data.email;

                form.setFieldValue({
                    role: data.role,
                    email,
                });
            }
        }
    );

    const onFinish = (values) => {
        if (!userId) {
            notification.error({
                message: "ERROR",
                description: "User is not logged in.",
            });
            return;
        }
        console.log("form values >", values);

        let data = new FormData();
        data.append("email", values.email);
        // data.append("subject", values.subject);
        data.append("body", values.body);

        mutateSendEmail(data, {
            onSuccess: (res) => {
                if (res.success) {
                    navigate("/users");
                }
            },
            onError: (err) => {
                notificationErrors(err);
            },
        });
    };

    useEffect(() => {
        const user = userData();
        if (user) {
            setUserId(user.id);
        }
    }, []);

    return (
        <Row gutter={[12, 12]}>
            <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Button
                    className=" btn-main-primary btn-main-invert-outline b-r-none"
                    icon={<FontAwesomeIcon icon={faArrowLeft} />}
                    onClick={() => navigate(-1)}
                >
                    Back to list
                </Button>
            </Col>

            <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Form form={form} onFinish={onFinish}>
                    <Row gutter={[12, 12]}>
                        <Col sm={24} md={24} lg={14} xl={14} xxl={14}>
                            <Collapse
                                className="collapse-main-primary"
                                defaultActiveKey={["0", "1"]}
                                size="middle"
                                expandIcon={({ isActive }) => (
                                    <FontAwesomeIcon
                                        icon={
                                            isActive ? faAngleUp : faAngleDown
                                        }
                                    />
                                )}
                                items={[
                                    {
                                        key: "0",
                                        label: "New Message",
                                        children: (
                                            <Row gutter={[12, 12]}>
                                                <Col
                                                    xs={24}
                                                    sm={24}
                                                    md={24}
                                                    lg={12}
                                                    xl={12}
                                                    xxl={12}
                                                >
                                                    <Form.Item
                                                        name="email"
                                                        rules={[
                                                            validateRules.required(),
                                                            // validateRules.email,
                                                        ]}
                                                    >
                                                        <FloatInput
                                                            label="To"
                                                            placeholder="To"
                                                            required={true}
                                                            onBlur={() => {
                                                                if (params.id) {
                                                                    form.submit();
                                                                }
                                                            }}
                                                        />
                                                    </Form.Item>
                                                </Col>

                                                {/* <Col
                                                    xs={24}
                                                    sm={24}
                                                    md={18}
                                                    lg={16}
                                                    xl={12}
                                                    xxl={10}
                                                >
                                                    <Form.Item
                                                        name="subject"
                                                        rules={[
                                                            validateRules.required(),
                                                        ]}
                                                    >
                                                        <FloatInput
                                                            label="Subject"
                                                            placeholder="Subject"
                                                            required={true}
                                                            onBlur={() => {
                                                                if (params.id) {
                                                                    form.submit();
                                                                }
                                                            }}
                                                        />
                                                    </Form.Item>
                                                </Col> */}

                                                <Col
                                                    xs={24}
                                                    sm={24}
                                                    md={24}
                                                    lg={12}
                                                    xl={12}
                                                    xxl={12}
                                                >
                                                    <Form.Item
                                                        name="body"
                                                        rules={[
                                                            validateRules.required(),
                                                        ]}
                                                    >
                                                        <FloatTextArea
                                                            label="Body"
                                                            placeholder="Body"
                                                            required={true}
                                                            disabled={
                                                                formDisabled
                                                            }
                                                        />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        ),
                                    },
                                ]}
                            />
                        </Col>

                        {params.id ? (
                            <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={24}
                                xl={24}
                                xxl={24}
                            >
                                {" "}
                                <Button
                                    className="btn-main-primary"
                                    type="primary"
                                    size="large"
                                    onClick={() => form.submit()}
                                >
                                    Send
                                </Button>
                            </Col>
                        ) : (
                            <Col
                                xs={24}
                                sm={24}
                                md={24}
                                lg={24}
                                xl={24}
                                xxl={24}
                            >
                                <Button
                                    key={4}
                                    className="btn-main-primary"
                                    type="primary"
                                    size="large"
                                    onClick={() => form.submit()}
                                >
                                    Back
                                </Button>
                            </Col>
                        )}
                    </Row>
                </Form>
                {/* <ModalUserUploadPictureForm
                    toggleModalUserUploadPictureForm={
                        toggleModalUserUploadPictureForm
                    }
                    setToggleModalUserUploadPictureForm={
                        setToggleModalUserUploadPictureForm
                    }
                /> */}
            </Col>
        </Row>
    );
}
