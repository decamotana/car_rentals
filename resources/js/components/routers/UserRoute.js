import React from "react";
import UserLayout from "../layouts/user/Private";
import { Navigate } from "react-router-dom";

let isLoggedIn = localStorage.getItem("token");

const UserRoute = (props) => {
    const { component: Component } = props;
    console.log("users props >", props);

    if (isLoggedIn) {
        console.log("Im in User page >");
        return (
            <UserLayout {...props}>
                <Component {...props} />
            </UserLayout>
        );
    } else {
        return <Navigate to={"/"} />;
    }
};

export default UserRoute;
