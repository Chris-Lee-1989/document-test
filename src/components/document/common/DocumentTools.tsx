import React from 'react'
import Label from './tools/dragItem/Label';
import { DropResultType } from '@/types/documentTypes';
import { getSelectedNewDocuCell, onChangeSelected } from '@/modules/document';
import { Card, Divider, Input, InputNumber, Space, Typography } from 'antd';

interface Props {
    columns: number;
    rows: number;
    onDrop: (result: DropResultType) => void;
    forceRendering: () => void;
}

export default function DocumentTools({ columns, rows, onDrop, forceRendering}: Props) {

    // 선택된 셀
    const selectedCell = getSelectedNewDocuCell();
    
    return (
        <>
            <div className="container">
                <div className="section">
                    <div className="title">
                        <Typography.Text>도구 모음</Typography.Text>
                    </div>
                    <div className="content">
                        <div className="drag-items" style={{padding: '12px', display: 'flex'}}>
                            <Label
                                onDrop={onDrop}
                            /> 
                        </div>
                    </div>
                </div>
                
                <Divider style={{borderColor: '#ddd'}} />
                {selectedCell && 
                    <div className="section">
                        <div className="title">
                            <Typography.Text>셀 속성</Typography.Text>
                        </div>
                        <div className="content">
                            <div className="row">
                                <div className="head">
                                    <Typography.Text style={{fontSize: 12}}>UUID</Typography.Text>
                                </div>
                                <div className="body">
                                    <Typography.Text style={{fontSize: 12}}>{selectedCell.uuid}</Typography.Text>
                                </div>
                            </div>
                            <div className="row">
                                <div className="head">
                                    <Typography.Text style={{fontSize: 12}}>타입</Typography.Text>
                                </div>
                                <div className="body">
                                    <Typography.Text style={{fontSize: 12}}>{selectedCell.type}</Typography.Text>
                                </div>
                            </div>
                            <div className="row">
                                <div className="head">
                                    <Typography.Text style={{fontSize: 12}}>값</Typography.Text>
                                </div>
                                <div className="body">
                                    <Input 
                                        value={selectedCell.value} 
                                        onChange={(e) => {
                                            onChangeSelected('value', e.target.value);
                                            forceRendering();
                                        }} 
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="head">
                                    <Typography.Text style={{fontSize: 12}}>너비</Typography.Text>
                                </div>
                                <div className="body">
                                    <InputNumber 
                                        value={selectedCell.width} 
                                        onChange={(value) => {
                                            onChangeSelected('width', value);
                                            forceRendering();
                                        }} 
                                    />
                                </div>
                                <div className="head">
                                    <Typography.Text style={{fontSize: 12}}>높이</Typography.Text>
                                </div>
                                <div className="body">
                                    <InputNumber 
                                        value={selectedCell.height} 
                                        onChange={(value) => {
                                            onChangeSelected('height', value);
                                            forceRendering();
                                        }} 
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="head">
                                    <Typography.Text style={{fontSize: 12}}>열 좌표</Typography.Text>
                                </div>
                                <div className="body">
                                    <InputNumber 
                                        value={selectedCell.colNum + 1} 
                                        onChange={(value) => {
                                            onChangeSelected('colNum', Number(value)-1);
                                            forceRendering();
                                        }} 
                                    />
                                </div>
                                <div className="head">
                                    <Typography.Text style={{fontSize: 12}}>행 좌표</Typography.Text>
                                </div>
                                <div className="body">
                                    <InputNumber 
                                        value={selectedCell.rowNum + 1} 
                                        onChange={(value) => {
                                            onChangeSelected('rowNum', Number(value)-1);
                                            forceRendering();
                                        }} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            <style jsx>{`
            .container {flex: 1; padding: 20px; max-width: 500px;}
            .container > .section {}
            .container > .section > .title {border: 1px solid #ddd; border-radius: 8px 8px 0px 0px; background: #f5f5ff; padding: 12px 20px; font-weight: bold;}
            .container > .section > .content {border: 1px solid #ddd; border-top: 0; border-radius: 0px 0px 8px 8px; background: #fff;}
            .container > .section > .content > .row {display: flex; border-bottom: 1px solid #ddd;}
            .container > .section > .content > .row:last-of-type {border-bottom: 0px;}
            .container > .section > .content > .row > .head {padding: 12px; border-right: 1px solid #ddd; flex-basis: 80px; border-left: 1px solid #ddd; background: #f5f5ff; font-weight: 600;}
            .container > .section > .content > .row > .head:first-of-type {border-left: 0;}
            .container > .section > .content > .row > .body {padding: 12px; flex: 1;}
            `}</style>
        </>
    )
}
