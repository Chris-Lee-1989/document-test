import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Viewer } from 'hwp.js';
import { useMount } from 'ahooks';

interface Props {
    url: string;
    width?: number;
    height?: number;
}
export default function ViewerComp({ url, width, height }: Props) {

    const ref: any = useRef(null);

    useMount(() => {
        loadFile();
    });

    const loadFile = useCallback(() => {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
            showViewer(new File([xhr.response], 'random'))
        };
        xhr.open('GET', url);
        xhr.send();
    }, [])

    const showViewer = useCallback((file: any) => {
        const reader = new FileReader()
        reader.onloadend = (result) => {
            var _a;
            const bstr: any = (_a = result.target) === null || _a === void 0 ? void 0 : _a.result;
            if (bstr) {
                try {
                    new Viewer(ref.current, bstr);
                } 
                catch (error) {
                    console.error(error);
                }
            }
        }
        reader.readAsBinaryString(file)
    }, []);
  
    return (
        <>
            <div className="viewer" ref={ref}/>
            <style jsx>{`
            .viewer {display: inline-block; 
                overflow: hidden;
                ${width ? ` width: ${width}px;` : `width: 100vw;`}
                ${height ? ` maxHeight: ${height}px; height: ${height}px; `: ` maxHeight: 99vh; height: 99vh;`}
            }
            `}</style>
        </>
    )
}
