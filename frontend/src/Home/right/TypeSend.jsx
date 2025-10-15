import React, { useState } from 'react'
import { TbSend2 } from "react-icons/tb";
import userSendMessage from '../../contextApi/userSendMessage.js';
const TypeSend = () => {

  const [message, setmessage] = useState('')
  const  {sendMessages} = userSendMessage();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    await sendMessages(message)
    setmessage('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className=' select-none h-[10vh] py-2 flex items-center justify-center space-x-2 bg-gray-800'>
        <div className='w-[80%]'>
        <input type="text" placeholder="Type your message"
         className="w-full bg-[#001a23] rounded-lg px-5 py-2 border-none outline-none"
         value={message}
         onChange={(e)=>setmessage(e.target.value)}
         />
        </div>
        <button>
        <TbSend2  className='text-5xl p-2 hover:bg-slate-700 rounded-full cursor-pointer'/>
        </button>
    </div>
    </form>
  )
}

export default TypeSend