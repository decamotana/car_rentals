import React from "react";
import { Avatar, Button, Card, Col, Divider, Row, Typography } from "antd";

export default function PageCarsLists(props) {
    const {} = props;

    const contentStyle = {
        height: "160px",
        color: "#fff",
        lineHeight: "160px",
        textAlign: "center",
        background: "#364d79",
    };

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
                                src="https://wallpapers.com/images/featured-full/jaguar-car-0h4vhh2g85m0elx1.jpg"
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
                </Col>
            </Row>
        </Card>
    );
}
