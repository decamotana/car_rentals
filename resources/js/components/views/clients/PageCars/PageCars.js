import React from "react";
import PageToyotaCars from "./toyotaCars";
import PageCarsTitle from "./components/PageCarsTitle";
import PageCarsLists from "./components/PageCarsLists";
import { Navigate } from "react-router-dom";

export default function PageCars(props) {
    const {} = props;
    const isLoggedIn = localStorage.getItem("token");
    // console.log("has token PageHome>", isLoggedIn);

    if (isLoggedIn) {
        return (
            <>
                {/* <PageToyotaCars /> */}
                <PageCarsTitle />
                <PageCarsLists />
            </>
        );
    } else {
        return <Navigate to="/sign-in" />;
    }
}
