import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { POST } from "../../../../providers/useAxiosQuery";
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
import notificationErrors from "../../../../providers/notificationErrors";
import {
    TableGlobalSearch,
    TablePageSize,
} from "../../../../providers/CustomTableFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPencil,
    faThumbsUp,
    faTrash,
} from "@fortawesome/pro-light-svg-icons";
import { faThumbsDown } from "@fortawesome/pro-solid-svg-icons";
import { text } from "@fortawesome/fontawesome-svg-core";

export default function ReservedTable(props) {
    const { dataSource, tableFilter, setTableFilter, sortInfo } = props;
    const navigate = useNavigate();
    const params = useParams();

    // console.log("datasource >", dataSource);

    const { mutate: mutateApprovedReserved, loading: loadingApprovedReserved } =
        POST(`api/approve_car_reserved`, "Booking_list");

    const handleApproveReservation = (record) => {
        mutateApprovedReserved(
            {
                id: record,
                status: "Deactivate",
            },
            {
                onSuccess: (res) => {
                    if (res.success) {
                        notification.success({
                            message: "Reservation approved",
                            description: res.message,
                        });
                        navigate("/reservation");
                    }
                },
                onError: (err) => {
                    notificationErrors(err);
                },
            }
        );
    };

    const { mutate: mutateDeactivateUser, loading: loadingDeactivateUser } =
        POST(`api/delete_car_list`, "add_car_list");

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
                                    <Tooltip title="Approved">
                                        <Button
                                            type="link"
                                            className="text-primary"
                                            onClick={() => {
                                                handleApproveReservation(
                                                    record.id
                                                );
                                            }}
                                            loading={loadingApprovedReserved}
                                            // onClick={() => {
                                            //     navigate(
                                            //         `${location.pathname}/edit/${record.id}`
                                            //     );
                                            // }}
                                            name="btn_edit"
                                        >
                                            <FontAwesomeIcon
                                                icon={faThumbsUp}
                                            />
                                        </Button>
                                    </Tooltip>

                                    <Tooltip title="Disapproved">
                                        <Button
                                            type="link"
                                            className="text-primary"
                                            name="btn_edit"
                                        >
                                            <FontAwesomeIcon
                                                icon={faThumbsDown}
                                            />
                                        </Button>
                                    </Tooltip>
                                </>
                            );
                        }}
                    />
                    <Table.Column
                        title="Car Profile"
                        key="carAttachments"
                        dataIndex="cars"
                        render={(cars) => {
                            if (
                                cars &&
                                cars.attachments &&
                                cars.attachments.length > 0
                            ) {
                                // const sortedAttachments = attachments.sort(
                                //     (a, b) => b.id - a.id
                                // );
                                const profilePic = cars.attachments.find(
                                    (att) => att.file_type === "image"
                                );
                                return profilePic ? (
                                    <Image
                                        src={`/${profilePic.file_path}`}
                                        alt={
                                            profilePic.file_name ||
                                            "Car Profile Picture"
                                        }
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
                                    "No Image"
                                );
                            } else {
                                return "No Image";
                            }
                        }}
                        sorter={true}
                    />

                    <Table.Column
                        title="Model"
                        key="brand_name"
                        dataIndex={["cars", "brand_name"]}
                        render={(brandName) => brandName || "None"}
                        // sorter={true}
                    />
                    <Table.Column
                        title="Type"
                        key="type"
                        dataIndex={["cars", "type"]}
                        render={(type) => type || "None"}
                        // sorter
                    />
                    <Table.Column
                        title="Departure"
                        key="departure"
                        render={(text, record) => {
                            const date = record.date_start;
                            const time = record.time_start;
                            return date && time ? `${date} ${time}` : "None";
                        }}
                        sorter={true}
                    />
                    <Table.Column
                        title="Return"
                        key="return"
                        render={(text, record) => {
                            const date = record.date_end;
                            const time = record.time_end;
                            return date && time ? `${date} ${time}` : "None";
                        }}
                        sorter={true}
                    />
                    <Table.Column
                        title="User Profile"
                        key="userAttachments"
                        dataIndex="users"
                        render={(users) => {
                            const { profile } = users || {};
                            if (
                                profile &&
                                profile.attachments &&
                                profile.attachments.length > 0
                            ) {
                                // const sortedAttachments = attachments.sort(
                                //     (a, b) => b.id - a.id
                                // );
                                const profilePic = profile.attachments.find(
                                    (att) => att.file_type === "image"
                                );
                                return profilePic ? (
                                    <Image
                                        src={`/${profilePic.file_path}`}
                                        alt={
                                            profilePic.file_name ||
                                            "User Profile Picture"
                                        }
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
                        title="Reserved By"
                        key="reserveby"
                        render={(text, record) => {
                            const { users } = record;
                            const { firstname, lastname } = users.profile || {};
                            return firstname && lastname
                                ? `${firstname} ${lastname}`
                                : "None";
                        }}
                        sorter={true}
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
