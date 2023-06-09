import React from 'react'
import dynamic from 'next/dynamic';
import { useSize } from 'ahooks';
const NewDocument = dynamic(() => import('@/components/document/New'), { ssr: false, });

export default function Page() {

    const size = useSize(typeof window !== 'undefined' ? document.querySelector('body') : null);

    return (
        <>
            <div className="wrap">
                <NewDocument 
                    height={size ? (size.height - 30) : 0}
                />
            </div>
            <style jsx>{`
            .wrap {
                width: 100vw; height: 100vh; background: white;
                -webkit-user-select:none; -moz-user-select:none; -ms-user-select:none; user-select:none
            }
            `}</style>
        </>
    )
}
