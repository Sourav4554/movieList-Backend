import express, { json } from 'express'
import dotenv from 'dotenv'
import { connectDB } from './configuration/db.js';
import movieRouter from './Routes/movieRouter.js';
dotenv.config();
const app=express();
const PORT=process.env.PORT || 3000
app.use(json())
app.use('/api/movie/',movieRouter)

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server running on http://localhost:${PORT}`)
        })
})

