import React from "react";
import { Navigate } from "react-router-dom";

// import PublicLayout from "../layouts/public/Public";
import ClientLayout from "../layouts/client/Private";

const isLoggedIn = localStorage.getItem("token");
console.log("isloggedin ClientRoute >", isLoggedIn);

// let isLogUserName = localStorage.getItem();
// console.log("isLogUsername CR >", isLogUserName);

const ClientRoute = (props) => {
    const { component: Component } = props;

    if (!isLoggedIn) {
        console.log(
            "User is not logged in. Rendering ClientLayout with Component."
        );
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
