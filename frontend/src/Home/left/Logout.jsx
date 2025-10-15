import React from 'react'
import { BiLogOut } from "react-icons/bi";
import axios from "axios"
import Cookies from "js-cookie"
import toast from 'react-hot-toast'; 

const Logout = () => {
    const handleLogout = async()=>{
        try {
            const res = await axios.post('/api/user/logout')
            localStorage.removeItem('ChatApp')
            Cookies.remove('jwt')

            setTimeout(()=>{
                toast.success('user logout successfully')
            },600)
            setTimeout(()=>{
                window.location.reload()
            },1000)
        } catch (error) {
            console.log("Error in logout: " , error)
            toast.error(error)
        }
    }

    return (
        <div onClick={handleLogout} className='w-20 p-1 h-10 flex text-sm justify-center items-center bg-slate-700 rounded-lg hover:bg-slate-900 cursor-pointer duration-300'>
            <BiLogOut  className='text-2xl pr-1' />
             Logout
        </div>
    )
}

export default Logout