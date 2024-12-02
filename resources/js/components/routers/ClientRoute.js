import React from "react";
import { Navigate } from "react-router-dom";

// import PublicLayout from "../layouts/public/Public";
import ClientLayout from "../layouts/client/Private";
import { userData } from "../providers/companyInfo";

// let isLogUserName = localStorage.getItem();
// console.log("isLogUsername CR >", isLogUserName);

const ClientRoute = (props) => {
    const { component: Component } = props;
    // console.log("components props client >", props);

    const isLoggedIn = localStorage.getItem("token");
    console.log("has token in parent >", isLoggedIn);

    // const user = userData();

    // console.log("Users Log >", user);

    if (!isLoggedIn) {
        return (
            <ClientLayout {...props}>
                <Component {...props} />
            </ClientLayout>
        );
    } else {
        const user = userData();
        return (
            <ClientLayout {...props} userRole={user?.role}>
                <Component {...props} use={user} />
            </ClientLayout>
        );
    }
};

export default ClientRoute;
