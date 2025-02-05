import React, { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    Card,
    Col,
    Divider,
    Image,
    Row,
    Typography,
} from "antd";
import axios from "axios";
import ModalForm from "../../../../providers/modalForm";

export default function PageAboutUsLists(props) {
    const { user } = props;
    const [motorcycle, setMotorcycles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectCarId, setSelectCarId] = useState(null);
    const [selectuserId, setSelectUserId] = useState(null);

    const contentStyle = {
        height: "160px",
        color: "#fff",
        lineHeight: "160px",
        textAlign: "center",
        background: "#364d79",
    };

    const openModal = (motorId, userId) => {
        setSelectUserId(userId);
        setSelectCarId(motorId);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setSelectUserId(null);
        setSelectCarId(null);
        setIsModalOpen(false);
    };

    const onOk = () => {
        setIsModalOpen(false);
    };

    const fetchMotor = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`api/image_motorcyle`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log("car data ->", response.data);
            if (response.data.success) {
                // console.log("All Car Images:", response.data);
                const formattedMotor = response.data.data.map((motor) => {
                    motor.images = motor.images.map((image) =>
                        image.replace("/storage", "")
                    );
                    return motor;
                });
                setMotorcycles(formattedMotor);
                // return response.data.data; // Array of car folders and images
            } else {
                console.error(
                    "Failed to fetch motorcycle images:",
                    response.data.message
                );
            }
        } catch (error) {
            console.error("Error fetching car images:", error);
        }
    };

    useEffect(() => {
        fetchMotor();
    }, []);

    return (
        <Card className="mt-15">
            <Divider
                style={{
                    borderColor: "#000",
                }}
            >
                <Typography.Title className="mb-0">
                    We Also Offer - Motorcycles
                </Typography.Title>
            </Divider>
            <Row gutter={24}>
                {motorcycle?.map((motorcycles) => (
                    <Col key={motorcycles.id} xs={24} sm={24} md={8}>
                        <Card
                            className="cursor-pointer clickable-card"
                            cover={
                                motorcycles.images.length > 0 ? (
                                    <Image
                                        alt={`Motorcycle ${motorcycles.name}`}
                                        style={{
                                            height: "300px",
                                            objectFit: "cover",
                                        }}
                                        src={motorcycles.images[0]}
                                    />
                                ) : (
                                    <Typography.Text>
                                        No Image Available
                                    </Typography.Text>
                                )
                            }
                        >
                            <Card.Meta
                                title={motorcycles.name}
                                // description="Car small description"
                            />
                            <div
                                style={{
                                    color: "GrayText",
                                    lineHeight: "0.3",
                                    fontSize: "0.9rem",
                                }}
                            >
                                <p></p>
                                <p></p>
                                <p>Type: {motorcycles.type}</p>
                                <p>Model: {motorcycles.brand_name}</p>
                                <p>Passengers: {motorcycles.passengers}</p>
                                <p>
                                    {`Rate:
                                    ${new Intl.NumberFormat("en-PH").format(
                                        motorcycles.rates || 0
                                    )}`}
                                </p>
                                {motorcycles.booking ? (
                                    <div>
                                        {motorcycles.booking.status ===
                                        "Reserved" ? (
                                            <p style={{ color: "orange" }}>
                                                Pending
                                            </p>
                                        ) : motorcycles.booking.status ===
                                          "Booked" ? (
                                            <p style={{ color: "red" }}>
                                                Not Available Until{" "}
                                                {
                                                    motorcyclescar.booking
                                                        .date_end
                                                }{" "}
                                                @ {motorcycles.booking.time_end}
                                            </p>
                                        ) : (
                                            <p style={{ color: "green" }}>
                                                Available
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <p style={{ color: "green" }}>Available</p>
                                )}
                                <p style={{ lineHeight: "1" }}>
                                    Description: {motorcycles.description}
                                </p>
                            </div>
                            <Button
                                className="btn-main-primary"
                                onClick={() =>
                                    openModal(motorcycles.id, user.id)
                                }
                                disabled={
                                    motorcycles.booking?.status === "Booked"
                                }
                            >
                                Reserved
                            </Button>
                        </Card>
                    </Col>
                ))}
                <ModalForm
                    open={isModalOpen}
                    onOk={onOk}
                    onCancel={closeModal}
                    carId={selectCarId}
                    userId={selectuserId}
                />
            </Row>
        </Card>
    );
}
