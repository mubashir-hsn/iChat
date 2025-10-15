import React, { useEffect, useRef } from 'react'
import Message from './Message.jsx'
import '../../index.css'
import userGetMessages from '../../contextApi/userGetMessages.js'
import SkeletonLoading from '../../Components/SkeletonLoading.jsx'
import useGetSocketMessage from '../../contextApi/useGetSocketMessage.js'

const MessageBox = () => {
  const {loading,messages} = userGetMessages();
  useGetSocketMessage(); // listen incoming messages
  const lastMesgRef = useRef();
  
  useEffect(()=>{
    
    setTimeout(()=>{
      if (lastMesgRef.current) {
        lastMesgRef.current.scrollIntoView({behavior :'smooth'})
      }
    },100)
    
  },[messages])

  
  return (
    <div className='pt-3 scroll overflow-y-auto' style={{ minHeight: "calc(90vh - 10vh)"}}>
        
        {
          loading ? (<SkeletonLoading/>) : (messages.length>0 && messages.map((message,index)=>{
            return <div key={index} ref={lastMesgRef}>
              <Message  message = {message}/>
            </div>
          }))
        }

        {
          !loading && messages.length===0 && (
            <div>
              <p className='text-center mt-[20%]'>
                Say! Hi to start the conversation. 
              </p>
            </div>
          )
        }
    </div>

  )
}

export default MessageBox
