import React from "react";
import { Button, Card, Carousel, Col, Row, Typography } from "antd";

export default function PageHomeCars(props) {
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
            <Row gutter={24}>
                <Col xs={24} sm={24} md={12}>
                    <Typography.Title>
                        Welcome to J&A Car Renta
                    </Typography.Title>

                    <Button className="btn-main-primary">
                        Sign up now for Reservation
                    </Button>
                </Col>
                <Col xs={24} sm={24} md={12}>
                    <Carousel autoplay>
                        <div>
                            <h3 style={contentStyle}>1</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>2</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>3</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>4</h3>
                        </div>
                    </Carousel>
                </Col>
            </Row>
        </Card>
    );
}
