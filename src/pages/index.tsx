import React from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { useRecoilState } from "recoil";
import { Button, Typography } from "antd";
import Router from "next/router";

interface Props {
  
}

function Page() {
    return (
        <>
            <div className="page">

                <div className="container">
                    <Typography.Title level={4}>드래그</Typography.Title>
                    <Button type="default" onClick={() => Router.push('/drag/1')} >드래그-1</Button>
                </div>

            </div>
            <style jsx>{`
            .page {display: flex; align-items: center; justify-content: center; flex-direction: column; width: 100vw; height: 100vh;}
            `}</style>
        </>
    )
}

export default React.memo(Page);