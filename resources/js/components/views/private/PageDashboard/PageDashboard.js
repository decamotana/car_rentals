import {
    Row,
    Col,
    Collapse,
    Statistic,
    Card,
    Tooltip,
    ColorPicker,
    theme,
    Calendar,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/pro-regular-svg-icons";
import FacultyMonitoringGraph from "./CollapseItemFacultyMonitoringGraph";
import { role } from "../../../providers/companyInfo";
import FacultyMonitoringGraph2 from "./CollapseItemFacultyMonitoringGraph2";

import Highcharts, { Point } from "highcharts";
import highchartsSetOptions from "../../../providers/highchartsSetOptions";
import { size, values } from "lodash";
import CountUp from "react-countup";
import { Column, Line } from "@ant-design/charts";
import { useEffect, useRef, useState } from "react";
import {
    ArrowUpOutlined,
    ConsoleSqlOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { GET } from "../../../providers/useAxiosQuery";
require("highcharts/modules/accessibility")(Highcharts);
// require("highcharts/modules/no-data-to-display")(Highcharts);
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/export-data")(Highcharts);
require("highcharts/modules/boost")(Highcharts);

const formatters = (value) => <CountUp end={value} separator="," />;
const data = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
];

const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
};

export default function PageDashboard() {
    const [activeUsers, setActiveUsers] = useState(0);
    const [newActive, setNewActive] = useState(0);
    const [bookings, setBookings] = useState(0);
    const [reserved, setReserved] = useState(0);

    highchartsSetOptions(Highcharts);
    const chartContainerRef = useRef(null);

    const { token } = theme.useToken();
    const wrapperStyle = {
        width: 400,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
        borderColor: "gainsboro",
    };

    GET(`api/active_Users`, "active_Users", (res) => {
        if (res.success) {
            // console.log("res >", res);
            setActiveUsers(res.active);
            setNewActive(res.newUser);
        }
    });

    GET(`api/bookings`, "bookings", (res) => {
        if (res.success) {
            setBookings(res.count);
        }
    });

    GET(`api/reserved`, "reserved", (res) => {
        if (res.success) {
            setReserved(res.count);
        }
    });

    const config = {
        data,
        height: 300,
        xField: "year",
        yField: "value",
        point: {
            size: 5,
            shape: "diamond",
        },
        tooltip: {
            formatter: (data) => ({
                name: "Value",
                value: data.value,
            }),
        },
        // smooth: true,
    };

    useEffect(() => {
        const antCards = document.querySelectorAll(".ant-layout-content");
        // const antCol = document.querySelectorAll(".ant-col");

        antCards.forEach((antCard) => {
            antCard.style.backgroundColor = "ghostwhite";
        });

        // antCol.forEach((antcols) => {
        //     antcols.style.backgroundColor = "white";
        // });

        // Cleanup: Reset background color on unmount
        return () => {
            antCards.forEach((antCard) => {
                antCard.style.backgroundColor = "";
            });

            // antCol.forEach((antcols) => {
            //     antcols.style.backgroundColor = "";
            // });
        };
    }, []);

    useEffect(() => {
        Highcharts.chart(chartContainerRef.current, {
            chart: {
                type: "column",
            },
            title: {
                text: "Booking History",
            },
            subtitle: {
                text:
                    'Source: <a target="_blank" ' +
                    'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>',
            },
            xAxis: {
                categories: [
                    "USA",
                    "China",
                    "Brazil",
                    "EU",
                    "Argentina",
                    "India",
                ],
                crosshair: true,
                accessibility: {
                    description: "Countries",
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: "1000 metric tons (MT)",
                },
            },
            tooltip: {
                valueSuffix: "(1000 MT)",
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                },
            },
            series: [
                {
                    name: "Corn",
                    data: [387749, 280000, 129000, 64300, 54000, 34300],
                },
                {
                    name: "Wheat",
                    data: [45321, 140000, 10000, 140500, 19500, 113500],
                },
            ],
        });

        return () => {
            if (chartContainerRef.current) {
                Highcharts.chart(chartContainerRef.current)?.destroy();
            }
        };
    }, []);

    return (
        // <Row gutter={[12, 12]}>
        //     <Col xs={24} sm={24} md={24} lg={24} xl={16} xxl={16}>

        //     </Col>
        // </Row>
        <Row gutter={[16, 16]}>
            <Col span={8}>
                <Card
                    style={{
                        padding: "1px",
                        borderColor: "gainsboro",
                        borderRadius: "5px",
                        // backgroundColor: "white",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Statistic
                            title="Active User(s)"
                            value={activeUsers}
                            formatter={formatters}
                            style={{ fontWeight: "bold" }}
                            valueStyle={{
                                fontSize: "1.5rem",
                                fontWeight: "bold",
                                color: "Blue",
                            }}
                        />
                        <Statistic
                            value={newActive}
                            // precision={2}
                            valueStyle={{ color: "green", fontSize: "1.5rem" }}
                            prefix={
                                <span style={{ fontSize: "1rem" }}>
                                    <PlusOutlined />
                                </span>
                            }
                            // suffix="%"
                        />
                    </div>
                </Card>
            </Col>

            <Col span={8}>
                <Card
                    style={{
                        padding: "1px",
                        borderColor: "gainsboro",
                        borderRadius: "5px",
                        // backgroundColor: "white",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Statistic
                            title="Bookings"
                            value={bookings}
                            formatter={formatters}
                            style={{ fontWeight: "bold" }}
                            valueStyle={{
                                fontSize: "1.5 rem",
                                fontWeight: "bold",
                                color: "Blue",
                            }}
                        />
                        <Statistic
                            value={15}
                            // precision={2}
                            valueStyle={{ color: "green", fontSize: "1.5rem" }}
                            prefix={<ArrowUpOutlined />}
                            suffix="%"
                        />
                    </div>
                </Card>
            </Col>

            <Col span={8}>
                <Card
                    style={{
                        padding: "1px",
                        borderColor: "gainsboro",
                        borderRadius: "5px",
                        // backgroundColor: "white",
                    }}
                >
                    <Statistic
                        title="Reservations"
                        value={reserved}
                        formatter={formatters}
                        style={{ fontWeight: "bold" }}
                        valueStyle={{
                            fontSize: "1.5 rem",
                            fontWeight: "bold",
                            color: "Blue",
                        }}
                    />
                </Card>
            </Col>
            <Col span={15}>
                {/* <Card
                    padd
                    style={{
                        padding: "1px",
                        borderColor: "gainsboro",
                        borderRadius: "5px",
                        // backgroundColor: "white",
                    }}
                >
                    <Line {...config} />
                </Card> */}
                <Card
                    ref={chartContainerRef}
                    style={{
                        width: "100%",
                        height: "400px",
                        borderRadius: "5px",
                        borderColor: "gainsboro",
                    }}
                ></Card>
            </Col>
            <Col span={8}>
                <Card style={wrapperStyle}>
                    <Calendar
                        fullscreen={false}
                        onPanelChange={onPanelChange}
                    />
                </Card>
            </Col>
        </Row>
    );
}
