import React from 'react'

function Message({message}) {
 
  const authUser=JSON.parse(localStorage.getItem("chatApp"));
  
  const itsMe=message.SenderId === authUser.user._id;

  const chatName=itsMe? "chat-end" : "chat-start";
  const chatColor=itsMe?"bg-blue-500":"bg-slate-700";

  const createdAt=new Date(message.createdAt);
  const formattedTime=createdAt.toLocaleTimeString([],{
    hour:'2-digit',
    minute:'2-digit'
  })
  return (
    <div>
        <div className='p-4'>
            <div className={`chat ${chatName}`}>
  <div className={`chat-bubble text-white ${chatColor}`}>{message.message}</div>
  <div className='chat-footer'>
  {formattedTime}
</div>
</div>



        </div>
    </div>
  )
}

export default Message
