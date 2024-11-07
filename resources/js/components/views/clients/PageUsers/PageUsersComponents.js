import React from "react";
import { useLocation } from "react-router-dom";
import PageHomeUser from "./PageUsersHome";

export default function PageUser(props) {
    const {} = props;
    const location = useLocation();
    const username = location.state?.username || "User";
    // console.log("Username >", name);
    return (
        <>
            <PageHomeUser name={username} />
        </>
    );
}
