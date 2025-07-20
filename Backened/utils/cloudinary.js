import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs';
import dotenv from "dotenv"

dotenv.config()
 cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
const uploadoncloudinary = async(localfilepath) => {

    try{
  if(!localfilepath) return null;
  console.log(localfilepath);

  //upload the file on the cloudinary
  const response=await cloudinary.uploader.upload(localfilepath)

  //file has been uploaded successfully
  console.log("File is uploaded on cloudinary",response.secure_url);
   fs.unlinkSync(localfilepath)
   console.log(response);
   
  return response;
  
 
  
    }
    catch(error){
         fs.unlinkSync(localfilepath)
         console.log(error)
   //remove the local saved temporary files as the upload operation got failed
   return null;
  
   }
}

export {uploadoncloudinary}
