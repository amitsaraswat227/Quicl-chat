import express from "express";
import { allUsers, login , logout, logUsers, Signup } from "../controller/user.controll.js";
import SecureRoute from "../middleware/SecureRoute.js";
import { upload } from "../middleware/multer.middleware.js";


const router=express.Router();

router.post('/signup',upload.single('image'),Signup);


router.post('/login',login);
router.post('/logout',logout);
router.get('/allusers',SecureRoute, allUsers);
router.get('/logUsers',SecureRoute,logUsers);


export default  router;


