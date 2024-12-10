import { DatePicker, Form, Input, Modal, notification } from "antd";
import { error } from "laravel-mix/src/Log";
import { values } from "lodash";
import React, { useState } from "react";
import FloatDatePicker from "./FloatDatePicker";
import FloatTimePicker from "./FloatTimePicker";
import { POST } from "./useAxiosQuery";

export default function modalForm({ open, onOk, onCancel, carId, userId }) {
    const [form] = Form.useForm();
    const [time, setTime] = useState(null);

    // console.log("select userId >", userId);
    // console.log("selected carId >", carId);

    const { mutate: mutateBookSchedule, isLoading: isLoadingButtonLogin } =
        POST(`api/booking`, "booking");

    const handleSubmit = () => {
        form.validateFields()
            .then((values) => {
                const start_date = values.start_date.format("YYYY-MM-DD");
                // console.log("startDate>", start_date);
                const start_time = values.start_time.format("HH:mm:ss");
                const end_date = values.end_date.format("YYYY-MM-DD");
                const end_time = values.end_time.format("HH:mm:ss");

                let data = new FormData();

                data.append("car_id", carId);
                data.append("user_id", userId);
                data.append("date_start", start_date);
                data.append("date_end", end_date);
                data.append("time_start", start_time);
                data.append("time_end", end_time);

                mutateBookSchedule(data, {
                    onSuccess: (res) => {
                        if (res.success) {
                            notification.success({
                                message: "Booking Save",
                                description: res.message,
                            });
                        }
                    },
                    onError: (err) => {
                        notification(err);
                    },
                });
                // console.log("Form values in FormData >", data);
                form.resetFields();
                onOk();
            })
            .catch((error) => {
                console.error("Validation failed", error);
            });
    };

    const timeChange = (time, timeString) => {
        // console.log("Selected depart Time:", timeString);
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
                                console.log("Select depart Date: ", dateString)
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
