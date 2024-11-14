import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import CarTable from "./Components/CarTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { GET } from "../../../providers/useAxiosQuery";

export default function CarsList() {
    const navigate = useNavigate();
    const location = useLocation();

    const [sortInfo, setSortInfo] = useState({
        order: "descend",
        columnKey: "created_at",
        status: location.pathname === "/cars" ? "Active" : "Deactivated",
    });

    const [tableFilter, setTableFilter] = useState({
        page: 1,
        page_size: 50,
        search: "",
        sort_field: "created_at",
        sort_order: "desc",
        status: "Active",
        from: location.pathname,
    });

    useEffect(() => {
        setTableFilter({
            page: 1,
            page_size: 50,
            search: "",
            sort_field: "created_at",
            sort_order: "desc",
            status:
                location.pathname === "/cars/current"
                    ? "Active"
                    : "Deactivated",
            from: location.pathname,
        });

        setSortInfo({
            order: "descend",
            columnKey: "created_at",
        });

        return () => {};
    }, [location]);

    const { data: dataSource, refetch: refetchSource } = GET(
        `api/cars?${new URLSearchParams(tableFilter)}`,
        "car_list"
    );

    useEffect(() => {
        refetchSource();

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableFilter]);

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
                        dataSource={dataSource}
                        tableFilter={tableFilter}
                        setTableFilter={setTableFilter}
                        sortInfo={sortInfo}
                        setSortInfo={setSortInfo}
                    />
                </Col>
            </Row>
        </>
    );
}
