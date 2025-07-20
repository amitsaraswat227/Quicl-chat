import createTokenandSavecookie from "../JWT/generatetoken.js";
import User from "../models/User.model.js";
import bcrypt from 'bcryptjs'
import { uploadoncloudinary } from "../utils/cloudinary.js";
import { response } from "express";

export const Signup=async(req,res)=>{
    const {fullname , email , password , confirmpassword }=req.body;
    

    try{ 


 
      const imageloacalpath=  req.file.path;
      console.log(req.file.path)
     
   // const coverImagelocalpath=req.file?.coverImage[0]?.path;
   if(!imageloacalpath){
      res.status(401).json({
         message:"image file is required"
      })
   }

   const image=await uploadoncloudinary(imageloacalpath)
//   const coverImage= await uploadoncloudinary(coverImagelocalpath)
console.log("image is console",image.secure_url)

  
    if (!image) {
         res.status(401).json({
         message:"image file is required"
      })      
    }
     if(password !== confirmpassword){
      return   res.status(400).json(  { error:"password do not match"  } )
     }

     const user=await User.findOne({email})
     if(user){
        return res.status(400).json({error:"user already Registered"})
     }

     const hashingPassword=await bcrypt.hash(password,10)

     const newUser=await new User({
        fullname,
        email, 
        password:hashingPassword,
        image:image.secure_url,
        

        
        
        
     })

     console.log(image.secure_url)
     await newUser.save();

     if(newUser){
        createTokenandSavecookie(newUser._id,res)
     res.status(201).json({message:"user created successfully",
      user:{
            _id:newUser._id,
            fullname:newUser.fullname,
            email:newUser.email,
            image:image.secure_url,
            
            

         },
         
     });
     console.log(user);
     }


   
    }     
    

    catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"});

    }

}


//Login Page

export const login=async(req,res)=>{
   const {email,password}=req.body;
   try{
      const user = await User.findOne({email});
      const isMatch =await  bcrypt.compare(password,user.password);
      if(!user || !isMatch){
        return  res.status(400).json({error:"Invalid User Credentials"});
      }
      createTokenandSavecookie(user._id,res);
      res.status(201).json({
         message:"User Loggedin Successfully",
         user:{
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
         },
      });
       
   }
   catch(error){
      console.log(error);
      res.status(500).json({error:"Internal Server Error"});
   }
}

//Logout Page

export const logout=async(req,res)=>{
   try{
      res.clearCookie("jwt");
      res.status(201).json({message:"User Loggedout Successfully"  })
   }
   catch(error){
      res.status(500).json({error:"Internal Server Error"});
   }

}

//get the user from the database
export const allUsers=async(req,res)=>{
   try{
      const loggedInUser=req.user._id;


      const filteredUsers=await User.find({_id:{$ne:loggedInUser}}).select("-password");
      res.status(201).json(filteredUsers)

   }
   catch(error){
      console.log("Error in allUsers Controller: "+ error);

   }
};

//get the logged in User

export const logUsers=async(req,res)=>{
   try{
      const loggedInUser=req.user._id;


      const currentUsers=await User.find({_id:{$eq:loggedInUser}}).select("-password");
      res.status(201).json(currentUsers)

   }
   catch(error){
      console.log("Error in allUsers Controller: "+ error);

   }
};

