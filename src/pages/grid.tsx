import { useMount, useUpdateEffect } from 'ahooks';
import { Button, Col, Divider, InputNumber, Row, Slider, Typography } from 'antd';
import React, { useRef, useState } from 'react'
import { useRecoilState } from 'recoil';
import isDragState from '@/atoms/document/isDragState';
import { blue } from '@ant-design/colors';
import { FormOutlined, MediumOutlined } from '@ant-design/icons';
import { useDrag, useDrop } from 'react-dnd';

interface DataType {
    type: 'col-head' | 'row-head' | 'body';
    rowNum: number;
    colNum: number;
    height: number;
}

export default function grid() {

    const [isDrag, setDrag] = useRecoilState(isDragState);

    const printRef: any = useRef();

    // 마운트 시
    useMount(() => {
        onInit();
    });

    // 문서 사이즈 [열,행]
    const [documentSize, setDocumentSize] = useState([10, 20]);

    // 문서 데이터
    const [data, setData] = useState<DataType[]>([]);

    // 초기화
    const onInit = () => {
        let _data: any[] = [];
        for (let r=0; r<=documentSize[1]; r++) {
            for (let c=0; c<=documentSize[0]; c++) {
                _data.push({
                    type: r === 0 ? 'col-head' : c === 0 ? 'row-head' : 'body',
                    rowNum: r,
                    colNum: c,
                });
            }
        }
        setData(_data);
    }

    // 사이즈 및 
    useUpdateEffect(() => {
        onInit();
    }, [documentSize]);
    
    const [overlayData, setOverlayData] = useState<any[]>([]);

    return (
        <>
            <div className="wrap">
                <div className="container">
                    <div className="page-container">
                        <div className="page-bg" />
                        <div className="page grid">
                            {
                                data.map((item: DataType, idx: number) => {
                                    return (
                                        <div 
                                            className={`item ${item.type}`} 
                                            key={idx}
                                            style={{
                                                order: idx, 
                                                gridRowStart: item.rowNum+1, gridRowEnd: item.rowNum+2,
                                                gridColumnStart: item.colNum+1, gridColumnEnd: item.colNum+2 ,
                                                zIndex: 500,
                                                opacity: isDrag ? 0.5 : 1,
                                            }} 
                                        >
                                        {
                                            item.type === 'col-head' ? 
                                                <Typography.Paragraph style={{fontSize: 10, textAlign: 'center', margin: 0}}>{item.colNum ? item.colNum : ''}</Typography.Paragraph>
                                            : item.type === 'row-head' ? 
                                                <Typography.Paragraph style={{fontSize: 10, textAlign: 'center', margin: 0}}>{item.rowNum ? item.rowNum : ''}</Typography.Paragraph>
                                            :
                                            <EmptyCol data={item} />
                                        }
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div 
                            ref={printRef} 
                            className="page overlay" 
                            style={{
                                zIndex: isDrag ? 499 : 501
                            }}
                        >
                            {
                                overlayData.map((overlay: DataType, idx: number) => {
                                    return (
                                        <div
                                            key={idx}
                                            className={`item`}
                                            style={{
                                                gridRowStart: overlay.rowNum+1, 
                                                gridRowEnd: overlay.rowNum+2,
                                                gridColumnStart: overlay.colNum+1, 
                                                gridColumnEnd: overlay.colNum+2, 
                                                background: blue[4],
                                            }} 
                                        >

                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="controller">
                        <Divider orientation='left' style={{borderColor: '#ddd', margin: 0}}>
                            <Typography.Title level={5}>열</Typography.Title>
                        </Divider>
                        <Row>
                            <Col span={12}>
                                <Slider
                                    min={1}
                                    max={50}
                                    value={documentSize[0]}
                                    onChange={(value) => {
                                        setDocumentSize([value, documentSize[1]])
                                    }}
                                />
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    min={1}
                                    max={50}
                                    style={{ margin: '0 16px' }}
                                    value={documentSize[0]} 
                                    onChange={(value) => {
                                        if (value) {
                                            setDocumentSize([value, documentSize[1]])
                                        }
                                    }}
                                />
                            </Col>
                        </Row>

                        <Divider orientation='left' style={{borderColor: '#ddd', margin: 0, marginTop: 20}}>
                            <Typography.Title level={5}>행</Typography.Title>
                        </Divider>
                        <Row>
                            <Col span={12}>
                                <Slider
                                    min={1}
                                    max={typeof window !== 'undefined' ? Math.floor(window.innerHeight/20) : 45}
                                    value={documentSize[1]}
                                    onChange={(value) => {
                                        setDocumentSize([documentSize[0], value])
                                    }}
                                />
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    min={1}
                                    max={typeof window !== 'undefined' ? Math.floor(window.innerHeight/20) : 45}
                                    style={{ margin: '0 16px' }}
                                    value={documentSize[1]}
                                    onChange={(value) => {
                                        if (value) {
                                            setDocumentSize([documentSize[0], value])
                                        }
                                    }}
                                />
                            </Col>
                        </Row>

                        <Divider orientation='left' style={{borderColor: '#ddd', margin: 0, marginTop: 20}}>
                            <Typography.Title level={5}>도구상자</Typography.Title>
                        </Divider>
                        <div className="tools">
                            <DragBox type="text" overlayData={overlayData} onChangeOverlay={(overlay: any[]) => setOverlayData(overlay)} />
                            <DragBox type="input" overlayData={overlayData} onChangeOverlay={(overlay: any[]) => setOverlayData(overlay)} />
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`

            .wrap { 
                width: 100vw; max-height: 100vh; background: #f5f5f5; overflow: hidden;
                -webkit-user-select:none; -moz-user-select:none; -ms-user-select:none; user-select:none
            }
            .wrap > .container {display: flex; height: 100vh;}

            .wrap > .container > .page-container > .page-bg { width: calc((100vh)/29701*20997); }
            
            .wrap > .container > .page-container > .page {
                transition: 300ms;
                position: absolute; top: 0; left: 0;
                width: calc((100vh)/29701*20997); 
                height: calc(100vh); 
                display: grid;
                grid-template-rows: 20px repeat(${documentSize[1]}, 1fr);
                grid-template-columns: 20px repeat(${documentSize[0]}, 1fr);
            }
            .wrap > .container > .page-container > .page > .item {border: 1px solid #ddd; border-top: 0; border-left: 0; background: #fff;}
            .wrap > .container > .page-container > .page > .item.col-head {background: #f5f5f5;}
            .wrap > .container > .page-container > .page > .item.row-head {background: #f5f5f5;}
            .wrap > .container > .page-container > .page > .item.body {display: flex; align-items: center; justify-content: center; flex-direction: column;}

            .wrap > .container > .controller {background: #fff; padding: 20px; flex: 1;}
            .wrap > .container > .controller .tools {display: flex; flex-wrap: wrap; gap: 12px;}
            `}</style>
        </>
    )
}

interface EmptyColProps {
    data: DataType;
}
const EmptyCol = ({ data }: EmptyColProps) => {

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'drop',
        drop: () => (data),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
    }));

    const isActive = canDrop && isOver
    let backgroundColor = '#fff'
    if (isActive) {
      backgroundColor = blue[1];
    } else if (canDrop) {
      backgroundColor = blue[0];
    }

    return (
        <>
            <div ref={drop} className="container">
                
            </div>
            <style jsx>{`
            .container {width: 100%; background: ${backgroundColor}; flex: 1;}
            `}</style>
        </>
    )
}


interface DragBoxProps {
    type: 'input' | 'text';
    overlayData: any[];
    onChangeOverlay : (overlay: any[]) => void;
}
  
const DragBox = ({ type, overlayData, onChangeOverlay }: DragBoxProps) => {

    const [isDrag, setDrag] = useRecoilState(isDragState);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'drop',
        item: { 
            type,
        },
        end: (item, monitor) => {
            const result = monitor.getDropResult<DataType>();
            if (result) {
                const cp = structuredClone(overlayData);
                console.log(overlayData);
                cp.push(result);
                onChangeOverlay(cp);
            }
        },
        collect: (monitor) => {
            return ({
                isDragging: monitor.isDragging(),
                handlerId: monitor.getHandlerId(),
            })
        },
    }));

    useUpdateEffect(() => {
        setDrag(isDragging);
    }, [isDragging]);

    const Icon = (() => {
        switch(type) {
            case 'input': return <FormOutlined />;
            case 'text': return <MediumOutlined />
        }
    })()
    return (
        <>
            <div className="container" ref={drag} >
                <Button icon={Icon} />
            </div>
            <style jsx>{`
            .container {transition: 300ms; opacity: ${isDragging ? 0.3 : 1}; }
            `}</style>
        </>
    );
}