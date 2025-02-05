import React from "react";
import AboutUs from "./AboutUs";
import Detail from "./Detail";
import PageAboutUsTitle from "./components/PageAboutUsTitle";
import PageAboutUsLists from "./components/PageAboutUsLists";
import { userData } from "../../../providers/companyInfo";

export default function PageAboutUs(props) {
    const {} = props;
    const isLoggedIn = localStorage.getItem("token");

    if (isLoggedIn) {
        const user = userData();
        return (
            <>
                <AboutUs user={user} />
                <Detail user={user} />
                <PageAboutUsTitle user={user} />
                <PageAboutUsLists user={user} />
            </>
        );
    } else {
        return (
            <>
                <AboutUs />
                <Detail />
                <PageAboutUsTitle />
                <PageAboutUsLists />
            </>
        );
    }
}
