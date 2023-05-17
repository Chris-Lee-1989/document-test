import { MediumOutlined, MediumWorkmarkOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react'
import { useDrag } from 'react-dnd';
import { useRecoilState } from 'recoil';
import isDragState from '@/atoms/document/isDragState';
import { useUpdateEffect } from 'ahooks';
import { DropResultType } from '@/types/documentTypes';

interface Props {
    onDrop: (result: DropResultType) => void;
}
export default function Label({ onDrop }: Props) {

    const [isDrag, setDrag] = useRecoilState(isDragState);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'drop',
        item: { 

        },
        end: (item, monitor) => {
            const result = monitor.getDropResult<DropResultType>();
            if (result) onDrop(result);
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
                <Button icon={<MediumOutlined />}>라벨</Button>
            </div>
            <style jsx>{`
            
            `}</style>
        </>
    )
}
