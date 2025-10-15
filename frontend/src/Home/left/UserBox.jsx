import React, { useEffect } from 'react'
import User from './User.jsx'
import useGetAllUser from "../../contextApi/useGetAllUser.jsx"
import Loading from '../../Components/Loading.jsx'

const UserBox = () => {
    const [allUser , loading ,setloading] = useGetAllUser()

    // Simulate an API call or auth check
    useEffect(() => {
      setTimeout(() => {
        setloading(false);
      }, 2000);
    }, []);
  
    if (loading) {
      return <Loading />; // Show loading screen if loading is true
    }
  
    return (
        <div className='flex flex-col'>
            <h1 className='px-8 py-2 border-b-2 border-b-slate-500 font-medium'>Messages</h1>

            <div className='mt-1 scroll overflow-y-auto ' style={{minHeight:"calc(82vh - 10vh)"}}>
                {
                    allUser.map((user,index)=>(
                  <User key={index} user= {user}/>
                    ))
                }
            
            </div>
        </div>

    )
}

export default UserBox
