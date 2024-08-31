import update from "immutability-helper";
import { useCallback, useState } from "react";
import { useDrop } from "react-dnd";
import { DraggableBox } from "./DraggableBox.js";
import { ItemTypes } from "./ItemTypes.js";
import { snapToGrid as doSnapToGrid } from "./snapToGrid.js";
// const styles = {
// 	width: 300,
// 	height: 300,
// 	border: "1px solid black",
// 	position: "relative",
// };

export const Container = (props) => {
    const {
        snapToGrid,
        content,
        children,
        setSignatureY,
        setSignatureX,
        height,
    } = props;

    const [boxes, setBoxes] = useState({
        a: { top: -150, left: 360, content, setSignatureY, setSignatureX },
    });
    const moveBox = useCallback(
        (id, left, top) => {
            setSignatureY(top);
            setSignatureX(left);
            setBoxes(
                update(boxes, {
                    [id]: {
                        $merge: { left, top },
                    },
                })
            );
        },
        [boxes]
    );
    const [, drop] = useDrop(
        () => ({
            accept: ItemTypes.BOX,
            drop(item, monitor) {
                const delta = monitor.getDifferenceFromInitialOffset();
                let left = Math.round(item.left + delta.x);
                let top = Math.round(item.top + delta.y);
                if (snapToGrid) {
                    [left, top] = doSnapToGrid(left, top);
                }
                moveBox(item.id, left, top);
                return undefined;
            },
        }),
        [moveBox]
    );
    return (
        <div
            ref={drop}
            style={{
                height,
            }}
        >
            {children}
            {Object.keys(boxes).map((key) => (
                <DraggableBox key={key} id={key} {...boxes[key]} />
            ))}
        </div>
    );
};
