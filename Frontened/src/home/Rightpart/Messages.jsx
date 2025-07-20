import React from 'react'
import Message from './Message'
import Loading from '../../Components/Loading'
import useGetMessage from '../../context/useGetMessage.jsx'
import { useRef } from 'react';
import { useEffect } from 'react';
import useGetSocketMessage from '../../context/useGetSocketMessage.jsx';





function Messages() {
  const {loading,messages}=useGetMessage();
  console.log(messages);
  //listing the incoming message
  useGetSocketMessage(); 
  const lastMessageRef=useRef();
  useEffect(()=>{
    setTimeout(()=>{
    if(lastMessageRef.current){
      lastMessageRef.current.scrollIntoView({behavior:"smooth"});
    }
  },100)
  },[messages])
  return (
  <div    style={{
    backgroundImage: "url('/MuiwDe.jpg')",
    backgroundAttachment: 'fixed', // makes it stay fixed
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh'
  }}>

     <div className='text-white hide-scrollbar  overflow-y-auto' style={{minHeight:"calc(92vh - 8vh)"}}>
    

      {!loading && messages.length === 0 && (
       <div>
          <p className='text-center mt-[20%]'>Say! Hi to start the conversation</p>
        </div>
      )}

       {loading ? (<Loading/>):(messages.length > 0 && messages.map((message)=>(
       <div key={message._id} ref={lastMessageRef} >
         <Message  message={message}/>
       </div>
       
        
)))}


     
    
    </div>
   </div>
  )
}

export default Messages