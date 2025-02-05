import React from "react";
import PageToyotaCars from "./toyotaCars";
import PageCarsTitle from "./components/PageCarsTitle";
import PageCarsLists from "./components/PageCarsLists";
import { Navigate } from "react-router-dom";
import { userData } from "../../../providers/companyInfo";

export default function PageCars(props) {
    const {} = props;
    const isLoggedIn = localStorage.getItem("token");
    // console.log("has token PageHome>", isLoggedIn);

    if (isLoggedIn) {
        const user = userData();
        return (
            <>
                {/* <PageToyotaCars /> */}
                <PageCarsTitle user={user} />
                <PageCarsLists user={user} />
            </>
        );
    } else {
        return (
            <>
                {/* <PageToyotaCars /> */}
                <PageCarsTitle />
                <PageCarsLists />
            </>
        );
        // return <Navigate to="/sign-in" />;
    }
}
