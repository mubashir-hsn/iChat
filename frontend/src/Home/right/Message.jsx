import React from 'react'

const Message = ({message}) => {

    const createdAt = new Date(message.createdAt);
    const formatTime = createdAt.toLocaleTimeString([],{
        hour:"2-digit",
        minute:"2-digit"
    })
    const authUser = JSON.parse(localStorage.getItem("ChatApp"))
    const itsMe = message.senderId === authUser?.user?._id;

    const chatName = itsMe ? "chat-end" : "chat-start";
    const chatColor = itsMe ? "bg-[#00b6ff]" : "bg-[#00d7c0]";
    return (
        <div>
            <div className='px-5 py-4'>   
                <div className={`chat ${chatName}`}>
                    <div className={`chat-bubble ${chatColor} text-black text-sm`}>
                    {message.message}
                    </div>
                    <div className='chat-footer text-[10px] text-gray-300'>{formatTime}</div>
                </div>
            </div>
        </div>
    )
}

export default Message

