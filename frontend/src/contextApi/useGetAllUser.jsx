import React, { useEffect, useState } from 'react'
import Cookie from "js-cookie"
import axios from "axios"
const useGetAllUser = () => {
  const [allUser, setallUser] = useState([])
  const [loading, setloading] = useState(false)
  
  useEffect(()=>{
     const getAllUsers = async()=>{
        setloading(true)
        try {
            const token = Cookie.get("jwt")
            const response = await axios.get("/api/user/allusers",{
                credentials : "include",
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            setallUser(response.data)
            setloading(false)
        } catch (error) {
            console.log("Error in getAllUsers :",error)
            setloading(false)
        }
    }

    getAllUsers()
},[])
return [allUser,loading,setloading]
}

export default useGetAllUser