import React, { CSSProperties } from 'react'
import { useDrag } from 'react-dnd'

interface Props {
    name: string
}

const style: CSSProperties = {
    border: "1px dashed gray",
    backgroundColor: "white",
    padding: "0.5rem 1rem",
    marginRight: "1.5rem",
    marginBottom: "1.5rem",
    cursor: "move",
    float: "left"
};
  
export default function DragBox({name}: Props) {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'box',
        item: { name },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult<{name: string}>()
        },
        collect: (monitor) => {
            return ({
                isDragging: monitor.isDragging(),
                handlerId: monitor.getHandlerId(),
            })
        },
    }));

    const opacity = isDragging ? 0.4 : 1;

    return (
        <div ref={drag} style={{ ...style, opacity }} data-testid={`box`}>
          {name}
        </div>
    );
}
