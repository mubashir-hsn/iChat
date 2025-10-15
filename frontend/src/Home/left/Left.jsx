import React from 'react'
import Search from './Search.jsx'
import UserBox from './UserBox.jsx'
import UserProfile from './UserProfile.jsx'

const Left = () => {
  return (
    <div className='w-full h-screen overflow-hidden bg-[#001a23] text-white'>
        <Search/>
        <div style={{maxHeight:"calc(91vh - 10vh)"}}>
        <UserBox/>
        </div>
        <UserProfile/>
    </div>
  )
}

export default Left