import React from 'react'
import { useState } from 'react'
import sawConversation from '../zustand/sawConversation';
import { useEffect } from 'react';
import axios from 'axios';

const useGetMessage=()=> {
    const [loading,setloading]=useState();
    const {messages,setMessages,selectedConversation}=sawConversation();

    useEffect(()=>{
         const getMessage=async()=>{
            setloading(true);
          if(selectedConversation && selectedConversation._id){
              try{
                const response=await axios.get(`/api/message/get/${selectedConversation._id}`);
                setMessages(response.data);
                setloading(false);
            }
            catch(error){
                console.log("Error in getMessage",error);
            }
          }


         }
         getMessage();
    },[selectedConversation,setMessages])
  return {loading,messages}
}

export default useGetMessage