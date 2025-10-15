import React, { useEffect } from 'react';
import ChatUser from './ChatUser.jsx';
import MessageBox from './MessageBox.jsx';
import TypeSend from './TypeSend.jsx';
import '../../index.css';
import useConversation from '../../zustand/useConversation.js';
import {useAuth} from "../../contextApi/AuthProvider.jsx"
import { CiMenuFries } from "react-icons/ci";


const Right = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    !selectedConversation ? (
      <div className='w-full bg-slate-900'>
        <NoChatSelected />
      </div>
    ) : (
      <div className='w-full h-screen text-slate-300 bg-slate-900  bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]'>
        <ChatUser />
        <div className='scroll overflow-y-auto' style={{ maxHeight: 'calc(90vh - 10vh)' }}>
          <MessageBox />
        </div>
        <TypeSend />
      </div>
    )
  );
};

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();
  return (
    <>
      <div className="relative">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5 bg-slate-800 rounded-lg hover:bg-slate-950 duration-300 mt-5"
        >
          <CiMenuFries className="text-white text-xl" />
        </label>
        <div className="p-3 flex flex-col h-screen items-center text-xl justify-center text-slate-300">
          <h1 className="text-center">
            Welcome{" "}
            <span className="font-medium text-xl text-blue-500">
              {authUser?.user?.fullName}
            </span>
          </h1>
          <p className='mt-2 text-[14px] text-center text-slate-400'> No chat selected, please start conversation by selecting anyone to
            your contacts</p>
        </div>
      </div>
    </>
  );
};