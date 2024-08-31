import React from "react";
import { Card, Col, Row } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAddressCard,
    faFileLines,
    faUserHeadset,
} from "@fortawesome/pro-regular-svg-icons";

export default function PageHomeInfos(props) {
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
                <Col xs={24} sm={24} md={8}>
                    <Card className="w-100 r-shadow" bordered={false}>
                        <Card.Meta
                            avatar={
                                <FontAwesomeIcon
                                    icon={faAddressCard}
                                    className="font-80px"
                                />
                            }
                            title="Atleast two"
                            description="Valid Id`s"
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={8}>
                    <Card className="w-100 r-shadow" bordered={false}>
                        <Card.Meta
                            avatar={
                                <FontAwesomeIcon
                                    icon={faFileLines}
                                    className="font-80px"
                                />
                            }
                            title="Proof of billing"
                            description="100 secure payment"
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={8}>
                    <Card className="w-100 r-shadow" bordered={false}>
                        <Card.Meta
                            avatar={
                                <FontAwesomeIcon
                                    icon={faUserHeadset}
                                    className="font-80px"
                                />
                            }
                            title="24/7 support"
                            description="call us anytime"
                        />
                    </Card>
                </Col>
            </Row>
        </Card>
    );
}
