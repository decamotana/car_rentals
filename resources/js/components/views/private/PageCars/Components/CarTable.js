import { faPencil, faTrash } from "@fortawesome/pro-regular-svg-icons";
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
import React from "react";
import {
    TablePagination,
    TableShowingEntries,
} from "../../../../providers/CustomTableFilter";

export default function CarTable() {
    return (
        <Row gutter={[12, 12]} id="tbl_wrapper">
            <Col xs={24} sm={24} md={24}>
                <div className="tbl-top-filter">
                    {/* <TablePageSize
                        tableFilter={tableFilter}
                        setTableFilter={setTableFilter}
                    />
                    <TableGlobalSearch
                        tableFilter={tableFilter}
                        setTableFilter={setTableFilter}
                    /> */}
                </div>
            </Col>
            <Col xs={24} sm={24} md={24}>
                <Table
                    className="ant-table-default ant-table-striped"
                    // dataSource={dataSource && dataSource.data.data}
                    // rowKey={(record) => record.id}
                    pagination={false}
                    bordered={false}
                    // onChange={onChangeTable}
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
                        title="Start Date"
                        key="created_at"
                        dataIndex="created_at"
                        render={(text, _) =>
                            text ? dayjs(text).format("MM/DD/YYYY") : ""
                        }
                        sorter
                    />
                    <Table.Column
                        title="Email"
                        key="email"
                        dataIndex="email"
                        sorter={true}
                    />
                    <Table.Column
                        title="Username"
                        key="username"
                        dataIndex="username"
                        sorter
                    />
                    <Table.Column
                        title="Type"
                        key="type"
                        dataIndex="type"
                        sorter
                    />
                    <Table.Column
                        title="Role"
                        key="role"
                        dataIndex="role"
                        sorter={true}
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
