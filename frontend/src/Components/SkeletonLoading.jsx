import React from 'react'

const SkeletonLoading = () => {
    return (
        <div className='w-full h-[calc(91vh - 9vh)] px-5 bg-slate-900'>
            <div className="chat chat-start" >
                <div className="chat-bubble bg-slate-600 animate-pulse w-56"></div>
            </div>
            <div className="chat chat-end ">
                <div className="chat-bubble bg-slate-600 animate-pulse  w-48"></div>
            </div>
            <div className="chat chat-start ">
                <div className="chat-bubble bg-slate-600 animate-pulse  w-40"></div>
            </div>
            <div className="chat chat-end ">
                <div className="chat-bubble bg-slate-600 animate-pulse  w-36"></div>
            </div>
            <div className="chat chat-start ">
                <div className="chat-bubble bg-slate-600 animate-pulse  w-52"></div>
            </div>
            <div className="chat chat-end ">
                <div className="chat-bubble bg-slate-600 animate-pulse  w-28"></div>
            </div>
            <div className="chat chat-start ">
                <div className="chat-bubble bg-slate-600 animate-pulse  w-60"></div>
            </div>
            <div className="chat chat-end ">
                <div className="chat-bubble bg-slate-600 animate-pulse  w-36"></div>
            </div>
            <div className="chat chat-start ">
                <div className="chat-bubble bg-slate-600 animate-pulse  w-52"></div>
            </div>
        </div>
    )
}

export default SkeletonLoading