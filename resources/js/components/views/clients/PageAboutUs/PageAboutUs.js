import React from "react";
import AboutUs from "./AboutUs";
import Detail from "./Detail";
import PageAboutUsTitle from "./components/PageAboutUsTitle";
import PageAboutUsLists from "./components/PageAboutUsLists";

export default function PageAboutUs(props) {
    const {} = props;

    return (
        <>
            <AboutUs />
            <Detail />
            <PageAboutUsTitle />
            <PageAboutUsLists />
        </>
    );
}
