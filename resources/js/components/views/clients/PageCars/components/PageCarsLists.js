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

export default function PageCarsLists(props) {
    const {} = props;
    const [cars, setCars] = useState([]);

    const fetchCars = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`api/image_list`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.data.success) {
                console.log("All Car Images:", response.data);
                const formattedCars = response.data.data.map((car) => {
                    car.images = car.images.map((image) =>
                        image.replace("/storage", "")
                    );
                    return car;
                });
                setCars(formattedCars);
                // return response.data.data; // Array of car folders and images
            } else {
                console.error(
                    "Failed to fetch car images:",
                    response.data.message
                );
            }
        } catch (error) {
            console.error("Error fetching car images:", error);
        }
    };

    const contentStyle = {
        height: "160px",
        color: "#fff",
        lineHeight: "160px",
        textAlign: "center",
        background: "#364d79",
    };

    useEffect(() => {
        fetchCars();
    }, []);

    return (
        <Card className="mt-15">
            <Divider
                style={{
                    borderColor: "#000",
                }}
            >
                <Typography.Title className="mb-0">Car Models</Typography.Title>
            </Divider>
            <Row gutter={24}>
                {cars?.map((car) => (
                    <Col key={car.id} xs={24} sm={24} md={8}>
                        <Card
                            className="cursor-pointer clickable-card"
                            cover={
                                car.images.length > 0 ? (
                                    <Image
                                        alt={`Car ${car.name}`}
                                        style={{
                                            height: "300px",
                                            objectFit: "cover",
                                        }}
                                        src={car.images[0]} // Show the first image
                                    />
                                ) : (
                                    <Typography.Text>
                                        No Image Available
                                    </Typography.Text>
                                )
                            }
                        >
                            <Card.Meta
                                title={car.name}
                                // description={car.description}
                            />
                            <div
                                style={{
                                    color: "GrayText",
                                    lineHeight: "0.3",
                                    fontSize: "0.9rem",
                                }}
                            >
                                {/* Display additional information */}
                                <p></p>
                                <p>Type: {car.type}</p>
                                <p>Model: {car.brand_name}</p>
                                <p>Passengers: {car.passengers}</p>
                                <p>
                                    {`Rate:
                                    ${new Intl.NumberFormat("en-PH").format(
                                        car.rates || 0
                                    )}`}
                                </p>
                                <p>Status: {car.status}</p>
                                <p>Description: {car.description}</p>
                            </div>
                        </Card>
                    </Col>
                ))}

                {/* <Col xs={24} sm={24} md={8}>
                    <Card
                        className="cursor-pointer clickable-card"
                        cover={
                            <img
                                alt="example"
                                style={{
                                    height: "300px",
                                    objectFit: "cover",
                                }}
                                src="https://i.pinimg.com/736x/d8/c2/7a/d8c27aed275566a105079773d7ad7b72.jpg"
                            />
                        }
                    >
                        <Card.Meta
                            title="Car Brand"
                            description="Car small description"
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={8}>
                    <Card
                        className="cursor-pointer clickable-card"
                        cover={
                            <img
                                alt="example"
                                style={{
                                    height: "300px",
                                    objectFit: "cover",
                                }}
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR92EaOqPEfwTeHkTQgVSNU1SelFyfgZdC0oOYNsJZGvINB2LeEmY48EU42D96BEV8x9t8&usqp=CAU"
                            />
                        }
                    >
                        <Card.Meta
                            title="Car Brand"
                            description="Car small description"
                        />
                    </Card>
                </Col> */}
            </Row>
        </Card>
    );
}
