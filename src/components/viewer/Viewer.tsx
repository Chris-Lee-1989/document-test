import React from 'react'
import PDF from './PDF';
import MSOffice from './MSOffice';
import HWP from './HWP';

interface PDFProps {
    type: 'pdf',
    url: string;
    width?: number;
    height?: number;
}

interface PPTProps {
    type: 'ppt',
    url: string;
    width?: number;
    height?: number;
}

interface XLSXProps {
    type: 'ppt',
    url: string;
    width?: number;
    height?: number;
}

interface HWProps {
    type: 'hwp',
    url: string;
    width?: number;
    height?: number;
}


type Props = PDFProps | PPTProps | HWProps | XLSXProps;

export default function Viewer({ type, url, width, height }: Props) {
    
    if (type === "pdf") return <PDF url={url} width={width} height={height} />
    else if (type === "hwp") return <HWP url={url} width={width} height={height} />
    else if (type === "ppt") return <MSOffice url={url} width={width} height={height} />
    else if (type === "xlsx") return <MSOffice url={url} width={width} height={height} />
    else if (type === "word") return <MSOffice url={url} width={width} height={height} />
    else {
        return <>
            <div>잘못된 TYPE 입력</div>
        </>
    }
}
