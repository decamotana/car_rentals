import React from "react";
import { Button, Card, Carousel, Col, Row, Typography } from "antd";
import About_Us from "../../../../../../resources/images/about.jpg";

export default function Detail() {
    return (
        <Card className="mt-15">
            <Row gutter={24}>
                <Col xs={24} sm={24} md={12}>
                    <Typography.Title>About Us</Typography.Title>
                    <img
                        src={About_Us}
                        alt="About Us"
                        style={{
                            width: "100%",
                            maxWidth: "500px",
                            height: "auto",
                            margin: "20px 0",
                        }}
                    />
                </Col>
                <Col xs={24} sm={24} md={12}>
                    <h1>
                        Taking care of our customers, our communities, our
                        employees and our environment.
                    </h1>
                    <h5>
                        Culture and hard work created J&A Rent-A-Car is an
                        ongoing American success story. Our guiding principles,
                        and humble beginning, revolve around personal honesty
                        and integrity. We believe in strengthening our
                        communities one neighborhood at a time, serving our
                        customers as if they were our family, and rewarding hard
                        work. These things are as true today as they were when
                        we were founded in 1957. Today, our massive network
                        means Enterprise is the largest transportation solutions
                        provider. We offer car and truck rentals, as well as car
                        sharing and car sales. We're there when you need us with
                        over 8,000 locations worldwide. We take an active role
                        in sustainability, not only because it’s smart for our
                        business, but because we believe in making the world a
                        better place for future generations. Because of our
                        size, we are in a unique position to foster innovation,
                        advance research and test market-driven solutions.
                    </h5>
                </Col>
            </Row>
        </Card>
    );
}
