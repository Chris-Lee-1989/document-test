import React, { CSSProperties } from 'react'
import { useDrop } from 'react-dnd'

const style: CSSProperties = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
}

export default function DropBox() {

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'box',
        drop: () => ({ name: 'Drop' }),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
    }));

    const isActive = canDrop && isOver
    let backgroundColor = '#222'
    if (isActive) {
      backgroundColor = 'darkgreen'
    } else if (canDrop) {
      backgroundColor = 'darkkhaki'
    }


    return (
        <div ref={drop} style={{ ...style, backgroundColor }} data-testid="dustbin">
            {isActive ? 'Release to drop' : 'Drag a box here'}
        </div>
    )
}
