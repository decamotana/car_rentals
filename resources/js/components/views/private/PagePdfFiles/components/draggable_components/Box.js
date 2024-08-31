import { memo } from "react";

const styles = {
    // border: "1px dashed gray",
    padding: "0.5rem 1rem",
    cursor: "move",
};

export const Box = memo(function Box({ content, isDrag, preview }) {
    // const backgroundColor = isDrag ? "red" : "transparent";
    const border = isDrag ? "1px dashed gray" : "0px";

    return (
        <div
            style={{ ...styles, border }}
            role={preview ? "BoxPreview" : "Box"}
        >
            {content}
        </div>
    );
});
