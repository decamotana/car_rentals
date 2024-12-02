import React from "react";
import { Navigate } from "react-router-dom";

import UserLayout from "../layouts/user/User";
import ClientLayout from "../layouts/client/Private";
import { userData } from "../providers/companyInfo";

const UserRoute = (props) => {
    const { component: Component } = props;
    // console.log("users props >", props);

    const isLoggedIn = localStorage.getItem("token");

    // console.log("user > ", user);

    if (isLoggedIn) {
        console.log("Im in User page >");
        const user = userData();

        // console.log("what is in User >", user);
        return (
            <ClientLayout {...props} userRole={user?.role}>
                <Component {...props} user={user} />
            </ClientLayout>
        );
    } else {
        return <Navigate to={"/"} />;
    }
};

export default UserRoute;
