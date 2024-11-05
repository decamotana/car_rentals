import React from "react";
import { useLocation } from "react-router-dom";
import PageUsersHome from "./PageUsersHome";

export default function PageUser(props) {
    const {} = props;
    const location = useLocation();
    const name = location.state.username || {};
    // console.log("Username >", name);
    return (
        <>
            <PageUsersHome name={name} />
        </>
    );
}
