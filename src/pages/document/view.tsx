import { useSize } from 'ahooks';
import dynamic from 'next/dynamic';
import React from 'react'
const Viewer = dynamic(() => import('@/components/document/Viewer'), { ssr: false, });

export default function view() {

    const size = useSize(typeof window !== 'undefined' ? document.querySelector('body') : null);

    return (
        <>
            <div className="wrap">
                <Viewer 
                    height={1200}
                />
            </div>
            <style jsx>{`
            `}</style>
        </>
    )
}
