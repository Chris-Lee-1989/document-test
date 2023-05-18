import { CellType } from '@/types/documentTypes';
import { blue } from '@ant-design/colors';
import React from 'react'
import { useDrop } from 'react-dnd';

interface Props {
    item: CellType;
}

export default function DropCell({ item }: Props) {

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: ['drop', 'overlay'],
        drop: () => item,
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
    }));

    const isActive = canDrop && isOver
    let backgroundColor = 'rgba(255,255,255,0.1)';
    if (isActive) {
      backgroundColor = blue[4];
    } else if (canDrop) {
      backgroundColor = blue[0];
    }
    
    return (
        <>
            <div ref={drop} className="container">
                
            </div>
            <style jsx>{`
            .container {transition: 300ms; width: 100%; background: ${backgroundColor}; flex: 1;}
            `}</style>
        </>
    )
}
