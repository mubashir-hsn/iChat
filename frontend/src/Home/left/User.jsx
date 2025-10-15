import React from 'react'
import useConversation from '../../zustand/useConversation.js';
import { useSocketContext } from '../../contextApi/UseSocket.jsx';

// Function to get initials from full name
const getInitials = (fullName) => {
  if (!fullName) return '';
  const nameParts = fullName.split(' ');
  const firstInitial = nameParts[0]?.charAt(0)?.toUpperCase();
  const secondInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1]?.charAt(0)?.toUpperCase() : nameParts[0]?.charAt(1)?.toUpperCase();
  return firstInitial + secondInitial;
};


const User = ({ user, index }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const {onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id)


  const isSelected = selectedConversation?._id === user?._id;

  // Get the initials from the user's full name
  const initials = getInitials(user?.fullName);

  return (
    <label
      htmlFor="my-drawer-2"
      aria-label="close sidebar"
      className="drawer-overlay"
    >
      <div className={
        `hover:bg-slate-600 duration-300
       ${isSelected ? "bg-slate-700" : ""}`
      }
        onClick={() => setSelectedConversation(user)}
      >
        <div className='text-gray-400 select-none flex my-2 px-6 py-2 space-x-4 hover:bg-slate-700 cursor-pointer duration-300'>
          <div>
            <div className={`avatar ${isOnline ? "online" : ""}`}>
              <div
                className="w-11 h-11 leading-[44px] text-lg text-center rounded-full bg-[#00b6ff] text-white font-medium"
              >
                <img
                  src={`https://avatar.iran.liara.run/username?username=${user?.fullName}`}
                  alt=""
                  className="rounded-full w-full h-full object-cover"
                />
                {/* {initials} */}
              </div>
            </div>
          </div>
          <div>
            <h1 className='text-[16px] text-slate-300 font-medium'>{user?.fullName}</h1>
            <span className='text-[12px]'>{user.email}</span>
          </div>
        </div>
      </div>

    </label>
  );
};

export default User;
