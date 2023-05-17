import React from 'react'
import { useRecoilState } from 'recoil';
import isDragState from '@/atoms/document/isDragState';
import { ItemType } from '@/types/documentTypes';
import { blue, purple } from '@ant-design/colors';
import { getSelectedNewDocuCell, setSelectedNewDocuCell } from '@/modules/document';
import { Typography } from 'antd';

interface Props {
    width: number;
    height: number;
    columns: number;
    rows: number;
    offsetX: number;
    offsetY: number;
    data: ItemType[];
    forceRendering: () => void;
}

export default function DocumentOverlay({ width, height, columns, rows, offsetX, offsetY, data, forceRendering }: Props) {

    const [isDrag, setDrag] = useRecoilState(isDragState);

    // 선택된 셀
    const selectedCell = getSelectedNewDocuCell();

    return (
        <>
            <div className="container">
                <div className="grid">
                {
                    data.map((item: ItemType, idx: number) => {
                        const isSelected = item.uuid === selectedCell?.uuid;
                        const gridRowStart = item.rowNum + 1;
                        const gridRowEnd = item.rowNum + 1 + Number(item.height);
                        const gridColumnStart = item.colNum + 1;
                        const gridColumnEnd = item.colNum + 1 + Number(item.width);
                        return (
                            <div 
                                className={`item ${isSelected && 'selected'}`}
                                key={idx}
                                style={{
                                    gridRowStart,
                                    gridRowEnd,
                                    gridColumnStart,
                                    gridColumnEnd,
                                    background: item.backgroundColor ? item.backgroundColor : '#fff',
                                }}
                                onClick={() => {
                                    setSelectedNewDocuCell(item);
                                    forceRendering();
                                }}
                            >
                                {
                                    item.type === 'label' ? 
                                        <>{item.value}</>
                                        // <Typography.Text
                                        //     placeholder='Empty'
                                        //     style={{
                                        //         width: 50
                                        //     }}
                                        //     ellipsis
                                        // >{item.value}</Typography.Text>
                                    : 
                                        <></>
                                }
                            </div>
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
