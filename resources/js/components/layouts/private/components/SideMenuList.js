import { Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faUsers,
    faShieldKeyhole,
    faFilePdf,
    faMicrochip,
} from "@fortawesome/pro-regular-svg-icons";
import { faCar } from "@fortawesome/pro-solid-svg-icons";
import { faCarOn } from "@fortawesome/pro-light-svg-icons";

export const adminHeaderMenuLeft = (
    <>
        {/* <div className="ant-menu-left-icon">
            <Link to="/subscribers/current">
                <span className="anticon">
                    <FontAwesomeIcon icon={faUsers} />
                </span>
                <Typography.Text>Subscribers</Typography.Text>
            </Link>
        </div> */}
    </>
);

export const adminHeaderDropDownMenuLeft = () => {
    const items = [
        // {
        //     key: "/subscribers/current",
        //     icon: <FontAwesomeIcon icon={faUsers} />,
        //     label: <Link to="/subscribers/current">Subscribers</Link>,
        // },
    ];

    return <Menu items={items} />;
};

export const adminSideMenu = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: <FontAwesomeIcon icon={faHome} />,
        // moduleCode: "M-01",
    },
    // {
    //     title: "PDF Files",
    //     path: "/pdf-files",
    //     icon: <FontAwesomeIcon icon={faFilePdf} />,
    //     // moduleCode: "M-02",
    // },
    {
        title: "Users",
        path: "/users",
        icon: <FontAwesomeIcon icon={faUsers} />,
    },
    {
        title: "Cars",
        path: "/cars",
        icon: <FontAwesomeIcon icon={faCar} />,
    },
    {
        title: "Reservation",
        path: "/reservation",
        icon: <FontAwesomeIcon icon={faCarOn} />,
    },
    // {
    //     title: "Components",
    //     path: "/components",
    //     icon: <FontAwesomeIcon icon={faMicrochip} />,
    // },
];
