import {
    Row,
    Col,
    Table,
    Button,
    notification,
    Popconfirm,
    Tooltip,
    Image,
} from "antd";
import { POST, GET, DELETE } from "../../../../providers/useAxiosQuery";
import {
    TableGlobalSearch,
    TablePageSize,
    TablePagination,
    TableShowingEntries,
} from "../../../../providers/CustomTableFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPencil,
    faTrash,
    faUserGear,
} from "@fortawesome/pro-regular-svg-icons";
import notificationErrors from "../../../../providers/notificationErrors";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function TableUser(props) {
    const { dataSource, tableFilter, setTableFilter, sortInfo } = props;

    const navigate = useNavigate();

    console.log("datasource >", dataSource);

    const { mutate: mutateDeactivateUser, loading: loadingDeactivateUser } =
        DELETE(`api/users`, "user_list");

    const handleDeactivate = (record) => {
        // console.log("record >", record);
        mutateDeactivateUser(record, {
            onSuccess: (res) => {
                if (res.success) {
                    notification.success({
                        message: "User",
                        description: res.message,
                    });
                } else {
                    notification.error({
                        message: "User",
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
                    dataSource={dataSource && dataSource.data.data}
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
                                            onClick={() => {
                                                navigate(
                                                    `${location.pathname}/permission/${record.id}`
                                                );
                                            }}
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
                                                loading={loadingDeactivateUser}
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
                        key="profile"
                        dataIndex="profile"
                        render={(profile) => {
                            const attachments = profile?.attachments || [];

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
            <Col xs={24} sm={24} md={24}>
                <div className="tbl-bottom-filter">
                    <TableShowingEntries />
                    <TablePagination
                        tableFilter={tableFilter}
                        setTableFilter={setTableFilter}
                        setPaginationTotal={dataSource?.data.total}
                        showLessItems={true}
                        showSizeChanger={false}
                        tblIdWrapper="tbl_wrapper"
                    />
                </div>
            </Col>
        </Row>
    );
}
