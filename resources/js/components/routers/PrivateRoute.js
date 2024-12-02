import React from "react";
import { Navigate } from "react-router-dom";

import PrivateLayout from "../layouts/private/Private";

const PrivateRoute = (props) => {
    const { component: Component } = props;
    // console.log("component private >", props);

    const isLoggedIn = localStorage.getItem("token");
    // console.log("isloggedIn > ", isLoggedIn);

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
