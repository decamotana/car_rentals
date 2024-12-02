import React from "react";
import { Navigate } from "react-router-dom";

import PublicLayout from "../layouts/public/Public";

const PublicRoute = (props) => {
    const { component: Component } = props;

    const isLoggedIn = localStorage.getItem("token");

    if (!isLoggedIn) {
        return (
            <PublicLayout {...props}>
                <Component {...props} />
            </PublicLayout>
        );
    } else {
        return <Navigate to="/dashboard" />;
    }
};

export default PublicRoute;
