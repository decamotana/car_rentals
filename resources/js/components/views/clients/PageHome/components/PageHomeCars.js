import React from "react";
import { Button, Card, Carousel, Col, Row, Typography } from "antd";
import Fortuner from "../../../../../../../resources/images/Fortuner.jpg";
import Mux from "../../../../../../../resources/images/mux.jpg";
import Raptor from "../../../../../../../resources/images/raptor.jpg";
import NissanProx from "../../../../../../../resources/images/NissanProx.jpg";
import { useNavigate } from "react-router-dom";

export default function PageHomeCars(props) {
    const {} = props;
    const Navigate = useNavigate();

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

    const reservedClick = () => {
        Navigate("/sign-up");
        // alert("Welcome to sign-in");
        // console.log('Register');
        // history(`$`);
    };

    return (
        <Card className="mt-15">
            <Row gutter={24}>
                <Col xs={24} sm={24} md={12}>
                    <Typography.Title>
                        Welcome to J&A Car Rental
                    </Typography.Title>

                    <Button
                        className="btn-main-primary"
                        onClick={reservedClick}
                    >
                        Sign up now for Reservation
                    </Button>
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
