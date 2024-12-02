import React from "react";

import { Navigate } from "react-router-dom";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import PageHomeCars from "../../views/clients/PageHome/components/PageHomeCars";
import PageHomeInfos from "../../views/clients/PageHome/components/PageHomeInfos";
import PageHomeReviews from "../../views/clients/PageHome/components/PageHomeReviews";

export default function PageHomeClient(props) {
    const { user } = props;

    // console.log("UserName [PageHome]>", user?.username);

    const isLoggedIn = localStorage.getItem("token");
    // console.log("has token >", isLoggedIn);
    if (isLoggedIn) {
        return (
            <>
                <PageHomeCars user={user} />
                <PageHomeInfos user={user} />
                <PageHomeReviews user={user} />
            </>
        );
    }
}
