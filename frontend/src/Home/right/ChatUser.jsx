import React from 'react'
import useConversation from '../../zustand/useConversation.js'
import { useSocketContext } from '../../contextApi/UseSocket.jsx'
import { CiMenuFries } from 'react-icons/ci'
const ChatUser = () => {
  const { selectedConversation } = useConversation()
  const { onlineUsers } = useSocketContext();
  const getOnlineUserStatus = (userId) => {
    return onlineUsers.includes(userId) ? 'online' : 'offline'
  }

  return (
    <div className='h-[10vh] w-full flex justify-start items-center bg-slate-800'>
      <div className=' flex w-full justify-start items-center'>

        <div className='bg-slate-900 rounded-lg hover:bg-slate-950 duration-300 ml-5'>
          <label
            htmlFor="my-drawer-2"
            className="btn btn-ghost drawer-button lg:hidden"
          >
            <CiMenuFries className="text-white text-xl" />
          </label>

        </div>
        <div className='select-none py-1 pl-5 flex justify-start items-center space-x-3'>
          <div className="avatar">
            <div className="w-10 h-10 leading-[44px] text-xl text-center rounded-full bg-green-400 text-white font-bold">
              <img
                src={`https://avatar.iran.liara.run/username?username=${selectedConversation?.fullName}`}
                alt=""
                className="rounded-full w-full h-full object-cover"
              />
              {selectedConversation?.fullName}
            </div>
          </div>

          <div>
            <h1 className='text-[15px] font-semibold'>{selectedConversation?.fullName?.toUpperCase()}</h1>
            <span className='text-[12px]'>{getOnlineUserStatus(selectedConversation?._id)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatUser