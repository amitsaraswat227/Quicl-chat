import React from 'react'
import Chatuser from './Chatuser'
import Messages from './Messages'
import Messagesend from './Messagesend'
import sawConversation from '../../zustand/sawConversation'
import { useEffect } from 'react'
import Loading from '../../Components/Loading'
import { useAuth } from '../../context/AuthProvider'
import { LuSlidersHorizontal } from "react-icons/lu";

function Right() {
  const {selectedConversation,setselectedConversation}=sawConversation();
  useEffect(()=>{
    return setselectedConversation(null)
  },[setselectedConversation])
  return (
     <div className='w-full bg-slate-900 text-gray-300'   >
      
    <div>
    {!selectedConversation ?(<NoChatSelected/>) :(
      <>
     
      <Chatuser/>

      <div className='hide-scrollbar overflow-y-auto flex-1' style={{maxHeight:"calc(92vh - 8vh"}}>
            <Messages/>
      </div>
     
      <Messagesend/>
   
      </>
    )}
     </div>
  
    </div>
  )
   
}

export default Right

const NoChatSelected=()=>{
  const [authUser]=useAuth();
  return (
    <>

<div className='relative'>
  
 <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        >
          <LuSlidersHorizontal className="text-black text-xl" />
        </label>

   
    <div className='flex h-screen items-center justify-center'  style={{ backgroundImage: "url('live_chat_anim_2.gif')" }}>
      <h1 className='text-center text-black mb-8'>Welcome{" "}
        <span className='font-semibold text-2xl'>{authUser.user.fullname}</span>
        <br />
       <span className='font-semibold '> select a chat from the list to start messaging.</span>
      </h1>
    </div>
    </div>
    </>
  )
}
