import React, { useRef, useState } from 'react'
import { useRecoilState } from 'recoil';
import isDragState from '@/atoms/document/isDragState';
import { DropResultType, ItemType } from '@/types/documentTypes';
import { blue, purple } from '@ant-design/colors';
import { getSelectedNewDocuCell, onChangeSelected, setSelectedNewDocuCell } from '@/modules/document';
import { Typography } from 'antd';
import { useDrag, useDrop } from 'react-dnd';
import { useUpdateEffect } from 'ahooks';
import { ArrowsAltOutlined } from '@ant-design/icons';

interface Props {
    width: number;
    height: number;
    columns: number;
    rows: number;
    offsetX: number;
    offsetY: number;
    data: ItemType[];
    forceRendering: () => void;
    onDrop: (item: ItemType, result: DropResultType) => void;
}

export default function DocumentOverlay({ width, height, columns, rows, offsetX, offsetY, data, forceRendering, onDrop }: Props) {

    const [isDrag, setDrag] = useRecoilState(isDragState);

    // 셀 1칸 너비
    const cellWidth = (width / columns);
    const cellHeight = (height / rows);

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: ['resize'],
        drop: () => {
            console.log('drop~!')
        },
        hover(item: ItemType, monitor) {
            const offset = monitor.getDifferenceFromInitialOffset();
            if (offset && item) {
                const addWidth = Math.round(offset.x/cellWidth);
                const addHeight = Math.round(offset.y/cellHeight);
                onChangeSelected('width', (item.width + addWidth));
                onChangeSelected('height', (item.height + addHeight));
                forceRendering();
            }
        },
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
    }));

    return (
        <>
            <div className="container" ref={drop}>
                <div className="grid">
                {
                    data.map((item: ItemType, idx: number) => {
                        return (
                            <OverlayCell 
                                key={idx}
                                cellWidth={cellWidth}
                                item={item}
                                forceRendering={forceRendering}
                                onDrop={onDrop}
                            />
                        )
                    })
                }
                </div>
            </div>
            <style jsx>{`
            .container {
                opacity: 1;
                z-index: ${isDrag ? 499 : 501};
                opacity: 1;
                position: absolute; top: ${offsetY}px; left: ${offsetX}px;
                width: ${width}px; height: ${height}px;
            }

            .grid {
                transition: 300ms;
                position: absolute; top: 0; left: 0;
                width: ${width}px; height: ${height}px;
                display: grid;
                grid-template-rows: repeat(${rows}, 1fr);
                grid-template-columns: repeat(${columns}, 1fr);
            }

            .grid > .item {border: 0.5px solid #bbb; background: rgba(0,0,0,0); cursor: pointer;}
            `}</style>
        </>
    )
}















interface OverlayCellProps {
    item: ItemType;
    cellWidth: number;
    forceRendering: () => void;
    onDrop: (item: ItemType, result: DropResultType) => void;
}   
const OverlayCell = ({ item, cellWidth, forceRendering, onDrop }: OverlayCellProps) => {

    const [isDrag, setDrag] = useRecoilState(isDragState);

    // 선택된 셀
    const selectedCell = getSelectedNewDocuCell();

    const isSelected = item.uuid === selectedCell?.uuid;
    const gridRowStart = item.rowNum + 1;
    const gridRowEnd = item.rowNum + 1 + Number(item.height);
    const gridColumnStart = item.colNum + 1;
    const gridColumnEnd = item.colNum + 1 + Number(item.width);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'overlay',
        item: item,
        end: (item, monitor) => {
            const result = monitor.getDropResult<DropResultType>();
            if (result) onDrop(item, result);
        },
        collect: (monitor) => {
            return ({
                isDragging: monitor.isDragging(),
                handlerId: monitor.getHandlerId(),
            })
        },
    }));

    useUpdateEffect(() => {
        setDrag(isDragging);
    }, [isDragging])

    const opacity = isDragging ? 0.4 : 1;
    const setBorder = (isBorder: boolean | undefined) => {
        return isBorder ? `1px solid ${item.borderColor ? item.borderColor.slice(0, 7) : '#222'}` : 0;
    }

    // 마우스 오버 여부
    const [isHover, setHover] = useState(false);
    // 셀 REF
    const position = (() => {
        if (typeof window !== 'undefined') {
            const target: any = document.querySelector('.uuid-' + item.uuid);
            if (target) {
                return [target.offsetTop + target.offsetHeight, target.offsetLeft + target.offsetWidth];
            }
        }
        return [0, 0];
    })();

    return (
        <>
            <div
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                ref={drag}
                className={`item uuid-${item.uuid}`}
                style={{
                    opacity: opacity,
                    gridRowStart,
                    gridRowEnd,
                    gridColumnStart,
                    gridColumnEnd,
                    background: item.backgroundColor ? item.backgroundColor : '#fff',
                    paddingLeft: 4,
                    paddingRight: 4,
                    borderLeft: setBorder(item.borderLeft),
                    borderRight: setBorder(item.borderRight),
                    borderTop: setBorder(item.borderTop),
                    borderBottom: setBorder(item.borderBottom),
                    display: 'flex',
                    alignItems: item.verticalAlign === 'top' ? 'flex-start' : item.verticalAlign === 'middle' ? 'center' : item.verticalAlign === 'bottom' ? 'flex-end' : 'flex-start',
                }}
                onClick={() => {
                    setSelectedNewDocuCell(item.uuid);
                    forceRendering();
                }}
            >
                <div>
                {
                    item.type === 'label' ? 
                        <Typography.Text
                            ellipsis
                            style={{
                                width: (cellWidth * item.width) - 10,
                                fontSize: item.fontSize ? item.fontSize  : 12,
                                textAlign: item.value ? item.textAlign ? item.textAlign : 'left' : 'center',
                                color: item.value ? item.color ? item.color : '#222' : '#999',
                                
                            }}                                        
                        >{item.value ? item.value : '공란'}</Typography.Text>
                    : 
                        <></>
                }
                </div>
                {
                    isHover && 
                    <div className="resize-mark">
                        <ResizeMark item={item} />
                    </div>
                }
            </div>
                
            <style jsx>{`
            .item {border: 1px solid #eee; background: rgba(0,0,0,0); cursor: pointer;}
            .resize-mark {
                position: absolute; top: ${position[0] - 8}px; left: ${position[1] - 8}px; cursor: nwse-resize;
            }
            `}</style>
        </>
    )
}














interface ResizeMarkProps {
    item: ItemType;
}
const ResizeMark = ({ item }: ResizeMarkProps) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'resize',
        item: item,
        end: (item, monitor) => {
            
        },
        collect: (monitor) => {
            return ({
                isDragging: monitor.isDragging(),
                handlerId: monitor.getHandlerId(),
            })
        },
    }));
    
    return (
        <>
            <div ref={drag} className="container">

            </div>
            <style jsx>{`
            .container { width: 12px; height: 12px; border-radius: 100%; background: ${blue[4]}}
            `}</style>
        </>
    )
}