import { DocuType, DropResultType, ItemType } from "@/types/documentTypes";
import { v1, v4 } from "uuid";

// 초기 데이터
const initData: DocuType = {
    title: '',
    page: [
        {
            rows: 50,
            columns: 40,
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
            rows: 50,
            columns: 40,
            items: [],
        });
        onSaveNewDocu(document);
    }
}

// 문서 페이지 속성 변경
export const onChangeDocumentPageAttribute = ( key: 'rows'|'columns', value: any) => {
    if (typeof window !== 'undefined') {
        let document = <DocuType>getNewDocu();
        if (key === "rows" || key === "columns") {
            document.page[document.currentPage][key] = value;
        }
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

// 선택된 셀 변경
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

// UUID 로 셀 변경
export const onChangeCell = (uuid: string, key: string, value: any) => {
    let docu = getNewDocu();
    docu.page[docu.currentPage].items = docu.page[docu.currentPage].items.map((item: ItemType) => {
        if (item.uuid === uuid) {
            let cp: any = structuredClone(item);
            cp[key] = value;
            return cp
        }
        return item;
    });
    onSaveNewDocu(docu);
}








// 복사된 아이템 가져오기
export const getCopyItem = () => {
    if (typeof window !== 'undefined') {
        const copy = localStorage.getItem('new-document-copy-item');
        if (copy) return JSON.parse(copy);
        else return undefined
    }
    return undefined;
}


// 현재 선택된 셀 복사하기
export const onCopyItem = () => {
    if (typeof window !== 'undefined') {
        const uuid = localStorage.getItem('selected-new-document-cell');
        if (uuid) {
            const docu = <DocuType>getNewDocu();
            const find = docu.page[docu.currentPage].items.find((item:ItemType) => item.uuid === uuid);
            if (find) localStorage.setItem('new-document-copy-item', JSON.stringify({...find, uuid: v4(), colNum: find.colNum + 1, rowNum: find.rowNum + 1}));
        }
    }
}

// 현재 선택된 셀 붙여넣기
export const onPasteItem = () => {
    if (typeof window !== 'undefined') {
        const copy = getCopyItem();
        let docu = <DocuType>getNewDocu();
        docu.page[docu.currentPage].items.push(copy);
        onSaveNewDocu(docu);
    }
}


// 선택된 셀 삭제
export const onDeleteItem = () => {
    if (typeof window !== 'undefined') {
        const uuid = localStorage.getItem('selected-new-document-cell');
        console.log(uuid);
        if (uuid) {
            const docu = <DocuType>getNewDocu();
            docu.page[docu.currentPage].items = docu.page[docu.currentPage].items.filter((item:ItemType) => {
                return item.uuid !== uuid
            });
            onSaveNewDocu(docu);
            localStorage.setItem('selected-new-document-cell', '');
        }
    }
}
