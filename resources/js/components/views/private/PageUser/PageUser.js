import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Button, Col } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";

import { GET } from "../../../providers/useAxiosQuery";
import TableUser from "./components/TableUser";

export default function PageUser() {
    const navigate = useNavigate();
    const location = useLocation();

    const [sortInfo, setSortInfo] = useState({
        order: "descend",
        columnKey: "created_at",
        status:
            location.pathname === "/users/current" ? "Active" : "Deactivated",
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
                location.pathname === "/users/current"
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
        `api/users?${new URLSearchParams(tableFilter)}`,
        "user_list"
    );

    useEffect(() => {
        refetchSource();

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableFilter]);

    return (
        <>
            <Row gutter={[12, 12]}>
                {location.pathname === "/users" ? (
                    <Col xs={24} sm={24} md={24}>
                        <Button
                            className=" btn-main-primary btn-main-invert-outline b-r-none"
                            icon={<FontAwesomeIcon icon={faPlus} />}
                            onClick={() => navigate(`/users/current/add`)}
                            size="large"
                            name="btn_add"
                        >
                            Add User
                        </Button>
                    </Col>
                ) : null}

                <Col xs={24} sm={24} md={24}>
                    <TableUser
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
