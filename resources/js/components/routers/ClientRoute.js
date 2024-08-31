import React from "react";
import { Navigate } from "react-router-dom";

// import PublicLayout from "../layouts/public/Public";
import ClientLayout from "../layouts/client/Private";

const isLoggedIn = localStorage.getItem("token");

const ClientRoute = (props) => {
    const { component: Component } = props;

    if (!isLoggedIn) {
        return (
            <ClientLayout {...props}>
                <Component {...props} />
            </ClientLayout>
        );
    } else {
        return <Navigate to="/dashboard" />;
    }
};

export default ClientRoute;
