import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { io } from "socket.io-client";




export const socketContext=createContext();

export const useSocketContext=()=>{
    return useContext(socketContext)
}

export const SocketProvider=({children})=>{
    const [socket,setsocket]=useState(null);
    const [authUser]=useAuth();
    const [onlineUsers,setOnlineUsers]=useState([])

    useEffect(()=>{
        if(authUser){
            const socket=io("https://chatapp-gypf.onrender.com",{
                query:{
                    userId:authUser.user._id,
                }
            })
            setsocket(socket);
            socket.on("getOnlineUsers",(users)=>{
                setOnlineUsers(users);
            })
            return()=>socket.close();
        }
        else{
            if(socket){
                socket.close();
                setsocket(null);
            }
        }
    },[authUser])


return(
    <socketContext.Provider value={{ socket , onlineUsers }}>
       {children}
    </socketContext.Provider>
)
}
