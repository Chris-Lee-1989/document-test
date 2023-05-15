import React, { DragEventHandler } from "react";

interface Props {
  
}

function Page() {

    const dividerOnDrag = (event: any) => {
        console.dir(event);
    }
    
    return (
        <>
            <div className="page">

                <div className="container">
                    <div className="box box-1"></div>
                    <div className="divider" onDrag={dividerOnDrag} />
                    <div className="box box-2"></div>
                </div>

            </div>
            <style jsx>{`
            .page {display: flex; align-items: center; justify-content: center; flex-direction: column; width: 100vw; height: 100vh;}
            .container {display: flex; align-items: center; justify-content: center; width: 900px;}
            .container > .box {width: 50px; height: 50px;}
            .container > .divider {width: 10px; height: 50px; cursor: col-resize;}
            .container > .divider:hover {transition: 200ms; background: #999;}
            .container > .box.box-1 {flex: 1; background: red;}
            .container > .box.box-2 {flex: 1; background: blue;}
            `}</style>
        </>
    )
}

export default React.memo(Page);