import { DatePicker, Form, Input, Modal } from "antd";
import { error } from "laravel-mix/src/Log";
import { values } from "lodash";
import React, { useState } from "react";
import FloatDatePicker from "./FloatDatePicker";
import FloatTimePicker from "./FloatTimePicker";

export default function modalForm({ open, onOk, onCancel, modalText }) {
    const [form] = Form.useForm();
    const [time, setTime] = useState(null);

    const handleSubmit = () => {
        form.validateFields()
            .then((values) => {
                console.log("form values >", values);
                form.resetFields();
                onOk();
            })
            .catch((error) => {
                console.error("Validation failed", error);
            });
    };

    const timeChange = (time, timeString) => {
        console.log("Selected Time:", timeString);
        setTime(time);
    };

    return (
        <>
            <Modal
                title="Car Booking"
                open={open}
                onOk={handleSubmit}
                onCancel={() => {
                    form.resetFields();
                    onCancel();
                }}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="start_date"
                        // label="Date Start"
                        rules={[
                            {
                                required: true,
                                message: "Select departure date:",
                            },
                        ]}
                    >
                        <FloatDatePicker
                            label="Select Departure Date"
                            required
                            onChange={(date, dateString) =>
                                console.log("Select Date: ", dateString)
                            }
                            // style={{ width: "100%" }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="start_time"
                        // label="Time Depart"
                        rules={[
                            {
                                required: true,
                                message: "Input departure time:",
                            },
                        ]}
                    >
                        <FloatTimePicker
                            label="Select Departure Time:"
                            required
                            value={time}
                            onChange={timeChange}
                            // style={{ width: "100%" }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="end_date"
                        // label="End Start"
                        rules={[
                            { required: true, message: "Select date return:" },
                        ]}
                    >
                        <FloatDatePicker
                            label="Select Return Date"
                            required
                            onChange={(date, dateString) =>
                                console.log("Select Date: ", dateString)
                            }
                            // style={{ width: "100%" }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="end_time"
                        // label="Time End"
                        rules={[
                            {
                                required: true,
                                message: "Input return time:",
                            },
                        ]}
                    >
                        <FloatTimePicker
                            label="Select Return Time:"
                            required
                            value={time}
                            onChange={timeChange}
                            // style={{ width: "100%" }}
                        />
                    </Form.Item>
                </Form>
                {/* <p>{modalText}</p> */}
            </Modal>
        </>
    );
}
