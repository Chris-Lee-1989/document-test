import { blue } from '@ant-design/colors';
import React from 'react'
import { useDrop } from 'react-dnd'

interface Props {
    rowNum: number;
    height: number;
}
export default function EmptyRow({ height, rowNum }: Props) {

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: ['box','text'],
        drop: () => ({ 
            type: 'empty-row',
            rowNum,
        }),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
    }));

    const isActive = canDrop && isOver

    return (
        <>
            <div ref={drop} className="container" >비어있어요</div>        
            <style jsx>{`
            .container { flex: 1; height: ${height-2}px; background: ${isActive ? blue[1] : canDrop ? blue[0] : '#f9f9f9' }; display: flex; align-items: center; justify-content: center; font-size: 13px; color: #999; border-top: 1px solid #fff; border-bottom: 1px solid #fff;}
            `}</style>
        </>
    )
}
