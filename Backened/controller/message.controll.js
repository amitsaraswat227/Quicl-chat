import conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getRecieverSocketId } from "../Socket/server.js";
import { io } from "../Socket/server.js";


export const sendMessage=async(req,res)=>{
    // console.log("Message Sent",req.params.id,req.body.message);
    try{
       const {message}=req.body;
       const {id:recieverId}=req.params;
       const SenderId=req.user._id   //senderId who is current user logged in 
       let Conversation=await conversation.findOne({
        members:{ $all: [SenderId,recieverId] }
       })

       if(!Conversation){
        Conversation=await conversation.create({
            members:[SenderId,recieverId]
        })
       }
       const newMessage=new Message({
        SenderId,
        recieverId,
        message,
       }) 

       if(newMessage){
        Conversation.messages.push(newMessage._id);
       }
       await Promise.all([Conversation.save(),newMessage.save()]); 
       const recieverSocketId = getRecieverSocketId(recieverId);
       if(recieverSocketId){
        io.to(recieverSocketId).emit("newMessage",newMessage)
       } 
       res.status(201).json(newMessage)
    }
    catch(error){
        console.log("Error in sendMessage",error);
        res.status(500).json({error:"Internal Server Error"});
    }
}


export const getMessage=async(req,res)=>{
    try{
         const {id:chatUser}=req.params;
       const SenderId=req.user._id   //senderId who is current user logged in 
       let Conversation=await conversation.findOne({
        members:{$all:[SenderId,chatUser]}
       }).populate("messages")
      if(!Conversation){
        res.status(201).json([])
      }
     const messages=Conversation.messages;
     res.status(201).json(messages);
    }
    catch(error){
        console.log("Error in getMessage",error);
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
}