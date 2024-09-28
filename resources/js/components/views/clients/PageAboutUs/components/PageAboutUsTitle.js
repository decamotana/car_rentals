import React from "react";
import { Button, Card, Carousel, Col, Row, Typography } from "antd";

export default function PageAboutUsTitle(props) {
    const {} = props;

    return (
        <Card className="mt-15">
            <Row gutter={24}>
                <Col xs={24} sm={24} md={24}>
                    <Typography.Title>
                        Check our Available Car Model <br /> below for your
                        booking reservation
                    </Typography.Title>
                </Col>
            </Row>
        </Card>
    );
}
