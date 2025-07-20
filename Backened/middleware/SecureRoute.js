import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const SecureRoute=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        if(!token){
       return res.status(401).json({error:"No token , authorized denied"})
        }
        const decoded=jwt.verify(token,process.env.JWT_TOKEN);
        if(!decoded){
            return res.status(401).json({error:"Invalid token"});
        }
       
     const user=await User.findById(decoded.userId).select("-password")
     
     if(!user){
        res.status(401).json({
            error:"No user found"
        })
     }
     req.user=user;
     next();
       
    }
    catch(error){
     console.log(error);
     res.status(500).json({error:"Internal Server Error"});
    }
};

export default SecureRoute;