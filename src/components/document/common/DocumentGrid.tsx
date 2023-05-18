import { useMount, useUpdateEffect } from 'ahooks';
import { Typography } from 'antd';
import React, { useState } from 'react'
import { useRecoilState } from 'recoil';
import isDragState from '@/atoms/document/isDragState';
import DropCell from './DropCell';
import { CellType } from '@/types/documentTypes';

interface Props {
    width: number;
    height: number;
    columns: number;
    rows: number;
    offsetX: number;
    offsetY: number;
}

export default function DocumentGrid({ width, height, columns, rows, offsetX, offsetY }: Props) {

    const [isDrag, setDrag] = useRecoilState(isDragState);

    // 마운트 시
    useMount(() => {
        onInit();
    });

    // 문서 데이터
    const [data, setData] = useState<CellType[]>([]);

    // 초기화
    const onInit = () => {
        let _data: any[] = [];
        for (let r=0; r<rows; r++) {
            for (let c=0; c<columns; c++) {
                _data.push({
                    type: 'body',
                    rowNum: r,
                    colNum: c,
                });
            }
        }
        setData(_data);
    }

    // 사이즈 변경 시
    useUpdateEffect(() => {
        onInit();
    }, [rows, columns]);

    return (
        <>
            <div className="container">
                <div className="grid">
                    {
                        data.map((item: CellType, idx: number) => {
                            return (
                                <div 
                                    className={`item ${item.type}`} 
                                    key={idx}
                                    style={{
                                        order: idx, 
                                        gridRowStart: item.rowNum+1, gridRowEnd: item.rowNum+2,
                                        gridColumnStart: item.colNum+1, gridColumnEnd: item.colNum+2 ,
                                        zIndex: 500,
                                        opacity: 1,
                                    }} 
                                >
                                    <DropCell item={item} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <style jsx>{`
            .container {
                z-index: 500;
                position: absolute; top: ${offsetY}px; left: ${offsetX}px;
                width: ${width}px; height: ${height}px;
                opacity: ${isDrag ? 0.5 : 1};
            }

            .grid {
                transition: 300ms;
                position: absolute; top: 0; left: 0;
                width: ${width}px; height: ${height}px;
                display: grid;
                grid-template-rows: repeat(${rows}, 1fr);
                grid-template-columns: repeat(${columns}, 1fr);
            }

            .grid > .item {border: 1px solid #eee;}
            .grid > .item.body {display: flex; align-items: center; justify-content: center; flex-direction: column;}
            `}</style>
        </>
    )
}
