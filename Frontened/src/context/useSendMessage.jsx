import React from 'react'
import sawConversation from '../zustand/sawConversation.js';
import axios from 'axios';
import { useState } from 'react';

const useSendMessage = () => {
    const [loading,setloading]=useState(false);
    const {messages,setMessages,selectedConversation}=sawConversation();
     const sendMessage=async(message)=>{
            setloading(true);
        
              try{
                const res=await axios.post(`/api/message/send/${selectedConversation._id}`,
                    {message});
                setMessages([...messages,res.data]);
                setloading(false);
            }
            catch(error){
                console.log("Error in sendMessage",error);
            
          }
        
   


         }
  return {loading,sendMessage}
}

export default useSendMessage
