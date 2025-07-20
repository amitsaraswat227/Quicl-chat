import React, { useEffect } from 'react'

import sawConversation from '../zustand/sawConversation.js';
import { useSocketContext } from './socketContext.jsx';
import sound from '../assets/new-notification-09-352705.mp3'

const useGetSocketMessage = () => {
    const {socket}=useSocketContext();
    const {messages ,setMessages}=sawConversation();


    useEffect(() => {
        socket.on("newMessage",(newMessage)=>{
              const notification=new Audio(sound);
              notification.play();
            setMessages([...messages, newMessage]);
        });
        return () =>{
            socket.off("newMessage");
        };
    },[socket,messages,setMessages]);
  
};

export default useGetSocketMessage
