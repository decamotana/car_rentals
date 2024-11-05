import React from "react";
import { Button, Card, Carousel, Col, Dropdown, Row, Typography } from "antd";
import Fortuner from "../../../../../../resources/images/Fortuner.jpg";
import NissanProx from "../../../../../../resources/images/nissanProx.jpg";
import Raptor from "../../../../../../resources/images/raptor.jpg";
import Mux from "../../../../../../resources/images/mux.jpg";
import { CarOutlined, UserOutlined } from "@ant-design/icons";
const { Meta } = Card;
const cardData = [
    {
        title: "Toyota | Fortuner",
        description: "This is a detailed description for Europe Street beat.",
        image: Fortuner,
    },
    {
        title: "Nissan | Pro 4x Pick-up",
        description: "This is a detailed description for Street Art Festival.",
        image: NissanProx,
    },
    {
        title: "Ford | Raptor",
        description: "This is a detailed description for Mountain Adventure.",
        image: Raptor,
    },
    {
        title: "Isuzu | Mux",
        description: "This is a detailed description for Mountain Adventure.",
        image: Mux,
    },
    {
        title: "Toyota | Fortuner",
        description: "This is a detailed description for Europe Street beat.",
        image: Fortuner,
    },
    {
        title: "Nissan | Pro 4x Pick-up",
        description: "This is a detailed description for Street Art Festival.",
        image: NissanProx,
    },
    {
        title: "Ford | Raptor",
        description: "This is a detailed description for Mountain Adventure.",
        image: Raptor,
    },
    {
        title: "Isuzu | Mux",
        description: "This is a detailed description for Mountain Adventure.",
        image: Mux,
    },
];

export default function PageToyotaCars(props) {
    const {} = props;

    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "97px" }}>
            {cardData.map((card, index) => (
                <Card
                    key={index}
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt={card.title} src={card.image} />}
                >
                    <Meta title={card.title} description={card.description} />
                </Card>
            ))}
        </div>
    );
}
