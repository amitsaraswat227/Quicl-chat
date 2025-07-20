import React from 'react'
import sawConversation from '../../zustand/sawConversation'
import { useSocketContext } from '../../context/socketContext';
import { LuSlidersHorizontal } from "react-icons/lu";




function Chatuser() {
  const {selectedConversation}=sawConversation();
  console.log(selectedConversation);
  const {onlineUsers}=useSocketContext();

  const getOnlineUsersStatus=(userId)=>{
    return onlineUsers.includes(userId) ? "online" : "offline"

  }

  return (

    <div className='relative flex items-center h-[8%] justify-center gap-4 bg-slate-800 hover:bg-slate-700 duration-300 rounded-md'> 

      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5"
      >
        < LuSlidersHorizontal className="text-white text-xl" />
     
      </label>
    <div className='flex space-x-3 items-center justify-center h-[8vh] bg-gray-800 hover:bg-gray-700 duration-300'>

   <div className="avatar ">
  <div className="w-14 rounded-full">
    <img src={selectedConversation.image} />
  </div>
</div>   
<div className='text-white'>
    <h1 className='text-xl'>{selectedConversation.fullname}</h1>
    <span className='text-sm'>{getOnlineUsersStatus(selectedConversation._id)}</span>
</div>
    </div>
    </div>
  )
}

export default Chatuser


