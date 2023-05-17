import { DocuType, DropResultType, ItemType } from "@/types/documentTypes";
import { v1 } from "uuid";

// 초기 데이터
const initData: DocuType = {
    title: '',
    page: [
        {
            rows: 40,
            columns: 10,
            items: []
        }
    ],
    currentPage: 0,
}

// 문서 데이터 조회
export const getNewDocu = () => {
    if (typeof window !== 'undefined') {
        let dataSet = localStorage.getItem('new-document-data-set');
        if (dataSet === null) {
            localStorage.setItem('new-document-data-set', JSON.stringify(initData));
            dataSet = localStorage.getItem('new-document-data-set');
        }
        if (dataSet) {
            return <DocuType>JSON.parse(dataSet);
        }
    }
    return {} as DocuType;
}

// 문서 데이터 저장
export const onSaveNewDocu = (docu: DocuType) => {
    localStorage.setItem('new-document-data-set', JSON.stringify(docu));
}

// 문서 페이지 추가
export const onAddNewDocuPage = () => {
    if (typeof window !== 'undefined') {
        let document = <DocuType>getNewDocu();
        document.page.push({
            rows: 40,
            columns: 30,
            items: [],
        });
        onSaveNewDocu(document);
    }
}

// 현재 페이지 설정
export const onSetNewDocuPage = (page: number) => {
    if (typeof window !== 'undefined') {
        let docu = <DocuType>getNewDocu();
        docu.currentPage = page;
        onSaveNewDocu(docu);
    }
}

// 문서 페이지 삭제
export const onDeleteNewDocuPage = (page: number) => {
    if (typeof window !== 'undefined') {
        let docu = <DocuType>getNewDocu();
        docu.page.splice(page, 1);
        onSaveNewDocu(docu);
    }
}

// 문서에 아이템 추가
export const onAddItemNewDocuPage = (result: DropResultType) => {
    if (typeof window !== 'undefined') {
        let docu = <DocuType>getNewDocu();
        docu.page[docu.currentPage].items.push({
            type: 'label',
            uuid: v1(),
            value: '',
            rowNum: result.rowNum,
            colNum: result.colNum,
            width: 1,
            height: 1,
        });
        onSaveNewDocu(docu);
    }
}


// 선택된 셀 가져오기
export const getSelectedNewDocuCell = () => {
    if (typeof window !== 'undefined') {
        let dataSet = localStorage.getItem('selected-new-document-cell');
        if (dataSet) {
            return <ItemType>JSON.parse(dataSet);
        } else {
            return undefined
        }
    }
    return undefined;
}


// 선택된 셀 설정하기
export const setSelectedNewDocuCell = (item: ItemType) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('selected-new-document-cell', JSON.stringify(item));
    }
}

export const onChangeSelected = (key: string, value: any) => {
    let docu = getNewDocu();
    let selected: any = getSelectedNewDocuCell();
    selected[key] = value;
    docu.page[docu.currentPage].items = docu.page[docu.currentPage].items.map((item: ItemType) => {
        if (item.uuid === selected.uuid) {
            return selected;
        }
        return item;
    });
    setSelectedNewDocuCell(selected);
    onSaveNewDocu(docu);
}