import {
    faAngleDown,
    faAngleUp,
    faArrowLeft,
    faCamera,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Col,
    Collapse,
    Form,
    notification,
    Popconfirm,
    Row,
} from "antd";
import React, { useEffect, useState } from "react";
import FloatSelect from "../../../../providers/FloatSelect";
import FloatInput from "../../../../providers/FloatInput";
import { values } from "lodash";
import validateRules from "../../../../providers/validateRules";
import { useNavigate, useParams } from "react-router-dom";
import ModalUploadProfilePicture from "../../PageUser/components/ModalUploadProfilePicture";
import {
    apiUrl,
    defaultCar,
    defaultProfile,
    userData,
} from "../../../../providers/companyInfo";
import ModalUserUploadPictureForm from "../../PageUser/components/ModalUserUploadPictureForm";
import FloatDatePicker from "../../../../providers/FloatDatePicker";
import FloatTextArea from "../../../../providers/FloatTextArea";
import { GET, POST } from "../../../../providers/useAxiosQuery";
import notificationErrors from "../../../../providers/notificationErrors";
import moment from "moment";
import dayjs from "dayjs";
import { eventListeners } from "@popperjs/core";

export default function AddCar() {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [formDisabled, setFormDisabled] = useState(true);
    const params = useParams();
    const [userId, setUserId] = useState(null);

    const { mutate: mutateCarAdd } = POST(`api/add_car_list`, "car_list");

    GET(`api/cars/${params.id}`, "car_list", (res) => {
        if (res.data) {
            // console.log("sss", res.data);
            let data = res.data;

            let name = data.name;
            let description = data.description;
            let type = data.type;
            let brand_name = data.brand_name;
            let year_model = moment(data.year_model, "YYYY");
            let passengers = data.passengers;
            let rates = data.rates;

            form.setFieldsValue({
                // role: data.role,
                name,
                description,
                year_model,
                type,
                brand_name,
                passengers,
                rates,
            });
        }
    });

    const [
        toggleModalUploadProfilePicture,
        setToggleModalUploadProfilePicture,
    ] = useState({
        open: false,
        data: null,
        open: false,
        file: null,
        src: null,
        is_camera: null,
        fileName: null,
    });

    const onFinish = (values) => {
        // console.log("value > ", values);
        // console.log("userId >", userId);
        // console.log("file >", toggleModalUploadProfilePicture.file.name);

        if (!userId) {
            notification.error({
                message: "ERROR",
                description: "User is not logged in.",
            });
            return;
        }

        let data = new FormData();
        data.append("id", params.id ? params.id : "");
        data.append("created_by", userId);
        data.append("updated_by", userId);
        data.append("name", values.name);
        data.append("description", values.description);
        data.append("type", values.type);
        data.append("brand_name", values.brand_name);
        data.append("passengers", values.passengers);

        data.append("rates", values.rates);
        data.append(
            "year_model",
            values.year_model
                ? dayjs(values.year_model).format("YYYY-MM-DD")
                : ""
        );

        if (
            toggleModalUploadProfilePicture &&
            toggleModalUploadProfilePicture.file
        ) {
            data.append(
                "profile_picture",
                toggleModalUploadProfilePicture.file,
                toggleModalUploadProfilePicture.file.name
            );
        }

        // if (fileList.file) {
        //     data.append("profile_picture", fileList.file);
        // }

        mutateCarAdd(data, {
            onSuccess: (res) => {
                if (res.success) {
                    if (params.id) {
                        notification.success({
                            message: "Car",
                            description: res.message,
                        });
                        navigate("/cars");
                    } else {
                        notification.success({
                            message: "Car",
                            description: res.message,
                        });
                        navigate("/cars");
                    }
                }
            },
            onError: (err) => {
                notificationErrors(err);
            },
        });
    };

    useEffect(() => {
        const user = userData();
        // console.log("user >", user.username);
        if (user) {
            setUserId(user.id);
        }

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
                                                            disabled={
                                                                formDisabled
                                                            }
                                                            onBlur={() => {
                                                                if (params.id) {
                                                                    form.submit();
                                                                }
                                                            }}
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
                                                        name="brand_name"
                                                        rules={[
                                                            validateRules.required(),
                                                        ]}
                                                    >
                                                        <FloatInput
                                                            label="Model"
                                                            placeholder="Model"
                                                            required={true}
                                                            disabled={
                                                                formDisabled
                                                            }
                                                            onBlur={() => {
                                                                if (params.id) {
                                                                    form.submit();
                                                                }
                                                            }}
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
                                                        name="type"
                                                        rules={[
                                                            validateRules.required(),
                                                        ]}
                                                    >
                                                        <FloatInput
                                                            label="Type"
                                                            placeholder="Type"
                                                            required={true}
                                                            disabled={
                                                                formDisabled
                                                            }
                                                            onBlur={() => {
                                                                if (params.id) {
                                                                    form.submit();
                                                                }
                                                            }}
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
                                                        name="year_model"
                                                        rules={[
                                                            validateRules.required(),
                                                        ]}
                                                    >
                                                        <FloatDatePicker
                                                            label="Year"
                                                            placeholder="Year"
                                                            required={true}
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
                                                        name="passengers"
                                                        rules={[
                                                            validateRules.required(),
                                                        ]}
                                                    >
                                                        <FloatInput
                                                            label="Passengers"
                                                            placeholder="Passengers"
                                                            required={true}
                                                            disabled={
                                                                formDisabled
                                                            }
                                                            onBlur={() => {
                                                                if (params.id) {
                                                                    form.submit();
                                                                }
                                                            }}
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
                                                        name="rates"
                                                        rules={[
                                                            validateRules.required(),
                                                        ]}
                                                    >
                                                        <FloatInput
                                                            label="Rates"
                                                            placeholder="Rates"
                                                            required={true}
                                                            disabled={
                                                                formDisabled
                                                            }
                                                            onBlur={() => {
                                                                if (params.id) {
                                                                    form.submit();
                                                                }
                                                            }}
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
                                                        name="description"
                                                        rules={[
                                                            validateRules.required(),
                                                        ]}
                                                    >
                                                        <FloatTextArea
                                                            label="Description"
                                                            placeholder="Description"
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
                                                                    : defaultCar
                                                            }
                                                            style={{
                                                                width: "100%",
                                                                height: "auto",
                                                                objectFit:
                                                                    "cover",
                                                            }}
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
                                    Update
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
                                    SUBMIT
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
