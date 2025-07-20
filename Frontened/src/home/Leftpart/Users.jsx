import React from 'react'
import sawConversation from '../../zustand/sawConversation'
import { useSocketContext } from '../../context/socketContext';

function Users({user}) {
  
   const {selectedConversation, setselectedConversation}=sawConversation();
  const isSelected=selectedConversation?._id===user._id;
  const {socket , onlineUsers}=useSocketContext();
  const isOnline=onlineUsers.includes(user._id)
  return (
    <div className={`hover:bg-slate-600 duration-300 ${isSelected?"bg-slate-700":""}`} onClick={()=>setselectedConversation(user)}>

        <div className='flex space-x-4 px-6 py-3 hover:bg-slate-900 duration-300 '   >
         <div className={`avatar ${isOnline?"avatar-online":""}`}>
  <div className="w-14 rounded-full">
    <img src={user.image} />
  </div>
</div>   
 <div>
        <h1 className='font-bold'>{user.fullname}</h1>
        <span>{user.email}</span>
       </div>

       </div>
    </div>
  )
}

export default Users