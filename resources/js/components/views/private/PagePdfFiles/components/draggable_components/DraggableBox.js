import { memo, useEffect } from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

import { Box } from "./Box.js";
import { ItemTypes } from "./ItemTypes.js";

function getStyles(left, top, isDragging) {
    const transform = `translate3d(${left}px, ${top}px, 0)`;
    return {
        position: "absolute",
        transform,
        WebkitTransform: transform,
        // IE fallback: hide the real node using CSS when dragging
        // because IE will ignore our custom "empty image" drag preview.
        opacity: isDragging ? 0 : 1,
        height: isDragging ? 0 : "",
        zIndex: 1,
    };
}

export const DraggableBox = memo(function DraggableBox(props) {
    const { id, content, left, top, setSignatureY, setSignatureX } = props;

    console.log("DraggableBox props", props);

    const [{ isDragging }, drag, preview] = useDrag(
        () => ({
            type: ItemTypes.BOX,
            item: { id, left, top, content },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [id, left, top, content]
    );

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true });
    }, [preview]);

    return (
        <div
            ref={drag}
            style={getStyles(left, top, isDragging)}
            // role="DraggableBox"
        >
            <Box content={content} />
        </div>
    );
});
