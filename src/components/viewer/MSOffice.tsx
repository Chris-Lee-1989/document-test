import { useSize } from 'ahooks';
import React from 'react'

interface Props {
    url: string;
    width?: number;
    height?: number;
}

export default function Viewer({ url, width, height}: Props) {
    const size = useSize(typeof window !== "undefined" ? document.querySelector('body') : null);
    const _width = width ? width : size ? size.width : 800;
    const _height = height ? height : size ? size.height : 600;
    return (
        <>
            <iframe 
                style={{border: 0}}
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${url}`} 
                width={_width} 
                height={_height} 
            />
        </>
    )
}
