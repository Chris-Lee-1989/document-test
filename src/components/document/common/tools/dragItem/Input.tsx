import { FormOutlined, MediumOutlined, MediumWorkmarkOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react'
import { useDrag } from 'react-dnd';
import { useRecoilState } from 'recoil';
import isDragState from '@/atoms/document/isDragState';
import { useUpdateEffect } from 'ahooks';
import { DropResultType, ItemType } from '@/types/documentTypes';
import { v1 } from 'uuid';

interface Props {
    onDrop: (item: ItemType, result: DropResultType) => void;
}
export default function Label({ onDrop }: Props) {

    const [isDrag, setDrag] = useRecoilState(isDragState);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'drop',
        item: undefined,
        end: (item, monitor) => {
            const result = monitor.getDropResult<DropResultType>();
            if (result) {
                onDrop(
                    {
                        type: 'input',
                        placeholder: '입력해주세요',
                        key: '',

                        uuid: v1(),
                        value: '',
                        width: 3,
                        height: 1,
                        rowNum: result.rowNum, 
                        colNum: result.colNum,
                        textAlign: 'left',
                        verticalAlign: 'top',
                        borderLeft: true,
                        borderRight: true,
                        borderTop: true,
                        borderBottom: true,
                        borderColor: '#222222FF',
                        backgroundColor: '#FFFFFFFF',
                        color: '#222222FF',
                        fontSize: 12,
                        fontWeight: '400',
                    }, 
                    result
                );
            }
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

    return (
        <>
            <div className="container" ref={drag}>
                <Button icon={<FormOutlined />}>입력창</Button>
            </div>
            <style jsx>{`
            
            `}</style>
        </>
    )
}
