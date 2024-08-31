import React from "react";
import PageHomeCars from "./components/PageHomeCars";
import PageHomeInfos from "./components/PageHomeInfos";
import PageHomeReviews from "./components/PageHomeReviews";

export default function PageHome(props) {
    const {} = props;

    return (
        <>
            <PageHomeCars />
            <PageHomeInfos />
            <PageHomeReviews />
        </>
    );
}
