import React from 'react'
import LabelDrag from './tools/dragItem/Label';
import InputDrag from './tools/dragItem/Input';
import { DropResultType, ItemType } from '@/types/documentTypes';
import { getSelectedNewDocuCell, onChangeDocumentPageAttribute, onChangeSelected } from '@/modules/document';
import { Button, Card, Divider, Input, InputNumber, Select, Space, Typography } from 'antd';
import { BoldOutlined, BorderBottomOutlined, BorderLeftOutlined, BorderRightOutlined, BorderTopOutlined, FontSizeOutlined, ItalicOutlined, PicCenterOutlined, PicLeftOutlined, PicRightOutlined, StrikethroughOutlined, UnderlineOutlined } from '@ant-design/icons';
import { ColorPicker } from 'antd';

interface Props {
    columns: number;
    rows: number;
    onDrop: (item: ItemType, result: DropResultType) => void;
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
                        <Typography.Text style={{fontSize: 12}}>문서 속성</Typography.Text>
                    </div>
                    <div className="content">
                        <div className="row" >
                            <div className="head">
                                <Typography.Text style={{fontSize: 10}}>열</Typography.Text>
                            </div>
                            <div className="body">
                                <InputNumber 
                                    size="small"
                                    style={{fontSize: 10, padding: '0px 2px'}}
                                    value={rows} 
                                    min={10}
                                    max={40}
                                    onChange={(value) => {
                                        onChangeDocumentPageAttribute('rows', value);
                                        forceRendering();
                                    }} 
                                />
                            </div>
                            <div className="head">
                                <Typography.Text style={{fontSize: 10}}>행</Typography.Text>
                            </div>
                            <div className="body">
                                <InputNumber 
                                    size="small"
                                    style={{fontSize: 10, padding: '0px 2px'}}
                                    min={10}
                                    max={40}
                                    value={columns} 
                                    onChange={(value) => {
                                        onChangeDocumentPageAttribute('columns', value);
                                        forceRendering();
                                    }} 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Divider style={{borderColor: '#eee', margin: '12px 0'}} />

                <div className="section">
                    <div className="title">
                        <Typography.Text style={{fontSize: 12}}>도구 모음</Typography.Text>
                    </div>
                    <div className="content">
                        <div className="drag-items" style={{padding: '8px', display: 'flex', gap: 8}}>
                            <LabelDrag onDrop={onDrop} /> 
                            <InputDrag onDrop={onDrop} /> 
                        </div>
                    </div>
                </div>
                
                <Divider style={{borderColor: '#eee', margin: '12px 0'}} />

                {selectedCell && 
                    <div className="section">
                        <div className="title">
                            <Typography.Text style={{fontSize: 12}}>셀 속성</Typography.Text>
                        </div>
                        <div className="content">

                            <div className="row">
                                <div className="head">
                                    <Typography.Text style={{fontSize: 10}}>UUID</Typography.Text>
                                </div>
                                <div className="body">
                                    <Typography.Text style={{fontSize: 10}}>{selectedCell.uuid}</Typography.Text>
                                </div>
                            </div>

                            <div className="row">
                                <div className="head">
                                    <Typography.Text style={{fontSize: 10}}>타입</Typography.Text>
                                </div>
                                <div className="body">
                                    <Typography.Text style={{fontSize: 10}}>{selectedCell.type}</Typography.Text>
                                </div>
                            </div>

                            <div className="row">
                                <div className="head">
                                    <Typography.Text style={{fontSize: 10}}>너비</Typography.Text>
                                </div>
                                <div className="body">
                                    <InputNumber 
                                        size="small"
                                        style={{fontSize: 10, padding: '0px 2px'}}
                                        value={selectedCell.width} 
                                        onChange={(value) => {
                                            onChangeSelected('width', value);
                                            forceRendering();
                                        }} 
                                    />
                                </div>
                                <div className="head">
                                    <Typography.Text style={{fontSize: 10}}>높이</Typography.Text>
                                </div>
                                <div className="body">
                                    <InputNumber 
                                        size="small"
                                        style={{fontSize: 10, padding: '0px 2px'}}
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
                                    <Typography.Text style={{fontSize: 10}}>값</Typography.Text>
                                </div>
                                <div className="body">
                                    <Input 
                                        id="selected-value-input"
                                        size="small"
                                        style={{fontSize: 10, padding: '4px 8px'}}
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
                                    <Typography.Text style={{fontSize: 10}}>폰트</Typography.Text>
                                </div>
                                <div className="body">
                                    <div style={{display: 'flex', gap: 4}}>
                                        <ColorPicker 
                                            allowClear 
                                            value={selectedCell.color} 
                                            onChange={(_, hex) => {
                                                const rgb = hex.slice(0,7);
                                                const   a = hex.slice(7,9);
                                                if (a === '00') onChangeSelected('color', undefined);
                                                else onChangeSelected('color', rgb + 'FF');
                                                forceRendering();
                                            }} 
                                        />
                                        <Space.Compact>
                                            <Button size="middle" icon={<FontSizeOutlined />} />
                                            <Select
                                                style={{width: 80}}
                                                value={selectedCell.fontSize}
                                                onChange={(value) => {
                                                    onChangeSelected('fontSize', value);
                                                    forceRendering();
                                                }} 
                                            >
                                                <Select.Option value={10}>10pt</Select.Option>
                                                <Select.Option value={12}>12pt</Select.Option>
                                                <Select.Option value={16}>16pt</Select.Option>
                                                <Select.Option value={18}>18pt</Select.Option>
                                                <Select.Option value={20}>20pt</Select.Option>
                                                <Select.Option value={24}>24pt</Select.Option>
                                                <Select.Option value={28}>28pt</Select.Option>
                                                <Select.Option value={32}>32pt</Select.Option>
                                                <Select.Option value={40}>40pt</Select.Option>
                                            </Select>
                                        </Space.Compact>
                                        <Space.Compact>
                                            <Button 
                                                type={selectedCell.isBold ? 'primary' : 'default'} 
                                                onClick={() => {
                                                    onChangeSelected('isBold', !selectedCell.isBold);
                                                    forceRendering();
                                                }} 
                                                size="middle" icon={<BoldOutlined />} />
                                            <Button 
                                                type={selectedCell.isStrikethrough ? 'primary' : 'default'} 
                                                onClick={() => {
                                                    if (!selectedCell.isStrikethrough) {
                                                        onChangeSelected('isStrikethrough', true);
                                                        onChangeSelected('isUnderline', false);
                                                    } else {
                                                        onChangeSelected('isStrikethrough', false);
                                                    }
                                                    forceRendering();
                                                }} 
                                                size="middle" icon={<StrikethroughOutlined />} />
                                            <Button 
                                                type={selectedCell.isUnderline ? 'primary' : 'default'} 
                                                onClick={() => {
                                                    if (!selectedCell.isUnderline) {
                                                        onChangeSelected('isUnderline', true);
                                                        onChangeSelected('isStrikethrough', false);
                                                    } else {
                                                        onChangeSelected('isUnderline', false);
                                                    }
                                                    forceRendering();
                                                }} 
                                                size="middle" icon={<UnderlineOutlined />} />
                                            <Button 
                                                type={selectedCell.isItalic ? 'primary' : 'default'} 
                                                onClick={() => {
                                                    onChangeSelected('isItalic', !selectedCell.isItalic);
                                                    forceRendering();
                                                }} 
                                                size="middle" icon={<ItalicOutlined />} />
                                        </Space.Compact>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="head">
                                    <Typography.Text style={{fontSize: 10}}>정렬</Typography.Text>
                                </div>
                                <div className="body">
                                    <div className="align" style={{display: 'flex', gap: 4, marginBottom: 4,}}>
                                        <Button size="middle" icon={<PicLeftOutlined />} 
                                            type={selectedCell.textAlign === 'left' ? 'primary' : 'default'} 
                                            onClick={() => {
                                                onChangeSelected('textAlign', 'left');
                                                forceRendering();
                                            }} 
                                        />
                                        <Button size="middle" icon={<PicCenterOutlined />} 
                                            type={selectedCell.textAlign === 'center' ? 'primary' : 'default'} 
                                            onClick={() => {
                                                onChangeSelected('textAlign', 'center');
                                                forceRendering();
                                            }} 
                                        />
                                        <Button size="middle" icon={<PicRightOutlined />} 
                                            type={selectedCell.textAlign === 'right' ? 'primary' : 'default'} 
                                            onClick={() => {
                                                onChangeSelected('textAlign', 'right');
                                                forceRendering();
                                            }} 
                                        />
                                    </div>
                                    <div className="align" style={{display: 'flex', gap: 4}}>
                                        <Button size="middle" icon={<PicLeftOutlined style={{transform: 'rotate(90deg)'}} />} 
                                            type={selectedCell.verticalAlign === 'top' ? 'primary' : 'default'} 
                                            onClick={() => {
                                                onChangeSelected('verticalAlign', 'top');
                                                forceRendering();
                                            }} 
                                        />
                                        <Button size="middle" icon={<PicCenterOutlined />} 
                                            type={selectedCell.verticalAlign === 'middle' ? 'primary' : 'default'} 
                                            onClick={() => {
                                                onChangeSelected('verticalAlign', 'middle');
                                                forceRendering();
                                            }} 
                                        />
                                        <Button size="middle" icon={<PicRightOutlined style={{transform: 'rotate(90deg)'}}/>} 
                                            type={selectedCell.verticalAlign === 'bottom' ? 'primary' : 'default'} 
                                            onClick={() => {
                                                onChangeSelected('verticalAlign', 'bottom');
                                                forceRendering();
                                            }} 
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="head">
                                    <Typography.Text style={{fontSize: 10}}>테두리</Typography.Text>
                                </div>
                                <div className="body">
                                    <div className="align" style={{display: 'flex', gap: 4}}>
                                        <Button size="middle" icon={<BorderLeftOutlined />} 
                                            type={selectedCell.borderLeft ? 'primary' : 'default'} 
                                            onClick={() => {
                                                onChangeSelected('borderLeft', !selectedCell.borderLeft);
                                                forceRendering();
                                            }} 
                                        />
                                        <Button size="middle" icon={<BorderTopOutlined />} 
                                            type={selectedCell.borderTop ? 'primary' : 'default'} 
                                            onClick={() => {
                                                onChangeSelected('borderTop', !selectedCell.borderTop);
                                                forceRendering();
                                            }} 
                                        />
                                        <Button size="middle" icon={<BorderRightOutlined />} 
                                            type={selectedCell.borderRight ? 'primary' : 'default'} 
                                            onClick={() => {
                                                onChangeSelected('borderRight', !selectedCell.borderRight);
                                                forceRendering();
                                            }} 
                                        />
                                        <Button size="middle" icon={<BorderBottomOutlined />} 
                                            type={selectedCell.borderBottom ? 'primary' : 'default'} 
                                            onClick={() => {
                                                onChangeSelected('borderBottom', !selectedCell.borderBottom);
                                                forceRendering();
                                            }} 
                                        />
                                        <ColorPicker 
                                            allowClear 
                                            value={selectedCell.borderColor} 
                                            onChange={(_, hex) => {
                                                const rgb = hex.slice(0,7);
                                                const   a = hex.slice(7,9);
                                                if (a === '00') onChangeSelected('borderColor', undefined);
                                                else onChangeSelected('borderColor', rgb + 'FF');
                                                forceRendering();
                                            }} 
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="head">
                                    <Typography.Text style={{fontSize: 10}}>배경색</Typography.Text>
                                </div>
                                <div className="body">
                                    <ColorPicker 
                                        allowClear 
                                        value={selectedCell.backgroundColor} 
                                        onChange={(_, hex) => {
                                            const rgb = hex.slice(0,7);
                                            const   a = hex.slice(7,9);
                                            if (a === '00') onChangeSelected('backgroundColor', undefined);
                                            else onChangeSelected('backgroundColor', rgb + 'FF');
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
            .container > .section > .title {border: 1px solid #ddd; border-radius: 8px 8px 0px 0px; background: #f5f5ff; padding: 4px 12px; font-weight: bold;}
            .container > .section > .content {border: 1px solid #ddd; border-top: 0; border-radius: 0px 0px 8px 8px; background: #fff;}
            .container > .section > .content > .row {display: flex; border-bottom: 1px solid #ddd;}
            .container > .section > .content > .row:last-of-type {border-bottom: 0px;}
            .container > .section > .content > .row:last-of-type > .head:first-of-type {border-radius: 0px 0px 0px 8px;}
            .container > .section > .content > .row > .head {padding: 4px 8px; border-right: 1px solid #ddd; flex-basis: 60px; width: 60px; border-left: 1px solid #ddd; background: #f9f9f9; font-weight: 600; display: flex; align-items: center; justify-content: center;}
            .container > .section > .content > .row > .head:first-of-type {border-left: 0;}
            .container > .section > .content > .row > .body {padding: 4px 8px; flex: 1;}
            `}</style>
        </>
    )
}
