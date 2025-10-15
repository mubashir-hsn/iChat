import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import useGetAllUser from '../../contextApi/useGetAllUser.jsx';
import useConversation from '../../zustand/useConversation.js';
import toast from "react-hot-toast";
const Search = () => {
    const [search, setSearch] = useState('');
    const [allUser] = useGetAllUser();
    const {setSelectedConversation} = useConversation();

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!search) return;
        const conversation = allUser.find((user)=>
            user?.fullName?.toLowerCase().includes(search.toLowerCase())
        );
        if (conversation) {
            setSelectedConversation(conversation);
            setSearch("");
        }else{
           toast.error('User not found.');
           setSearch("");
        }
    }
    return (
        <div className='h-[10vh] px-4 py-3'>
            <div className=''>
            <form onSubmit={handleSubmit}>
                <div className='flex space-x-2'>
                <label className="w-[80%] px-3 rounded-xl  bg-gray-800 flex  text-[12px] items-center">
                    <input type="text" className="grow bg-transparent outline-none"
                     placeholder="Search or start a new chat"
                     value={search}
                     onChange={(e)=>setSearch(e.target.value)}
                     />
                </label>
                <button>
                <IoSearch className='text-4xl p-2 rounded-full hover:bg-gray-800 duration-300' />
                </button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Search