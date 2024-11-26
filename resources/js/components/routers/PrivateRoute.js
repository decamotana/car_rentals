import React from "react";
import { Navigate } from "react-router-dom";

import PrivateLayout from "../layouts/private/Private";

let isLoggedIn = localStorage.getItem("token");
console.log("isloggedin PrivateRoute >", isLoggedIn);

// let isLogUserName = localStorage.getItem();
// console.log("isLogUsername PR >", isLogUserName);

const PrivateRoute = (props) => {
    const { component: Component } = props;

    if (isLoggedIn) {
        console.log(
            "User is logged in. Rendering Private Route with Component."
        );
        return (
            <PrivateLayout {...props}>
                <Component {...props} />
            </PrivateLayout>
        );
    } else {
        return <Navigate to="/" />;
    }
};

export default PrivateRoute;
