import mongoose from "mongoose";

const UserSchema=mongoose.Schema({
    
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmpassword:{
        type:String,
        
    },
    image:{
        type:String,
      
        required:true,

    },

    // coverImage:{
    //     type:String
    // },
    
} ,{timestamps:true}) ;// createdAt  &  updatedAt

const User=mongoose.model('User',UserSchema)
export default User;