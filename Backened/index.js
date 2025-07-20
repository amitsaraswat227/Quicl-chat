
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/messageroute.js";
import { app, server } from "./Socket/server.js";

import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// middleware to parse json request body
app.use(express.json());
app.use(cors());
app.use(cookieParser());
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

//import the route
import userRoute from "./routes/userroute.js";

//mount the route
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);
try {
  mongoose.connect(MONGODB_URI);
  console.log("connected to mongoDB");
} catch (error) {
  console.log(error);
}

server.listen(PORT, () => {
  console.log(`sever is running on port no. ${PORT}`);
});
