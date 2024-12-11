import {
    faPencil,
    faTrash,
    faUserGear,
} from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    Button,
    Col,
    Image,
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import notificationErrors from "../../../../providers/notificationErrors";
import { DELETE, POST } from "../../../../providers/useAxiosQuery";

export default function CarTable(props) {
    const { dataSource, tableFilter, setTableFilter, sortInfo } = props;
    const navigate = useNavigate();
    const params = useParams();

    console.log("datasource >", dataSource);

    const { mutate: mutateDeactivateUser, loading: loadingDeleteCar } = POST(
        `api/delete_car_list`,
        "add_car_list"
    );

    const handleDeactivate = (record) => {
        console.log("record >", record);
        mutateDeactivateUser(record, {
            onSuccess: (res) => {
                if (res.success) {
                    notification.success({
                        message: "Car",
                        description: res.message,
                    });
                } else {
                    notification.error({
                        message: "Car",
                        description: res.message,
                    });
                }
            },
            onError: (err) => {
                notificationErrors(err);
            },
        });
    };

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
                    dataSource={dataSource && dataSource?.data?.data}
                    // dataSource={
                    //     dataSource &&
                    //     dataSource?.data.map((car) => ({
                    //         ...car,
                    //         attachments: car.attachments || [], // Ensure attachments are present
                    //     }))
                    // }
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
                                    <Tooltip title="Edit Profile">
                                        <Button
                                            type="link"
                                            className="text-primary"
                                            onClick={() => {
                                                navigate(
                                                    `${location.pathname}/edit/${record.id}`
                                                );
                                            }}
                                            name="btn_edit"
                                        >
                                            <FontAwesomeIcon icon={faPencil} />
                                        </Button>
                                    </Tooltip>

                                    <Popconfirm
                                        title="Are you sure to deactivate this data?"
                                        onConfirm={() => {
                                            handleDeactivate(record);
                                        }}
                                        onCancel={() => {
                                            notification.error({
                                                message: "Car",
                                                description:
                                                    "Data not deactivated",
                                            });
                                        }}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Tooltip title="Delete Car">
                                            <Button
                                                type="link"
                                                className="text-danger"
                                                loading={loadingDeleteCar}
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
                        title="Profile"
                        key="attachments"
                        dataIndex="attachments"
                        render={(attachments) => {
                            if (attachments && attachments.length > 0) {
                                const sortedAttachments = attachments.sort(
                                    (a, b) => b.id - a.id
                                );
                                const profilePic = sortedAttachments.find(
                                    (att) => att.file_type === "image"
                                );
                                return profilePic ? (
                                    <Image
                                        src={`/${profilePic.file_path}`}
                                        alt={profilePic.file_name}
                                        width={50}
                                        height={50}
                                        style={{
                                            objectFit: "cover",
                                            borderRadius: "50%",
                                        }}
                                        preview={{
                                            src: `/${profilePic.file_path}`, // Path for full preview
                                        }}
                                    />
                                ) : (
                                    "No profile picture"
                                );
                            } else {
                                return "No profile picture";
                            }
                        }}
                        sorter={true}
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
                        key="brand_name"
                        dataIndex="brand_name"
                        // sorter={true}
                    />
                    <Table.Column
                        title="Type"
                        key="type"
                        dataIndex="type"
                        // sorter
                    />
                    <Table.Column
                        title="Year"
                        key="year_model"
                        dataIndex="year_model"
                        // sorter
                    />
                    <Table.Column
                        title="Passengers"
                        key="passengers"
                        dataIndex="passengers"
                        // sorter
                    />
                    <Table.Column
                        title="Rates"
                        key="rates"
                        dataIndex="rates"
                        // sorter
                    />
                    <Table.Column
                        title="Description"
                        key="description"
                        dataIndex="description"
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
