import express, { json } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./configuration/db.js";
import movieRouter from "./Routes/movieRouter.js";
import AppError from "./Utilits/AppError.js";
import { errorHandler } from "./Utilits/errorHandler.js";
import userRouter from "./Routes/user.Router.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(json());
app.use(cookieParser())
//endpoint for movie
app.use("/api/movie/", movieRouter);
//end point for user
app.use('/api/user',userRouter)
//handling errors for undefined routes
app.use((req,res,next)=>{
 next(new AppError(`cant find ${req.originalUrl} on this server`,404,false))
})

//central error handling middleware
app.use(errorHandler);

//handling unhandled promise rejections
process.on('unhandledRejection',(err)=>{
console.log('UNCAUGHT EXCEPTION Shutting down....')
console.log(err.name,err.message)
process.exit(1)
})

//handling uncaught exceptions
process.on('uncaughtException',(err)=>{
console.log('UNCAUGHT EXCEPTIIONS, Shuting down...')
process.exit(1)
})

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
  });
});
