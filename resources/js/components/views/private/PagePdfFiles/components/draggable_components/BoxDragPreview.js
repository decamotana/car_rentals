import { memo, useEffect, useState } from "react";
import { Box } from "./Box";

const styles = {
    display: "inline-block",
    transform: "rotate(-3deg)",
    WebkitTransform: "rotate(-3deg)",
};

export const BoxDragPreview = memo(function BoxDragPreview({ content }) {
    const [tickTock, setTickTock] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => setTickTock(!tickTock), 500);

        return () => clearInterval(interval);
    }, [tickTock]);

    return (
        <div style={styles}>
            <Box content={content} isDrag={tickTock} preview />
        </div>
    );
});
