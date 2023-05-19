import React, { useRef, useState } from 'react'
import { useRecoilState } from 'recoil';
import isDragState from '@/atoms/document/isDragState';
import { DropResultType, ItemType } from '@/types/documentTypes';
import { blue, purple } from '@ant-design/colors';
import { getCopyItem, getSelectedNewDocuCell, onChangeCell, onChangeSelected, onCopyItem, onDeleteItem, onPasteItem, setSelectedNewDocuCell } from '@/modules/document';
import { Input, Typography } from 'antd';
import { useDrag, useDrop, DragPreviewImage } from 'react-dnd';
import { useKeyPress, useUpdateEffect } from 'ahooks';


interface Props {
    width: number;
    height: number;
    columns: number;
    rows: number;
    data: ItemType[];
}


export default function DocumentOverlay({ width, height, columns, rows, data}: Props) {

    // 셀 1칸 너비
    const cellWidth = (width / columns);
    const cellHeight = (height / rows);
    return (
        <>
            <div className="container">
                <div className="grid">
                {
                    data.map((item: ItemType, idx: number) => {
                        return (
                            <ViewerCell
                                key={idx}
                                cellWidth={cellWidth}
                                item={item}
                            />
                        )
                    })
                }
                </div>
            </div>
            <style jsx>{`
            .container {
                width: ${width}px; height: ${height}px;
            }

            .grid {
                transition: 300ms;
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







interface ViewerCellProps {
    item: ItemType;
    cellWidth: number;
}   
const ViewerCell = ({ item, cellWidth }: ViewerCellProps) => {

    const gridRowStart = item.rowNum + 1;
    const gridRowEnd = item.rowNum + 1 + Number(item.height);
    const gridColumnStart = item.colNum + 1;
    const gridColumnEnd = item.colNum + 1 + Number(item.width);

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
                className={`item uuid-${item.uuid}`}
                style={{
                    gridRowStart,
                    gridRowEnd,
                    gridColumnStart,
                    gridColumnEnd,
                    order: 1,
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
            >
                <div>
                {
                    item.type === 'label' ? 
                        <Typography.Text
                            ellipsis
                            style={{
                                width: (cellWidth * item.width) - 10,
                                fontSize: item.fontSize ? item.fontSize  : 12,
                                fontWeight: item.isBold ? 'bold' : 400,
                                textAlign: item.value ? item.textAlign ? item.textAlign : 'left' : 'center',
                                color: item.value ? item.color ? item.color : '#222' : '#999',
                                textDecorationLine: item.isUnderline ? 'underline' : item.isStrikethrough ? 'line-through' : 'none',
                                fontStyle: item.isItalic ? 'italic' : 'normal',
                                
                            }}                                        
                        >{item.value ? item.value : '공란'}</Typography.Text>
                    : 
                    item.type === 'input' ? 
                    <Typography.Text
                        ellipsis
                        style={{
                            width: (cellWidth * item.width) - 10,
                            fontSize: 12,
                            fontWeight: 400,
                            color: '#999'
                        }}                                        
                    >{`#{${item.key ? item.key : '미입력'}}`}</Typography.Text>
                    : 
                        <></>
                }
                </div>
            </div>
                
            <style jsx>{`
            .item {border: 1px solid #eee; background: rgba(0,0,0,0); cursor: pointer;}
            .resize-mark {
                position: absolute; top: ${position[0] - 10}px; left: ${position[1] - 10}px; cursor: nwse-resize;
            }
            `}</style>
        </>
    )
}





