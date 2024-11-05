import React from "react";
import { Button, Card, Carousel, Col, Row, Typography } from "antd";
import Fortuner from "../../../../../../resources/images/Fortuner.jpg";
import Mux from "../../../../../../resources/images/mux.jpg";
import Raptor from "../../../../../../resources/images/raptor.jpg";
import NissanProx from "../../../../../../resources/images/NissanProx.jpg";

export default function PageHomeUsers({ name = "User" }) {
    const contentStyle = {
        height: "230px",
        color: "#fff",
        // lineHeight: "50px",
        textAlign: "center",
        // background: "#364d79",
    };

    const imageSize = {
        width: "100%",
        height: "auto",
    };

    return (
        <Card className="mt-15">
            <Row gutter={24}>
                <Col xs={24} sm={24} md={12}>
                    <Typography.Title>
                        Welcome to J&A Car Rental
                    </Typography.Title>
                    <h1>{name || "User"}!</h1>
                </Col>
                <Col xs={24} sm={24} md={12}>
                    <Carousel autoplay>
                        <div>
                            <h3 style={contentStyle}>
                                <img
                                    src={Fortuner}
                                    alt="Fortuner"
                                    style={imageSize}
                                />
                            </h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>
                                <img src={Mux} alt="Mux" style={imageSize} />
                            </h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>
                                <img
                                    src={NissanProx}
                                    alt="Nissan"
                                    style={imageSize}
                                />
                            </h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>
                                <img
                                    src={Raptor}
                                    alt="Raptor"
                                    style={imageSize}
                                />
                            </h3>
                        </div>
                    </Carousel>
                </Col>
            </Row>
        </Card>
    );
}
