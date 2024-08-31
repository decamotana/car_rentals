import React from "react";
import { Avatar, Button, Card, Col, Divider, Row, Typography } from "antd";

export default function PageHomeReviews(props) {
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
                <Typography.Title className="mb-0">Reviews</Typography.Title>
            </Divider>
            <Row gutter={24}>
                <Col xs={24} sm={24} md={6}>
                    <Card
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                    >
                        <Card.Meta
                            avatar={
                                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                            }
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={6}>
                    <Card
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                    >
                        <Card.Meta
                            avatar={
                                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                            }
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={6}>
                    <Card
                        cover={
                            <img
                                alt="example"
                                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                            />
                        }
                    >
                        <Card.Meta
                            avatar={
                                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                            }
                            title="Card title"
                            description="This is the description"
                        />
                    </Card>
                </Col>
            </Row>
        </Card>
    );
}
