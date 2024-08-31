import { useEffect } from "react";
import {
    Modal,
    Form,
    Row,
    Col,
    Space,
    Button,
    Typography,
    Upload,
    notification,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileUpload } from "@fortawesome/pro-regular-svg-icons";

import { POST } from "../../../../providers/useAxiosQuery";
import { userData } from "../../../../providers/companyInfo";
import validateRules from "../../../../providers/validateRules";
import notificationErrors from "../../../../providers/notificationErrors";

export default function ModalPdfFileForm(props) {
    const { toggleModalPdfFileForm, setToggleModalPdfFileForm } = props;

    const [form] = Form.useForm();

    const { mutate: mutatePDFFileUpload, isLoading: loadingPDFFileUpload } =
        POST(`api/pdf_file`, "pdf_file_list");

    const onFinish = (values) => {
        let data = new FormData();
        data.append(
            "pdf_file",
            values.pdf_file[0].originFileObj,
            values.pdf_file[0].name
        );
        data.append("pdf_file_name", values.pdf_file[0].name);
        data.append("user_id", userData().id);

        mutatePDFFileUpload(data, {
            onSuccess: (res) => {
                if (res.success) {
                    notification.success({
                        message: "PDF File",
                        description: res.message,
                    });

                    setToggleModalPdfFileForm({ open: false, data: null });

                    form.resetFields();
                } else {
                    notification.error({
                        message: "PDF File",
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
        <Modal
            wrapClassName="modal-form-pdf-file"
            title="Module Form"
            open={toggleModalPdfFileForm.open}
            onCancel={() =>
                setToggleModalPdfFileForm({
                    open: false,
                    data: null,
                })
            }
            footer={[
                <Button
                    // type="primary"
                    className="btn-main-primary outlined"
                    loading={loadingPDFFileUpload}
                    key={0}
                    onClick={() =>
                        setToggleModalPdfFileForm({
                            open: false,
                            data: null,
                        })
                    }
                >
                    Close
                </Button>,

                <Button
                    type="primary"
                    className="btn-main-primary"
                    loading={loadingPDFFileUpload}
                    key={1}
                    onClick={() => form.submit()}
                >
                    Submit
                </Button>,
            ]}
            forceRender
        >
            <Form form={form} onFinish={onFinish}>
                <Row gutter={[12, 0]}>
                    <Col xs={24} sm={24} md={24} className="text-center">
                        <Form.Item
                            name="pdf_file"
                            rules={[validateRules.required()]}
                            valuePropName="fileList"
                            getValueFromEvent={(e) => {
                                if (Array.isArray(e)) {
                                    return e;
                                }

                                return e?.fileList;
                            }}
                        >
                            <Upload
                                className="upload-w-100 upload-hide-remove-icon"
                                accept="application/pdf"
                                multiple={false}
                                maxCount={1}
                                beforeUpload={(file) => {
                                    let error = false;
                                    const isLt2M =
                                        file.size / 102400 / 102400 < 5;
                                    if (!isLt2M) {
                                        notification.error({
                                            message: "PDF File Size Error!",
                                            description:
                                                "PDF must smaller than 5MB!",
                                        });
                                        error = Upload.LIST_IGNORE;
                                    }
                                    return error;
                                }}
                            >
                                <Button
                                    icon={
                                        <FontAwesomeIcon icon={faFileUpload} />
                                    }
                                >
                                    Upload PDF File
                                </Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
}
