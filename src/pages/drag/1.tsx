import Col from "@/components/Col";
import DragBox from "@/components/DragBox";
import DropBox from "@/components/DropBox";
import Row from "@/components/Row";
import EmptyRow from "@/components/formItems/EmptyRow";
import InputItem from "@/components/formItems/InputItem";
import TextItem from "@/components/formItems/TextItem";
import { RowType } from "@/types/dragTypes";
import { useMount } from "ahooks";
import { Button, Descriptions, Input, Typography } from "antd";
import React, { DragEventHandler, useState } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function Page() {

    const style = {
        rowStyle: {

        },
        colStyle: {

        }
    }

    const [title, setTitle] = useState<string>('');
    const [form, setForm] = useState<RowType[]>([]);

    const onClickAddRowButton = () => {
        const cp = structuredClone(form);
        cp.push({
            height: 30,
            columns: []
        });
        setForm(cp);
    }
    
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <div className="page">
                    <div className="a4">
                        <div className="section-1">
                            <div className="box">
                                <Typography.Paragraph style={{margin: 0, fontSize: 12}}>작성일자: </Typography.Paragraph>
                                <Typography.Paragraph style={{margin: 0, fontSize: 12}}>작성자: </Typography.Paragraph>
                                <Typography.Paragraph style={{margin: 0, fontSize: 12}}>문서번호: </Typography.Paragraph>
                            </div>

                            <div className="title" >
                                <Typography.Title level={2} style={{margin: 0}}>{title ? title : '제목란'}</Typography.Title>
                            </div>

                            <div className="box" />

                        </div>
                    {
                        form.map((row: RowType, rowIdx: number) => {
                            return (
                                <Row key={`row-${rowIdx}`} rowNum={rowIdx} data={row} />
                            )
                        })
                    }
                    </div>
                    <div className="menu">
                        <Descriptions
                            bordered
                            size="small"
                        >
                            <Descriptions.Item label="문서명">
                                <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </Descriptions.Item>
                        </Descriptions>
                        <Button 
                            onClick={onClickAddRowButton}
                        >행추가</Button>
                        <TextItem form={form} onChange={(form: RowType[]) => setForm(form) } />
                        <InputItem form={form} onChange={(form: RowType[]) => setForm(form) } />
                    </div>
                </div>
            </DndProvider>
            <style jsx>{`
            .page {width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: center; min-width: 1200px; width: 1200px; max-width: 1200px; margin: auto; gap: 20px;}
            .page > .a4 {width: calc((100vh - 80px)/29.7*21); height: calc(100vh - 80px); background: white; border: 1px solid #ddd; padding: calc((100vh - 80px)/29.7*21/100*5); display: flex; flex-direction: column; overflow: hidden;}
            .page > .a4 > .section-1 {height: calc((100vh - 80px) * 0.07); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;}
            .page > .a4 > .section-1 > .box {flex-basis: 100px;}
            .page > .a4 > .section-1 > .title { flex: 1; text-align: center;}
            .page > .a4 > .row {width: 100%; border-bottom: 1px solid #ddd; display: flex; align-items: center; justify-content: center; flex-direction: row;}
            .page > .a4 > .row:first-of-type {border-top: 1px solid #ddd;}
            .page > .menu {height: calc(100vh - 80px); border: 1px solid #ddd; background: white; width: 400px;}
            `}</style>
        </>
    )
}

export default React.memo(Page);