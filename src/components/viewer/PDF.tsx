import { useSize } from 'ahooks';
import React, { useRef, useState } from 'react';
import {Document, Page, pdfjs} from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface Props {
    url: string;
    width?: number;
    height?: number;
}
export default function Viewer({ url, width, height }: Props) {
    const size = useSize(typeof window !== "undefined" ? document.querySelector('body') : null);
    const [numPages, setNumPages] = useState(null); // 총 페이지수
    const [pageNumber, setPageNumber] = useState(1); // 현재 페이지
    const [pageScale, setPageScale] = useState(1); // 페이지 스케일
    const pdfRef: any = useRef();
    width = width ? width : size ? size.width : 800;
    height = pdfRef ? pdfRef.current ? pdfRef.current.clientHeight : width * 1.4 : width * 1.4;

    return (
        <>
            <div className="container" >
                <Document 
                    file={url}
                    renderMode='canvas'
                    error={'오류 발생'}
                    loading={"로딩중"}
                    noData="데이터 없음"

                    onLoadError={(error) => { 
                        console.error(error);
                    }}

                    onLoadProgress={({ loaded, total }) => { 
                        console.info(`loading => ${Math.floor(loaded/total*100)}%`);
                    }}

                    onLoadSuccess={(pdf) => {
                        console.log(`${pdf.numPages}페이지 로딩 완료!`);
                    }}

                >
                    <Page 
                        canvasRef={pdfRef}
                        width={width} 
                        scale={1} 
                        rotate={0} 
                        pageNumber={pageNumber}
                    />
                </Document>
            </div>
            <style jsx>{`
            .container {width: ${width}px; max-width: ${width}px; height: ${height}px; max-height: ${height}px; display: inline-block; overflow: hidden; background: #666;}
            `}</style>
        </>
    )
}
