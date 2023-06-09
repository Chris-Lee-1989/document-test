
// 오버레이 아이템 공통
interface CommonItemType {

    type: string;
    uuid: string;
    value: string;

    rowNum: number;
    colNum: number;

    width: number;
    height: number;

    borderColor?: string;
    borderLeft?: boolean;
    borderRight?: boolean;
    borderTop?: boolean;
    borderBottom?: boolean;

    backgroundColor?: string;

    color?: string; 
    fontSize?: number;
    fontWeight: '400' | 'bold'
    textAlign?: "left" | "center" | "right" | undefined;
    verticalAlign?: "top" | "middle" | "bottom" | undefined;
    
    isBold?: boolean;
    isUnderline?: boolean;
    isItalic?: boolean;
    isStrikethrough?: boolean;
}

// 라벨 아이템
export interface LabelItemType extends CommonItemType {
    type: 'label';
}
// 텍스트 아이템
export interface TextAreaItemType extends CommonItemType {
    type: 'textarea';
}

// 입력창 아이템
export interface InputItemType extends CommonItemType {
    type: 'input';
    key: string;
    placeholder?: string;
}

// 아이템 타입
export type ItemType = LabelItemType | TextAreaItemType | InputItemType;

// 문서 타입
export interface DocuType {
    title: string;
    page: {
        rows: number;
        columns: number;
        items: ItemType[];
    }[];
    currentPage: number;
}

// 셀 타입
export interface CellType {
    type: 'body';
    colNum: number;
    rowNum: number;
}

// 드롭 결과 타입
export interface DropResultType extends CellType {
    dropEffect: "move";
}