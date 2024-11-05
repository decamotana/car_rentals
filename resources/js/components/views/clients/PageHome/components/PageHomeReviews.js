import React from "react";
import { Avatar, Button, Card, Col, Divider, Row, Typography } from "antd";
import MuxClient from "../../../../../../../resources/images/MuxClient.jpg";
import RaptorClient from "../../../../../../../resources/images/raptorClient.jpg";
import NissanClient from "../../../../../../../resources/images/nissanClient.jpg";
import FortunerClient from "../../../../../../../resources/images/fortunerClient.jpg";

export default function PageHomeReviews(props) {
    const {} = props;

    const contentStyle = {
        height: "160px",
        color: "#fff",
        lineHeight: "160px",
        textAlign: "center",
        background: "#364d79",
    };
    const cardImage = {
        height: "285px",
    };

    return (
        <Card className="mt-15">
            <Divider
                style={{
                    borderColor: "#000",
                }}
            >
                <Typography.Title className="mb-0">Reviews</Typography.Title>
            </Divider>
            <Row gutter={24}>
                <Col xs={24} sm={24} md={6}>
                    <Card
                        style={cardImage}
                        cover={<img alt="example" src={MuxClient} />}
                    >
                        <Card.Meta
                            avatar={
                                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                            }
                            title="Chow You"
                            description="Very accommodating and proactive service"
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={6}>
                    <Card
                        style={cardImage}
                        cover={<img alt="example" src={RaptorClient} />}
                    >
                        <Card.Meta
                            avatar={
                                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                            }
                            title="Henry Lim"
                            description="Very satisfaction and affordable price"
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={6}>
                    <Card
                        style={cardImage}
                        cover={<img alt="example" src={FortunerClient} />}
                    >
                        <Card.Meta
                            avatar={
                                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                            }
                            title="Lailah Chu"
                            description="Suitability is very satisfying"
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={6}>
                    <Card
                        style={cardImage}
                        cover={<img alt="example" src={NissanClient} />}
                    >
                        <Card.Meta
                            avatar={
                                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                            }
                            title="Henryx Day"
                            description="fast and smooth transaction"
                        />
                    </Card>
                </Col>
            </Row>
        </Card>
    );
}
