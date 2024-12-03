import React from "react";
import PageHomeCars from "./components/PageHomeCars";
import PageHomeInfos from "./components/PageHomeInfos";
import PageHomeReviews from "./components/PageHomeReviews";
import { Navigate } from "react-router-dom";
import { userData } from "../../../providers/companyInfo";

export default function PageHome(props) {
    const {} = props;

    const isLoggedIn = localStorage.getItem("token");
    // console.log("has token PageHome>", isLoggedIn);

    if (isLoggedIn) {
        const user = userData();
        return (
            <>
                <PageHomeCars user={user} />
                <PageHomeInfos user={user} />
                <PageHomeReviews user={user} />
            </>
        );
    } else {
        return (
            <>
                <PageHomeCars />
                <PageHomeInfos />
                <PageHomeReviews />
            </>
        );
    }
}
