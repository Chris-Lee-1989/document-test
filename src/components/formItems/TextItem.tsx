import { onDragEnd } from '@/modules/drag';
import { ColumnType, DragResultType, RowType } from '@/types/dragTypes';
import React from 'react';
import { useDrag } from 'react-dnd';

interface Props {
    form: RowType[];
    onChange: (form: RowType[]) => void;
}

export default function TextItem({ form, onChange }: Props) {
    
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'box',
        item: { 
            type: 'text',
        },
        end: (item: any, monitor) => {
            onDragEnd({
                form, 
                onChange,
                item,
                monitor,
            })
        },
        collect: (monitor) => {
            return ({
                isDragging: monitor.isDragging(),
                handlerId: monitor.getHandlerId(),
            })
        },
    }), [form]);

    return (
        <>
            <div ref={drag} className={`container ${isDragging ? 'dragging' : ''}`} data-testid="form">
                Text Item
            </div>
            <style jsx>{`
            .container { width: 200px; height: 50px; background: red; cursor: grab; display: flex; align-items: center; justify-content: center;}
            .container.dragging { opacity: 0.5; cursor: grabbing;}
            `}</style>
        </>
    )
}
