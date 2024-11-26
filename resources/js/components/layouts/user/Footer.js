import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faCar, faEnvelope, faPhone } from "@fortawesome/pro-regular-svg-icons";
import { faEnvelopeCircle } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Layout, Row, Space, Typography } from "antd";

export default function Footer() {
    return (
        <Layout.Footer style={{ textAlign: "center" }}>
            <Row gutter={24} justify={"center"}>
                <Col xs={24} sm={24} md={24} lg={18} xl={14}>
                    <Row gutter={24}>
                        <Col xs={24} sm={24} md={8} className="text-left mb-15">
                            <Typography.Title level={3}>
                                <FontAwesomeIcon
                                    icon={faCar}
                                    className="mr-5"
                                />{" "}
                                J&A Car Rental
                            </Typography.Title>

                            <Typography.Paragraph>
                                R.Calo St. Butuan City
                                <br />
                                Agusan Del Norte 8600, Philippines
                            </Typography.Paragraph>
                        </Col>
                        <Col xs={24} sm={24} md={8} className="text-left mb-15">
                            <Typography.Title level={3}>
                                CONTACT US
                            </Typography.Title>

                            {/* \ (Globe) +63 123 4567 891 */}
                            <Typography.Link href="tel:+631234567891">
                                <FontAwesomeIcon
                                    icon={faPhone}
                                    className="mr-5"
                                />
                                (Globe) +63 123 4567 891
                            </Typography.Link>
                            <br />

                            {/*  (Smart) +63 123 4567 890 */}
                            <Typography.Link href="tel:+631234567890">
                                <FontAwesomeIcon
                                    icon={faPhone}
                                    className="mr-5"
                                />
                                (Smart) +63 123 4567 890
                            </Typography.Link>
                            <br />

                            {/*   jrarental0@gmail.com */}
                            <Typography.Link href="mailto: jrarental0@gmail.com">
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="mr-5"
                                />
                                jrarental0@gmail.com
                            </Typography.Link>
                        </Col>
                        <Col xs={24} sm={24} md={8} className="text-left mb-15">
                            <Space className="mb-15">
                                <FontAwesomeIcon
                                    className="font-30px"
                                    style={{
                                        color: "#fff",
                                    }}
                                    icon={faFacebook}
                                />
                                <FontAwesomeIcon
                                    className="font-30px"
                                    style={{
                                        color: "#fff",
                                    }}
                                    icon={faEnvelopeCircle}
                                />
                            </Space>

                            <Typography.Paragraph>
                                © 2023-2024 J&A Car Rental.
                            </Typography.Paragraph>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Layout.Footer>
    );
}
