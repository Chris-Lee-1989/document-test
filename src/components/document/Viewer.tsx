import React, { useRef, useState } from 'react'
import { getNewDocu  } from '@/modules/document';
import DocumentViewer from '@/components/document/common/DocumentViewer';

interface Props {
    height: number;
}

export default function Index({ height } : Props) {

    // 사이즈
    const width = Math.floor(height/29701*20997);

    // 문서 데이터
    const docu = getNewDocu();

    return (
        <>
            <div className="container">
                <DocumentViewer
                    columns={docu.page[docu.currentPage].columns}
                    rows={docu.page[docu.currentPage].rows}
                    height={height - 30} 
                    width={width} 
                    data={docu.page[docu.currentPage].items}
                />
            </div>

            <style jsx>{`
            .container {
                background: white;
                height: ${height}px; display: flex; gap: 20px;
            }

            .container > .grid {
                display: flex; flex-direction: column; align-items: flex-end; justify-content: flex-end;
                height: ${height}px;
                width: ${width}px;
            }

            `}</style>
        </>
    )
}
