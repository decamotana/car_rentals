import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GET } from "../../../providers/useAxiosQuery";
import ReservedTable from "./Components/ReservedTable";
import { Col, Row } from "antd";

export default function ReservationList() {
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
        status: "to verify",
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

    const { data: dataSource } = GET(
        `api/booking?${new URLSearchParams(tableFilter)}`,
        "Booking_list"
    );

    useEffect(() => {
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableFilter]);

    return (
        <>
            <Row gutter={[12, 12]}>
                <Col xs={24} sm={24} md={24}>
                    <ReservedTable
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
