import { ColumnType } from '@/types/dragTypes'
import { blue } from '@ant-design/colors';
import React from 'react'
import { useDrop } from 'react-dnd';

interface Props {
    rowNum: number;
    colNum: number;
    isDrop: [boolean, boolean];
    data: ColumnType;
}

export default function Col({ rowNum, colNum, isDrop, data }: Props) {

    const [leftAttr, leftDrop] = useDrop(() => ({
        accept: 'box',
        drop: () => ({ 
            type: 'col',
            rowNum,
            colNum,
            position: 'left',
        }),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
    }));

    const [rightAttr, rightDrop] = useDrop(() => ({
        accept: 'box',
        drop: () => ({ 
            type: 'col',
            rowNum,
            colNum,
            position: 'right',
        }),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
    }));

    const isActiveLeft = leftAttr.canDrop && leftAttr.isOver
    const isActiveRight = rightAttr.canDrop && rightAttr.isOver
    
    return (
        <>
            <div className="container" style={{...data.style}}>
                {isDrop[0] ? <div ref={leftDrop} className="left-drop drop" /> : <div className="drop" />}
                <div className="content">
                {data.type}
                </div>
                {isDrop[1] ? <div ref={rightDrop} className="right-drop drop" /> : <div className="drop" />}
            </div>
            <style jsx>{`
            .container { 
                    display: flex; flex-direction: row; align-items: center; justify-content: center; flex: 1; 
                    border-bottom: 1px solid #ddd; ${rowNum  === 0 ? 'border-top: 1px solid #ddd;' : ''}
                    border-right: 1px solid #ddd; ${colNum  === 0 ? 'border-left: 1px solid #ddd;' : ''}
            }
            .container .drop {height: ${data.height}px; flex-basis: 12px; border-radius: 8px;}
            .container .drop.left-drop {background: ${isActiveLeft ? blue[1] : leftAttr.canDrop ? blue[0] : 'rgba(0,0,0,0)' };}
            .container .drop.right-drop {background: ${isActiveRight ? blue[1] : rightAttr.canDrop ? blue[0] : 'rgba(0,0,0,0)' };}
            .container .content {height: ${data.height}px; flex: 1; display: flex; align-items: center; justify-content: center;}
            `}</style>
        </>
    )
    
}
