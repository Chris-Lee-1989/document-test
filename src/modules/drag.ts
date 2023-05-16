import { DragResultType, RowType } from "@/types/dragTypes";
import { DragSourceMonitor } from "react-dnd";

interface OnDragEndProps {
    form: RowType[];
    onChange: (form: RowType[]) => void;
    item: any;
    monitor: DragSourceMonitor;
}
export const onDragEnd = ({ form, onChange, item, monitor}: OnDragEndProps) => {
    const result: DragResultType | null  = monitor.getDropResult<DragResultType>();
    if (result) {
        if (result.type === 'empty-row') {
            let cp = structuredClone(form);
            if (cp[result.rowNum]) {
                cp[result.rowNum].columns.push(item);
                onChange(cp);
            }
        } else if (result.type === 'col') {
            let cp = structuredClone(form);
            if (cp[result.rowNum] && (result.colNum || result.colNum === 0) && result.position) {
                const columnLength = cp[result.rowNum].columns.length;
                // console.log(columnLength, result.colNum);
                const prev = cp[result.rowNum].columns.slice(0,result.position === 'left' ? result.colNum : result.colNum + 1);
                const next = cp[result.rowNum].columns.slice(result.position === 'left' ? result.colNum : result.colNum + 1);
                const newArr = prev.concat(item, next);
                cp[result.rowNum].columns = newArr;
                onChange(cp);
            }
        }
    }
}