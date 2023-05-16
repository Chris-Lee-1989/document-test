import { CSSProperties, ReactNode } from "react";

export interface RowType {
    height: number;
    columns: ColumnType[];
}

export interface ColumnType {
    type: 'text' | 'input';
    height?: number;
    style?: CSSProperties;
}

export interface DragResultType {
    type: 'empty-row';
    rowNum: number;
    colNum?: number;
    position?: 'left' | 'right';
}