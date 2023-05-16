import { ColumnType, RowType } from '@/types/dragTypes';
import React, { ReactNode } from 'react'
import EmptyRow from './formItems/EmptyRow';
import Col from './Col';

interface Props {
    rowNum: number;
    data: RowType;
}
export default function Row({ rowNum, data }: Props) {
    return (
        <>
            <div className="container">
            {
                data.columns.length > 0 ? 
                    data.columns.map((col: ColumnType, colIdx: number) => {
                        return (
                            <Col key={`col-${colIdx}`} rowNum={rowNum} colNum={colIdx} data={{...col, height: data.height}} isDrop={[colIdx === 0, true]} />
                        )
                    })
                :
                <EmptyRow height={data.height} rowNum={rowNum} />
            }
            </div>
            <style jsx>{`
            .container {width: 100%; display: flex; align-items: center; justify-content: center; flex-direction: row;}
            `}</style>
        </>
    )
}
