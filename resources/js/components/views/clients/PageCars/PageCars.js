import React from "react";
import PageToyotaCars from "./toyotaCars";
import PageCarsTitle from "./components/PageCarsTitle";
import PageCarsLists from "./components/PageCarsLists";

export default function PageCars(props) {
    const {} = props;

    return (
        <>
            <PageToyotaCars />
            <PageCarsTitle />
            <PageCarsLists />
        </>
    );
}
