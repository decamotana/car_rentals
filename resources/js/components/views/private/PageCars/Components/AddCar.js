import {
    faAngleDown,
    faAngleUp,
    faArrowLeft,
    faCamera,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Collapse, Form, Row } from "antd";
import React, { useEffect, useState } from "react";
import FloatSelect from "../../../../providers/FloatSelect";
import FloatInput from "../../../../providers/FloatInput";
import { values } from "lodash";
import validateRules from "../../../../providers/validateRules";
import { useParams } from "react-router-dom";
import ModalUploadProfilePicture from "../../PageUser/components/ModalUploadProfilePicture";
import { defaultProfile } from "../../../../providers/companyInfo";
import ModalUserUploadPictureForm from "../../PageUser/components/ModalUserUploadPictureForm";
import FloatDatePicker from "../../../../providers/FloatDatePicker";

export default function AddCar() {
    const [form] = Form.useForm();
    const [formDisabled, setFormDisabled] = useState(true);
    const params = useParams();

    const [
        toggleModalUserUploadPictureForm,
        setToggleModalUserUploadPictureForm,
    ] = useState({
        open: false,
        data: null,
    });

    const [
        toggleModalUploadProfilePicture,
        setToggleModalUploadProfilePicture,
    ] = useState({
        open: false,
        file: null,
        src: null,
        is_camera: null,
        fileName: null,
    });

    const onFinish = (values) => {
        console.log("value > ", values);

        // let data = new FormData();
        // data.append("id", params.id ? params.id : "");
        // data.append("role", values.role);
        // data.append("username", values.username);
        // data.append("email", values.email);
        // if (!params.id) {
        //     data.append("password", values.password);
        // }
        // data.append("firstname", values.firstname);
        // data.append("lastname", values.lastname);

        // data.append("gender", values.gender);

        // if (fileList.file) {
        //     data.append("imagefile", fileList.file);
        // }

        // mutateUserRole(data, {
        //     onSuccess: (res) => {
        //         if (res.success) {
        //             if (params.id) {
        //                 notification.success({
        //                     message: "User",
        //                     description: res.message,
        //                 });
        //             } else {
        //                 notification.success({
        //                     message: "User",
        //                     description: res.message,
        //                 });
        //                 navigate("/users");
        //             }
        //         }
        //     },
        //     onError: (err) => {
        //         notificationErrors(err);
        //     },
        // });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setFormDisabled(false);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <Row gutter={[12, 12]}>
            <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Button
                    className=" btn-main-primary btn-main-invert-outline b-r-none"
                    icon={<FontAwesomeIcon icon={faArrowLeft} />}
                    // onClick={() => navigate(-1)}
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
                                        label: "CAR INFORMATION",
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
                                                        name="name"
                                                        rules={[
                                                            validateRules.required(),
                                                        ]}
                                                    >
                                                        <FloatInput
                                                            label="Make"
                                                            placeholder="Make"
                                                            required={true}
                                                            // options={
                                                            //     optionUserType
                                                            // }
                                                            disabled={
                                                                formDisabled
                                                            }
                                                        />
                                                    </Form.Item>
                                                </Col>

                                                <Col
                                                    xs={24}
                                                    sm={24}
                                                    md={24}
                                                    lg={12}
                                                    xl={12}
                                                    xxl={12}
                                                >
                                                    <Form.Item
                                                        name="model"
                                                        rules={[
                                                            validateRules.required(),
                                                        ]}
                                                    >
                                                        <FloatInput
                                                            label="Model"
                                                            placeholder="Model"
                                                            required
                                                            disabled={
                                                                params.id
                                                                    ? true
                                                                    : formDisabled
                                                            }
                                                        />
                                                    </Form.Item>
                                                </Col>

                                                <Col
                                                    xs={24}
                                                    sm={24}
                                                    md={24}
                                                    lg={12}
                                                    xl={12}
                                                    xxl={12}
                                                >
                                                    <Form.Item
                                                        name="variant"
                                                        rules={[
                                                            validateRules.required(),
                                                        ]}
                                                    >
                                                        <FloatInput
                                                            label="Variant"
                                                            placeholder="Variant"
                                                            required={true}
                                                            disabled={
                                                                params.id
                                                                    ? true
                                                                    : formDisabled
                                                            }
                                                        />
                                                    </Form.Item>
                                                </Col>

                                                <Col
                                                    xs={24}
                                                    sm={24}
                                                    md={24}
                                                    lg={12}
                                                    xl={12}
                                                    xxl={12}
                                                >
                                                    <Form.Item
                                                        name="year"
                                                        rules={[
                                                            validateRules.required(),
                                                        ]}
                                                    >
                                                        <FloatDatePicker
                                                            label="Year"
                                                            placeholder="Year"
                                                            required={true}
                                                            disabled={
                                                                params.id
                                                                    ? true
                                                                    : formDisabled
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

                        <Col sm={24} md={24} lg={10} xl={10} xxl={10}>
                            <Collapse
                                className="collapse-main-primary"
                                defaultActiveKey={["0"]}
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
                                        label: "UPLOAD PHOTO",
                                        className: "collapse-profile-picture",
                                        children: (
                                            <Row gutter={[12, 0]}>
                                                <Col
                                                    xs={24}
                                                    sm={24}
                                                    md={24}
                                                    lg={24}
                                                >
                                                    <div className="profile-picture">
                                                        <img
                                                            alt=""
                                                            src={
                                                                toggleModalUploadProfilePicture.src
                                                                    ? toggleModalUploadProfilePicture.src
                                                                    : defaultProfile
                                                            }
                                                        />

                                                        <Button
                                                            type="link"
                                                            icon={
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faCamera
                                                                    }
                                                                />
                                                            }
                                                            className="btn-upload"
                                                            onClick={() =>
                                                                setToggleModalUploadProfilePicture(
                                                                    (ps) => ({
                                                                        ...ps,
                                                                        open: true,
                                                                    })
                                                                )
                                                            }
                                                        />
                                                    </div>

                                                    <ModalUploadProfilePicture
                                                        toggleModalUploadProfilePicture={
                                                            toggleModalUploadProfilePicture
                                                        }
                                                        setToggleModalUploadProfilePicture={
                                                            setToggleModalUploadProfilePicture
                                                        }
                                                    />
                                                </Col>
                                            </Row>
                                        ),
                                    },
                                ]}
                            />
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                            <Button
                                key={4}
                                className="btn-main-primary"
                                type="primary"
                                size="large"
                                onClick={() => form.submit()}
                            >
                                SUBMIT
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <ModalUserUploadPictureForm
                    toggleModalUserUploadPictureForm={
                        toggleModalUserUploadPictureForm
                    }
                    setToggleModalUserUploadPictureForm={
                        setToggleModalUserUploadPictureForm
                    }
                />
            </Col>
        </Row>
    );
}
