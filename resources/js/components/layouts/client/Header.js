import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
    const {
        width,
        sideMenuCollapse,
        setSideMenuCollapse,
        pageHeaderClass,
        pageHeaderIcon,
        title,
        subtitle,
        userRole,
    } = props;

    console.log("User Role >", userRole);
    // const items = new Array(15).fill(null).map((_, index) => ({
    //     key: index + 1,
    //     label: `nav ${index + 1}`,
    // }));
    const navigate = useNavigate();

    const items = [
        // Home
        {
            key: "home",
            label: "Home",
            onClick: () => {
                navigate("/");
            },
        },
        // Our Cars
        {
            key: "our-cars",
            label: "Our Cars",
            onClick: () => {
                navigate("/our-cars");
            },
        },
        // About Us
        {
            key: "about-us",
            label: "About Us",
            onClick: () => {
                navigate("/about-us");
            },
        },
        // Contact Us
        {
            key: "contact-us",
            label: "Contact Us",
            onClick: () => {
                navigate("/contact-us");
            },
        },
        ...(!userRole
            ? [
                  {
                      key: "sign-up",
                      label: "Sign Up",
                      onClick: () => navigate("/sign-up"),
                  },
                  {
                      key: "sign-in",
                      label: "Sign In",
                      onClick: () => navigate("/sign-in"),
                  },
              ]
            : [
                  {
                      key: "sign-out",
                      label: "Sign Out",
                      onClick: () => {
                          localStorage.removeItem("token");
                          localStorage.removeItem("userdata");
                          window.location.reload();
                      },
                  },
              ]),
    ];

    return (
        <Layout.Header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 1,
                width: "100%",
                display: "flex",
                alignItems: "center",
            }}
        >
            <div className="demo-logo" />
            <Menu
                mode="horizontal"
                defaultSelectedKeys={["2"]}
                items={items}
                style={{ flex: 1, minWidth: 0 }}
                onClick={(e) => {
                    console.log("Menu onClick", e);
                }}
            />
        </Layout.Header>
    );
}
