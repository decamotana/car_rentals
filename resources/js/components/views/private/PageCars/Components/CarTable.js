import {
    faPencil,
    faTrash,
    faUserGear,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Col,
    notification,
    Popconfirm,
    Row,
    Table,
    Tooltip,
} from "antd";
import React, { useState } from "react";
import {
    TableGlobalSearch,
    TablePageSize,
    TablePagination,
    TableShowingEntries,
} from "../../../../providers/CustomTableFilter";
import { userData } from "../../../../providers/companyInfo";
import { useLocation, useNavigate } from "react-router-dom";
import notificationErrors from "../../../../providers/notificationErrors";

export default function CarTable(props) {
    const { dataSource, tableFilter, setTableFilter, sortInfo } = props;
    console.log("asd", dataSource);
    const navigate = useNavigate();

    // const { mutate: mutateDeactivateUser, loading: loadingDeactivateUser } =
    //     DELETE(`api/cars`, "car_list");

    // const handleDeactivate = (record) => {
    //     console.log("record >", record);
    //     mutateDeactivateUser(record, {
    //         onSuccess: (res) => {
    //             if (res.success) {
    //                 notification.success({
    //                     message: "User",
    //                     description: res.message,
    //                 });
    //             } else {
    //                 notification.error({
    //                     message: "User",
    //                     description: res.message,
    //                 });
    //             }
    //         },
    //         onError: (err) => {
    //             notificationErrors(err);
    //         },
    //     });
    // };

    const onChangeTable = (pagination, filters, sorter) => {
        setTableFilter((ps) => ({
            ...ps,
            sort_field: sorter.columnKey,
            sort_order: sorter.order ? sorter.order.replace("end", "") : null,
            page: 1,
            page_size: "50",
        }));
    };

    return (
        <Row gutter={[12, 12]} id="tbl_wrapper">
            <Col xs={24} sm={24} md={24}>
                <div className="tbl-top-filter">
                    <TablePageSize
                        tableFilter={tableFilter}
                        setTableFilter={setTableFilter}
                    />
                    <TableGlobalSearch
                        tableFilter={tableFilter}
                        setTableFilter={setTableFilter}
                    />
                </div>
            </Col>
            <Col xs={24} sm={24} md={24}>
                <Table
                    className="ant-table-default ant-table-striped"
                    dataSource={dataSource && dataSource?.data.data}
                    rowKey={(record) => record.id}
                    pagination={false}
                    bordered={false}
                    onChange={onChangeTable}
                    scroll={{ x: "max-content" }}
                >
                    <Table.Column
                        title="Action"
                        key="action"
                        dataIndex="action"
                        align="center"
                        render={(text, record) => {
                            return (
                                <>
                                    <Tooltip title="Edit Permission">
                                        <Button
                                            type="link"
                                            className="btn-info"
                                            // onClick={() => {
                                            //     navigate(
                                            //         `${location.pathname}/permission/${record.id}`
                                            //     );
                                            // }}
                                            name="btn_edit_permission"
                                        >
                                            <FontAwesomeIcon
                                                icon={faUserGear}
                                            />
                                        </Button>
                                    </Tooltip>

                                    <Tooltip title="Edit Profile">
                                        <Button
                                            type="link"
                                            className="text-primary"
                                            // onClick={() => {
                                            //     navigate(
                                            //         `${location.pathname}/edit/${record.id}`
                                            //     );
                                            // }}
                                            name="btn_edit"
                                        >
                                            <FontAwesomeIcon icon={faPencil} />
                                        </Button>
                                    </Tooltip>

                                    <Popconfirm
                                        title="Are you sure to deactivate this data?"
                                        // onConfirm={() => {
                                        //     handleDeactivate(record);
                                        // }}
                                        onCancel={() => {
                                            notification.error({
                                                message: "User",
                                                description:
                                                    "Data not deactivated",
                                            });
                                        }}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Tooltip title="Delete User">
                                            <Button
                                                type="link"
                                                className="text-danger"
                                                // loading={loadingDeactivateUser}
                                                name="btn_delete"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                />
                                            </Button>
                                        </Tooltip>
                                    </Popconfirm>
                                </>
                            );
                        }}
                    />
                    <Table.Column
                        title="Make"
                        key="name"
                        dataIndex="name"
                        // render={(text, _) =>
                        //     text ? dayjs(text).format("MM/DD/YYYY") : ""
                        // }
                        sorter={true}
                    />
                    <Table.Column
                        title="Model"
                        key="type"
                        dataIndex="type"
                        // sorter={true}
                    />
                    <Table.Column
                        title="Variant"
                        key="variant"
                        dataIndex="variant"
                        // sorter
                    />
                    <Table.Column
                        title="Year"
                        key="year_model"
                        dataIndex="year_model"
                        // sorter
                    />
                </Table>
            </Col>
            {/* <Col xs={24} sm={24} md={24}>
                <div className="tbl-bottom-filter">
                    <TableShowingEntries />
                    <TablePagination
                    // tableFilter={tableFilter}
                    // setTableFilter={setTableFilter}
                    // setPaginationTotal={dataSource?.data.total}
                    // showLessItems={true}
                    // showSizeChanger={false}
                    // tblIdWrapper="tbl_wrapper"
                    />
                </div>
            </Col> */}
        </Row>
    );
}
