import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Cookies from "js-cookie"

function useGetAllusers() {
    const [allUsers,setAllUsers]=useState([])
    const [loading,setloading]=useState(false)
    useEffect(()=>{
        const getUsers=async()=>{
            setloading(true);
            try{
         const token=Cookies.get("jwt");
         const response=await axios.get("/api/user/allusers",{
            credentials:"include",
            headers:{
                Authorization:`Bearer ${token}`
            }
         })
         setAllUsers(response.data)
         setloading(false);
            }
            catch(error){
                   console.log(error);

            }
        }
        getUsers();
    },[])
  return [allUsers,loading]
}

export default useGetAllusers