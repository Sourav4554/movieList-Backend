
import express from 'express'
import { Signup,Login } from "../Controller/user.Controller.js";
const userRouter=express.Router()


userRouter.post('/sign',Signup);
userRouter.post('/login',Login)

export default userRouter;