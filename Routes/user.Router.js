import express from 'express'
import passport from '../configuration/passport.js';
import { Signup,Login,googleAuth } from "../Controller/user.Controller.js";
const userRouter=express.Router()


userRouter.post('/sign',Signup);
userRouter.post('/login',Login)
userRouter.get('/google',passport.authenticate('google',{scope:['profile','email']}))
userRouter.get('/google/callback',passport.authenticate('google',{session:false}),googleAuth)
export default userRouter;