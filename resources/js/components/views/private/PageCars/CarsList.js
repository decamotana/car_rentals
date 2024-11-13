import { Button, Col, Row } from "antd";
import React from "react";
import CarTable from "./Components/CarTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import { useNavigate } from "react-router-dom";

export default function CarsList() {
    const navigate = useNavigate();
    return (
        <>
            <Row gutter={[12, 12]}>
                <Col xs={24} sm={24} md={24}>
                    <Button
                        className=" btn-main-primary btn-main-invert-outline b-r-none"
                        icon={<FontAwesomeIcon icon={faPlus} />}
                        onClick={() => navigate(`/cars/add`)}
                        size="large"
                        name="btn_add"
                    >
                        Add Cars
                    </Button>
                </Col>

                <Col xs={24} sm={24} md={24}>
                    <CarTable
                    // dataSource={dataSource}
                    // tableFilter={tableFilter}
                    // setTableFilter={setTableFilter}
                    // sortInfo={sortInfo}
                    // setSortInfo={setSortInfo}
                    />
                </Col>
            </Row>
        </>
    );
}
