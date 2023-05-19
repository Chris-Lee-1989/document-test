import React, { useRef, useState } from 'react'
import DocumentGrid from '@/components/document/common/DocumentGrid';
import DocumentOverlay from '@/components/document/common/DocumentOverlay';
import DocumentTools from '@/components/document/common/DocumentTools';
import { DocuType, DropResultType, ItemType } from '@/types/documentTypes';
import { Button, Typography } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { blue, green, red } from '@ant-design/colors';
import { v1 } from "uuid";
import { useUpdate } from 'ahooks';
import { getNewDocu, getSelectedNewDocuCell, onAddItemNewDocuPage, onAddNewDocuPage, onDeleteNewDocuPage, onMoveItemNewDocuPage, onSetNewDocuPage, setSelectedNewDocuCell } from '@/modules/document';
import { useClickAway } from 'ahooks';

interface Props {
    offsetX?: number;
    offsetY?: number;
    height: number;
}

export default function Index({ offsetX=0, offsetY=0, height } : Props) {
    
    // 강제 렌더링
    const forceRendering = useUpdate();

    // 사이즈
    const width = Math.floor(height/29701*20997);

    // 문서 데이터
    const docu = getNewDocu();

    return (
        <>
            <div className="container">
                <div style={{position: 'absolute'}}>
                    <DocumentGrid 
                        offsetX={offsetX}
                        offsetY={offsetY}
                        columns={docu.page[docu.currentPage].columns}
                        rows={docu.page[docu.currentPage].rows}
                        height={height - 30} 
                        width={width} 
                    />
                    <DocumentOverlay
                        offsetX={offsetX}
                        offsetY={offsetY}
                        columns={docu.page[docu.currentPage].columns}
                        rows={docu.page[docu.currentPage].rows}
                        height={height - 30} 
                        width={width} 
                        data={docu.page[docu.currentPage].items}
                        forceRendering={() => forceRendering()}
                        onDrop={(item: ItemType, result: DropResultType) => {
                            onMoveItemNewDocuPage(item, result);
                            forceRendering();
                        }}
                    />
                </div>
                <div className="grid">
                    <div className="pagination">
                    {
                        docu.page.map((_: any, idx: number) => {
                            return (
                                <div 
                                    key={idx}
                                    className={`page ${idx === docu.currentPage && 'active'}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        idx !== docu.currentPage && onSetNewDocuPage(idx);
                                        forceRendering();
                                    }}
                                >
                                    <p >{idx + 1} page</p>
                                    <div className="delete-button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            if (docu.page.length <= 1) return false;
                                            if (idx === docu.currentPage) onSetNewDocuPage(0);
                                            onDeleteNewDocuPage(idx);
                                            forceRendering();
                                        }}
                                    >
                                        <CloseOutlined style={{fontSize: 12}} />
                                    </div>
                                </div>
                            )
                        })
                    }
                        {docu.page.length < 10 && <Button 
                            style={{fontSize: 12}} size="small" type="default" shape="circle" icon={<PlusOutlined style={{color: green[6]}} />} 
                            onClick={() => {
                                onAddNewDocuPage();
                                forceRendering();
                            }}
                        />}
                    </div>
                </div>
                <DocumentTools 
                    onDrop={(item: ItemType, result: DropResultType) => {
                        onAddItemNewDocuPage(item, result);
                        forceRendering();
                    }}
                    columns={docu.page[docu.currentPage].columns}
                    rows={docu.page[docu.currentPage].rows}
                    forceRendering={() => forceRendering()}
                />
            </div>

            <style jsx>{`
            .container {
                height: ${height}px; display: flex; gap: 20px;
            }

            .container > .grid {
                display: flex; flex-direction: column; align-items: flex-end; justify-content: flex-end;
                height: ${height}px;
                width: ${width}px;
            }

            .container > .grid > .pagination {
                width: ${width}px;
                height: 30px; 
                display: flex; align-items: center; padding: 0px 4px; gap: 4px;
            }

            .container > .grid > .pagination > .page {
                transition: 200ms; display: flex; align-items: center; border: 1px solid #ddd; border-radius: 4px; padding: 2px 4px; gap: 4px;
            }
            .container > .grid > .pagination > .page:hover {
                border: 1px solid ${blue[4]}; cursor: pointer; color: ${blue[4]};
            }
            .container > .grid > .pagination > .page > p {margin: 0; font-size: 11px;}
            .container > .grid > .pagination > .page > .delete-button {
                transition: 200ms;
            }
            .container > .grid > .pagination > .page > .delete-button:hover {
                color: ${red[4]};
            }
            .container > .grid > .pagination > .page.active { background: ${blue[4]}; color: white; }
            `}</style>
        </>
    )
}
