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
export const onAddItemNewDocuPage = (item: ItemType, result: DropResultType) => {
    if (typeof window !== 'undefined') {
        let docu = <DocuType>getNewDocu();
        docu.page[docu.currentPage].items.push(item);
        onSaveNewDocu(docu);
    }
}

// 문서에 아이템 이동
export const onMoveItemNewDocuPage = (item: ItemType, result: DropResultType) => {
    if (typeof window !== 'undefined') {
        let docu = <DocuType>getNewDocu();
        docu.page[docu.currentPage].items = docu.page[docu.currentPage].items.map((docuItem: ItemType) => {
            if (item.uuid === docuItem.uuid) {
                return {
                    ...docuItem,
                    colNum: result.colNum,
                    rowNum: result.rowNum,
                }
            }
            return docuItem;
        })
        onSaveNewDocu(docu);
    }
}


// 선택된 셀 가져오기
export const getSelectedNewDocuCell = () => {
    if (typeof window !== 'undefined') {
        const uuid = localStorage.getItem('selected-new-document-cell');
        if (uuid) {
            const docu = <DocuType>getNewDocu();
            const find = docu.page[docu.currentPage].items.find((item:ItemType) => item.uuid === uuid);
            return <ItemType>find;
        } else {
            return undefined
        }
    }
    return undefined;
}


// 선택된 셀 설정하기
export const setSelectedNewDocuCell = (uuid: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('selected-new-document-cell', uuid);
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
    onSaveNewDocu(docu);
}