import React from "react";
import { Button, Card, Carousel, Col, Row, Typography } from "antd";
import ContactUs from "../../../../../../resources/images/contact.jpg";

export default function Contacts() {
    return (
        <Card className="mt-15">
            <Row gutter={24}>
                <Col xs={24} sm={24} md={12}>
                    <Typography.Title>Contact Us</Typography.Title>
                    <img
                        src={ContactUs}
                        alt="Contact us"
                        style={{
                            width: "100%",
                            maxWidth: "500px",
                            height: "auto",
                            margin: "20px 0",
                        }}
                    />
                </Col>
                <Col xs={24} sm={24} md={12}>
                    <h1>ADDRESS:</h1>
                    <h5>
                        R. Calo st. Butuan City, Agusan del Norte 8600,
                        Philippines
                    </h5>
                    <h1>EMAIL:</h1>
                    <h5>J&A@GMAIL.COM</h5>
                    <h1>MOBILE:</h1>
                    <h5>(SMART)+63 91 234 5678</h5>
                    <h5>(GLOBE)+63 98 765 4321</h5>
                    <h1>MAP:</h1>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1970.7179326062667!2d125.54055584669024!3d8.955310462983022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3301c06a82fe61ed%3A0xb4fe2953757873a1!2sR.%20Calo%2C%20Butuan%20City%2C%20Agusan%20Del%20Norte!5e0!3m2!1sen!2sph!4v1726687862269!5m2!1sen!2sph"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                </Col>
            </Row>
        </Card>
    );
}
