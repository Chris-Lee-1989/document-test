import React, { useState } from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { useRecoilState } from "recoil";
import { Button, Tabs, Typography } from "antd";
import Router from "next/router";
const Viewer = dynamic(() => import('@/components/viewer/Viewer'), { ssr: false, });

function Page() {

    const [key, setKey] = useState<string>('1');
    const [type, setType] = useState<'pdf'|'ppt'|'hwp'>('pdf');

    return (
        <>
            <div className="page">

                <div className="container">
                    <Tabs 
                        style={{width: '100vw', height:'100vh'}}
                        defaultActiveKey={key}
                        items={[
                            {
                                key: '1',
                                label: `문서`,
                                children: <div className="box">
                                    <ul>
                                        <li>
                                            <Button onClick={() => Router.push('/document/new')}>작성</Button>
                                        </li>
                                        <li>
                                            <Button onClick={() => Router.push('/document/view')}>뷰어</Button>
                                        </li>
                                    </ul>
                                </div>
                            },
                            {
                                key: '2',
                                label: `오피스 뷰어`,
                                children: <div className="box">
                                    <Tabs 
                                        defaultActiveKey={type}
                                        items={[
                                            {
                                                key: 'pdf',
                                                label: 'pdf viewer',
                                                children: <>
                                                    <Viewer 
                                                        type={type}
                                                        url="/test.pdf"
                                                        width={600}
                                                    />
                                                </>
                                            },
                                            {
                                                key: 'word',
                                                label: `word viewer`,
                                                children: <>
                                                    <Viewer 
                                                        type={type}
                                                        url="https://fla-system.s3.ap-northeast-2.amazonaws.com/tf16412208_win32.dotx"
                                                        width={800}
                                                        height={500}
                                                    />
                                                </>
                                            },
                                            {
                                                key: 'xlsx',
                                                label: `xlsx viewer`,
                                                children: <>
                                                    <Viewer 
                                                        type={type}
                                                        url="https://fla-system.s3.ap-northeast-2.amazonaws.com/test.xlsx"
                                                        width={800}
                                                        height={500}
                                                    />
                                                </>
                                            },
                                            {
                                                key: 'ppt',
                                                label: `ppt viewer`,
                                                children: <>
                                                    <Viewer 
                                                        type={type}
                                                        url="https://fla-system.s3.ap-northeast-2.amazonaws.com/test.pptx"
                                                        width={800}
                                                        height={500}
                                                    />
                                                </>
                                            },
                                            {
                                                key: 'hwp',
                                                label: `hwp viewer`,
                                                children: <>
                                                    <Viewer 
                                                        type={type}
                                                        url="/test.hwp"
                                                        width={900}
                                                        height={500}
                                                    />
                                                </>
                                            },
                                        ]}
                                        onChange={(type: any) => {
                                            setType(type)
                                        }} 
                                    />
                                </div>
                            },
                        ]}
                        onChange={(_key: string) => {
                            setKey(_key)
                        }} 
                    />
                </div>

            </div>
            <style jsx>{`
            .page {display: flex; align-items: center; justify-content: center; flex-direction: column; width: 100vw; height: 100vh;}
            .container {width: 100vw; padding: 20px; background :white;}
            .box {padding: 20px; background :white;}
            `}</style>
        </>
    )
}

export default React.memo(Page);