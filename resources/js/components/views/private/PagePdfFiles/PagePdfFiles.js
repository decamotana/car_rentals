import { useEffect, useState } from "react";
import { Button, Checkbox, Col, Popconfirm, Row, Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus } from "@fortawesome/pro-regular-svg-icons";

import { GET, POST } from "../../../providers/useAxiosQuery";
import {
    TableDropdownFilter,
    TableGlobalSearchAnimated,
    TablePageSize,
    TablePagination,
    TableShowingEntries,
} from "../../../providers/CustomTableFilter";
import notificationErrors from "../../../providers/notificationErrors";
import ModalPdfFileForm from "./components/ModalPdfFileForm";
import ModalPdfFilePreview from "./components/ModalPdfFilePreview";
import { apiUrl } from "../../../providers/companyInfo";

export default function PagePdfFiles() {
    const [toggleModalPdfFilePreview, setToggleModalPdfFilePreview] = useState({
        open: false,
        data: null,
    });

    const [toggleModalPdfFileForm, setToggleModalPdfFileForm] = useState({
        open: false,
        data: null,
    });

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [tableFilter, setTableFilter] = useState({
        page: 1,
        page_size: 50,
        search: "",
        sort_field: "created_at_formatted",
        sort_order: "desc",
        status: ["Active"],
    });

    const { data: dataSource, refetch: refetchSource } = GET(
        `api/pdf_file?${new URLSearchParams(tableFilter)}`,
        "pdf_file_list"
    );

    const onChangeTable = (pagination, filters, sorter) => {
        setTableFilter((prevState) => ({
            ...prevState,
            sort_field: sorter.columnKey,
            sort_order: sorter.order ? sorter.order.replace("end", "") : null,
            page: 1,
            page_size: "50",
        }));
    };

    useEffect(() => {
        if (dataSource) {
            refetchSource();
        }

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tableFilter]);

    const { mutate: mutateDeletePDFFile, loading: loadingDeletePDFFile } = POST(
        `api/multiple_archived_pdf_file`,
        "pdf_file_list"
    );

    const handleSelectedArchived = (status) => {
        let data = {
            status,
            ids: selectedRowKeys,
        };
        mutateDeletePDFFile(data, {
            onSuccess: (res) => {
                if (res.success) {
                    notification.success({
                        message: "Faculty Monitoring",
                        description: res.message,
                    });
                } else {
                    notification.error({
                        message: "Faculty Monitoring",
                        description: res.message,
                    });
                }
            },
            onError: (err) => {
                notificationErrors(err);
            },
        });
    };

    return (
        <Row gutter={[12, 12]}>
            <Col xs={24} sm={24} md={24}>
                <Button
                    className="btn-main-primary btn-main-invert-outline b-r-none"
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    onClick={() =>
                        setToggleModalPdfFileForm({ open: true, data: null })
                    }
                    name="btn_add"
                >
                    Upload PDF File
                </Button>
            </Col>
            <Col xs={24} sm={24} md={24}>
                <div className="tbl-top-filter">
                    <div
                        style={{
                            display: "flex",
                            gap: 8,
                        }}
                    >
                        <TableDropdownFilter
                            items={[
                                {
                                    key: "1",
                                    label: (
                                        <>
                                            <Checkbox
                                                id="chck_archived"
                                                checked={
                                                    tableFilter.status.filter(
                                                        (f) => f === "Archived"
                                                    ).length > 0
                                                }
                                                onChange={(e) => {
                                                    let tableFilterCopy =
                                                        tableFilter;
                                                    let status =
                                                        tableFilterCopy.status;
                                                    let statusFilter =
                                                        tableFilterCopy.status.filter(
                                                            (f) =>
                                                                f === "Archived"
                                                        );
                                                    if (e.target.checked) {
                                                        if (
                                                            statusFilter.length ===
                                                            0
                                                        ) {
                                                            status.push(
                                                                "Archived"
                                                            );
                                                        }
                                                    } else {
                                                        status = status.filter(
                                                            (f) =>
                                                                f !== "Archived"
                                                        );
                                                    }

                                                    setTableFilter((ps) => ({
                                                        ...ps,
                                                        status,
                                                    }));

                                                    setSelectedRowKeys([]);
                                                }}
                                            />
                                            <label htmlFor="chck_archived">
                                                Archived
                                            </label>
                                        </>
                                    ),
                                },
                                {
                                    key: "2",
                                    label: (
                                        <>
                                            <Checkbox
                                                id="chck_active"
                                                checked={
                                                    tableFilter.status.filter(
                                                        (f) => f === "Active"
                                                    ).length > 0
                                                }
                                                onChange={(e) => {
                                                    let tableFilterCopy =
                                                        tableFilter;
                                                    let status =
                                                        tableFilterCopy.status;
                                                    let statusFilter =
                                                        tableFilterCopy.status.filter(
                                                            (f) =>
                                                                f === "Active"
                                                        );
                                                    if (e.target.checked) {
                                                        if (
                                                            statusFilter.length ===
                                                            0
                                                        ) {
                                                            status.push(
                                                                "Active"
                                                            );
                                                        }
                                                    } else {
                                                        status = status.filter(
                                                            (f) =>
                                                                f !== "Active"
                                                        );
                                                    }

                                                    setTableFilter((ps) => ({
                                                        ...ps,
                                                        status,
                                                    }));

                                                    setSelectedRowKeys([]);
                                                }}
                                            />
                                            <label htmlFor="chck_active">
                                                Active
                                            </label>
                                        </>
                                    ),
                                },
                            ]}
                        />

                        <TableGlobalSearchAnimated
                            tableFilter={tableFilter}
                            setTableFilter={setTableFilter}
                        />

                        {selectedRowKeys.length > 0 && (
                            <Popconfirm
                                title={
                                    <>
                                        Are you sure you want to
                                        <br />
                                        {tableFilter.status.filter(
                                            (f) => f === "Active"
                                        ).length > 0
                                            ? "archive"
                                            : "active"}{" "}
                                        the selected{" "}
                                        {selectedRowKeys.length > 1
                                            ? "pdfs"
                                            : "pdf"}
                                        ?
                                    </>
                                }
                                okText="Yes"
                                cancelText="No"
                                onConfirm={() => {
                                    handleSelectedArchived(tableFilter.status);
                                }}
                            >
                                <Button
                                    className="btn-main-secondary"
                                    name="btn_active_archive"
                                    loading={loadingDeletePDFFile}
                                >
                                    {tableFilter.status.filter(
                                        (f) => f === "Active"
                                    ).length > 0
                                        ? "ARCHIVE"
                                        : "ACTIVATE"}{" "}
                                    SELECTED
                                </Button>
                            </Popconfirm>
                        )}
                    </div>

                    <div
                        style={{
                            display: "flex",
                            gap: 12,
                        }}
                    >
                        <TableShowingEntries />

                        <TablePageSize
                            tableFilter={tableFilter}
                            setTableFilter={setTableFilter}
                        />
                    </div>
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
                    rowSelection={{
                        selectedRowKeys,
                        onChange: (selectedRowKeys) => {
                            setSelectedRowKeys(selectedRowKeys);
                        },
                        getCheckboxProps: (record) => ({
                            disabled: tableFilter.status.length === 2,
                            // Column configuration not to be checked
                            // name: record.name,
                        }),
                    }}
                    sticky
                >
                    <Table.Column
                        title="Preview"
                        key="action"
                        align="center"
                        width={100}
                        render={(text, record) => {
                            return (
                                <>
                                    <Button
                                        type="link"
                                        className="btn-main-primary h-auto w-auto"
                                        onClick={() => {
                                            let pdf_file = null;
                                            let file_path = null;

                                            if (record.attachments.length > 0) {
                                                pdf_file =
                                                    record.attachments[0]
                                                        .pdf_file;
                                                file_path = apiUrl(
                                                    record.attachments[0]
                                                        .file_path
                                                );
                                            }

                                            let signature = null;
                                            console.log("record", record);

                                            if (
                                                record.user.profile.attachments
                                                    .length > 0
                                            ) {
                                                signature =
                                                    record.user.profile
                                                        .attachments[0]
                                                        .file_path;
                                            }

                                            setToggleModalPdfFilePreview({
                                                open: true,
                                                data: {
                                                    ...record,
                                                    pdf_file,
                                                    signature: signature
                                                        ? apiUrl(signature)
                                                        : "",
                                                    file_path,
                                                },
                                            });
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faEye} />
                                    </Button>
                                </>
                            );
                        }}
                    />
                    <Table.Column
                        title="Created"
                        key="created_at_formatted"
                        dataIndex="created_at_formatted"
                        sorter
                        defaultSortOrder={"descend"}
                        width={150}
                    />
                    <Table.Column
                        title="PDF Name"
                        key="pdf_file_name"
                        dataIndex="pdf_file_name"
                        sorter
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

            <ModalPdfFileForm
                toggleModalPdfFileForm={toggleModalPdfFileForm}
                setToggleModalPdfFileForm={setToggleModalPdfFileForm}
            />
            <ModalPdfFilePreview
                toggleModalPdfFilePreview={toggleModalPdfFilePreview}
                setToggleModalPdfFilePreview={setToggleModalPdfFilePreview}
            />
        </Row>
    );
}
